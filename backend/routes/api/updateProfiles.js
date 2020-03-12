'use strict'
const express = require('express');
const router = express.Router();

const profile = require('../../models/ProfileUpdate');
const helper = require('../../models/helperFunctions');
const validateUpdateBasic = require("../../validation/studentBasicValidate");

router.get('/test',(req, res) => res.json({msg:"Student Works"}));

router.post("/updateStudentBasic", async function(req,res){
    const { errors, isValid } = validateUpdateBasic(req.body);
    console.log(isValid);
    if (!isValid) {
        return res.status(400).json(errors);
    }
    var resp ={};
    console.log("In update student Basic Details");
    console.log(req.body);
    let studentId = req.body.id;
    var studentBasic ={
        "first_name": req.body.first_name,
        "last_name" : req.body.last_name,
        "email"     : req.body.email,
        "major"     : req.body.major,
        "dob"       : req.body.dob,
        "city"      : req.body.city,
        "state"     : req.body.state,
        "country"   : req.body.country,
        "phone_num" : req.body.phone_num,
        "skill_set" : req.body.skill_set,
        "career_obj": req.body.career_obj
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
        "student_id"    : req.body.id,
        "college_name"  : req.body.college_name,
        "degree"        : req.body.degree,
        "location"      : req.body.location,
        "major"         : req.body.major,
        "year_passing"  : req.body.year_passing,
        "cgpa"          : req.body.cgpa
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

router.post("/updateStudentWorkExp", async (req, res) => {
    let resp = {};
    console.log("in student experience");
    if (!req.body.id || !req.body.company_name || !req.body.start_date) {
        console.log("Missing primary key");
        res.status(400).json({
            msg: "missing primary key "
        });
        return;
    }
    var studentExperience = {
        "student_id"    : req.body.id,
        "company_name"  : req.body.company_name,
        "title"         : req.body.title,
        "location"      : req.body.location,
        "start_date"    : req.body.start_date,
        "end_date"      : req.body.end_date,
        "work_desc"     : req.body.work_desc
    }
    try {
        console.log("Sending update to student experience details");
        resp = await profile.updateStudentWorkExp(studentExperience);

    } catch (e) {
        console.log(e);
        resp.status = false;
        resp.message = "error at database";
    }
    finally {
        res.status(200).json(
            {
                ...resp
            });
    }
});

router.post('/updateStudentProfilePic',helper.upload.single('file'), async (req,res)=>{
    console.log("In Update student profile picture");
    console.log(req.body);
    let student_id = req.body.id;
    let role = 'student';
    let resp ={};
    try{
        console.log("filename", req.file);
        let profile_pic = req.file.filename;
        resp = await profile.updateProfilePic(role,profile_pic,student_id);
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