const express = require('express');

const {convertVideo} = require('../controllers/Controller');

const Router = express.Router();

Router.post('/convert-video',convertVideo);



module.exports= Router;