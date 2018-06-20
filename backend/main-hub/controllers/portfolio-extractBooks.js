const request = require('request');
const auth = require('../utils/check-auth');
const questions = require('../utils/check-questions');
const cookieParser = require('../utils/cookie-parser');
const url = require('url');

exports.controller = (req, res) => {
    if (req.method === 'POST') {
        let info = {};
        let cookies = cookieParser.parse(req);
        let body = [];
        let tokens = req.url.split('/');
        let page = tokens[tokens.length - 1];
        
        
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
        
        var callback = function(body, error) {
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
            console.log(body);
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
            else {
                 info.username=body.username;
            }

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
                    uri: 'http://localhost:8095/extractBooks/' + page,
                    method: 'POST' ,
                    json : info
                };

                request(options, (error, response, body) => {
                    if (error) {
                        console.error(error);

                        res.writeHead(200, {
                            'Content-Type': 'application/json'
                        });
                        res.end(JSON.stringify({
                            'status': 'error',
                            'message': 'Nu s-a putut contacta serviciul de adaugare a cartilor!'
                        }));
                    } else {
                        res.writeHead(response.statusCode, {
                            'Content-Type': 'application/json'
                        });
                        res.end(JSON.stringify(body));
                    }
                });
            });
        }
        
        req.on('data', (chunk) => {
            body.push(chunk);
        }).on('end', () => {
            body = Buffer.concat(body).toString();

            try {
                info = JSON.parse(body);
                auth.check(cookies.user, callback);
                
                
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