# http-cli

Simple Node.js command-line HTTP server with CORS support.

It uses the following modules and middlewares :

* [command-line-args](https://www.npmjs.com/package/command-line-args)
* [connect](https://www.npmjs.com/package/connect)
* [cors](https://www.npmjs.com/package/cors)
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

  -h, --help      Display this usage help.
  -p, --port      Listen port number.
  -a, --host      Listen ip address or hostname.
  -r, --root      Root folder path.
  -c, --config    JSON configuration file path.
```

Default behaviour is :

* accept connections on `127.0.0.1` and port 8000
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
  "middlewares": {
    "cors": {
      "origin": true
    },
    "serveIndex": {
      "icons": true
    },
    "serveStatic": {
      "index": ["index.html"]
    }
  }
}
```

## License

[MIT](LICENSE)