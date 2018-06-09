const databaseConfig = require('./database-config.json');
const oracledb = require('oracledb');
const crypto = require('crypto');

let checkAccount = exports.model = (username, password, callback) => {
    let isAccountValid = false;
    let hashedPassword = crypto.createHash('sha256').update(password).digest('hex');

    oracledb.getConnection(databaseConfig, (error, connection) => {
        if (error) {
            callback(null, error);
            return;
        }

        connection.execute(
            'SELECT count(*) FROM users WHERE username like :username AND password like :password', {
                username: username,
                password: hashedPassword
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

                if (result.rows[0][0] === 1) {
                    isAccountValid = true;
                }

                callback(isAccountValid, null);

                connection.release((error) => {
                    if (error) {
                        console.error(error);
                    }
                });
            });
    });
};