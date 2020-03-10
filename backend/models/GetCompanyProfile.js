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

var getCompanyProfileDetails = async company_Id => {
    let conn;
    let msg;
    let status = false;
    try {
      conn = await dbConnection();
      if (conn) {
          var user = true;
        console.log("user: ", user);
        await conn.query("START TRANSACTION");
        if (user) {
          var companyDetails= await conn.query("select * from company_register where id ="+ company_Id);
        }
        await conn.query("COMMIT");
        status = true;
        msg = "Company details fetched";
        
        console.log(msg);
      }
    } catch (e) {
      console.log(e);
      msg = "error in connecting db";
      status = false;
    } finally {
      if (conn) {
        await conn.release();
        await conn.destroy();
      }
      return {
        status: status,
        message: msg,
        companyDetails:companyDetails
      };
    }
  };
module.exports = {companyProfile,
                 getCompanyProfileDetails};