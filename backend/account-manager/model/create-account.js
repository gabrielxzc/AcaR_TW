const databaseConfig = require('./database-config.json');
const oracledb = require('oracledb');
const crypto = require('crypto');

let newAccount = exports.model = (username, password, email, callback) => {
    let hashedPassword = crypto.createHash('sha256').update(password).digest('hex');

    oracledb.getConnection(databaseConfig, (error, connection) => {
        if (error) {
            callback(error);
            return;
        }

        connection.execute(
            'INSERT INTO users VALUES (NVL((SELECT max(id) + 1 FROM users), 1), :username, :password, :email)', {
                username: username,
                password: hashedPassword,
                email: email
            }, {
                autoCommit: true
            }, (error, result) => {
                if (error) {
                    callback(error);

                    connection.release((error) => {
                        if (error) {
                            console.error(error);
                        }
                    });
                    return;
                }

                callback(null);
            });
    });
};