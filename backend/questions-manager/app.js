const http = require('http');
const router = require('routes')();
const questions = require('./controllers/questions');
const questionsInfo = require('./controllers/questions-info');

const host = '127.0.0.1';
const port = 8087;

router.addRoute('/questions', questions.controller);
router.addRoute('/questions-info', questionsInfo.controller);

let server = http.createServer((req, res) => {
    let m = router.match(req.url);

    if (m) {
        m.fn(req, res);
    } else {
        res.writeHead(200, {
            'Content-Type': 'application/json'
        });
        res.end(JSON.stringify({
            'status': 'error',
            'message': '[Questions Manager] Ruta nu a fost gasita!'
        }));
    }
}).listen(port, host, () => {
    console.log("Started questions manager service at port " + port);
});