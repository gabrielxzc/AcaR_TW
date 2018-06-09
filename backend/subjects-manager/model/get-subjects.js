const databaseConfig = require('./database-config.json');
const oracledb = require('oracledb');

exports.model = (callback) => {
    oracledb.getConnection(databaseConfig, (error, connection) => {
        if (error) {
            callback(null, error);
            return;
        }

        connection.execute(
            'SELECT titlu, an, semestru, pagina_cursului, titular, pagina_titular FROM materii ORDER BY id ASC',
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

                let subjects = [];
                for (let i = 0; i < result.rows.length; ++i) {
                    subjects.push({
                        "titlu": result.rows[i][0],
                        "an": result.rows[i][1],
                        "semstru": result.rows[i][2],
                        "paginaCursului": result.rows[i][3],
                        "titular": result.rows[i][4],
                        "paginaTitular": result.rows[i][5]
                    });
                }

                callback(subjects, null);

                connection.release((error) => {
                    if (error) {
                        console.error(error);
                    }
                });
            });
    });
};