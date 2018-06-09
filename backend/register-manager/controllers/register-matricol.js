const request = require('request');
const checkNrMatricol = require('../model/check-nr-matricol');
const createRegisterToken = require('../model/create-register-token');
const nodemailer = require('nodemailer');

let sendRegisterEmail = (email, token, callback) => {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        tls: {
            rejectUnauthorized: false
        },
        auth: {
            user: 'uaic.contact.elearning@gmail.com',
            pass: 'ContactElearning123'
        }
    });

    var mailOptions = {
        from: 'uaic.contact.elearning@gmail.com',
        to: email,
        subject: 'Inregistrare Academic Recommender',
        text: 'Salut Studentule, \n\nIti multumim ca te-ai inregistrat pe platforma noastra!\nCodul tau de inregistrare este: ' + token +
            '\n\nEchipa Academic Recommender\nFacultatea de Informatica, UAIC'
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error.message);
            callback(error);
        } else {
            callback(null);
        }
    });

};

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

                if (matricol.nrMatricol == null) {
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

            checkNrMatricol.model(matricol.nrMatricol, (isNrMatricolValid, email, error) => {
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

                if (!isNrMatricolValid) {
                    res.writeHead(200, {
                        'Content-Type': 'application/json'
                    });
                    res.end(JSON.stringify({
                        'status': 'error',
                        'message': 'Numarul matricol nu exista sau un cont este deja inregistrat cu acest numar matricol!'
                    }));

                    return;
                }

                createRegisterToken.model(matricol.nrMatricol, (token, error) => {
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

                    sendRegisterEmail(email, token, (error) => {
                        if (error) {
                            console.error(error);
                            
                            res.writeHead(200, {
                                'Content-Type': 'application/json'
                            });
                            res.end(JSON.stringify({
                                'status': 'error',
                                'message': 'Numarul matricol este valid, dar a aparut o eroare la trimiterea mailului de confimare! ' +
                                    'Incercati mai tarziu iar daca problema persista contactati un administrator!'
                            }));

                            return;
                        }

                        res.writeHead(200, {
                            'Content-Type': 'application/json'
                        });
                        res.end(JSON.stringify({
                            'status': 'valid',
                            'message': 'Numarul matricol este valid, vei primi in scurt timp un mesaj pe emailul asociat acestui numar matricol ' +
                                'ce contine detalii despre pasii urmatori ai inregistrarii!'
                        }));
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