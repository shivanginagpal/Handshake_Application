const dbConnection = require('./dbConnectionPool');

var addJobPost =  async (jobDetails) =>{
    let conn;
   // let insertId = -1;
    let message = "";
    let status = false;
    try{
        console.log("In add job model");
        conn = await dbConnection();
        if(conn){
            await conn.query("START TRANSACTION");
            console.log("Get Company Name");
            let comp = await conn.query(`Select company_name from company_register
            where id=${jobDetails.company_id}`);
            //console.log(comp[0].company_name);
            jobDetails.company_name = comp[0].company_name;
            console.log(jobDetails);
            await conn.query("START TRANSACTION");
                console.log("New job-post");
                console.log(jobDetails);
                await  conn.query('INSERT INTO job_post SET ?', [jobDetails]);
                await conn.query("COMMIT");
                // console.log(newPost.insertId);
                // insertId = newPost.insertId;
                message = "Job posted successfully!";
                status = true;
                console.log(message);
        }
    }catch(e){
        console.log(e);
        message = "Error! Please restart the system";
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

var getJobDetails = async(user_id) => {
    let conn;
   // let insertId = -1;
    let message = "";
    let status = false;
    try{
        console.log("In get job model function");
        conn = await dbConnection();
        if(conn){
            await conn.query("START TRANSACTION");
                console.log("Get job-posts");
              var jobs = await conn.query('SELECT * FROM job_post where company_id = '+user_id);
                await conn.query("COMMIT");
               console.log(jobs);
                message = "Job retrieved successfully!";
                status = true;
                console.log(message);
        }
    }catch(e){
        console.log(e);
        message = "Error! Please restart the system";
        status = false;
    }
    finally{
        if(conn){
            await conn.release();
            await conn.destroy();
        }
        return {
            status : status,
            message : message,
            jobs:jobs
        };
    }
}

var getJobDetailsCompany = async(user_id) => {
    let connection;
    let message = "";
    let status = false;
    try{
        console.log("In get job mysql");
        console.log(user_id);
        connection = await dbConnection();
        if(connection){
            await connection.query("START TRANSACTION");
                console.log("Get job-posts-For company");
              var jobs = await connection.query('SELECT * FROM job_post where company_id = ' + user_id);
                await connection.query("COMMIT");
               console.log(jobs);
                message = "Job retrieved successfully!";
                status = true;
                console.log(message);
        }
    }catch(e){
        console.log(e);
        message = "Error! Please restart the system";
        status = false;
    }
    finally{
        if(connection){
            await connection.release();
            await connection.destroy();
        }
        return {
            status : status,
            message : message,
            jobs:jobs
        };
    }
}

var getStudentDetailsForJob = async(job_id) => {
    let connection;
   // let insertId = -1;
    let message = "";
    let status = false;
    try{
        console.log("In get job mysql");
        connection = await mysql();
        if(connection){
            await connection.query("START TRANSACTION");
                console.log("Get students-for a job");
             
                var students = await connection.query('SELECT handshake.student_register.student_id, handshake.student_register.first_name, handshake.student_register.last_name, handshake.applied_jobs.app_status FROM handshake.student_register INNER JOIN handshake.applied_jobs ON handshake.student_register.student_id = handshake.applied_jobs.student_id where handshake.applied_jobs.job_id = ' + job_id);
                await connection.query("COMMIT");
               console.log(students);
                message = "Student retrieved successfully!";
                status = true;
                console.log(message);
        }
    }catch(e){
        console.log(e);
        message = "Error! Please restart the system";
        status = false;
    }
    finally{
        if(connection){
            await connection.release();
            await connection.destroy();
        }
        return {
            status : status,
            message : message,
            students:students
        };
    }
}
var getSearchedJobDetails = async(keyword,location) => {
    let conn;
    let message = "";
    let status = false;
    try{
        console.log("In get Searched Job Details from db");

        conn = await dbConnection();
        if(conn){
            await conn.query("START TRANSACTION");
                console.log("Filter jobs");
                var jobs = await conn.query(`SELECT * FROM job_post WHERE job_description LIKE '${keyword}' OR
                job_title LIKE '${keyword}' OR
                job_category LIKE '${keyword}' OR
                location like '${location}'`);
                await conn.query("COMMIT");
                console.log(jobs);
                message = "Job retrieved successfully!";
                status = true;
                console.log(message);
        }
    }catch(e){
        console.log(e);
        message = "Error! Please restart the system";
        status = false;
    }
    finally{
        if(conn){
            await conn.release();
            await conn.destroy();
        }
        return {
            status : status,
            message : message,
            jobs:jobs
        };
    }
}

var getAppliedJobDetails= async(id) => {
    let conn;
    let message = "";
    let status = false;
    try{
        console.log("In get Applied Job Details from db");

        conn = await dbConnection();
        if(conn){
            await conn.query("START TRANSACTION");
                console.log("Applied jobs");
                var jobs = await conn.query(`SELECT job_title, company_name, app_status, date_applied, app_deadline 
                FROM job_post JOIN applied_jobs 
                WHERE applied_jobs.job_id = job_post.job_id 
                AND applied_jobs.student_id=${id}`);
                await conn.query("COMMIT");
                console.log(jobs);
                message = "Job retrieved successfully!";
                status = true;
                console.log(message);
        }
    }catch(e){
        console.log(e);
        message = "Error! Please restart the system";
        status = false;
    }
    finally{
        if(conn){
            await conn.release();
            await conn.destroy();
        }
        return {
            status : status,
            message : message,
            appliedjobs:jobs
        };
    }
}

var getUnappliedJobDetails= async(id) => {
    let conn;
    let message = "";
    let status = false;
    try{
        console.log("In get Unapplied Job Details from db");

        conn = await dbConnection();
        if(conn){
            await conn.query("START TRANSACTION");
                console.log("Unapplied jobs");

                var jobs = await conn.query(`SELECT job_title, company_name, app_deadline, 
                location, salary, job_description, job_category, job_id
                FROM job_post AS B WHERE B.job_id NOT IN 
                (Select job_id from applied_jobs as A where A.student_id=${id})`);
                await conn.query("COMMIT");
                console.log(jobs);
                message = "Job retrieved successfully!";
                status = true;
                console.log(message);
        }
    }catch(e){
        console.log(e);
        message = "Error! Please restart the system";
        status = false;
    }
    finally{
        if(conn){
            await conn.release();
            await conn.destroy();
        }
        return {
            status : status,
            message : message,
            jobs:jobs
        };
    }
}

var getStudentDetailsForJob = async(job_id) => {
    let conn;
    let message = "";
    let status = false;
    try{
        console.log("DB: In students for one job");
        conn = await dbConnection();
        if(conn){
            await conn.query("START TRANSACTION");
                console.log("Get students-for a job");
             
                var studentsForJob = await conn.query(`SELECT student_id, first_name, last_name, app_status 
                FROM student_register INNER JOIN applied_jobs ON student_register.id = applied_jobs.student_id
                where applied_jobs.job_id = ${job_id}`);

                await conn.query("COMMIT");
                console.log(studentsForJob);
                message = "Student retrieved successfully!";
                status = true;
                console.log(message);
        }
    }catch(e){
        console.log(e);
        message = "Error! Please restart the system";
        status = false;
    }
    finally{
        if(conn){
            await conn.release();
            await conn.destroy();
        }
        return {
            status : status,
            message : message,
            studentsForJob:studentsForJob
        };
    }
}

var applyForJob = async (inputData) => {
    console.log("In Apply for Job DB");
    
      let con = await dbConnection();
      let msg;
      let status = false;
      let table = "applied_jobs"
      try {
        if(con) {
        await con.query("START TRANSACTION");
        await con.query("INSERT INTO ?? SET ?", [
          table,
          inputData
        ]);
        await con.query("COMMIT");
        status = true;
        msg = "uploaded resume"
        console.log(msg);
      }
      } catch (error) {
        console.log(error);
        msg = "error in db";
        status = false;
        throw error;
      } finally {
        if(con){
           await con.release();
           await con.destroy();
        }return {
          status : status,
          msg : msg
        }
      }
  }

module.exports={addJobPost, 
    getJobDetails,
    getJobDetailsCompany, 
    getStudentDetailsForJob,
    getSearchedJobDetails,
    getAppliedJobDetails,
    getUnappliedJobDetails,
    applyForJob
    };