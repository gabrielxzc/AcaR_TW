const databaseConfig = require('./database-config.json');
const oracledb = require('oracledb');

exports.model = (username, callback) => {
    let userCompletedQuestions = false;

    oracledb.getConnection(databaseConfig, (error, connection) => {
        if (error) {
            callback(null, error);
            return;
        }

        connection.execute(
            'SELECT completat_formular FROM users WHERE username like :username', {
                username: username
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

                if (result.rows.length > 0) {
                    userCompletedQuestions = result.rows[0][0];
                }

                callback(userCompletedQuestions, null);

                connection.release((error) => {
                    if (error) {
                        console.error(error);
                    }
                });
            });
    });
};