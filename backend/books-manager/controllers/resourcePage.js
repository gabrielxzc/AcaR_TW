const url = require('url');
const resources = require('../model/resourcePage');

exports.controller = (req, res) => {
    console.log("PULA1");
    if (req.method === 'GET') {
        let tokens=req.url.split('/');
        let titlu_resursa=tokens[tokens.length-2];
        let tip_resursa=tokens[tokens.length-3];
        let materie=tokens[tokens.length-4];
        resources.model(materie,tip_resursa,titlu_resursa, (resourcePageInfo, error) => {
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
                'resources': resourcePageInfo
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

