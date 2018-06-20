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
                    uri: 'http://localhost:8095/addBook',
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
                        console.log(JSON.stringify(body));
                        res.end(JSON.stringify(body));
                    }
                });
            });
        }
        
        req.on('data', (chunk) => {
            console.log(body);
            body.push(chunk);
            console.log(body);
        }).on('end', () => {
            body = Buffer.concat(body).toString();
            console.log(body);

            try {
                info = JSON.parse(body);
                if (info.titlu == null || info.autor == null  || info.anul_publicarii == null || info.link == null || info.imagine == null || info.materie == null) {
                    throw 'Lipsesc argumentele necesare!';
                }
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