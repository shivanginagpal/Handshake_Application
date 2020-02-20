'use strict'

const path = require('path');
const multer = require('multer');

let profileExsists = async (id, table,conn)=>{

    console.log(`Id is ${id} searching in table: ${table}`);
    if (conn){
        var result = await conn.query('Select * from ?? where id = ?',[table,id]);
        console.log(result);
        if (result.length > 0){
            return true;
        }
        else{
            return false;
        }
    }
}


// Check File Type
function checkFileType(file, cb){
    // Allowed ext
    const filetypes = /jpeg|jpg|png|gif/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);
  
    if(mimetype && extname){
      return cb(null,true);
    } else {
      cb('Error: Images Only!');
    }
  }

// SETTING STORAGE
const storage = multer.diskStorage({
    destination: (req, file, cb)=> {
      cb(null, './uploads/profilepics');
    },
    filename: function (req, file, cb) {
        cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
  });
//'img' is the field name
  const upload = multer({
    storage: storage,
    limits:{fileSize: 1000000},
    fileFilter: function(req, file, cb){
    checkFileType(file, cb);
    }
  });
  

module.exports = {profileExsists,
                upload}