const http = require('http');
const router = require('routes')();
const url = require('url');
const statistics = require('./controllers/get-statistics');

const host = '127.0.0.1';
const port = 8120;

router.addRoute('/materii/:materie',statistics.controller);

let server = http.createServer((req, res) => {
    let m = router.match(url.parse(req.url).pathname);

    if (m) {
        m.fn(req, res);
    } else {
        res.writeHead(200, {
            'Content-Type': 'application/json'
        });
        res.end(JSON.stringify({
            'status': 'error',
            'message': '[Statistics Manager] Ruta nu a fost gasita!'
        }));
    }
}).listen(port, host, () => {
    console.log("Started statistics manager service at port " + port);
});