const databaseConfig = require('./database-config.json');
const oracledb = require('oracledb');

let deleteRegisterToken = exports.model = (registerToken, callback) => {
    oracledb.getConnection(databaseConfig, (error, connection) => {
        if (error) {
            callback(error);
            return;
        }

        connection.execute(
            'DELETE FROM register_tokens WHERE token like :registerToken', {
                registerToken: registerToken
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
                
                connection.release((error) => {
                    if (error) {
                        console.error(error);
                    }
                });
            });
    });
};