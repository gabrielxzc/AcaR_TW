const request = require('request');

exports.controller = (req, res) => {
    if (req.method === 'POST') {
        let informatii;
        let body = [];

        req.on('data', (chunk) => {
            body.push(chunk);
        }).on('end', () => {
            body = Buffer.concat(body).toString();

            try {
                informatii = JSON.parse(body);

                if (informatii.titlu == null || informatii.autor == null || informatii.anul_publicarii || informatii.link || informatii.imagine || informatii.materie) {
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

            let options = {
                uri: 'http://localhost:8089/book',
                method: 'POST',
                json: informatii
            };

            request(options, (error, response, body) => {
                if (error) {
                    console.error(error);
                    
                    res.writeHead(200, {
                        'Content-Type': 'application/json'
                    });
                    res.end(JSON.stringify({
                        'status': 'error',
                        'message': 'Nu s-a putut contacta serviciul de autentificare!'
                    }));
                } else {
                    res.writeHead(response.statusCode, {
                        'Content-Type': 'application/json'
                    });
                    res.end(JSON.stringify(body));
                }
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