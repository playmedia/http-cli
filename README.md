# http-cli

[![Dependency Status](https://david-dm.org/playmedia/http-cli.svg)](https://david-dm.org/playmedia/http-cli)

Simple Node.js command-line HTTP server with CORS support.

It uses the following modules and middlewares :

* [command-line-args](https://www.npmjs.com/package/command-line-args)
* [command-line-usage](https://github.com/75lb/command-line-usage)
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
  "middlewares": {
    "cors": {
      "origin": "http://example.com"
    },
    "serveIndex": {
      "view": "details"
    },
    "serveStatic": {
      "index": ["index.html", "default.html"]
    }
  }
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
  "middlewares": {
    "cors": {
      "origin": true
    },
    "morgan": {},
    "serveIndex": {
      "icons": true
    },
    "serveStatic": {}
  }
}
```

The default configuration can be saved to file with `--dump` option.

## Node.js module

```javascript
const http = require('http-cli')

const config = http.Config.default()
// const config = http.Config.loadFromFile('path/to/config.json')

http.server(config)
  // .use(/* another middleware */)
  .listen(config.port, config.host, function() {
    console.log('http server listening on ' + config.host + ':' + config.port)
  })
```

## License

[MIT](LICENSE)
