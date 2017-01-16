#!/usr/bin/env node

var commandLineArgs = require('command-line-args')
var commandLineUsage = require('command-line-usage')
var http = require('../lib/main')

const config = new http.Config()

const optionList = [
  { name: 'help', alias: 'h', type: Boolean, description: 'Display this usage help.' },
  { name: 'port', alias: 'p', type: Number, description: 'Listen port number.', defaultValue: config.port() },
  { name: 'host', alias: 'a', type: String, description: 'Listen ip address or hostname.', defaultValue: config.host() },
  { name: 'root', alias: 'r', type: String, description: 'Root folder path.', defaultValue: config.root() },
  { name: 'config', alias: 'c', type: String, description: 'JSON configuration load file path.' },
  { name: 'dump', alias: 'd', type: String, description: 'Default JSON configuration save file path.' },
]

const options = commandLineArgs(optionList)

if (options.help) {
  console.log(commandLineUsage([
    {
      header: 'http-cli',
      content: 'Starts a simple HTTP server with CORS support.',
    },
    {
      header: 'Options',
      optionList: optionList,
    }
  ]))
  process.exit()
}

if (options.dump) {
  config.saveToFile(options.dump)
  process.exit()
}

config.loadFromOptions(options)

http.server(config)
  .listen(config.port(), config.host(), function() {
    console.log('http server listening on ' + config.host() + ':' + config.port())
  })
