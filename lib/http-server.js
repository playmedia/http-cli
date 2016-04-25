var connect = require('connect')
var cors = require('cors')
var morgan = require('morgan')
var serveIndex = require('serve-index')
var serveStatic = require('serve-static')

module.exports = function (config) {
  return connect()
    .use(morgan(config.logFormat, config.middlewares.morgan))
    .use(cors(config.middlewares.cors))
    .use(serveStatic(config.root, config.middlewares.serveStatic))
    .use(serveIndex(config.root, config.middlewares.serveIndex))
}
