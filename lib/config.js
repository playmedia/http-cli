var fs = require('fs')

/**
 * Get default HTTP server configuration.
 * @return {Object} The HTTP server configuration.
 */
function loadDefault() {
  return {
    port: 8000,
    host: '127.0.0.1',
    root: './',
    logFormat: 'combined',
    middlewares: {
      cors: {
        origin: true,
      },
      morgan: {
      },
      serveIndex: {
        icons: true,
      },
      serveStatic: {
      },
    }
  }
}

/**
 * Get HTTP server configuration from JSON file.
 * @param {string} filename - The JSON filename.
 * @throws Will throw an error if invalid filename or JSON.
 * @return {Object} The HTTP server configuration.
 */
function loadFromFile(filename) {
  var cfg = {}
  Object.assign(
    cfg,
    loadDefault(),
    JSON.parse(fs.readFileSync(filename))
  )

  return cfg
}

/**
 * Get HTTP server configuration from command line options.
 * @param {Object} opts - The command line options.
 * @return {Object} The HTTP server configuration.
 */
function load(opts) {
  var defCfg = loadDefault()
  var cfg = opts.config ? loadFromFile(opts.config) : loadDefault()

  // Command line config override file loaded config
  for (var k in opts) {
    defCfg.hasOwnProperty(k) && (defCfg[k] !== opts[k] && (cfg[k] = opts[k]))
  }

  return cfg
}

module.exports = {
  default: loadDefault,
  load: load,
  loadFromFile: loadFromFile
}
