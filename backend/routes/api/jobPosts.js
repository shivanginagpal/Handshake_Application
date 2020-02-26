const express = require('express');
const router = express.Router();

//Load job Posts Model
const jobPost = require('../../models/JobPost.js');
//Test if route is working
router.get('/test_addJob',(req,res) => res.json({msg:"Add Job Post works"}));

router.get('/getJobDetails',async function(req,res) {
    var responseObj={};
    try{
    responseObj=await jobPost.getJobDetails();
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


router.post("/addJobPost", async function(req, res){
    let{job_title, posting_date, app_deadline, location, salary,job_description, job_category, company_id} = req.body;
    var responseObj = {};
    console.log("In jobPosts route");
    console.log(req.body);
    //change the order in which date is being entered into the database
    try {  
        let jobDetails = {
            job_title : job_title,
            posting_date : posting_date,
            app_deadline : app_deadline,
            location : location,
            salary : salary,
            job_description: job_description,
            job_category: job_category,
            company_id: company_id
        };
        console.log("before calling models jobPosts");
        console.log(jobDetails);
        responseObj = await jobPost.addJobPost(jobDetails);
        
    } catch(e) {
        console.log(e);
        responseObj.status = false;
    } finally{
        res.status(200).json({
            ...responseObj
        });
    }
});

module.exports=router;