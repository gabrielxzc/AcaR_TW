const databaseConfig = require('./database-config.json');
const oracledb = require('oracledb');


exports.model = (titlu,autor,anul_publicarii,link,imagine,materie,callback) =>{

    oracledb.getConnection(databaseConfig, (error, connection) => {
        if (error) {
            callback(error);
            return;
        }
        connection.execute(
            'INSERT INTO carti VALUES (:titlu, :autor, :anul_publicarii, :link, :imagine, :materie)', {
                titlu: titlu,
                autor: autor,
                anul_publicarii: anul_publicarii,
                link: link,
                imagine: imagine,
                materie: materie
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
