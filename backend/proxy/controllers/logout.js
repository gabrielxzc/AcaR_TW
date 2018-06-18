const url = require('url');
const fs = require('fs');
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
        if (error) {
            console.error(error);

            res.writeHead(500);
            res.end();

            return;
        }

        body = JSON.parse(body);
        if (body.status == 'error') {
            console.error(body);

            res.writeHead(500);
            res.end();

            return;
        }
    });
}