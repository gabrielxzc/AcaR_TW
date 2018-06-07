const databaseConfig = require('./database-config.json');
const oracledb = require('oracledb');

let checkNrMatricol = exports.model = (nrMatricol, callback) => {
    let isNrMatricolValid = false;
    let email = '-';
    
    oracledb.getConnection(databaseConfig, (error, connection) => {
        if (error) {
            console.log(error);
            callback(isNrMatricolValid, email);

            return;
        }

        connection.execute(
            'SELECT este_inregistrat, email FROM studenti WHERE nr_matricol like :nrMatricol', {
                nrMatricol: nrMatricol
            }, (error, result) => {
                if (error) {
                    console.error(error);
                    callback(isNrMatricolValid, email);

                    connection.release((error) => {
                        if (error) {
                            console.error(error.message);
                        }
                    });

                    return;
                }

                if (result.rows.length > 0 && result.rows[0][0] == 0) {
                    email = result.rows[0][1];
                    isNrMatricolValid = true;
                }

                callback(isNrMatricolValid, email);

                connection.release((error) => {
                    if (error) {
                        console.error(error.message);
                    }
                });
            });
    });
};