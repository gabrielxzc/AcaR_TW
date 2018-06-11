const url = require('url');
const questions = require('../utils/check-questions');

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

        questions.check(qdata.username, (body, error) => {
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

            res.writeHead(200, {
                'Content-Type': 'application/json'
            });
            res.end(JSON.stringify(body));

            return;
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