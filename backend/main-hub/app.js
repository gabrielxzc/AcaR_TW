const http = require('http');
const router = require('routes')();
const login = require('./controllers/login');
const registerMatricol = require('./controllers/register-matricol');
const register = require('./controllers/register');
const questions = require('./controllers/questions');
const subjects = require('./controllers/subjects');
const answers = require('./controllers/answers');

const host = '127.0.0.1';
const port = 8081;

router.addRoute('/login', login.controller);
router.addRoute('/register-matricol', registerMatricol.controller);
router.addRoute('/register', register.controller);
router.addRoute('/questions', questions.controller);
router.addRoute('/subjects', subjects.controller);
router.addRoute('/answers', answers.controller);

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
            'message': '[Main Hub] Ruta nu a fost gasita!'
        }));
    }
}).listen(port, host, () => {
    console.log("Started main-hub at port " + port);
});