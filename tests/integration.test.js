const { connect, connection } = require('../db')
const mongoose = require('mongoose')
const Interview = mongoose.model('Interview')

const request = require('supertest')
const app = require('../app.js')

beforeAll(async () => {
  await connect
})

beforeEach(async () => {
  await Interview.deleteMany({})
})

afterAll(async () => {
  await Interview.deleteMany({})
  connection.close()
  app.server.close()
})

test('Can submit interview event', async () => {
  const url = '/submitInterviewEvent?userid=123&type=SettlementAgreement&postcode=M503UB'
  await request(app)
    .get(url)
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200)
    .expect(response => {
      expect(response.body).toHaveProperty('lonlat', [-2.294541, 53.471322])
    })
  return true
})

test('Can fetch all interview events', async () => {
  await Interview.create({
    lonlat: [
      -0.698567,
      52.305549
    ],
    type: 'Settlement',
    userid: '123'
  })
  await Interview.create({
    lonlat: [
      -0.131017,
      51.487154
    ],
    type: 'Settlement',
    userid: '234'
  })

  await request(app)
    .get('/getAllInterviewEvents')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200)
    .expect(response => {
      expect(response.body[0]).toHaveProperty('nearestOffice', 'Birmingham')
    })
  return true
})
