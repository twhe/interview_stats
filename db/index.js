var mongoose = require('mongoose')

mongoose.Promise = global.Promise
mongoose.set('useFindAndModify', false)

// For now, using unsecured local instance of mongo;
var dbURI = 'mongodb://localhost/interviews'

// Create the database connection
const connect = mongoose.connect(dbURI, {
  useCreateIndex: true,
  useUnifiedTopology: true,
  useNewUrlParser: true
})

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', function () {
  mongoose.connection.close(function () {
    process.exit(0)
  })
})

require('../interview/interview.schema.js')

exports.connect = connect
exports.connection = mongoose.connection
