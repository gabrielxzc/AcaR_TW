const url = require('url');
const fs = require('fs');
const cookieParser = require('../utils/cookie-parser');

exports.controller = (req, res) => {
    let cookies = cookieParser.parse(req);
    console.log(cookies);

    let filepath = './proxy/views/register/register.html';
    fs.readFile(filepath, (error, data) => {
        if (error) {
            res.writeHead(404);
            res.end();
        } else {
            let contentType = 'text/html';

            res.writeHead(200, {
                'Content-Type': contentType
            });
            res.end(data);
        }
    });
}