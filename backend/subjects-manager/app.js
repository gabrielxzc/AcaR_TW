const http = require('http');
const router = require('routes')();
const url = require('url');
const subjects = require('./controllers/subjects');

const host = '127.0.0.1';
const port = 8086;

router.addRoute('/subjects', subjects.controller);

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
            'message': '[Subjects Manager] Ruta nu a fost gasita!'
        }));
    }
}).listen(port, host, () => {
    console.log("Started subjects manager service at port " + port);
});