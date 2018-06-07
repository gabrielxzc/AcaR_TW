const databaseConfig = require('./database-config.json');
const oracledb = require('oracledb');
const randomstring = require('randomstring');

let generateUniqueSession = (connection, username, callback) => {
    let token = randomstring.generate(64);

    connection.execute(
        'INSERT INTO sessions VALUES (:token, :username)', {
            username: username,
            token: token
        }, {
            autoCommit: true
        }, (error, result) => {
            if (error) {
                callback('-');
                console.log(error.message);
                return;
            }

            callback(token);
            return;
        });
};

let newSession = exports.model = (username, callback) => {
    oracledb.getConnection(databaseConfig, (error, connection) => {
        if (error) {
            console.log(error);
            callback('-');

            return;
        }

        connection.execute(
            'DELETE FROM sessions WHERE username like :username', {
                username: username
            }, {
                autoCommit: true
            }, (error, result) => {
                if (error) {
                    console.error(error);
                    callback('-');

                    connection.release((error) => {
                        if (error) {
                            console.error(error.message);
                        }
                    });
                    return;
                }

                generateUniqueSession(connection, username, (sessionId) => {
                    callback(sessionId);
                    connection.release((error) => {
                        if (error) {
                            console.error(error.message);
                        }
                    });
                });
            });
    });
};