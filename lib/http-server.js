var connect = require('connect')
var cors = require('cors')
var morgan = require('morgan')
var serveIndex = require('serve-index')
var serveStatic = require('serve-static')

module.exports = function (config) {
  var app = connect()
  var m = config.middlewares()

  // Use middlewares in array order
  for (var i in m) {
    var n = m[i].name
    var c = m[i].cfg
    var a = m[i].args

    switch(n) {
      case 'cors':
        app.use(cors(c))
        break;

      case 'morgan':
        app.use(morgan(config.logFormat(), c))
        break;

      case 'serveStatic':
        app.use(serveStatic(config.root(), c))
        break;

      case 'serveIndex':
        app.use(serveIndex(config.root(), c))
        break;

      default:
        // Check for custom middleware
        a && (app.use.apply(app, a))
        break;
    }
  }

  return app
}
