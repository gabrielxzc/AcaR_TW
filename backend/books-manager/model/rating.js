const databaseConfig = require('./database-config.json');
const oracledb = require('oracledb');

exports.model=(rating, username, titlu_resursa, callback)=>{
    oracledb.getConnection(databaseConfig, (error, connection) => {
        if (error) {
            callback(error);
            return;
        }
        titlu_resursa=titlu_resursa.replace(/%20/g, ' ');
        connection.execute(
            'INSERT INTO user_history VALUES (:rating, :username, :titlu_resursa)', {
                titlu_resursa: titlu_resursa,
                rating: rating,
                username: username
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