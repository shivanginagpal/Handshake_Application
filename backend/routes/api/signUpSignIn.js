'use strict'
const express = require('express');
const router = express.Router();
const sha1 = require('sha1');
//Load SignUpSignIn Model
const SignUpSignIn = require('../../models/SignUpSignIn');

router.get('/signUp',(req,res) => res.json({msg:"Sign Up Sign In works"}));


var cookieParser = require('cookie-parser');
var session = require('express-session');

router.post("/signUpStudent", async function(req, res){
    let{email, password, firstname, lastname, school} = req.body;
    var responseObj = {};
    console.log("In signup student route");
    console.log(req.body);
    try {
        password = sha1(password);
        email = email.toLowerCase().trim();
        let studentDetails = {
            first_name : firstname,
            last_name : lastname,
            email : email,
            password : password,
            school : school 
            };
        console.log("before calling Models(DB) signup");
        responseObj = await SignUpSignIn.signUpStudent(studentDetails);
        
    } catch(e) {
        console.log(e);
        responseObj.status = false;
    } finally{
        res.status(200).json({
            ...responseObj
        });
    }
});

router.post("/signUpCompany", async function(req, res){
    let{email, password, name, location} = req.body;
    var responseObj = {};
    console.log("In signup company route");
    console.log(req.body);
    try {
        password = sha1(password);
        email = email.toLowerCase().trim();
        let companyDetails = {
            email : email,
            password : password,
            company_name : name,
            location : location 
        };
        console.log("before calling Models(DB) signup");
        responseObj = await SignUpSignIn.signUpCompany(companyDetails);
        
    } catch(e) {
        console.log(e);
        responseObj.status = false;
    } finally{
        res.status(200).json({
            ...responseObj
        });
    }
});


router.post("/signIn", async function(req, res){
    console.log("in signin route..");
    console.log(req.body);
    let {email, password, userType}  = req.body;
    email = email.toLowerCase().trim();
    password = sha1(password);
    let status = false;
    console.log("In signin route..");
    try{
        let userData = {
            email : email,
            password : password,
            userType : userType
        };
        var responseObj = await SignUpSignIn.signIn(userData);
        status = responseObj.status;
        let user_id = userType === "student" ? "student_id" : "company_id";
       // let user_name = userType === "owner" ? "owner_name" : "buyer_name";
        //let name = responseObj.name;
        
        console.log(responseObj);
        if(status){
            res.cookie("user_type",userType,{maxAge: 900000, httpOnly: false, path : '/'});
            res.cookie(user_id,responseObj[user_id],{maxAge: 900000, httpOnly: false, path : '/'});
            res.cookie("name",responseObj.name,{maxAge: 900000, httpOnly: false, path : '/'});
            req.session.user = email;
        }
       /* res.writeHead(200,{
            "status" : 200,
            'Content-Type' : 'text/plain'
        })*/
        console.log("responseObj....");
        console.log(responseObj);
    }catch(e){
        console.log(e);
        status = false;
    }
    finally{
       // res.end(JSON.stringify({...responseObj,status:status}));
       res.status(200).json({
        ...responseObj
     });
      
    }
 });

module.exports = router;