var fs = require('fs')
var _n = 0;

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
    middlewares: [
      {
        name: 'cors',
        cfg: {
          origin: true
        }
      },
      {
        name: 'morgan',
        cfg: {}
      },
      {
        name: 'serveStatic',
        cfg: {}
      },
      {
        name: 'serveIndex',
        cfg: {
          icons: true
        }
      }
    ]
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
 * Save HTTP server configuration to JSON file.
 * @param {string} filename - The JSON filename.
 * @param {Object} cfg - The HTTP server configuration.
 * @throws Will throw an error if filename exists.
 */
function saveToFile(filename, cfg) {
  // Use 'wx' flag to fails if filename exists
  fs.writeFileSync(filename, JSON.stringify(cfg, null, 2), {flag: 'wx'})
}

/**
 * Get HTTP server configuration from command line options.
 * @param {Object} opts - The command line options.
 * @return {Object} The HTTP server configuration.
 */
function loadFromOptions(opts) {
  var defCfg = loadDefault()
  var cfg = opts.config ? loadFromFile(opts.config) : loadDefault()

  // Command line config override file loaded config
  for (var k in opts) {
    defCfg.hasOwnProperty(k) && (defCfg[k] !== opts[k] && (cfg[k] = opts[k]))
  }

  return cfg
}

/**
 * Save default HTTP server configuration to JSON file.
 * @param {string} filename - The JSON filename.
 */
function dump(filename) {
  saveToFile(filename, loadDefault())
}

function middleware(a) {
  return {
    name: '_' + ++_n,
    args: a
  }
}

var Config = function() {
  var _cfg = loadDefault()

  var middlewareIndex = function(name) {
    return _cfg.middlewares.findIndex(function(e){
      return e.name === name
    })
  }

  this.loadFromOptions = function(o) {
    _cfg = loadFromOptions(o)
    return this
  }

  this.loadFromFile = function(f) {
    _cfg = loadFromFile(f)
    return this
  }

  this.saveToFile = function(f) {
    saveToFile(f, _cfg)
    return this
  }

  this.port = function(p) {
    p && (_cfg.port = p)
    return _cfg.port
  }

  this.host = function(h) {
    h && (_cfg.host = h)
    return _cfg.host
  }

  this.root = function(r) {
    r && (_cfg.root = r)
    return _cfg.root
  }

  this.logFormat = function(l) {
    l && (_cfg.logFormat = l)
    return _cfg.logFormat
  }

  this.middlewares = function() {
    return _cfg.middlewares
  }

  this.use = function() {
    _cfg.middlewares.push(middleware(arguments))
    return this
  }

  this.useBefore = function(name) {
    var args = Array.from(arguments)
    args.shift()
    var i = middlewareIndex(name)
    _cfg.middlewares.splice(i, 0, middleware(args))
    return this
  }

  this.useAfter = function(name) {
    var args = Array.from(arguments)
    args.shift()
    var i = middlewareIndex(name)
    _cfg.middlewares.splice(i+1, 0, middleware(args))
    return this
  }
}

module.exports = Config
