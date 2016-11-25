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

