'use strict'
const dbConnection = require('./dbConnectionPool');

var companyProfile = async(searchType,value) => {
    let conn;
    let message = "";
    let status = false;
    let table = 'company_register';

    try{
        conn = await dbConnection();
        if (conn){
            //console.log(`Search on : ${searchType} value: ${value}`);
            //console.log(typeof(value));
            await conn.query("START TRANSACTION");
            var companyProf = await conn.query(`Select * from ${table} where ${searchType}=${value}`);
            //await conn.query('Select first_name, last_name from ?? where ? LIKE ?',[table, searchType, value]);
            await conn.query("COMMIT");
            status = true;
            message = companyProf;
            console.log(companyProf);
        }
    }catch(e){
        console.log(e);
        message = "Could not fetch results, db error";
        status = false;
    }finally{
        if(conn){
            await conn.release();
            await conn.destroy();
        }
        return {
            status : status,
            message : message
        };
    }
}

module.exports = {companyProfile};