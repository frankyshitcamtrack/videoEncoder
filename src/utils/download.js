const axios = require("axios");
const fs = require('fs');
const path = require('path');
const {getEvidenceName}= require('./getFileName');
const {convertVideo}= require('./convertVideo');
const {deleteMedia} = require('./deleteMedia')
 
async function downloadVideo(url,outputDownloadPath,fullUrl) {
    const evidencName = getEvidenceName()
    const output = `public/assets/evidence/${evidencName}.mp4`
    const writer = fs.createWriteStream(outputDownloadPath);
    const filePath = `${fullUrl}/${output}`
    const newPath= filePath.replace('/public','')
    const p= `/assets/evidence/${evidencName}.mp4`

    axios({
        method: 'get',
        url: url,
        responseType: 'stream',
    })
       .then(response => {
           new Promise((resolve, reject) => {
               response.data.pipe(writer);
               let error = null;
               writer.on('error', err => {
                   error = err;
                   writer.close();
                   reject(err);
               });
               writer.on('close', () => {
                   if (!error) {
                       resolve(true);
                   }
               });
           }) .then(async () => {
            console.log('video Downloaded  now converting...');
        })
               .then(async () => {
                   await convertVideo(outputDownloadPath, output)
               })
               .then(async () => {
                console.log('video converted');
            })
              
         .then(()=>{
                setTimeout(async()=>{
                    await deleteMedia(outputDownloadPath);
                  },300000);
               })  
       })
    
    return output;
}

module.exports={downloadVideo}