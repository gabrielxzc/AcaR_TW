const databaseConfig = require('./database-config.json');
const oracledb = require('oracledb');

let checkNrMatricol = exports.model = (nrMatricol, callback) => {
    let isNrMatricolValid = false;
    let email = null;
    
    oracledb.getConnection(databaseConfig, (error, connection) => {
        if (error) {
            callback(null, null, error);
            return;
        }

        connection.execute(
            'SELECT este_inregistrat, email FROM studenti WHERE nr_matricol like :nrMatricol', {
                nrMatricol: nrMatricol
            }, (error, result) => {
                if (error) {
                    callback(null, null, error);

                    connection.release((error) => {
                        if (error) {
                            console.error(error);
                        }
                    });

                    return;
                }

                if (result.rows.length > 0 && result.rows[0][0] == 0) {
                    email = result.rows[0][1];
                    isNrMatricolValid = true;
                }

                callback(isNrMatricolValid, email, null);

                connection.release((error) => {
                    if (error) {
                        console.error(error);
                    }
                });
            });
    });
};