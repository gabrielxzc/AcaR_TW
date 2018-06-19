const databaseConfig = require('./database-config.json');
const oracledb = require('oracledb');

exports.model = (materie, tip_resursa,titlu_resursa, callback) => {
    oracledb.getConnection(databaseConfig, (error, connection) => {
        if (error) {
            callback(null, error);
            return;
        }
        materie = materie.replace(/%20/g, ' ');
        titlu_resursa=titlu_resursa.replace(/%20/g, ' ');
        console.log(materie);
        console.log(titlu_resursa);

        connection.execute(
            'SELECT titlu,autor,anul_publicarii,link,imagine,materie FROM carti where materie like :materie and titlu like :titlu_resursa' ,{
                titlu_resursa: titlu_resursa,
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
                let infos={
                    "titlu" : result.rows[0][0],
                    "autor" : result.rows[0][1],
                    "anul_publicarii" : result.rows[0][2],
                    "link" : result.rows[0][3],
                    "imagine" : result.rows[0][4],
                    "materie" : result.rows[0][5]
                }
                callback(infos, null);
                connection.release((error) => {
                    if (error) {
                        console.error(error);
                    }
                });
            });
    });
};



