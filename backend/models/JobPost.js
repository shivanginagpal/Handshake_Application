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

var getJobDetails = async() => {
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
              var jobs = await conn.query('SELECT * FROM job_post');
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

module.exports={addJobPost, getJobDetails};