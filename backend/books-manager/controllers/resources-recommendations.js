const url = require('url');
const resourcesRecommendations = require('../model/resources-recommendations');

exports.controller = (req, res) => {
    if (req.method === 'GET') {
        let tokens = req.url.split('/');

        let page = tokens[tokens.length - 2];
        let materie = tokens[tokens.length - 3];
        let username = tokens[tokens.length - 1];

        resourcesRecommendations.model(username, materie, page, (resourcePage, error) => {
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
                'resources': resourcePage
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