const express = require('express');
const mysql = require('mysql');
const students = require('./routes/api/students');
const company = require('./routes/api/company');

const app = express();
app.get('/',(req,res) => res.send('Hello World!!'));

//DB config
const db = mysql.createConnection({
  host      : "localhost",
  user      : "root",
  password  : "",
  database  : "handshake"
});

//DB connection
db.connect((err) => {
    if(err){
        throw err;
    }
    console.log('MySql Connected...');
});

//Use Routes
app.use('/api/students',students);
app.use('/api/company',company);




const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});