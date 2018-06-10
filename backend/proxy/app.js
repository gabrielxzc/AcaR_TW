const http = require('http');
const router = require('routes')();
const url = require('url');
const fs = require('fs');
const root = require('./controllers/root');
const register = require('./controllers/register');

const host = '127.0.0.1';
const port = 8079;

router.addRoute('/', root.controller);
reouter.addRote('/register', register.controller);

let server = http.createServer((req, res) => {
    let m = router.match(url.parse(req.url).pathname);

    if (m) {
        m.fn(req, res);
    } else {
        let filepath = './proxy' + url.parse(req.url).pathname;
        
        fs.readFile(filepath, (error, data) => {
            if (error) {
                res.writeHead(404);
                res.end();
            } else {
                let contentType;
                let tokens = filepath.split('.');

                switch (tokens[tokens.length - 1]) {
                    case 'js':
                        contentType = 'application/javascript';
                        break;
                    case 'css':
                        contentType = 'text/css';
                        break;
                    case 'svg':
                        contentType = 'image/svg+xml';
                        break;
                    case 'png':
                        contentType = 'image/png';
                        break;
                    default:
                        contentType = 'text/html';
                        break;
                }

                res.writeHead(200, {
                    'Content-Type': contentType
                });
                res.end(data);
            }
        });
    }
}).listen(port, host, () => {
    console.log("Started proxy service at port " + port);
});