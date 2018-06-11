const getSubject = require('../model/get-subject');
const url = require('url');

exports.controller = (req, res) => {
    if (req.method === 'GET') {
        let q = url.parse(req.url, true);
        let qdata = q.query;

        if (qdata.materie == null) {
            res.writeHead(200, {
                'Content-Type': 'application/json'
            });
            res.end(JSON.stringify({
                'status': 'error',
                'message': 'Nu a fost specificat numele unei materii!'
            }));

            return;
        }

        getSubject.model(qdata.materie, (subject, error) => {
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
                'message': 'Materia a fost preluata cu succes din baza de date!',
                subject
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