const databaseConfig = require('./database-config.json');
const oracledb = require('oracledb');

exports.model = (username, materie, page, callback) => {
    oracledb.getConnection(databaseConfig, (error, connection) => {
        if (error) {
            callback(null, error);
            return;
        }
        
        materie = materie.replace('%20', ' ');
        connection.execute(
            'SELECT titlu, autor, anul_publicarii, link, imagine FROM (SELECT rownum as page, titlu, autor, anul_publicarii, link, imagine FROM carti WHERE materie like :materie) WHERE page BETWEEN (:page - 1) * 5 + 1 AND :page * 5', {
                page: page,
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

                let books = [];
                for (let i = 0; i < result.rows.length; ++i) {
                    books.push({
                        "titlu": result.rows[i][0],
                        "autor": result.rows[i][1],
                        "anulPublicarii": result.rows[i][2],
                        "link": result.rows[i][3],
                        "imagine": result.rows[i][4]
                    });
                }

                callback(books, null);

                connection.release((error) => {
                    if (error) {
                        console.error(error);
                    }
                });
            });
    });
};