'use strict'
const dbConnection = require('./dbConnectionPool');
const helper = require('./helperFunctions');

var getStudentDetails = async studentId => {
    let conn;
    let msg;
    let status = false;
    let table = "student_register";
    try {
      conn = await dbConnection();
      if (conn) {
        var user = true;
        //var user = await helper.profileExsists(studentId, table, conn);
        console.log("user: ", user);
        await conn.query("START TRANSACTION");
        if (user) {
          var profile = await conn.query("select * from ?? where id = ?", [
            table,
            studentId
          ]);
        }
        await conn.query("COMMIT");
        status = true;
        msg = "student details fetched";
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
        profile: profile
      };
    }
  };

module.exports = {getStudentDetails}