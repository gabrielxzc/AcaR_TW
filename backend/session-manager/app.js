const http = require('http');
const router = require('routes')();
const newSession = require('./controllers/new-session');

const host = '127.0.0.1';
const port = 8084;

router.addRoute('/new-session', newSession.controller);

let server = http.createServer((req, res) => {
    let m = router.match(req.url);

    if (m) {
        m.fn(req, res);
    } else {
        res.writeHead(404, {
            'Content-Type': 'application/json'
        });
        res.end(JSON.stringify({
            'status': 'error',
            'message': '[Session Manager] Ruta nu a fost gasita!'
        }));
    }
}).listen(port, host, () => {
    console.log("Started session manager service at port " + port);
});