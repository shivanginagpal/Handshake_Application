const express = require('express');
const router = express.Router();

//Load jobPosts Model
const eventPost = require('../../models/EventPost.js');

//Test if route is working
router.get('/test_addEvent',(req,res) => res.json({msg:"Add Event Post works"}));

router.post("/addEventPost", async function(req, res){
    let{company_id, event_name, location, date_of_event, event_description, time, eligibility} = req.body;
    var responseObj = {};
    console.log("In EventPosts route");
    console.log(req.body);
    //change the order in which date is being entered into the database
    try {  
        let eventDetails = {
            company_id : company_id,
            event_name : event_name,
            date_of_event : date_of_event,
            event_description : event_description,
            location : location,
            time : time,
            eligibility: eligibility
        };
        console.log("before calling models eventPosts");
        console.log(eventDetails);
        responseObj = await eventPost.addEventPost(eventDetails);
        
    } catch(e) {
        console.log(e);
        responseObj.status = false;
    } finally{
        res.status(200).json({
            ...responseObj
        });
    }
});

router.get('/getEventDetails',async function(req,res) {
    var responseObj={};
    try{
        let user_id = req.query.id;
        let user_type = req.query.user_type;
        console.log(user_id,user_type);
        responseObj=await eventPost.getEventDetails(user_id,user_type);
        console.log(responseObj);
    }
    catch(e) {
        console.log(e);
        responseObj.status = false;
    } finally{
        res.status(200).json({
            ...responseObj
        });
    }
});

router.post("/registerEvent", async (req, res) => {
    console.log("in event register Route");
    console.log(req.body);
    let { event_id, user_id, register_status } = req.body;
    var resObj = {};
    try {
      
      let event = {
        student_id: user_id,
        register_status: register_status,
        event_id: event_id
      };
      resObj = await eventPost.registerEvent(event);
    } catch (error) {
      console.log(error);
      resObj.status = false;
    } finally {
      res.status(200).json({
        ...resObj
      });
    }
  });

  router.get("/getStudentRegisteredEvents", async (req, res) => {
    console.log("in Get registered event Route");
    console.log(req.query);
    let { user_id } = req.query;
    var resObj = {};
    try {
      resObj = await eventPost.studentRegisteredEvents(user_id);
    } catch (error) {
      console.log(error);
      resObj.status = false;
    } finally {
      res.status(200).json({
        ...resObj
      });
    }
  });
  
  router.get('/getRegisteredStudentDetails',async function(req,res) {
    var responseObj={};
    try{
        console.log("In router");
        console.log(req.query);
        let event_id = req.query.event_id;
        responseObj=await eventPost.getRegisteredStudentDetails(event_id);
        console.log(responseObj);
    }
    catch(e) {
        console.log(e);
        responseObj.status = false;
    } finally{
        res.status(200).json({
            ...responseObj
        });
    }
});

module.exports=router;