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
                console.log(eventDetails);
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


var getEventDetails = async() => {
    let connection;
   // let insertId = -1;
    let message = "";
    let status = false;
    try{
        console.log("In get event from db");
        connection = await dbConnection();
        if(connection){
            await connection.query("START TRANSACTION");
                console.log("Get event-posts");
              var events = await connection.query('SELECT * FROM event_post');
                await connection.query("COMMIT");
               console.log(events);
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
            events:events
        };
    }
}

module.exports={addEventPost, getEventDetails};