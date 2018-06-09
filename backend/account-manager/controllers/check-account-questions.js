const checkAccountQuestions = require('../model/check-account-questions');
const url = require('url');

exports.controller = (req, res) => {
    if (req.method === 'GET') {
        let q = url.parse(req.url, true);
        let qdata = q.query;

        if (qdata.username == null) {
            res.writeHead(200, {
                'Content-Type': 'application/json'
            });
            res.end(JSON.stringify({
                'status': 'error',
                'message': 'Nu a fost specificat un nume de utilizator!'
            }));

            return;
        }

        checkAccountQuestions.model(qdata.username, (userCompletedQuestions, error) => {
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
                'message': 'Verificarea intrebarilor pentru utilizator s-a terminat cu succes!',
                'userCompletedQuestions': userCompletedQuestions
            }));
        });
    } else {
        res.writeHead(200, {
            'Content-Type': 'application/json'
        });
        res.end(JSON.stringify({
            'status': 'error',
            'message': 'Doar metoda GET este acceptata pe aceasta ruta!'
        }));
    }
};