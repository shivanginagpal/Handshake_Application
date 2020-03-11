'use strict'
const express = require('express');
const router = express.Router();

const student = require('../../models/StudentSearch');

router.get('/test_search',(req, res) => res.json({msg:"Student Search Works"}));

router.post("/filterStudents", async function(req, res){
    let{searchType,value} = req.body;
    var resp = {};
    try {
        console.log("get students list..");
        resp = await student.studentSearch(searchType,value);
    } catch(e) {
        console.log(e);
        resp.status = false;
    } finally{
        res.status(200).json({
            ...resp
        });
    }
});

router.get("/viewAllStudents", async function(req, res){
    console.log("get students list..");
    var resp = {};
    try {
        console.log("get students list..");
        resp = await student.viewAllStudents();
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