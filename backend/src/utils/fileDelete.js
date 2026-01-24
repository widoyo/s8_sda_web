// utils/fileDelete.js
const fs = require("fs");
const path = require("path");

const deleteFile = (folderName, fileName) => {
  return new Promise((resolve, reject) => {
    const filePath = path.join(
      __dirname,
      `../../uploads/${folderName}`,
      fileName
    );

    fs.unlink(filePath, (err) => {
      if (err) {
        reject(`File not found: ${filePath}`);
      } else {
        resolve(`File deleted: ${filePath}`);
      }
    });
  });
};

module.exports = deleteFile;
