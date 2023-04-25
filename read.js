const {authenticate} = require('@google-cloud/local-auth');
const {google} = require('googleapis');
const fs = require('fs');
const {authentication}= require('./goClassAuth.js');
const {promisify} = require('util');
const pdfParse = require('pdf-parse');
const path = require('path');



async function courseWork(){
    const courseId = '605695952868';
    const auth=await authentication.authorize();
    const classroom = google.classroom({version: 'v1', auth});
    try{
        const res =  await classroom.courses.courseWork.list({
            courseId,
          })
          const courseWork = res.data.courseWork;
          if (!courseWork || courseWork.length === 0) {
            console.log('No courseWork found.');
            return;
          }
          console.log(courseWork);
          console.log(courseWork[0].workType);
          console.log(courseWork[0]. alternateLink);
          console.log(courseWork[0].description);
          console.log(courseWork[0].materials[0].driveFile.driveFile.alternateLink.match(/[-\w]{25,}/)[0]);
         
    }
    catch(err){
        console.log(err);
    }
    
    
}


//courseWork();


async function readFile(){


    const auth=await authentication.authorize();


const fileId = '1kK70yOOPgZHnGGWXLLJ6HiVDbNk7Wu99';
const destPath = 'downloaded-file.pdf';

const drive = google.drive({ version: 'v3', auth });

try{
  const file = await drive.files.get({ fileId, alt: 'media' }, { responseType: 'arraybuffer' });

  // Parse the PDF file and extract text
  const parsedPdf = await pdfParse(file.data);
  const text = parsedPdf.text;

  console.log("This is what in the file "+text);

  const fileName = `${fileId}.txt`;
  const filePath = path.join(process.cwd(),'Assignments',fileName);

  // Write the text to a file
    
  fs.writeFile(filePath, text, (err) => {
    if (err) {
      console.error(`Error writing to file ${filePath}: ${err}`);
      return;
    }
    console.log(`Wrote ${text.length} bytes to ${filePath}`);
  });


}
 catch (err) {
    console.error(`An error occurred: ${err}`);
   
  }

}



readFile();