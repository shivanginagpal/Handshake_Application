'use strict'
const dbConnection = require('./dbConnectionPool');
const helper = require('./helperFunctions');

var updateCompanyProfile = async(companyId,companyProfile)=>{
    let conn;
    let msg;
    let status = false;
    let table = 'company_register';
    try{
        conn = await dbConnection();
        if(conn){
            var userExists = await helper.profileExsists(companyId, table, conn);
            await conn.query("START TRANSACTION");
            if (!userExists){
                msg = "company not registerd cannot update profile";
                console.log(msg);
            }
            else{
                await conn.query('UPDATE ?? SET ? where id = ?',[table,companyProfile,companyId]);
                await conn.query("COMMIT");
                status = true;
                msg = "company details updated";
                console.log(msg);
            }
        }
    }
    catch(e){
        console.log(e);
        msg = "Error in connecting to db";
        status = false;
    }
    finally{
        if(conn){
            await conn.release();
            await conn.destroy();
        }
        return{
            status: status,
            message: msg
        }
    }
}

module.exports = {updateCompanyProfile}