const express = require('express');
const company_router = express.Router();

company_router.get('/test',(req, res) => res.json({msg:"Company Works"}));

module.exports = company_router;