'use strict'
const dbConnection = require('./dbConnectionPool');

var signUpStudent =  async (studentData) =>{
    let conn;
    let insertId = -1;
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
    let insertId = -1;
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
    let userPassword = password;
    let prefix = "", userIDText = "", usernameText = "", name="";
    if(userType == "student"){
        table = "student_register";
        prefix = "student_";
    } else {
        table = "company_register";
        prefix = "company_";
    }
    var message = "Invalid Credentials";
    var userID = -1;
    var status = false;
    try{
        console.log("In signin dbAccess..");
        await conn.query("START TRANSACTION");
        let result = await conn.query('Select password, '+prefix+'id from ?? where email=?',[table,email]);
        await conn.query('COMMIT');
        if(result.length > 0){
            let dbPassword = userType == "student" ? result[0]["password"] : result[0]["password"];
            //console.log("user password.."+userPassword);
            //console.log("dbPassword.."+dbPassword);
            if(userPassword == dbPassword){
                message = "Logged in successfully";
                userIDText = userType == "student" ? "student_id" : "company_id" ;
                userID = userType == "student" ? result[0]["student_id"] : result[0]["company_id"] ;
                //name = userType == "student" ? result[0]["student_name"] : result[0]["company_name"] ;
                status = true;
            } else{
                message = "Incorrect Password!!";
            }
        } else {
            message = "Invalid Email";
        }
       // console.log("result is..");
        //console.log(result);
        console.log(message);
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
                [userIDText] : userID,
                userType : userType,
                name : name
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