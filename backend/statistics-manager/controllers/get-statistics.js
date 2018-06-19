const databaseConfig = require('./database-config.json');
const oracledb = require('oracledb');

exports.model = (materie,nota, callback) => {
    materie = materie.replace('%20', ' ');

    oracledb.getConnection(databaseConfig, (error, connection) => {
        if (error) {
            callback(error);
            return;
        }
            connection.execute(
                'select numberOfStudents from statistics where materie like :materie and nota=:nota', {
                    materie: materie,
                    nota: nota
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
                statistici.push({
                    "nota":result[0][0]
                })
                callback(statistici, null);

                connection.release((error) => {
                    if (error) {
                        console.error(error);
                    }
                });
            });
    });
};

