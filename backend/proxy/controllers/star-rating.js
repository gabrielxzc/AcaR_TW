const request = require('request');
const url = require('url');

exports.controller = (req, res) => {
    var tokens = req.url.split('/');
    var materie = tokens[tokens.length - 5];
    var title = tokens[tokens.length - 3];
    let requestBody=[];
    let obj;
    console.log("Am ajuns la proxy");
    req.on('data', (chunk) => {
        requestBody.push(chunk);
    }).on('end', () => {
        requestBody = Buffer.concat(requestBody).toString();
        try {
            obj = JSON.parse(requestBody);
        } catch(e) {
            console.error(e);
        }
    
        let options = {
            url: 'http://localhost:8081/subjects/' + materie + '/books/' + title + '/rating',
            method:req.method,
            headers:req.headers,
            json: obj
        };
        console.log(options.url);
        request(options, (error, response, body) => {
                res.writeHead(response.statusCode, {
                'Content-Type': 'application/json'
            });
            res.end(JSON.stringify(body));
        });
    });
}