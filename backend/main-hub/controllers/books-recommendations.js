const request = require('request');
const auth = require('../utils/check-auth');
const questions = require('../utils/check-questions');
const cookieParser = require('../utils/cookie-parser');
const url = require('url');

exports.controller = (req, res) => {
    if (req.method === 'GET') {
        let tokens = req.url.split('/');
        let materie = tokens[tokens.length - 4];
        let page = tokens[tokens.length - 2];

        let cookies = cookieParser.parse(req);

        if (cookies.user == null) {
            res.writeHead(200, {
                'Content-Type': 'application/json'
            });
            res.end(JSON.stringify({
                'status': 'error',
                'message': 'Nu ai specificat un token de logare in cerere!'
            }));

            return;
        }

        auth.check(cookies.user, (body, error) => {
            if (error) {
                console.error(error);

                res.writeHead(200, {
                    'Content-Type': 'application/json'
                });
                res.end(JSON.stringify({
                    'status': 'error',
                    'message': 'Nu s-a putut contacta serviciul de administrare a sesiunilor!'
                }));

                return;
            }

            if (body.status === 'error') {
                res.writeHead(200, {
                    'Content-Type': 'application/json'
                });
                res.end(JSON.stringify(body));

                return;
            }

            if (body.username == null) {
                res.writeHead(200, {
                    'Content-Type': 'application/json'
                });
                res.end(JSON.stringify({
                    'status': 'error',
                    'message': 'Autentificarea a esuat, tokenul de autentificare este invalid!'
                }));

                return;
            }

            let username = body.username;

            questions.check(body.username, (body, error) => {
                if (error) {
                    console.error(error);

                    res.writeHead(200, {
                        'Content-Type': 'application/json'
                    });
                    res.end(JSON.stringify({
                        'status': 'error',
                        'message': 'Nu s-a putut contacta serviciul de administrare a conturilor!'
                    }));

                    return;
                }

                if (body.status == 'error') {
                    res.writeHead(200, {
                        'Content-Type': 'application/json'
                    });
                    res.end(JSON.stringify(body));
    
                    return;
                }

                if (!body.userCompletedQuestions) {
                    res.writeHead(200, {
                        'Content-Type': 'application/json'
                    });
                    res.end(JSON.stringify({
                        'status': 'error',
                        'message': 'Trebuie sa completati formularul de intrebari inainte de a avea acces la orice alta operatie!'
                    }));

                    return;
                }

                let options = {
                    uri: 'http://localhost:8089/' + materie + '/' + page + '/' + username,
                    method: 'GET'
                };

                request(options, (error, response, body) => {
                    if (error) {
                        console.error(error);

                        res.writeHead(200, {
                            'Content-Type': 'application/json'
                        });
                        res.end(JSON.stringify({
                            'status': 'error',
                            'message': 'Nu s-a putut contacta serviciul de administrare a cartilor!'
                        }));
                    } else {
                        res.writeHead(response.statusCode, {
                            'Content-Type': 'application/json'
                        });
                        res.end(body);
                    }
                });
            });
        });
    } else {
        res.writeHead(200, {
            'Content-Type': 'application/json'
        });
        res.end(JSON.stringify({
            'status': 'error',
            'message': 'Doar metoda GET este accepta pe aceasta ruta!'
        }));
    }
};

