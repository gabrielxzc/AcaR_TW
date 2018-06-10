const http = require('http');
const router = require('routes')();
const url = require('url');
const account = require('./controllers/account');
const createAccount = require('./controllers/create-account');
const checkAccountQuestions = require('./controllers/check-account-questions');
const updateAccountQuestions = require('./controllers/update-account-questions');

const host = '127.0.0.1';
const port = 8083;

router.addRoute('/account', account.controller);
router.addRoute('/create-account', createAccount.controller);
router.addRoute('/check-account-questions', checkAccountQuestions.controller);
router.addRoute('/update-account-questions', updateAccountQuestions.controller);

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
            'message': '[Account Manager] Ruta nu a fost gasita!'
        }));
    }
}).listen(port, host, () => {
    console.log("Started account manager service at port " + port);
});