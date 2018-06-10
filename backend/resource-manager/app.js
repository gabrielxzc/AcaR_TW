const http = require('http');
const router = require('routes')();
const url = require('url');
const answers = require('./controllers/answers');

const host = '127.0.0.1';
const port = 8088;

router.addRoute('/answers', answers.controller);

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
            'message': '[Resource Manager] Ruta nu a fost gasita!'
        }));
    }
}).listen(port, host, () => {
    console.log("Started resource manager service at port " + port);
});