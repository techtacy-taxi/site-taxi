const fs = require('fs');
const path = require('path');

function getAllFiles(dirPath, arrayOfFiles) {
  const files = fs.readdirSync(dirPath);

  arrayOfFiles = arrayOfFiles || [];

  files.forEach(function(file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
    } else {
      arrayOfFiles.push(path.join(dirPath, "/", file));
    }
  });

  return arrayOfFiles;
}

const htmlFiles = getAllFiles('.').filter(file => file.endsWith('.html'));

htmlFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  
  if (content.includes('name="color-scheme" content="light"')) {
    content = content.replace('name="color-scheme" content="light"', 'name="color-scheme" content="dark light"');
    fs.writeFileSync(file, content);
    console.log(`Updated ${file}`);
  }
});
