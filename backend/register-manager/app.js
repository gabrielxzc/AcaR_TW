const http = require('http');
const router = require('routes')();
const registerMatricol = require('./controllers/register-matricol');

const host = '127.0.0.1';
const port = 8085;

router.addRoute('/register-matricol', registerMatricol.controller);

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
            'message': '[Register Manager] Ruta nu a fost gasita!'
        }));
    }
}).listen(port, host, () => {
    console.log("Started register manager service at port " + port);
});