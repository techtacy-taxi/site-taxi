const fs = require('fs');
const path = require('path');

const files = [
    'acropolis-tour.html',
    'argolis-tour.html',
    'delphi-tour.html',
    'meteora-tour.html',
    'sounio-tour.html'
];

files.forEach(file => {
    const filePath = path.join(__dirname, 'ja', file);
    if (!fs.existsSync(filePath)) return;
    
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n');
    console.log(`\n--- ${file} ---`);
    lines.forEach((line, i) => {
        // filter out HTML tags, and only print lines with > 15 consecutive letters
        const textOnly = line.replace(/<[^>]+>/g, '').trim();
        if (/[A-Za-z\s]{20,}/.test(textOnly) && !textOnly.includes('function') && !textOnly.includes('var ')) {
            console.log(textOnly);
        }
    });
});
