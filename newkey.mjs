import fs from 'fs';
import path from 'path';

// Function to convert JSON files to single line and write to a new folder
function convertFilesToSingleLine(srcFolderPath, destFolderPath) {
    // Create the destination folder if it doesn't exist
    if (!fs.existsSync(destFolderPath)) {
        fs.mkdirSync(destFolderPath, { recursive: true });
    }

    fs.readdir(srcFolderPath, (err, files) => {
        if (err) {
            return console.error('Unable to scan directory: ' + err);
        }
        // Iterate through the list of files
        files.forEach((file) => {
            const srcFilePath = path.join(srcFolderPath, file);
            const destFilePath = path.join(destFolderPath, file);
            fs.stat(srcFilePath, (err, stats) => {
                if (err) {
                    return console.error('Unable to get file stats: ' + err);
                }
                if (stats.isFile() && path.extname(file) === '.json') {
                    fs.readFile(srcFilePath, 'utf8', (err, data) => {
                        if (err) {
                            return console.error('Unable to read file: ' + err);
                        }
                        try {
                          const jsonData = JSON.parse(data);
                          jsonData.name = file; // Add new key with file name
                          const singleLineJson = JSON.stringify(jsonData);
                            fs.writeFile(destFilePath, singleLineJson, (err) => {
                                if (err) {
                                    return console.error('Unable to write file: ' + err);
                                }
                                console.log(`Converted ${file} to single line JSON with new key and saved to ${destFilePath}`);
                            });
                        } catch (parseErr) {
                            console.error(`Unable to parse JSON in file ${file}: ` + parseErr);
                        }
                    });
                }
            });
        });
    });
}

// Replace with the paths to your source and destination folders
const srcFolderPath = './oneline';
const destFolderPath = './newkey';
convertFilesToSingleLine(srcFolderPath, destFolderPath);
