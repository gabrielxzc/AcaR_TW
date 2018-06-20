const url = require('url');
const statistics = require('../model/statistics');

exports.controller = (req, res) => {
    if (req.method === 'GET') {
        let tokens = req.url.split('/');

        let materie = tokens[tokens.length - 1];

        statistics.model( materie, (statistici, error) => {
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
                'message': 'S-au extras datele din baza de date cu succes!',
                'resources': statistici
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