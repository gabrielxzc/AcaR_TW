const databaseConfig = require('./database-config.json');
const oracledb = require('oracledb');


exports.model = (username,titlu,callback) =>{
    console.log(username);
    console.log(titlu);
    oracledb.getConnection(databaseConfig, (error, connection) => {
        if (error) {
            callback(error);
            return;
        }
        connection.execute(
            'DELETE FROM carti where username like :username and titlu like :titlu ', {
                username:username,
                titlu: titlu,
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
