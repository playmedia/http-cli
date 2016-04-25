#!/usr/bin/env node

var commandLineArgs = require('command-line-args')
var fs = require('fs')
var httpServer = require('../lib/http-server')

var cli = commandLineArgs([
  { name: 'help', alias: 'h', type: Boolean, description: 'Display this usage help.' },
  { name: 'port', alias: 'p', type: Number, description: 'Listen port number.', defaultValue: 8000 },
  { name: 'host', alias: 'a', type: String, description: 'Listen ip address or hostname.', defaultValue: '127.0.0.1' },
  { name: 'root', alias: 'r', type: String, description: 'Root folder path.', defaultValue: './' },
  { name: 'config', alias: 'c', type: String, description: 'JSON configuration file path.' },
])

var options = cli.parse()

if (options.help) {
  console.log(cli.getUsage({
    title: 'http-cli',
    description: 'Starts a simple HTTP server with CORS support.',
  }))
  process.exit()
}

var config = {
  port: options.port,
  host: options.host,
  root: options.root,
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

if (options.config) {
  var loadedConfig = JSON.parse(fs.readFileSync(options.config))
  Object.assign(config, loadedConfig)
}

httpServer(config)
  .listen(config.port, config.host, function() {
    console.log('http server listening on ' + config.host + ':' + config.port)
  })
