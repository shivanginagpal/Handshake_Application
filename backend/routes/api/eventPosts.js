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
    responseObj=await eventPost.getEventDetails();
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