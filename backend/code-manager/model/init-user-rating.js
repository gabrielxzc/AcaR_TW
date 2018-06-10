const databaseConfig = require('./database-config.json');
const oracledb = require('oracledb');

let newAccount = exports.model = (username, rating, callback) => {
    oracledb.getConnection(databaseConfig, (error, connection) => {
        if (error) {
            callback(error);
            return;
        }

        connection.execute(
            'INSERT INTO user_rating VALUES (:username, :rating)', {
                username: username,
                rating: rating
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
            });
    });
};