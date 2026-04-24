const fs = require('fs');
const path = require('path');

const files = [
    'acropolis-tour.html',
    'argolis-tour.html',
    'delphi-tour.html',
    'meteora-tour.html',
    'sounio-tour.html'
];

let untranslated = [];

files.forEach(file => {
    const filePath = path.join(__dirname, 'ja', file);
    if (!fs.existsSync(filePath)) return;
    
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Split into lines
    const lines = content.split('\n');
    lines.forEach((line, index) => {
        // Very basic heuristic: if it has more than 5 consecutive a-z characters and doesn't look like an HTML tag/attr
        // Better: extract text from tags.
    });
});
