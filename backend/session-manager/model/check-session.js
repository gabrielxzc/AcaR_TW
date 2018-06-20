const databaseConfig = require('./database-config.json');
const oracledb = require('oracledb');

exports.model = (sessionId, callback) => {
    let username = null;
    
    oracledb.getConnection(databaseConfig, (error, connection) => {
        if (error) {
            callback(null, error);
            return;
        }

        connection.execute(
            'SELECT username FROM sessions WHERE token like :sessionId', {
                sessionId: sessionId
            }, (error, result) => {
                if (error) {
                    callback(null, error);

                    connection.release((error) => {
                        if (error) {
                            console.error(error);
                        }
                    });
                    console.log(sessionId);
                    return;
                }

                if (result.rows.length > 0) {
                    username = result.rows[0][0];
                }

                callback(username, null);

                connection.release((error) => {
                    if (error) {
                        console.error(error);
                    }
                });
            });
    });
};