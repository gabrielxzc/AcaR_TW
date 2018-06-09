const request = require('request');

exports.check = (username, callback) => {
    let options = {
        uri: 'http://localhost:8083/check-account-questions?username=' + username,
        method: 'GET',
    };

    request(options, (error, response, body) => {
        if (error) {
            callback(null, error)
        } else {
            callback(JSON.parse(body), null)
        }
    });
};