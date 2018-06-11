const request = require('request');
const url = require('url');

exports.controller = (req, res) => {
    let options = {
        url: 'http://localhost:8081' + url.parse(req.url).pathname,
        method: req.method,
        headers: req.headers
    };

    request(options, (error, response, body) => {
        res.writeHead(response.statusCode, {
            'Content-Type': 'application/json'
        });
        res.end(JSON.stringify(body));
    });
};