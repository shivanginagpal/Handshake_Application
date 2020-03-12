const express = require('express');
const router = express.Router();
//Load jobPosts Model
const student = require('../../models/GetStudentProfile');
const fs = require("fs");
const path = require("path");

router.get('/getStudentProfile', async (req, res) => {
    console.log("inside profile get request");
    let studentId = req.query.id;
    var resObj = {};
    try{
        resObj = await student.getStudentDetails(studentId)
    }
    catch(e) {
        console.log(e);
        resObj.status = false;
    } finally {
        res.status(200).json({
            ...resObj.profile
        });
    } 
});
router.get('/getStudentEducation', async (req, res) => {
    console.log("inside education get request");
    //let studentId = 1;
    let studentId = req.query.id;
    var resObj = {};
    try{
        resObj = await student.getStudentEducationDetails(studentId)
    }
    catch(e) {
        console.log(e);
        resObj.status = false;
    } finally {
        res.status(200).json({
            ...resObj.education
        });
    } 
});

router.get('/getStudentExperience', async (req, res) => {
    console.log("inside experience get request");
    //let studentId = 1;
    let studentId = req.query.id;
    var resObj = {};
    try{
        resObj = await student.getStudentExperienceDetails(studentId)
    }
    catch(e) {
        console.log(e);
        resObj.status = false;
    } finally {
        res.status(200).json({
            ...resObj.experience
        });
    } 
});

//download-file
router.get("/downloadProfileImg/:user_image", (req, res) => {
    var image = path.join(__dirname + "/../../uploads/profilepics", req.params.user_image);
    console.log("image", image)
    if (fs.existsSync(image)) {
      res.sendFile(image);
    } else {
      res.end("image not found");
    }
  });

  //download-file
router.get("/downloadResume/:user_resume", (req, res) => {
    var resume = path.join(__dirname + "/../../uploads/resume", req.params.user_resume);
    console.log("resume", resume)
    if (fs.existsSync(resume)) {
      res.sendFile(resume);
    } else {
      res.end("resume not found");
    }
  });

module.exports = router;