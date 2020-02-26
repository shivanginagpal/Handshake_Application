'use strict'
const express = require('express');
const router = express.Router();

const companyProfile = require('../../models/GetCompanyProfile');

router.get('/test_companyProfile',(req, res) => res.json({msg:"Company Profile Get Works"}));

router.post("/getCompanyProfile", async function(req, res){
    let{searchType,value} = req.body;
    var resp = {};
    try {
        console.log("get company profile route..");
        resp = await companyProfile.companyProfile(searchType,value);
    } catch(e) {
        console.log(e);
        resp.status = false;
    } finally{
        res.status(200).json({
            ...resp
        });
    }
});

module.exports = router;