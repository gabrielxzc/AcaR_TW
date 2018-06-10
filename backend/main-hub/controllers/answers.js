const request = require('request');
const auth = require('../utils/check-auth');
const questions = require('../utils/check-questions');
const cookieParser = require('../utils/cookie-parser');

exports.controller = (req, res) => {
    let username; 

    if (req.method === 'POST') {
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

            username = body.username;

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

                if (body.userCompletedQuestions) {
                    res.writeHead(200, {
                        'Content-Type': 'application/json'
                    });
                    res.end(JSON.stringify({
                        'status': 'error',
                        'message': 'Ati completat deja acest formular cu intrebari!'
                    }));

                    return;
                }

                let answers;
                let requestBody = [];

                req.on('data', (chunk) => {
                    requestBody.push(chunk);
                }).on('end', () => {
                    requestBody = Buffer.concat(requestBody).toString();

                    try {
                        answers = JSON.parse(requestBody);

                        if (answers.array == null || answers.array.length != 6) {
                            throw 'Lipsesc argumentele necesare!';
                        }

                        for (let i = 0; i < answers.array.length; ++i) {
                            if (answers.array[i] < 1 || answers.array[i] > 5) {
                                throw 'Argumentele depasesc valorile acceptate!';
                            }
                        }
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
                        uri: 'http://localhost:8088/answers',
                        method: 'POST',
                        json: {
                            'array': answers.array,
                            'username': username
                        }
                    };

                    request(options, (error, response, body) => {
                        if (error) {
                            console.error(error);

                            res.writeHead(200, {
                                'Content-Type': 'application/json'
                            });
                            res.end(JSON.stringify({
                                'status': 'error',
                                'message': 'Nu s-a putut contacta serviciul de administrare a resurselor!'
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