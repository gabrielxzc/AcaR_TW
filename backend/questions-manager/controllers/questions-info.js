const getQuestionsInfo = require('../model/get-questions-info');

exports.controller = (req, res) => {
    if (req.method === 'GET') {
        getQuestionsInfo.model((info, error) => {
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
                'message': 'Meta datele intrebarilor au fost extrase cu succes din baza de date!',
                info
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