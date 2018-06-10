const databaseConfig = require('./database-config.json');
const oracledb = require('oracledb');

exports.model = (username, callback) => {
    oracledb.getConnection(databaseConfig, (error, connection) => {
        if (error) {
            callback(error);
            return;
        }

        connection.execute(
            'UPDATE users SET completat_formular = 1 WHERE username like :username', {
                username: username
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