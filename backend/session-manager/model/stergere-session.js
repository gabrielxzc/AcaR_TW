const databaseConfig = require('./database-config.json');
const oracledb = require('oracledb');

exports.model = (sessionID, callback) => {

    oracledb.getConnection(databaseConfig, (error, connection) => {
        if (error) {
            callback(error);
            return;
        }
        connection.execute(
            'DELETE FROM sessions WHERE token like :sessionID', {
                sessionID: sessionID
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
