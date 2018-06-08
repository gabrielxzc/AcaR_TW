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
                res.writeHead(200, {
                    'Content-Type': 'application/json'
                });
                res.end(JSON.stringify({
                    'status': 'error',
                    'message': 'Body-ul cererii este invalid, verifica documentatia pentru detalii!'
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
                    res.writeHead(200, {
                        'Content-Type': 'application/json'
                    });
                    res.end(JSON.stringify({
                        'status': 'error',
                        'message': 'Nu s-a putut contacta serviciul de administrare a conturilor!'
                    }));

                    return;
                }

                if (!body.isAccountValid) {
                    res.writeHead(response.statusCode, {
                        'Content-Type': 'application/json'
                    });
                    res.end(JSON.stringify({
                        'status': 'error',
                        'message': 'Numele de utilizator sau parola sunt gresite!'
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
                        res.writeHead(200, {
                            'Content-Type': 'application/json'
                        });
                        res.end(JSON.stringify({
                            'status': 'error',
                            'message': 'Nu s-a putut contacta serviciul de administrare a sesiunilor!'
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
        res.writeHead(200, {
            'Content-Type': 'application/json'
        });
        res.end(JSON.stringify({
            'status': 'error',
            'message': 'Doar metoda POST este accepta pe aceasta ruta!'
        }));
    }
};