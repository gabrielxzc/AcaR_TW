const databaseConfig = require('./database-config.json');
const oracledb = require('oracledb');
const randomstring = require('randomstring');

let generateUniqueRegisterToken = (connection, nrMatricol, callback) => {
    let token = randomstring.generate(64);

    connection.execute(
        'INSERT INTO register_tokens VALUES (:token, :nrMatricol)', {
            nrMatricol: nrMatricol,
            token: token
        }, {
            autoCommit: true
        }, (error, result) => {
            if (error) {
                callback('-', error);
                console.log(error.message);

                return;
            }

            callback(token, null);
        });
};

let newRegisterToken = exports.model = (nrMatricol, callback) => {
    oracledb.getConnection(databaseConfig, (error, connection) => {
        if (error) {
            console.log(error);
            callback('-', error);

            return;
        }

        connection.execute(
            'DELETE FROM register_tokens WHERE nr_matricol like :nrMatricol', {
                nrMatricol: nrMatricol
            }, {
                autoCommit: true
            }, (error, result) => {
                if (error) {
                    console.error(error);
                    callback('-', error);

                    connection.release((error) => {
                        if (error) {
                            console.error(error.message);
                        }
                    });
                    return;
                }

                generateUniqueRegisterToken(connection, nrMatricol, (registerToken, error) => {
                    if (error) {
                        callback('-', error);
                    } else {
                        callback(registerToken, null);
                    }

                    connection.release((error) => {
                        if (error) {
                            console.error(error.message);
                        }
                    });
                });
            });
    });
};