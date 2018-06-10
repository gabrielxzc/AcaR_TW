const url = require('url');
const fs = require('fs');

exports.controller = (req, res) => {
    let filepath = './proxy/views/index/index.html';

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