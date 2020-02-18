'use strict'
const express = require('express');
const router = express.Router();
const profile = require('../../models/CompanyProfileUpdate')

router.get('/test',(req, res) => res.json({msg:"Company Works"}));
router.post('/updateCompanyProfile', async (req,res)=>{
    var resp ={};
    console.log("In update Company profile");
    let companyId = req.body.id;
    var companyProfile ={
        "company_name" : req.body.name,
        "location": req.body.location,
        "description": req.body.description,
        "contact_info": req.body.contact_info,
        "profile_pic": req.body.profile_pic
    }
    try {
        console.log("sending update company details to db");
        resp = await profile.updateCompanyProfile(companyId,companyProfile);
    }
    catch(e){
        console.log(e);
        resp.status = false;
        resp.message = "Unknown error at database";
    }
    finally{
        res.status(200).json(
            {
                ...resp
            });
    }

});

module.exports = router;