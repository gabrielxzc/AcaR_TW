const url = require('url');
const fs = require('fs');
const cookieParser = require('../utils/cookie-parser');
const request = require('request');

exports.controller = (req, res) => {
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
            res.writeHead(401);
            res.end();

            return;
        }

        let options = {
            uri: 'http://localhost:8081/answered-questions?username=' + body.username,
            method: 'GET'
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

            let filepath;
            if (body.userCompletedQuestions) {
                filepath = './proxy/views/resource-page/resource_page.html'
            } else {
                filepath = './proxy/views/form/form.html'
            }   

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
        });
    });
}