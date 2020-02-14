const express = require('express');
const student_router = express.Router();

student_router.get('/test',(req, res) => res.json({msg:"Student Works"}));

module.exports = student_router;