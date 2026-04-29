const fs = require('fs');
const path = require('path');

const files = [
    'index.html',
    'acropolis-tour.html',
    'argolis-tour.html',
    'delphi-tour.html',
    'meteora-tour.html',
    'sounio-tour.html'
];

const langs = [
    { code: 'en', path: '' },
    { code: 'de', path: 'de/' },
    { code: 'es', path: 'es/' },
    { code: 'pt', path: 'pt/' },
    { code: 'fr', path: 'fr/' },
    { code: 'it', path: 'it/' },
    { code: 'pl', path: 'pl/' },
    { code: 'no', path: 'no/' },
    { code: 'he', path: 'he/' },
    { code: 'el', path: 'el/' },
    { code: 'zh', path: 'zh/' },
    { code: 'ja', path: 'ja/' },
    { code: 'hu', path: 'hu/' }
];

const baseUrl = 'https://taxiathenstransfers.com/';

function generateHreflangs(fileName) {
    let html = `<!-- Hreflang Tags -->\n`;
    langs.forEach(lang => {
        html += `    <link rel="alternate" hreflang="${lang.code}" href="${baseUrl}${lang.path}${fileName}">\n`;
    });
    html += `    <link rel="alternate" hreflang="x-default" href="${baseUrl}${fileName}">`;
    return html;
}

function generateCanonical(fileName, langPath) {
    return `<!-- Canonical URL -->\n    <link rel="canonical" href="${baseUrl}${langPath}${fileName}">`;
}

langs.forEach(lang => {
    files.forEach(file => {
        const filePath = lang.path === '' ? file : path.join(lang.code, file);
        if (fs.existsSync(filePath)) {
            let content = fs.readFileSync(filePath, 'utf8');
            
            // Replace existing or placeholder Hreflang
            if (content.includes('<!-- Hreflang Tags -->')) {
                content = content.replace(/<!-- Hreflang Tags -->[\s\S]*?(?=<!--|$)/, generateHreflangs(file) + '\n\n');
            }
            
            // Replace existing or placeholder Canonical
            if (content.includes('<!-- Canonical URL -->')) {
                content = content.replace(/<!-- Canonical URL -->[\s\S]*?(?=<!--|$)/, generateCanonical(file, lang.path) + '\n\n');
            }
            
            fs.writeFileSync(filePath, content, 'utf8');
        }
    });
});

console.log('Hreflang and Canonical tags updated for all languages.');
