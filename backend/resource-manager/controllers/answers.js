const request = require('request');

exports.controller = (req, res) => {
    let answers;
    let requestBody = [];

    req.on('data', (chunk) => {
        requestBody.push(chunk);
    }).on('end', () => {
        requestBody = Buffer.concat(requestBody).toString();

        try {
            answers = JSON.parse(requestBody);

            if (answers.username == null || answers.array == null || answers.array.length != 6) {
                throw 'Lipsesc argumentele necesare!';
            }

            for (let i = 0; i < answers.array.length; ++i) {
                if (answers.array[i] < 1 || answers.array[i] > 5) {
                    throw 'Argumentele depasesc valorile acceptate!';
                }
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
            uri: 'http://localhost:8089/init-user-rating',
            method: 'POST',
            json: {
                'username': answers.username,
                'rating': answers.array[0]
            }
        };

        request(options, (error, response, body) => {
            if (error) {
                console.log(error);

                res.writeHead(200, {
                    'Content-Type': 'application/json'
                });
                res.end(JSON.stringify({
                    'status': 'error',
                    'message': 'Nu s-a putut contacta serviciul de administrare a cartilor!'
                }));

                return;
            }

            if (body.status == 'error') {
                res.writeHead(response.statusCode, {
                    'Content-Type': 'application/json'
                });
                res.end(JSON.stringify(body));
            }

            let options = {
                uri: 'http://localhost:8090/init-user-rating',
                method: 'POST',
                json: {
                    'username': answers.username,
                    'rating': answers.array[1]
                }
            };

            request(options, (error, response, body) => {
                if (error) {
                    console.log(error);

                    res.writeHead(200, {
                        'Content-Type': 'application/json'
                    });
                    res.end(JSON.stringify({
                        'status': 'error',
                        'message': 'Nu s-a putut contacta serviciul de administrare a articolelor online!'
                    }));

                    return;
                }

                if (body.status == 'error') {
                    res.writeHead(response.statusCode, {
                        'Content-Type': 'application/json'
                    });
                    res.end(JSON.stringify(body));

                    return;
                }

                let options = {
                    uri: 'http://localhost:8091/init-user-rating',
                    method: 'POST',
                    json: {
                        'username': answers.username,
                        'rating': answers.array[2]
                    }
                };

                request(options, (error, response, body) => {
                    if (error) {
                        console.log(error);

                        res.writeHead(200, {
                            'Content-Type': 'application/json'
                        });
                        res.end(JSON.stringify({
                            'status': 'error',
                            'message': 'Nu s-a putut contacta serviciul de administrare a instrumentelor software!'
                        }));

                        return;
                    }

                    if (body.status == 'error') {
                        res.writeHead(response.statusCode, {
                            'Content-Type': 'application/json'
                        });
                        res.end(JSON.stringify(body));

                        return;
                    }

                    res.writeHead(response.statusCode, {
                        'Content-Type': 'application/json'
                    });
                    res.end(JSON.stringify({
                        'status': 'valid',
                        'message': 'S-au actualizat raspunsurile cu succes!'
                    }));      
                });
            });
        });
    });
}