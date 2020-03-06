require('./db')
const createError = require('http-errors')
const express = require('express')
const logger = require('./config/winston')
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const InterviewService = require('./interview/interview.service')

app.get('/submitInterviewEvent', async (req, res) => {
  try {
    const userid = req.query.userid
    const postcode = req.query.postcode
    const type = req.query.type
    const result = await InterviewService.submitInterviewEvent(userid, type, postcode)
    res.json(result)
  } catch (e) {
    logger.error('Failed to submit interview event ' + e.message)
    res.status(500).json({ message: 'Failed to submit interview event' })
  }
})

app.get('/getAllInterviewEvents', async (req, res) => {
  try {
    const events = await InterviewService.getAllInterviewEvents()
    res.json(events)
  } catch (e) {
    logger.error('Failed to submit interview event ' + e.message)
    res.status(500).json({ message: 'Failed to fetch all interview events' })
  }
})

app.use('/', express.static('build'))

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.json({ error: 'error' })
})

app.server = app.listen(8080)
console.log('Listening on 8080')

module.exports = app
