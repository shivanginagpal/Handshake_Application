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
var dbConnection = require('./models/dbConnectionPool');

const app = express();
app.set('view engine', 'ejs');
const port = process.env.PORT || 5000;

//use cors to allow cross origin resource sharing
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

// var session = require('express-session');
//var cookieParser = require('cookie-parser');

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

// app.use(session({
//     secret: 'cmpe273_handshake_node_react_mysql',
//     resave: false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
//     saveUninitialized: false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
//     duration: 60 * 60 * 1000,    // Overall duration of Session : 30 minutes : 1800 seconds
//     activeDuration: 5 * 60 * 1000
// }));

//Use Routes

app.use('/',signUpSignIn);
app.use('/',updateProfile);
app.use('/',updateCompanyProfile);
app.use('/',studentSearch);
app.use('/',companyProfile);
app.use('/',jobPost);
app.use('/',eventPost);
app.use('/',getStudentProfile);

app.get('/',(req,res) => res.send('Hello World!!'));


app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});