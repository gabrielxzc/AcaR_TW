const databaseConfig = require('./database-config.json');
const oracledb = require('oracledb');

exports.model = (materie, callback) => {
    materie = materie.replace('%20', ' ');

    oracledb.getConnection(databaseConfig, (error, connection) => {
        if (error) {
            callback(error);
            return;
        }
        connection.execute(
            'select nota,materie,numberOfStudents from statistics where materie=:materie', {
                materie: materie,
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
                let statistici = [];
                for (let i = 0; i < result.rows.length; ++i) {
                    statistici.push({
                        "nota": result.rows[i][0],
                        "materie": result.rows[i][1],
                        "numberOfStudents": result.rows[i][2]
                    })
                }
                callback(statistici, null);

                connection.release((error) => {
                    if (error) {
                        console.error(error);
                    }
                });
            });
    });
};

