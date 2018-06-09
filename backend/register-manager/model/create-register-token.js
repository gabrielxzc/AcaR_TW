const databaseConfig = require('./database-config.json');
const oracledb = require('oracledb');
const randomstring = require('randomstring');

let generateUniqueRegisterToken = (connection, nrMatricol, callback) => {
    let token = randomstring.generate(64);

    connection.execute(
        'INSERT INTO register_tokens VALUES (:token, :nrMatricol, sysdate)', {
            nrMatricol: nrMatricol,
            token: token
        }, {
            autoCommit: true
        }, (error, result) => {
            if (error) {
                callback(null, error);
                return;
            }

            callback(token, null);
        });
};

let newRegisterToken = exports.model = (nrMatricol, callback) => {
    oracledb.getConnection(databaseConfig, (error, connection) => {
        if (error) {
            callback(null, error);
            return;
        }

        connection.execute(
            'DELETE FROM register_tokens WHERE nr_matricol like :nrMatricol', {
                nrMatricol: nrMatricol
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

                generateUniqueRegisterToken(connection, nrMatricol, (registerToken, error) => {
                    if (error) {
                        callback(null, error);
                    } else {
                        callback(registerToken, null);
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