const url = require('url');
const fs = require('fs');
const request = require('request');
const cookieParser = require('../utils/cookie-parser');

exports.controller = (req, res) => {

    let cookies = cookieParser.parse(req);

    let options = {
        uri: 'http://localhost:8081/logout',
        method: 'POST',
            json: {
            sessionId: cookies['user']
        }
    };

    request(options, (error, response, body) => {
        res.writeHead(response.statusCode, {
            'Content-Type': 'application/json'
        });
        res.end(JSON.stringify(body));
    });
}