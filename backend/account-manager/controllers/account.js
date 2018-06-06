const request = require('request');
const checkAccount = require('../model/check-account');

exports.controller = (req, res) => {
    if (req.method === 'POST') {
        let account;
        let body = [];

        req.on('data', (chunk) => {
            body.push(chunk);
        }).on('end', () => {
            body = Buffer.concat(body).toString();

            try {
                account = JSON.parse(body);
            } catch (e) {
                res.writeHead(400, {
                    'Content-Type': 'application/json'
                });
                res.end(JSON.stringify({
                    'status': 'error',
                    'message': 'Invalid body, check documentation for details!'
                }));

                return;
            }

            let isAccountValid = checkAccount.checkAccount(account.username, account.password);
            res.writeHead(200, {
                'Content-Type': 'application/json'
            });
            res.end(JSON.stringify({
                'status': 'valid',
                'isAccountValid': isAccountValid
            }));
        });
    } else {
        res.writeHead(404, {
            'Content-Type': 'application/json'
        });
        res.end(JSON.stringify({
            'status': 'error',
            'message': 'Only POST and PUT are supported on this route!'
        }));
    }
};