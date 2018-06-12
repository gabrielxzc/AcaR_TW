const oracledb = require('oracledb');
const databaseConfig = require('../model/database-config.json');

exports.model = (username, materie, callback) => {
    oracledb.getConnection(databaseConfig, (error, connection) => {
        if (error) {
            callback(null, error);
            return;
        }

        connection.execute(
            'select titlu, NVL(NVL(rating + rating_boost(titlu), rating) + user_preference(titlu, :username), NVL(rating + rating_boost(titlu), rating)) from carti, user_rating where username like :username and materie like :materie', {
                username: username,
                materie: materie
            },
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

                for (let i = 0; i < result.rows.length; ++i) {
                    
                }

                connection.release((error) => {
                    if (error) {
                        console.error(error);
                    }
                });
            });
    });
};