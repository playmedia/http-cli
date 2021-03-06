# http-cli

Simple Node.js command-line HTTP server with CORS support.

It uses the following modules and middlewares :

* [command-line-args](https://www.npmjs.com/package/command-line-args)
* [command-line-usage](https://www.npmjs.com/package/command-line-usage)
* [connect](https://www.npmjs.com/package/connect)
* [cors](https://www.npmjs.com/package/cors)
* [morgan](https://www.npmjs.com/package/morgan)
* [serve-index](https://www.npmjs.com/package/serve-index)
* [serve-static](https://www.npmjs.com/package/serve-static)

For more details, see also [Connect/Express middlewares](https://github.com/expressjs).

## Installation

```
npm install http-cli
```

## Usage

Command line options are :

```
Options

  -h, --help            Display this usage help.
  -p, --port number     Listen port number.
  -a, --host string     Listen ip address or hostname.
  -r, --root string     Root folder path.
  -c, --config string   JSON configuration load file path.
  -d, --dump string     Default JSON configuration save file path.
```

Default behaviour is :

* accept connections on `127.0.0.1` and port 8000
* use [combined](https://www.npmjs.com/package/morgan#combined) log output
* use current directory as web root
* directory listing is enabled
* send "index.html" files in response to a request on a directory
* reflect the request origin header in `Access-Control-Allow-Origin` CORS header

## Configuration

An optionnal JSON configuration file can be loaded with `--config` option.

Example configuration file :

```json
{
  "port": 3000,
  "host": "0.0.0.0",
  "root": "./web/",
  "middlewares": [
    {
      "name": "cors",
      "cfg": {
        "origin": "http://example.com"
      }
    },
    {
      "name": "serveStatic",
      "cfg": {
        "index": ["index.html", "default.html"]
      }
    },
    {
      "name": "serveIndex",
      "cfg": {
        "view": "details"
      }
    }
  ]
}
```

For middlewares options, see links above.

Default configuration is equivalent to :

```json
{
  "port": 8000,
  "host": "127.0.0.1",
  "root": "./",
  "logFormat": "combined",
  "middlewares": [
    {
      "name": "cors",
      "cfg": {
        "origin": true
      }
    },
    {
      "name": "morgan",
      "cfg": {}
    },
    {
      "name": "serveStatic",
      "cfg": {}
    },
    {
      "name": "serveIndex",
      "cfg": {
        "icons": true
      }
    }
  ]
}
```

The default configuration can be saved to file with `--dump` option.

## Node.js module

```javascript
const http = require('http-cli')

const config = new http.Config()
// config.loadFromFile('path/to/config.json')
// config.port(8090)

http.server(config)
  .listen(config.port(), config.host(), function() {
    console.log('http server listening on ' + config.host() + ':' + config.port())
  })
```

Middlewares are "used" in the same order as the configuration array.

Some configuration helpers are available to facilitate the addition of middleware.

```javascript
const http = require('http-cli')

const config = new http.Config()

config.use(function(req, res, next) {
  // this middleware is used at the end
  next()
})

config.useBefore('serveIndex', function(req, res, next) {
  // this middleware is used before serveIndex middleware
  next()
})

config.useAfter('cors', function(req, res, next) {
  // this middleware is used after cors middleware
  next()
})

http.server(config)
  .listen(config.port(), config.host(), function() {
    console.log('http server listening on ' + config.host() + ':' + config.port())
  })
```

## License

[MIT](LICENSE)
