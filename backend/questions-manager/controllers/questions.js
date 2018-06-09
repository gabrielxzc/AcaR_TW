const getQuestions = require('../model/get-questions');

exports.controller = (req, res) => {
    if (req.method === 'GET') {
        getQuestions.model((questions, error) => {
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
                'message': 'Intrebarile au fost preluate cu succes din baza de date!',
                questions
            }));
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