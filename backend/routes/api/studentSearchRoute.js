'use strict'
const express = require('express');
const router = express.Router();

const profile = require('../../models/StudentSearch');

router.get('/test',(req, res) => res.json({msg:"Student Works"}));