const request = require('request');
const url = require('url');

exports.controller = (req, res) => {
    let obj;
    let requestBody = [];

    req.on('data', (chunk) => {
        requestBody.push(chunk);
    }).on('end', () => {
        requestBody = Buffer.concat(requestBody).toString();

        try {
            obj = JSON.parse(requestBody);
        } catch(e) {
            console.error(e);
        }
        console.log(obj);
        console.log(req.headers);
        console.log(req.method);
        let options = {
            url: 'http://localhost:8081/portfolio/addBook',
            method: req.method,
            headers: req.headers,
            json: obj
        };

        request(options, (error, response, body) => {
            if (error) console.log("eroare");
            res.writeHead(response.statusCode, {
                'Content-Type': 'application/json'
            });
            res.end(JSON.stringify(body));
        });
    });
};