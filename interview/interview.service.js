const mongoose = require('mongoose')
const Interview = mongoose.model('Interview')
const logger = require('../config/winston')
const rp = require('request-promise')
const _ = require('lodash')
const officeList = require('../config/officeList.json')
var KDBush = require('kdbush')
var geokdbush = require('geokdbush')
const index = new KDBush(officeList, (p) => p.lonlat[0], (p) => p.lonlat[1])

const submitInterviewEvent = async (userid, type, postcode) => {
  try {
    const lonlat = await postcodeGeocode(postcode)
    const interviewEvent = await Interview.findOneAndUpdate({ userid: userid, type: type }, { userid: userid, type: type, lonlat: lonlat }, { new: true, upsert: true })
    return interviewEvent
  } catch (e) {
    logger.debug('Error submitting interview ' + e.message)
    throw e
  }
}

const getAllInterviewEvents = async () => {
  try {
    const interviewEvents = await Interview.find({})
    return interviewEvents.map((evt) => {
      const nearestOffice = getNearestOffice(evt.lonlat)
      return { userid: evt.userid, type: evt.type, lonlat: evt.lonlat, nearestOffice: nearestOffice, created: evt.createdAt }
    })
  } catch (e) {
    logger.debug('Error fetching all interview events ' + e.message)
    throw e
  }
}

const postcodeGeocode = async (postcode) => {
  try {
    postcode = postcode.replace(/\s/g, '')
    const url = `https://api.postcodes.io/postcodes/${postcode}`
    const response = await rp(url)
    const result = JSON.parse(response)
    const lat = _.get(result, 'result.latitude')
    const lon = _.get(result, 'result.longitude')
    return [lon, lat]
  } catch (e) {
    logger.debug('Unable to geocode postcode ' + e.message)
    return null
  }
}

const getNearestOffice = (lonlat) => {
  const nearest = geokdbush.around(index, lonlat[0], lonlat[1], 1)
  return _.get(nearest, '[0].office')
}

exports.submitInterviewEvent = submitInterviewEvent
exports.getAllInterviewEvents = getAllInterviewEvents
