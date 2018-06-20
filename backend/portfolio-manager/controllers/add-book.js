const adaugarecarte = require('../model/add-book');
const cookieParser = require('../utils/cookie-parser');
exports.controller = (req, res) =>{
    if (req.method === 'POST') {
        let info;
        let body = [];
        let cookies = cookieParser.parse(req);
        
        req.on('data', (chunk) => {
            body.push(chunk);
        }).on('end', () => {
            body = Buffer.concat(body).toString();

            try {
                info = JSON.parse(body);

                if (info.username==null || info.titlu == null || info.autor == null  || info.anul_publicarii == null || info.link == null || info.imagine == null || info.materie == null) {
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

            adaugarecarte.model(info.username,info.titlu,info.autor,info.anul_publicarii,info.link,info.imagine,info.materie,(error) =>{
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
                    'message': 'S-a adaugat cu succes cartea'
                }));
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
