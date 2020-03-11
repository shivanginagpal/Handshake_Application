const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

var signUpSignIn = require('./routes/api/signUpSignIn');
var updateProfile = require('./routes/api/updateProfiles');
var updateCompanyProfile = require('./routes/api/updateCompanyProfile');
var studentSearch = require('./routes/api/studentSearch');
var companyProfile = require('./routes/api/getCompanyProfile');
var jobPost = require('./routes/api/jobPosts');
var eventPost = require('./routes/api/eventPosts');
var getStudentProfile = require('./routes/api/getStudentProfile');
var getStudentEducation = require('./routes/api/getStudentProfile');
var getStudentExperienceDetails = require('./routes/api/getStudentProfile');
var getSearchedJobDetails = require('./routes/api/jobPosts');
var getAppliedJobDetails = require('./routes/api/jobPosts');
var getUnappliedJobDetails = require('./routes/api/jobPosts');
var getCompanyProfileDetails = require('./routes/api/getCompanyProfile');
var getStudentDetailsForJob = require('./routes/api/jobPosts');
var registerEvent = require('./routes/api/eventPosts');
var applyForJob = require('./routes/api/jobPosts')
var getRegisteredStudentDetails = require('./routes/api/eventPosts');
var getListOfStudentAppliedForJob = require('./routes/api/jobPosts');
var updateAppliedJob = require('./routes/api/jobPosts');
var viewAllStudents = require('./routes/api/studentSearch')

var dbConnection = require('./models/dbConnectionPool');

const app = express();
app.set('view engine', 'ejs');
const port = process.env.PORT || 5000;

//use cors to allow cross origin resource sharing
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

//Body Parser Middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Allow Access Control
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

testDBConection = async() => {
    let con = await dbConnection();
    if(con){
      console.log("Connected to Database");
    }
  }
testDBConection();


//Use Routes

app.use('/',signUpSignIn);
app.use('/',updateProfile);
app.use('/',updateCompanyProfile);
app.use('/',studentSearch);
app.use('/',companyProfile);
app.use('/',jobPost);
app.use('/',eventPost);
app.use('/',getStudentProfile);
app.use('/',getStudentEducation);
app.use('/',getStudentExperienceDetails);
app.use('/',getSearchedJobDetails);
app.use('/',getAppliedJobDetails);
app.use('/',getUnappliedJobDetails);
app.use('/',getCompanyProfileDetails);
app.use('/',getStudentDetailsForJob);
app.use('/',registerEvent);
app.use('/',applyForJob);
app.use('/',getRegisteredStudentDetails);
app.use('/',getListOfStudentAppliedForJob);
app.use('/',updateAppliedJob);
app.use('/',viewAllStudents);

app.get('/',(req,res) => res.send('Hello World!!'));


app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});