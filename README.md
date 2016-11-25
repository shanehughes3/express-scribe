# express-scribe

Basic Node.js logging.

## Usage

As middleware:

```js
const scribe = require("express-scribe");

app.use(scribe());
```

Or standalone:

```js
const scribe = require("express-scribe");

const logger = new Scribe();

const server = http.createServer(function(req, res) {
      logger.req(req, res);
});
```

## Api

### Options

- **removeIPv4Prefix**: removes IPv6 prefix (`::ffff:`) from the start of IPv4
  addresses. Defaults to `false`.

### HTTP Methods

#### scribe.req(req, res)

This is the default method used when passed as middleware. Outputs a line for
each request upon server response to the request.

### WebSocket Methods

```js
const WebSocketServer = require("websocket").server,
	Scribe = require("express-scribe"),
	scribe = new Scribe();

wsServer = new WebSocketServer({
	httpServer: httpServer,
	autoAcceptConnections: false
});

wsServer.on("request", function(req) {
	if (!originIsAllowed(req.origin)) {
		scribe.socketRequest(req, false);
		req.reject();
		return;
	}

	const connection = req.accept("protocol", req.origin);
	scribe.socketRequest(req, true);

	connection.on("close", function() {
		scribe.socketClose(connection);
	})
});
```

#### scribe.socketRequest(req, isAccepted)

Outputs a line for each new connection to a WebSocket server. `req` is the
object passed on a "request" event, and `isAccepted` is a boolean stating
whether the request was accepted.

#### scribe.socketClose(connection)

Outputs a line for each WebSocket connection that is closed. `connection` is
the object passed when a WebSocket request is accepted.

## Installation

```js
npm install express-scribe --save
```

## License

The MIT License (MIT)

Copyright (c) 2016 Shane Hughes

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.