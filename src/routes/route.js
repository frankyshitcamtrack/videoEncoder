const express = require('express');

const {convertVideo} = require('../controllers/Controller');

const convertRouter = express.Router();

convertRouter.post('/video',convertVideo);



module.exports=convertRouter;