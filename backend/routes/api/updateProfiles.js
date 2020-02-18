'use strict'
const express = require('express');
const router = express.Router();

const profile = require('../../models/ProfileUpdate')

const multer = require('multer');

router.get('/test',(req, res) => res.json({msg:"Student Works"}));

router.post("/updateStudentBasic", async function(req,res){
    var resp ={};
    console.log("In update student Basic Details");
    let studentId = req.body.id;
    var studentBasic ={
       // "first_name" : req.body.firstname,
        //"last_name" : req.body.lastname,
        //"email"     : req.body.email,
        "dob" : req.body.dob,
        "city": req.body.city,
        "state": req.body.state,
        "country": req.body.country,
        "career_obj": req.body.careerObj
    }
    try {
        console.log("sending update student details to db");
        resp = await profile.updateStudentBasic(studentId,studentBasic);
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

router.post("/updateStudentEducation", async function(req,res){
    var resp ={};
    console.log("In update student Education Details");
    if (!req.body.id || !req.body.degree || !req.body.major){
        console.log("Missing primary key");
        res.status(400).json({
            msg : "Missing primary key pls reenter"
        });
        return;
    }
    var studentEducation ={
        "student_id" : req.body.id,
        "college_name": req.body.clgName,
        "degree":req.body.degree,
        "location": req.body.location,
        "major": req.body.major,
        "year_passing": req.body.passingYear,
        "cgpa":req.body.cgpa
    }
    try {
        console.log("sending update student education details to db");
        resp = await profile.updateStudentEducation(studentEducation);
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