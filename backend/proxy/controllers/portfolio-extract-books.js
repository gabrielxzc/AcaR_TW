const request = require('request');
const url = require('url');

exports.controller = (req, res) => {
    console.log("am ajuns pe proxy extract");
    let obj;
    let requestBody = [];
    var tokens = req.url.split('/');
    var page=tokens[tokens.length-1];
    /*req.on('data', (chunk) => {
        requestBody.push(chunk);
    }).on('end', () => {
        requestBody = Buffer.concat(requestBody).toString();

        try {
            obj = JSON.parse(requestBody);
        } catch(e) {
            console.error(e);
        }
    */     
        let options = {
            url: 'http://localhost:8081/portfolio/extractBooks/'+page,
            method: req.method,
            headers: req.headers
        };
        //console.log(options.url);
        request(options, (error, response, body) => {
            res.writeHead(response.statusCode, {
                'Content-Type': 'application/json'
            });
            res.end(JSON.stringify(body));
        });
    //});
};