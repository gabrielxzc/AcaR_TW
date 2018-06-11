const request = require('request');

exports.controller = (req, res) => {
    let tokens = req.url.split('/');
    let materie = tokens[tokens.length - 3];
    let page = tokens[tokens.length - 1];

    let options = {
        url: 'http://localhost:8081/subjects/' + materie + '/books/' + page,
        method: req.method,
        headers: req.headers
    };

    console.log(options.url);

    request(options, (error, response, body) => {
        res.writeHead(response.statusCode, {
            'Content-Type': 'application/json'
        });
        res.end(JSON.stringify(body));
    });
}