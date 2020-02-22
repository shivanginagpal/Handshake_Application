'use strict'
const dbConnection = require('./dbConnectionPool');
const helper = require('./helperFunctions');


var updateStudentBasic = async(studentId,studentBasic)=>{

    let conn;
    let msg;
    let status = false;
    let table = 'student_register';
    try{
        conn = await dbConnection();
        if(conn){
            var userExists = await helper.profileExsists(studentId, table, conn);
            await conn.query("START TRANSACTION");
            if (userExists){
            await conn.query('UPDATE ?? SET ? where id = ?',[table,studentBasic,studentId]);
            await conn.query("COMMIT");
            status = true;
            msg = "student details updated";
            console.log(msg);
            }else{
                msg = "student not registered";
                //await conn.query('INSERT INTO ?? SET id = ?',[table,studentId]);
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

var updateStudentEducation = async(studentEducation)=>{

    let conn;
    let msg;
    let status = false;
    let table = 'student_education';
    let profileType = 'education';

    try{
        conn = await dbConnection();
        if(conn){
            var userExists = await studentProfileExsists(table,studentEducation,conn,profileType);
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

let updateStudentWorkExp = async(studentExperience)=>{

    let conn;
    let msg;
    let status = false;
    let table = 'student_experience';
    let profileType = 'experience';

    try{
        conn = await dbConnection();
        if(conn){
            var userExists = await studentProfileExsists(table,studentEducation,conn,profileType);
                console.log(userExists);
                await conn.query("START TRANSACTION");
                if (!userExists){
                    console.log("Experience Record does not exists ");
                    await conn.query('INSERT INTO ?? SET ?',[table,studentEducation]);
                }else{
                    console.log("Experience Record exists ");
                    await conn.query('UPDATE ?? SET  title=?, location=?,end_date=? where student_id =? AND company_name=? AND start_date = ?',
                    [table, studentExperience.title,
                            studentExperience.location, 
                            studentExperience.end_date,
                            studentExperience.student_id,
                            studentExperience.company_name,
                            studentExperience.start_date]);
                }
                await conn.query("COMMIT");
                status = true;
                msg = "student Experience details updated";
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

let studentProfileExsists = async (table,studentData,conn,profileType)=>{
    if (conn){
        let result;
        if (profileType === 'education'){
            console.log("in education");
            result = await conn.query('Select * from ?? where student_id = ? AND degree = ? AND major = ?',
                                [table,studentData.student_id,
                                studentData.degree,
                                studentData.major]);
        }else if (profileType === 'experience'){
            console.log("in experience");
            result = await conn.query('select * from ?? where student_id = ? AND company_name =? AND start_date =?',
                                [table, studentData.student_id,
                                studentData.company_name,
                                studentData.start_date]);
        }
        console.log(result.length);
        if (result.length>0){
            return true;
        }else{
            return false;
        }
    }
}

let updateProfilePic = async (role,profile_pic,id)=>{
    let table;
    let conn;
    let message = "";
    let status=false;
    console.log(profile_pic);
    if (role === 'company'){
        table = 'company_register';
    }else{
        table = 'student_register';
    }
    conn = await dbConnection();
    try {
        if(conn){
            console.log(table);
            console.log("Before updating profile pic in db");
            await conn.query("START TRANSACTION");
            await conn.query(`UPDATE ?? SET profile_pic = ? WHERE id = ?`, [
                        table,profile_pic,id]);
            await conn.query("COMMIT");
            console.log("Image uploaded to sql");
            message = "Image path uploaded to sql table!!";
            status=true;
        }                
    }
    catch(e){
        console.log(e);
        message = "Error at server side! Please login again to continue!!";
        status = false;
        await con.query("ROLLBACK");
    }
    finally{
        if(conn){
            await conn.release();
            await conn.destroy();
        }
        return {
            status : status,
            message : message
        }
    } 
}

module.exports = {updateStudentBasic,
                    updateStudentEducation,
                    updateProfilePic,
                    updateStudentWorkExp}
