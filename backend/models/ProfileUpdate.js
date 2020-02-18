'use strict'
const dbConnection = require('./dbConnectionPool');
const helper = require('./helperFunctions');


var updateStudentBasic = async(studentId,studentBasic)=>{

    let conn;
    let msg;
    let status = false;
    let table = 'student_details';
    try{
        conn = await dbConnection();
        if(conn){
            var userExists = await helper.profileExsists(studentId, table, conn);
            await conn.query("START TRANSACTION");
            if (!userExists){
                await conn.query('INSERT INTO ?? SET id = ?',[table,studentId]);
            }
            await conn.query('UPDATE ?? SET ? where id = ?',[table,studentBasic,studentId]);
            await conn.query("COMMIT");
            status = true;
            msg = "student details updated";
            console.log(msg);
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

var updateStudentEducation = async(studentEducation)=>{

    let conn;
    let msg;
    let status = false;
    let table = 'student_education';

    try{
        conn = await dbConnection();
        if(conn){
            var userExists = await educationProfileExsists(table,studentEducation,conn);
                console.log(userExists);
                await conn.query("START TRANSACTION");
                if (!userExists){
                    console.log("Education Record does not exists ");
                    await conn.query('INSERT INTO ?? SET ?',[table,studentEducation]);
                }else{
                    console.log("Education Record exists ");
                    await conn.query('UPDATE ?? SET college_name=?, location=?, year_passing=?, cgpa=? where student_id = ? AND degree = ? AND major =?',
                                    [table,studentEducation.college_name,
                                        studentEducation.location,
                                        studentEducation.year_passing,
                                        studentEducation.cgpa,
                                        studentEducation.student_id,
                                        studentEducation.degree,
                                        studentEducation.major]);
                }
                await conn.query("COMMIT");
                status = true;
                msg = "student education details updated";
                console.log(msg);
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

let educationProfileExsists = async (table,studentEducation,conn)=>{
    if (conn){
        let result = await conn.query('Select * from ?? where student_id = ? AND degree = ? AND major = ?',
                            [table,studentEducation.student_id,
                                studentEducation.degree,
                                studentEducation.major]);
        console.log("Here");
        console.log(result.length);
        if (result.length>0){
            return true;
        }else{
            return false;
        }
    }
}
module.exports = {updateStudentBasic,
                    updateStudentEducation}
