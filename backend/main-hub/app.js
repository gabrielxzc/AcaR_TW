const http = require('http');
const router = require('routes')();
const login = require('./controllers/login');
const registerMatricol = require('./controllers/register-matricol');
const register = require('./controllers/register');
const questions = require('./controllers/questions');
const subjects = require('./controllers/subjects');
const answers = require('./controllers/answers');
const auth = require('./controllers/auth');
const checkQuestions = require('./controllers/check-questions');
const url = require('url');
const subject = require('./controllers/subject');
const books = require('./controllers/books');
const booksRecommendations = require('./controllers/books-recommendations');
const adaugareCarte = require('./controllers/add-books');
const logOut = require('./controllers/logout');
const statistici = require('./controllers/statistics');
const bookResourcePage=require('./controllers/book-resource-page');

const host = '127.0.0.1';
const port = 8081;

router.addRoute('/login', login.controller);
router.addRoute('/register-matricol', registerMatricol.controller);
router.addRoute('/register', register.controller);
router.addRoute('/questions', questions.controller);
router.addRoute('/answers', answers.controller);
router.addRoute('/subjects', subjects.controller);
router.addRoute('/subjects/:subject', subject.controller);
router.addRoute('/subjects/:subject/books/:page', books.controller);
router.addRoute('/subjects/:subject/books/:page/recommendations', booksRecommendations.controller);
router.addRoute('/is-auth', auth.controller);
router.addRoute('/answered-questions', checkQuestions.controller);
router.addRoute('/book',adaugareCarte.controller);
router.addRoute('/logout',logOut.controller);
router.addRoute('/materii/mat/:materie',statistici.controller);
router.addRoute('/subjects/:subject/books/:titlu_resursa/info',bookResourcePage.controller);

let server = http.createServer((req, res) => {
    let m = router.match(url.parse(req.url).pathname);
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8079');

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