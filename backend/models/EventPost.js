const dbConnection = require('./dbConnectionPool.js');

var addEventPost =  async (eventDetails) =>{
    let connection;
   // let insertId = -1;
    let message = "";
    let status = false;
    try{
        console.log("In add event from db");
        connection = await dbConnection();
        if(connection){
            await connection.query("START TRANSACTION");
                console.log("New event-post");
                //console.log(eventDetails);
                await  connection.query('INSERT INTO event_post SET ?', [eventDetails]);
                await connection.query("COMMIT");
                message = "Event posted successfully!";
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
            message : message
        };
    }
}

var studentRegisteredEvents = async(user_id) =>{
    let conn;
  let msg = "";
  let status = false;
  try {
    conn = await dbConnection();
    if (conn) {
      await conn.query("START TRANSACTION");
      var studentevents = await conn.query(
        `Select e.event_id,e.date_of_event,e.time,
        e.event_name,e.location,e.event_description,
        e.eligibility,c.company_name 
        FROM event_post AS e, events_registered AS r, company_register AS c 
        WHERE c.id=e.company_id AND e.event_id = r.event_id  AND r.student_id=${user_id}  
        AND register_status="Registered"`
      );
      await conn.query("COMMIT");
      //console.log(studentevents);
      msg = "student events retrieved";
      status = true;
      console.log(msg);
    }
  } catch (error) {
    console.log(error);
    msg = "ERROR IN STUDENTEVENTS";
    status = false;
  } finally {
    if (conn) {
      await conn.release();
      await conn.destroy();
    }
    return {
      status: status,
      msg: msg,
      studentevents: studentevents
    };
  }

}

var getEventDetails = async(user_id,user_type) => {
    let connection;
    let message = "";
    let status = false;
    try{
        console.log("In get event from db");
        connection = await dbConnection();
        if(connection){
            await connection.query("START TRANSACTION");
                console.log("Get event-posts");
            if (user_type == 'student'){
                var events = await connection.query(`SELECT event_name, event_id, company_name, eligibility, 
                event_post.location, time, event_description 
                FROM event_post JOIN company_register ON event_post.company_id = company_register.id
                WHERE event_post.event_id NOT IN 
                (Select event_id from events_registered where student_id=${user_id})`);
            }else{
                var events = await connection.query(`SELECT * FROM event_post where company_id=${user_id}`);
                await connection.query("COMMIT");
                console.log(events);
            }
                message = "Event retrieved successfully!";
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
            events : events
        };
    }
}
var registerEvent = async (event_info) => {
    console.log("IN EVENT REGISTER");
    let conn;
    let msg = "";
    let status = false;
    try {
      conn = await dbConnection();
      if (conn) {
        await conn.query("START TRANSACTION");
        let check = await conn.query(`Select eligibility from event_post where event_id=${event_info.event_id} 
        and eligibility 
        Like (Select major from student_register where id=${event_info.student_id})`);
        console.log(check.length);
        if(check.length>0){
            await conn.query("INSERT INTO events_registered SET ?",[event_info]);
            msg = "Event Registered successfully!";
            status = true;
            console.log(msg);
        }else{
            msg = "Unable to register";
            status = false;
            console.log(msg);

        }
        await conn.query("COMMIT");
        
      }
    } catch (e) {
      console.log(e);
      msg = "Error In DB";
      status = false;
    } finally {
      if (conn) {
        await conn.release();
        await conn.destroy();
      }
      return {
        status: status,
        msg: msg
      };
    }
  };

  var getRegisteredStudentDetails = async(event_id) => {
    let conn;
    let message = "";
    let status = false;
    try{
        console.log("In get event mysql");
        conn = await dbConnection();
        if(conn){
            await conn.query("START TRANSACTION");
                console.log("DB: Get students for a event");
             
                var studentsForEvent = await conn.query(`SELECT student_register.id as student_id, student_register.first_name, 
                student_register.last_name 
                FROM student_register INNER JOIN events_registered
                ON student_register.id = events_registered.student_id 
                where events_registered.event_id =${event_id}`);

                await conn.query("COMMIT");
               console.log(studentsForEvent);
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
            studentsForEvent:studentsForEvent
        };
    }
}
module.exports={addEventPost, 
            getEventDetails, 
            registerEvent,
            studentRegisteredEvents,
            getRegisteredStudentDetails};