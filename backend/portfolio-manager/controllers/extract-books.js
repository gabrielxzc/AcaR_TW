const extractbooks = require('../model/extract-books');
const cookieParser = require('../utils/cookie-parser');
exports.controller = (req, res) =>{
    if (req.method === 'POST') {
        let info;
        let body = [];
        let tokens=req.url.split('/');
        let cookies = cookieParser.parse(req);
        let page=tokens[tokens.length-1];
        
        req.on('data', (chunk) => {
            body.push(chunk);
        }).on('end', () => {
            body = Buffer.concat(body).toString();

            try {
                info = JSON.parse(body);

                if (info.username==null) {
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

            extractbooks.model(info.username,page,(resources,error) =>{
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
                    'message': 'S-au extras cu succes cartile!' ,
                    'resources': resources
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
