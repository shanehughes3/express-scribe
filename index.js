const url = require("url");

const Scribe = function(params = {}) {
    
    this.params = {
	removeIPv4Prefix: params.removeIPv4Prefix || false
    }
    
    if (!(this instanceof Scribe)) {
	return this.req;
    }
}

Scribe.prototype.req = function(req, res, next) {
    const endpoint = url.parse(req.url).pathname,
	  ip = this.parseIP(req.connection.remoteAddress);
    res.on("finish", function() {
	console.log(`${ip} ${endpoint} ${colorStatusCode(res.statusCode)}`);
    });
    if (typeof next === "function") {
	next();
    }
}

Scribe.prototype.parseIP = function(ip) {
    let output = ip;
    if (this.params.removeIPv4Prefix && (/^::ffff:/).test(ip)) {
	output = output.slice(7);
    }
    return output;
}

Scribe.prototype.socketRequest = function(req, isAccepted) {
    const response = (isAccepted) ? "\x1b[32mAccepted\x1b[0m" :
	  "\x1b[31mRejected\x1b[0m";
    console.log((new Date()) + ` Connection from ${req.origin} ${response}`);
};

Scribe.prototype.socketClose = function(reasonCode, description) {
    console.log((new Date()) + ` ${this.remoteAddress} disconnected - ` +
		`${reasonCode} ${description}`);
}

function colorStatusCode(statusCode) {
    return coloredCodes[statusCode] || statusCode;
}

const coloredCodes = {
    200: "\x1b[32m200\x1b[0m",
    301: "\x1b[36m301\x1b[0m",
    302: "\x1b[36m302\x1b[0m",
    304: "\x1b[36m304\x1b[0m",
    307: "\x1b[36m307\x1b[0m",
    400: "\x1b[33m400\x1b[0m",
    401: "\x1b[33m401\x1b[0m",
    403: "\x1b[33m403\x1b[0m",
    404: "\x1b[33m404\x1b[0m",
    410: "\x1b[33m410\x1b[0m",
    500: "\x1b[31m500\x1b[0m",
    501: "\x1b[31m501\x1b[0m",
    503: "\x1b[31m503\x1b[0m",
    550: "\x1b[31m550\x1b[0m"    
}

module.exports = Scribe;
