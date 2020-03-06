const mongoose = require('mongoose')

var mongooseInterviewSchema = mongoose.Schema({
  type: String,
  userid: String,
  lonlat: []
}, { timestamps: true })

exports.Interview = mongoose.model('Interview', mongooseInterviewSchema)
