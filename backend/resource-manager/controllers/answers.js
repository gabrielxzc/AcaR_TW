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

        res.writeHead(200, {
            'Content-Type': 'application/json'
        });
        res.end(JSON.stringify({
            'status': 'valid',
            'message': 'Under construction!'
        }));



        /*
            Send request to books, articles, software, code, people and gossips.
        */
    });
}