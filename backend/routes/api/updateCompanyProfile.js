'use strict'
const express = require('express');
const router = express.Router();
const profile = require('../../models/CompanyProfileUpdate');
const profile1 = require('../../models/ProfileUpdate')
const helper = require('../../models/helperFunctions');


router.get('/test',(req, res) => res.json({msg:"Company Works"}));
router.post('/updateCompanyProfile', async (req,res)=>{
    var resp ={};
    console.log("In update Company profile");
    let companyId = req.body.id;
    var companyProfile ={
        "company_name" : req.body.company_name,
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

router.post('/updateCompanyProfilePic',helper.upload.single('file'), async (req,res)=>{
    console.log("In Update company profile picture");
    console.log(req.body);
    let company_id = req.body.id;
    let role = 'company';
    let resp ={};
    try{
        console.log("filename", req.file);
        let profile_pic = req.file.filename;
        resp = await profile1.updateProfilePic(role,profile_pic,company_id);
        if (resp.status) {
            console.log("Pic uploaded");
          }
    }
    catch (e) {
        resp.status = false;
        resp.message = "Unexpected error at server side! Please login and try again!!";
        console.log(e);
    }finally{
        res.status(200).json({
            ...resp
        });
    }
});
module.exports = router;