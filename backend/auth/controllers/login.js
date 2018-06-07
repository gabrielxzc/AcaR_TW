const request = require('request');

exports.controller = (req, res) => {
    if (req.method === 'POST') {
        let account;
        let body = [];

        req.on('data', (chunk) => {
            body.push(chunk);
        }).on('end', () => {
            body = Buffer.concat(body).toString();

            try {
                account = JSON.parse(body);
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
                uri: 'http://localhost:8083/account',
                method: 'POST',
                json: account
            };

            request(options, (error, response, body) => {
                if (error) {
                    res.writeHead(500, {
                        'Content-Type': 'application/json'
                    });
                    res.end(JSON.stringify({
                        'status': 'error',
                        'message': 'Could not contact account manager service!'
                    }));

                    return;
                }

                if (!body.isAccountValid) {
                    res.writeHead(response.statusCode, {
                        'Content-Type': 'application/json'
                    });
                    res.end(JSON.stringify({
                        'status': 'error',
                        'message': 'Invalid credentials!'
                    }));

                    return;
                }

                let options = {
                    uri: 'http://localhost:8084/new-session',
                    method: 'POST',
                    json: {
                        'username': account.username
                    }
                };

                request(options, (error, response, body) => {
                    if (error) {
                        res.writeHead(500, {
                            'Content-Type': 'application/json'
                        });
                        res.end(JSON.stringify({
                            'status': 'error',
                            'message': 'Could not contact sessions manager service!'
                        }));

                        return;
                    }

                    res.writeHead(response.statusCode, {
                        'Content-Type': 'application/json'
                    });
                    res.end(JSON.stringify(body));
                });
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