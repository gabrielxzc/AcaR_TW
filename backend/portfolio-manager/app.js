const http = require('http');
const router = require('routes')();
const url = require('url');
const addBook = require('./controllers/add-book');
const removeBook=require('./controllers/remove-book');
const extractBooks=require('./controllers/extract-books')

const host = '127.0.0.1';
const port = 8095;
router.addRoute('/addBook',addBook.controller);
router.addRoute('/removeBook',removeBook.controller);
router.addRoute('/extractBooks/:page',extractBooks.controller);


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
            'message': '[Portfolio Manager] Ruta nu a fost gasita!'
        }));
    }
}).listen(port, host, () => {
    console.log("Started portfolio manager service at port " + port);
});
