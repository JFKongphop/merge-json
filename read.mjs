import fs from 'fs';
import path from 'path';

const readFilesInFolder = (folderPath) => {
  fs.readdir(folderPath, (err, files) => {
    if (err) {
      return console.error('Unable to scan directory: ' + err);
    } 

    files.forEach((file) => {
      const filePath = path.join(folderPath, file);
      fs.stat(filePath, (err, stats) => {
        if (err) {
          return console.error('Unable to get file stats: ' + err);
        }
        if (stats.isFile()) {
          fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
              return console.error('Unable to read file: ' + err);
            }
            console.log(`Content of ${file}:`);
            console.log(data + '\n');
          });
        }
      });
    });
  });
}

// Replace with the path to your folder
const folderPath = './example';
readFilesInFolder(folderPath);