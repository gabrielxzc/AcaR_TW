const databaseConfig = require('./database-config.json');
const oracledb = require('oracledb');

let checkRegisterToken = exports.model = (registerToken, callback) => {
    let isRegisterTokenValid = false;
    let email = null;
    let nrMatricol = null;
    
    oracledb.getConnection(databaseConfig, (error, connection) => {
        if (error) {
            callback(null, null, null, error);
            return;
        }

        connection.execute(
            'SELECT email, nr_matricol FROM register_tokens NATURAL JOIN studenti WHERE token like :token', {
                token: registerToken
            }, (error, result) => {
                if (error) {
                    callback(null, null, null, error);

                    connection.release((error) => {
                        if (error) {
                            console.error(error);
                        }
                    });

                    return;
                }

                if (result.rows.length > 0) {
                    email = result.rows[0][0];
                    nrMatricol = result.rows[0][1];
                    isRegisterTokenValid = true;
                }

                callback(isRegisterTokenValid, email, nrMatricol, null);

                connection.release((error) => {
                    if (error) {
                        console.error(error);
                    }
                });
            });
    });
};