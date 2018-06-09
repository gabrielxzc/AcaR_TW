const databaseConfig = require('./database-config.json');
const oracledb = require('oracledb');

exports.model = (callback) => {
    oracledb.getConnection(databaseConfig, (error, connection) => {
        if (error) {
            callback(null, error);
            return;
        }

        connection.execute(
            'SELECT resource_type FROM questions ORDER BY id ASC',
            (error, result) => {
                if (error) {
                    callback(null, error);

                    connection.release((error) => {
                        if (error) {
                            console.error(error);
                        }
                    });

                    return;
                }

                let info = [];
                for (let i = 0; i < result.rows.length; ++i) {
                    info.push(result.rows[i][0]);
                }

                callback(info, null);

                connection.release((error) => {
                    if (error) {
                        console.error(error);
                    }
                });
            });
    });
};