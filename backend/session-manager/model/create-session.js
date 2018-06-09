const databaseConfig = require('./database-config.json');
const oracledb = require('oracledb');
const randomstring = require('randomstring');

let generateUniqueSession = (connection, username, callback) => {
    let token = randomstring.generate(64);

    connection.execute(
        'INSERT INTO sessions VALUES (:token, :username, sysdate)', {
            username: username,
            token: token
        }, {
            autoCommit: true
        }, (error, result) => {
            if (error) {
                callback(null, error);
                return;
            }

            callback(token, null);
            return;
        });
};

let newSession = exports.model = (username, callback) => {
    oracledb.getConnection(databaseConfig, (error, connection) => {
        if (error) {
            callback(null, error);
            return;
        }

        connection.execute(
            'DELETE FROM sessions WHERE username like :username', {
                username: username
            }, {
                autoCommit: true
            }, (error, result) => {
                if (error) {
                    callback(null, error);

                    connection.release((error) => {
                        if (error) {
                            console.error(error);
                        }
                    });

                    return;
                }

                generateUniqueSession(connection, username, (sessionId, error) => {
                    if (error) {
                        callback(null, error);
                    } else {
                        callback(sessionId, null);
                    }

                    connection.release((error) => {
                        if (error) {
                            console.error(error);
                        }
                    });
                });
            });
    });
};