const request=require('request');

exports.controller = (req, res) => {
    if(req.method==="POST"){

        let tokens = req.url.split('/');
        let titlu_resursa=tokens[tokens.length-2];
        let tip_resursa=tokens[tokens.length-3];
        let materie=tokens[tokens.length-4];
        let rating;
        let body=[];

        console.log("Am ajuns la main-hub");

        req.on('data', (chunk) => {
            body.push(chunk);
        }).on('end', () => {
            body = Buffer.concat(body).toString();
            try {
                rating = JSON.parse(body);
                if (rating.rating == null) {
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
                uri: 'http://localhost:8089/'+materie+'/carti/'+titlu_resursa+'/rating',
                method: 'POST',
                headers:req.headers,
                json: rating
            };
            console.log(options.uri);
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