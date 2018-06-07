const http = require('http');
const router = require('routes')();
const account = require('./controllers/account');
const createAccount = require('./controllers/create-account');

const host = '127.0.0.1';
const port = 8083;

router.addRoute('/account', account.controller);
router.addRoute('/create-account', createAccount.controller);

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
            'message': '[Account Manager] Ruta nu a fost gasita!'
        }));
    }
}).listen(port, host, () => {
    console.log("Started account manager service at port " + port);
});