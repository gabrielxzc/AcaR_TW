const request = require('request');
const url = require('url');

exports.controller = (req, res) => {
    var tokens = req.url.split('/');
    var materie = tokens[tokens.length - 5];
    var title = tokens[tokens.length - 3]; 

    let options = { // /subjects/:subject/books/:titlu_resursa/info
                    // /materii/:subject/books/:titlu_resursa/info
        url: 'http://localhost:8081/subjects/' + materie + '/books/' + title + '/info',
        method:req.method,
        headers:req.headers
        };
        request(options, (error, response, body) => {
            res.writeHead(response.statusCode, {
                'Content-Type': 'application/json'
            });
            res.end(JSON.stringify(body));
        });
    }