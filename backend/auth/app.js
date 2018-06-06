const http = require('http');
const router = require('routes')();
const login = require('./controllers/login');

const host = '127.0.0.1';
const port = 8082;

router.addRoute('/login', login.controller);

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
            'message': 'Route not found!'
        }));
    }
}).listen(port, host, () => {
    console.log("Started auth service at port " + port);
});