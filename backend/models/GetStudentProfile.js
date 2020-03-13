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

  var getStudentEducationDetails = async studentId => {
    let conn;
    let msg;
    let status = false;
    let table = "student_education";
    try {
      conn = await dbConnection();
      if (conn) {
        var user = true;
        //var user = await helper.profileExsists(studentId, table, conn);
        console.log("user: ", user);
        await conn.query("START TRANSACTION");
        if (user) {
          var education = await conn.query("select * from ?? where student_id = ?", [
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
        education: education
      };
    }
  };

  var getStudentExperienceDetails = async studentId => {
    let conn;
    let msg;
    let status = false;
    let table = "student_experience";
    try {
      conn = await dbConnection();
      if (conn) {
        var user = true;
        //var user = await helper.profileExsists(studentId, table, conn);
        console.log("user: ", user);
        await conn.query("START TRANSACTION");
        if (user) {
          var experience = await conn.query("select * from ?? where student_id = ?", [
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
        experience: experience
      };
    }
  };

  var getStudentResume = async studentId => {
    let conn;
    let msg;
    let status = false;
    let table = "applied_jobs";
    try {
      conn = await dbConnection();
      if (conn) {

        await conn.query("START TRANSACTION");
        var resume_file = await conn.query("select resume_file from ?? where student_id = ?", [
            table,
            studentId
          ]);
        await conn.query("COMMIT");
        status = true;
        msg = "student resume fetched";
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
        resume_file: resume_file
      };
    }
  };
module.exports = {getStudentDetails,
                  getStudentEducationDetails,
                  getStudentExperienceDetails,
                  getStudentResume}