const databaseConfig = require('./database-config.json');
const oracledb = require('oracledb');

exports.model = (username, materie, page, callback) => {
    materie = materie.replace('%20', ' ');

    oracledb.getConnection(databaseConfig, (error, connection) => {
        if (error) {
            callback(null, error);
            return;
        }
        connection.execute(
            'select titlu, autor, anul_publicarii, link, imagine from (select titlu, autor, anul_publicarii, link, imagine, NVL(NVL(rating + rating_boost(titlu), rating) + user_preference(titlu, :username), NVL(rating + rating_boost(titlu), rating)) as pref from carti, user_rating where  username like :username and materie like :materie) where pref >= 4', {
                materie: materie,
                username: username
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