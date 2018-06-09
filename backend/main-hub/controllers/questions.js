const request = require('request');

exports.controller = (req, res) => {
    if (req.method === 'GET') {
        let options = {
            uri: 'http://localhost:8087/questions',
            method: 'GET'
        };

        request(options, (error, response, body) => {
            if (error) {
                console.error(error);

                res.writeHead(200, {
                    'Content-Type': 'application/json'
                });
                res.end(JSON.stringify({
                    'status': 'error',
                    'message': 'Nu s-a putut contacta serviciul de administrare a intrebarilor!'
                }));
            } else {
                res.writeHead(response.statusCode, {
                    'Content-Type': 'application/json'
                });
                res.end(body);
            }
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