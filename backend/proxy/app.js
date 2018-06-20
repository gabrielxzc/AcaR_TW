const http = require('http');
const router = require('routes')();
const url = require('url');
const fs = require('fs');
const root = require('./controllers/root');
const register = require('./controllers/register');
const questions = require('./controllers/questions');
const answers = require('./controllers/answers');
const materie = require('./controllers/materie');
const materiInfo = require('./controllers/materie-info');
const books = require('./controllers/books');
const recommendationsPage = require('./controllers/recommendations-page');
const recommendations = require('./controllers/recommendations');
const adaugarebook = require('./controllers/book');
const deconectare = require('./controllers/logout');
const statistici = require('./controllers/statistici');
const bookResourcePage=require('./controllers/book-resource-page');
const bookResourcePageInfo=require('./controllers/book-resource-page-info');
const portfolioPage=require('./controllers/portfolio-page');
const portfolioAddBook=require('./controllers/portfolio-add-book');
const portfolioRemoveBook=require('./controllers/portfolio-remove-book');
const portfolioExtractBooks=require('./controllers/portfolio-extract-books');
const starRating=require('./controllers/star-rating');

const host = '127.0.0.1';
const port = 8079;

router.addRoute('/', root.controller);
router.addRoute('/register', register.controller);
router.addRoute('/questions', questions.controller);
router.addRoute('/answers', answers.controller);
router.addRoute('/materii/:materie', materie.controller);
router.addRoute('/materii/:materie/info', materiInfo.controller);
router.addRoute('/materii/:materie/books/:page', books.controller);
router.addRoute('/materii/:materie/recommendations', recommendationsPage.controller);
router.addRoute('/materii/:materie/books/:page/recommendations', recommendations.controller);
router.addRoute('/book', adaugarebook.controller);
router.addRoute('/logout', deconectare.controller);
router.addRoute('/materii/:materie/statistici',statistici.controller);
router.addRoute('/materii/:subject/books/:titlu_resursa/resource',bookResourcePage.controller);
router.addRoute('/materii/:subject/books/:titlu_resursa/resource/info',bookResourcePageInfo.controller);
router.addRoute('/portfolio/addBook',portfolioAddBook.controller);
router.addRoute('/portfolio/removeBook',portfolioRemoveBook.controller);
router.addRoute('/portfolio/extractBook/:page',portfolioExtractBooks.controller);
router.addRoute('/portfolio',portfolioPage.controller);
router.addRoute('/materii/:subject/books/:titlu_resursa/resource/rating',starRating.controller);

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