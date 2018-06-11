const http = require('http');
const router = require('routes')();
const url = require('url');
const initUserRating = require('./controllers/init-user-rating');
const resources = require('./controllers/resources');

const host = '127.0.0.1';
const port = 8089;

router.addRoute('/init-user-rating', initUserRating.controller);
router.addRoute('/:materie/:page', resources.controller);

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
            'message': '[Books Manager] Ruta nu a fost gasita!'
        }));
    }
}).listen(port, host, () => {
    console.log("Started books manager service at port " + port);
});