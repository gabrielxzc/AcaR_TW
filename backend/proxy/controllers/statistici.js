const url = require('url');
const fs = require('fs');
const cookieParser = require('../utils/cookie-parser');
const request = require('request');

exports.controller = (req, res) => {
    let tokens = req.url.split('/');
    let materie = tokens[tokens.length - 3];
    let cookies = cookieParser.parse(req);

    let options = {
        uri: 'http://localhost:8081/is-auth',
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

        if (body.status == 'error') {
            let filepath = './proxy/views/index/index.html';

            fs.readFile(filepath, (error, data) => {
                if (error) {
                    console.error(error);

                    res.writeHead(500);
                    res.end();
                } else {
                    let contentType = 'text/html';

                    res.writeHead(200, {
                        'Content-Type': contentType
                    });
                    res.end(data);
                }
            });

            return;
        }

        let options = {
            uri: 'http://localhost:8081/materii/mat/' + materie,
            method: 'GET'
        };
        request(options, (error, response, body) => {
            res.writeHead(response.statusCode, {
                'Content-Type': 'application/json'
            });
            res.end(JSON.stringify(body));
        });
    });
}
