'use strict'
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const dbConnection = require('./dbConnectionPool');

var signUpStudent =  async (studentData) =>{
    let conn;
    let message = "";
    let status = false;
    try{
        console.log("In signup Student dbAccess..");
        conn = await dbConnection();
        if(conn){
            await conn.query("START TRANSACTION");
            var userExists = await isExistingUser(studentData.email, "student");
            if(!userExists){
                console.log("in if...");
                var insertedUser =await  conn.query('INSERT INTO student_register SET ?', [studentData]);
                await conn.query("COMMIT");
                console.log(insertedUser.insertId);
                insertId = insertedUser.insertId;
                message = "Signup is successful!!";
                status = true;
                
            } else {
                console.log("in else..");
                status = false;
                message = "Student already exists! Please give another email id";
            }
            console.log(message);
        }
    }catch(e){
        console.log(e);
        message = "Issue at database or server.Please restart the systems!";
        status = false;
    }
    finally{
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

var signUpCompany =  async (companyData) =>{
    let conn;
    let message = "";
    let status = false;
    try{
        console.log("In signup Company Models ");
        conn = await dbConnection();
        if(conn){
            await conn.query("START TRANSACTION");
            var userExists = await isExistingUser(companyData.email, "company");
            if(!userExists){
                console.log("in if...");
                await  conn.query('INSERT INTO company_register SET ?', 
                                    [companyData]);
                await conn.query("COMMIT");

                message = "Signup is successful!!";
                status = true;
                
            } else {
                console.log("in else..");
                status = false;
                message = "Company already exists! Please give another email id";
            }
            console.log(message);
        }
    }catch(e){
        console.log(e);
        message = "Issue at database or server.Please restart the systems!";
        status = false;
    }
    finally{
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

var signIn = async (userData)=>{
    let conn = await dbConnection();
    let table;
    let {email,password,userType} = userData;
    let errors = {};
 
    if(userType == "student"){
        table = "student_register";
    } else {
        table = "company_register";
    }
    var message = "Invalid Credentials";
    var status = false;
    var token;
    var payload;
    try{
        console.log("In signin dbAccess..");
        await conn.query("START TRANSACTION");
        let result = await conn.query('Select * from ?? where email=?',[table,email]);
        await conn.query('COMMIT');
        if(result.length > 0){
            let dbPassword = result[0]["password"];
            if(password == dbPassword){
                message = "Logged in successfully";
                let userID = result[0]['id'];
                let userProPic = result[0]['profile_pic'];
                let fname = userType=="student" ? result[0]['first_name']:result[0]['company_name'];
                let lname = userType=="student" ? result[0]['last_name']:result[0]['company_name'];

                payload = { id: userID, img : userProPic, first_name: fname, last_name: lname, userType: userType }
                //console.log(payload);
                //JWT token
                token = jwt.sign(payload, keys.secret, {expiresIn:3600});
                status = true;
            } else{
                errors.password = "Incorrect Password! Please try again";
            }
        } else {
            errors.email = "Invalid User"
            message = "Invalid Email";
        }
    } catch(e){
        console.log(e);
        message = "Issue at database or server.Please restart the systems!";
        throw e;
    } finally{
        if(conn){
            conn.release();
            conn.destroy();
        }
        return {
                status : status,
                message : message,
                token : token,
                errors: errors
        };
    }
}

let isExistingUser = async (emailID, userType) => {
    let conn = await dbConnection();
    console.log("email id is "+emailID);
    let table, prefix= "";
    if(userType == "student"){
        table = "student_register";
    } else {
        table = "company_register";
    }
    let result = await conn.query('Select * from ?? where email=?',[table,emailID]);
    console.log(result.length);
    if(result.length > 0){
        console.log("in if..");
        return true;
    } else {
        console.log("in else...");
        return false;
        
    }
}
module.exports = {signUpStudent,
                signUpCompany,
                signIn}