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
module.exports = router;