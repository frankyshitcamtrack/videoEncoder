const path = require('path');
const {downloadVideo}=require("../utils/download");
const {v4 : uuidv4} = require('uuid');



async function convertVideo(req, res) {
const url = req.body.url;

const protocol = req.protocol;
const hostname = req.get('host')
const fullUrl = `${protocol}://${hostname}`;

const id= uuidv4();
const downloadPath = path.resolve(`./public/assets/video/${id}.mp4`)
  try {
    setTimeout(async () => {
    const video= await downloadVideo(url,downloadPath,fullUrl);
    res.status(200).download(video)
    }, 15000)
  
  } catch (error) {
    console.error('error of: ', error);
    return res.status(500).send('Something went wrong');
  }
}


module.exports = { 
  convertVideo 
}