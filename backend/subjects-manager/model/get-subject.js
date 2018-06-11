const databaseConfig = require('./database-config.json');
const oracledb = require('oracledb');

exports.model = (titlu, callback) => {
    oracledb.getConnection(databaseConfig, (error, connection) => {
        if (error) {
            callback(null, error);
            return;
        }

        connection.execute(
            'SELECT titlu, an, semestru, pagina_cursului, titular, pagina_titular FROM materii WHERE titlu like :titlu ORDER BY id ASC', {
                titlu: titlu
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

                let subject;
                if (result.rows.length > 0) {
                    subject = {
                        "titlu": result.rows[0][0],
                        "an": result.rows[0][1],
                        "semestru": result.rows[0][2],
                        "paginaCursului": result.rows[0][3],
                        "titular": result.rows[0][4],
                        "paginaTitular": result.rows[0][5]
                    };
                }

                callback(subject, null);

                connection.release((error) => {
                    if (error) {
                        console.error(error);
                    }
                });
            });
    });
};