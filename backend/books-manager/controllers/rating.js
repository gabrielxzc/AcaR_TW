const url = require('url');
const rating = require('../model/rating');
const cookieParser = require('../utils/cookie-parser');
const auth = require('../utils/check-auth');

exports.controller = (req, res) => {
    if (req.method === 'POST') {
        var tokens = req.url.split('/');
        titlu_resursa = tokens[tokens.length - 2];

        let info;
        let body = [];

        console.log("Books manager");
        req.on('data', (chunk) => {
            body.push(chunk);
        }).on('end', () => {
            body = Buffer.concat(body).toString();
            try {
                info = JSON.parse(body);
                if (info.rating == null)
                    throw 'Lipsesc argumentele necesare!';
            } catch (e) {
                res.writeHead(200, {
                    'Content-type': 'application/json'
                });

                res.end(JSON.stringify({
                    'status': 'error',
                    'message': 'Body-ul cererii este invalid, verifica documentatia pentru mai multe detalii!'
                }));

                return;
            }
            var cookies = cookieParser.parse(req);
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
            auth.check(cookies.user, function (body, error) {
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
                        'message': 'A expirat tokenul!'
                    }));

                    return;
                }
                console.log(body.username+titlu_resursa);
                rating.model(info.rating, body.username, titlu_resursa, (error) => {
                    if (error) {
                        console.error(error);

                        res.writeHead(200, {
                            'Content-Type': 'application/json'
                        });
                        res.end(JSON.stringify({
                            'status': 'error',
                            'message': 'A aparut o eroare interna, va rugam reincercati mai tarziu iar daca eroarea persista contactati un administrator!'
                        }));

                        return;
                    }

                    res.writeHead(200, {
                        'Content-Type': 'application/json'
                    });
                    res.end(JSON.stringify({
                        'status': 'valid',
                        'message': 'Rating-ul pentru aceasta carte a fost inserat in baza de date'
                    }));

                });
            });
        });
    } else {
        res.writeHead(200, {
            'Content-Type': 'application/json'
        });
        res.end(JSON.stringify({
            'message': 'error',
            'status': 'Doar metoda POST este acceptata pe aceasta ruta!'
        }));
    }
};