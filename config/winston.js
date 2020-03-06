var appRoot = require('app-root-path')
const logFileName = `${appRoot}`.replace(/.*\//, '')
const { createLogger, format, transports } = require('winston')
const { combine, timestamp, label, printf, colorize } = format
require('winston-daily-rotate-file')

const logDir = `${appRoot}/logs/`

const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${level}] [${label}] ${message}`
})

var dailylogTransport = new (transports.DailyRotateFile)({
  filename: `${logDir}${logFileName}-%DATE%.log`,
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '14d'
})

let logLevel = 'warn'
if (process.env.NODE_ENV === 'development') {
  logLevel = 'info'
}
if (process.env.DEBUG === 'ON') {
  logLevel = 'debug'
}

const logger = createLogger({
  level: logLevel,
  format: combine(
    label({ label: logFileName }),
    colorize(),
    timestamp(),
    myFormat
  ),
  transports: [
    dailylogTransport
  ]
})

module.exports = logger
