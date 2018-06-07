const request = require('request');

exports.controller = (req, res) => {
    if (req.method === 'POST') {
        let matricol;
        let body = [];

        req.on('data', (chunk) => {
            body.push(chunk);
        }).on('end', () => {
            body = Buffer.concat(body).toString();

            try {
                matricol = JSON.parse(body);

                if (matricol.nrMatricol == null) {
                    throw 'Necessary parameters not found';
                }
            } catch (e) {
                res.writeHead(400, {
                    'Content-Type': 'application/json'
                });
                res.end(JSON.stringify({
                    'status': 'error',
                    'message': 'Body-ul cererii este invalid, verifica documentatia pentru detalii!'
                }));

                return;
            }

            let options = {
                uri: 'http://localhost:8082/register-matricol',
                method: 'POST',
                json: matricol
            };

            request(options, (error, response, body) => {
                if (error) {
                    res.writeHead(500, {
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
        res.writeHead(404, {
            'Content-Type': 'application/json'
        });
        res.end(JSON.stringify({
            'status': 'error',
            'message': 'Doar metoda POST este accepta pe aceasta ruta!'
        }));
    }
};