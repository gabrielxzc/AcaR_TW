const request = require('request');

exports.check = (sessionId, callback) => {
    let options = {
        uri: 'http://localhost:8084/check-session',
        method: 'POST',
        json: {
            sessionId: sessionId
        }
    };

    request(options, (error, response, body) => {
        if (error) {
            callback(null, error)
        } else {
            callback(body, null)
        }
    });
};