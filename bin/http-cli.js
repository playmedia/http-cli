#!/usr/bin/env node

var commandLineArgs = require('command-line-args')
var commandLineUsage = require('command-line-usage')
var http = require('../lib/main')

const defaultConfig = http.Config.default()

const optionList = [
  { name: 'help', alias: 'h', type: Boolean, description: 'Display this usage help.' },
  { name: 'port', alias: 'p', type: Number, description: 'Listen port number.', defaultValue: defaultConfig.port },
  { name: 'host', alias: 'a', type: String, description: 'Listen ip address or hostname.', defaultValue: defaultConfig.host },
  { name: 'root', alias: 'r', type: String, description: 'Root folder path.', defaultValue: defaultConfig.root },
  { name: 'config', alias: 'c', type: String, description: 'JSON configuration file path.' },
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

const config = http.Config.load(options)

http.server(config)
  .listen(config.port, config.host, function() {
    console.log('http server listening on ' + config.host + ':' + config.port)
  })
