const express = require('express');
const router = express.Router();
//Load jobPosts Model
const student = require('../../models/GetStudentProfile');

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

module.exports = router;