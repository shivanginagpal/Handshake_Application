'use strict'
const dbConnection = require('./dbConnectionPool');

var studentSearch = async(searchType,value) => {
    let conn;
    let message = "";
    let status = false;
    let table = 'student_register';

    try{
        conn = await dbConnection();
        if (conn){
            console.log(`Search on : ${searchType} value: ${value}`);
            console.log(typeof(value));
            await conn.query("START TRANSACTION");
            var studentList = await conn.query(`Select first_name, last_name from ${table} where ${searchType} Like '${value}'`);
            //await conn.query('Select first_name, last_name from ?? where ? LIKE ?',[table, searchType, value]);
            await conn.query("COMMIT");
            status = true;
            message = studentList;
            console.log(studentList);
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

module.exports = {studentSearch};