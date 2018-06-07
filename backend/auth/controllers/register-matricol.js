const request = require('request');

exports.controller = (req, res) => {
    if (req.method === 'POST') {
        let matricol;
        let body = [];

        req.on('data', (chunk) => {
            body.push(chunk);
        }).on('end', () => {
            body = Buffer.concat(body).toString();

            try {
                matricol = JSON.parse(body);
            } catch (e) {
                res.writeHead(400, {
                    'Content-Type': 'application/json'
                });
                res.end(JSON.stringify({
                    'status': 'error',
                    'message': 'Invalid body, check documentation for details!'
                }));

                return;
            }

            let options = {
                uri: 'http://localhost:8085/register-matricol',
                method: 'POST',
                json: matricol
            };

            request(options, (error, response, body) => {
                if (error) {
                    res.writeHead(500, {
                        'Content-Type': 'application/json'
                    });
                    res.end(JSON.stringify({
                        'status': 'error',
                        'message': 'Could not contact register manager service!'
                    }));
                } else {
                    res.writeHead(response.statusCode, {
                        'Content-Type': 'application/json'
                    });
                    res.end(JSON.stringify(body));
                }
            });
        });
    } else {
        res.writeHead(404, {
            'Content-Type': 'application/json'
        });
        res.end(JSON.stringify({
            'status': 'error',
            'message': 'Only POST is supported on this route!'
        }));
    }
};