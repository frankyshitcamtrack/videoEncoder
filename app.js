const morgan = require("morgan")

const cors = require("cors")

const path = require('path')

const express = require("express");

const bodyParser = require("body-parser");
const {v4 : uuidv4} = require('uuid');

const id= uuidv4();

const  Router = require("./src/routes/route");

const app = express();

const {downloadVideo}= require('./src/utils/download');

app.use(morgan('combined'));

app.use(cors());

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname,'..','public')));

app.use(express.static('public'))

const url ='https://cm-live.camtrack.net:36301/fileSrv/fileDown.php?filePath=QzovUHJvZ3JhbSBGaWxlcyAoeDg2KS9Wc3NTZXJ2aWNlL3N0b3JhZ2UvYmluL3g2NC8uLi8uLi8uLi9odGRvY3MvdnNzRmlsZXMvaGZ0cC9BSS8yMDI0MDYwNi9UTVNBMDAxLzEwNDQwOV82OC8yXzY0XzY4XzRfMTcxNzY3MDY0OS5tcDQ=&token=845f1b5aed3483197fd64d59c4ac54ac&ipaddr=127.0.0.1'


const downloadPath = path.resolve(`./public/assets/video/${id}.mp4`)

 
downloadVideo(url,downloadPath,'https://whattsapi.camtrack.net/');



app.get("/",(req,res)=>{
    res.setHeader('Content-Type','text/html')
    res.end('<h1>Project started : Video converter</h1>');
    console.log('test');
})


module.exports = app








