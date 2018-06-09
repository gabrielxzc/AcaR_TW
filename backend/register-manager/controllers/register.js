const request = require('request');
const checkRegisterToken = require('../model/check-register-token');
const deleteRegisterToken = require('../model/delete-register-token');
const updateIsRegisteredStatus = require('../model/update-is-registered-status');

let validateUsernameAndPassword = (username, password, callback) => {
    if (!/^([a-zA-Z0-9]{5,30})$/.test(username)) {
        callback(false, 'Numele de utilizator trebuie sa fie de lungime cel putin 5, maxim 30 si sa contina doar caractere alfanumerice!');
        return;
    }

    if (!/^([a-zA-Z0-9]{9,})$/.test(password)) {
        callback(false, 'Parola trebuie sa contina doar caractere alfanumerice si trebuie sa aiba o lungime de cel putin 9!');
        return;
    }

    callback(true, null)
};

exports.controller = (req, res) => {
    if (req.method === 'POST') {
        let register;
        let body = [];

        req.on('data', (chunk) => {
            body.push(chunk);
        }).on('end', () => {
            body = Buffer.concat(body).toString();

            try {
                register = JSON.parse(body);

                if (register.registerToken == null || register.username == null || register.password == null) {
                    throw 'Lipsesc argumentele necesare!';
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

            checkRegisterToken.model(register.registerToken, (isRegisterTokenValid, email, nrMatricol, error) => {
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

                if (!isRegisterTokenValid) {
                    res.writeHead(200, {
                        'Content-Type': 'application/json'
                    });
                    res.end(JSON.stringify({
                        'status': 'error',
                        'message': 'Codul de inregistrare este invalid!'
                    }));

                    return;
                }

                validateUsernameAndPassword(register.username, register.password, (isDataValid, message) => {
                    if (!isDataValid) {
                        res.writeHead(200, {
                            'Content-Type': 'application/json'
                        });
                        res.end(JSON.stringify({
                            'status': 'error',
                            'message': message
                        }));

                        return;
                    }

                    deleteRegisterToken.model(register.registerToken, (error) => {
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

                        let options = {
                            uri: 'http://localhost:8083/create-account',
                            method: 'POST',
                            json: {
                                'username': register.username,
                                'password': register.password,
                                'email': email
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
                                    'message': 'Nu s-a putut contacta serviciul de administrare a conturilor!'
                                }));

                                return;
                            }

                            if (body.status === 'error') {
                                res.writeHead(response.statusCode, {
                                    'Content-Type': 'application/json'
                                });
                                res.end(JSON.stringify(body));

                                return;
                            }

                            updateIsRegisteredStatus.model(nrMatricol, (error) => {
                                if (error) {
                                    console.error(error);
                                }

                                res.writeHead(response.statusCode, {
                                    'Content-Type': 'application/json'
                                });
                                res.end(JSON.stringify(body));
                            });
                        });
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