const databaseConfig = require('./database-config.json');
const oracledb = require('oracledb');
const crypto = require('crypto');

let checkAccount = exports.checkAccount = (username, password) => {
    let hashedPassword = crypto.createHash('sha256').update(password).digest('hex');
    
    oracledb.getConnection(databaseConfig, (error, connection) => {
        
    });
};

checkAccount('codrin', 'codrin');

