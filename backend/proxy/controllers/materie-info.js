const request = require('request');

exports.controller = (req, res) => {
    let tokens = req.url.split('/');
    let materie = tokens[tokens.length - 2];

    let options = {
        url: 'http://localhost:8081/subjects/' + materie,
        method: req.method,
        headers: req.headers
    };

    request(options, (error, response, body) => {
        res.writeHead(response.statusCode, {
            'Content-Type': 'application/json'
        });
        res.end(JSON.stringify(body));
    });
}