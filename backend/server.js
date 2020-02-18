const express = require('express');
const bodyParser = require('body-parser');

var signUpSignIn = require('./routes/api/signUpSignIn');
var updateProfile = require('./routes/api/updateProfiles');
var updateCompanyProfile = require('./routes/api/updateCompanyProfile');
var dbConnection = require('./models/dbConnectionPool');

const app = express();
app.set('view engine', 'ejs');
const port = process.env.PORT || 5000;


// var session = require('express-session');
// var cookieParser = require('cookie-parser');

//Body Parser Middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


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
// app.use('/api/students',students);
// app.use('/api/company',company);
app.use('/',signUpSignIn);
app.use('/',updateProfile);
app.use('/',updateCompanyProfile);

app.get('/',(req,res) => res.send('Hello World!!'));


app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});