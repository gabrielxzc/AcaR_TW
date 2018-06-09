const databaseConfig = require('./database-config.json');
const oracledb = require('oracledb');

let deleteRegisterToken = exports.model = (nrMatricol, callback) => {
    oracledb.getConnection(databaseConfig, (error, connection) => {
        if (error) {
            callback(error);
            return;
        }

        connection.execute(
            'UPDATE studenti SET este_inregistrat = 1 WHERE nr_matricol = :nrMatricol', {
                nrMatricol: nrMatricol
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