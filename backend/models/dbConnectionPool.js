'use strict'
var mysql = require('promise-mysql');

var dbConfig = {
    connectionLimit: 500,
    host      : "handshake-lab1.cnqe9jbjlpxc.us-east-2.rds.amazonaws.com",
    user      : "admin",
    password  : "********",
    database  : "**handshake**",
    debug     : false,
    multipleStatements: true
}

module.exports = async () => {
    try {
        let pool;
        let con;
        if (pool) con = pool.getConnection();
        else {
            pool = await mysql.createPool(dbConfig);
            con = pool.getConnection();
        }
        return con;
    } catch (ex) {
        throw ex;
    }
}
