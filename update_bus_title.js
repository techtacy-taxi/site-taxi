const fs = require('fs');
const path = require('path');

const baseDir = 'c:\\Users\\rs125\\.gemini\\antigravity\\scratch\\taxi_van_transfers';
const languages = ['de', 'el', 'es', 'fr', 'he', 'it', 'ja', 'no', 'pl', 'pt', 'zh', ''];

const translations = {
    'en': 'Bus & Minibus',
    'el': 'Λεωφορείο & Μικρό Λεωφορείο',
    'de': 'Bus & Minibus',
    'es': 'Autobús y Minibús',
    'fr': 'Bus et Minibus',
    'it': 'Autobus e Minibus',
    'pt': 'Ônibus e Micro-ônibus',
    'pl': 'Autobus i Minibus',
    'no': 'Buss og Minibuss',
    'he': 'אוטובוס ומיניבוס',
    'zh': '巴士和迷你巴士',
    'ja': 'バスとミニバス'
};

languages.forEach(lang => {
    const filePath = lang === '' ? path.join(baseDir, 'index.html') : path.join(baseDir, lang, 'index.html');
    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8');
        const langKey = lang === '' ? 'en' : lang;
        const newTitle = translations[langKey];

        // Find Bus card section and its h3 title
        const busCardRegex = /(<!-- Bus & Mini Bus Card -->[\s\S]*?<h3 style="margin: 0;">)([\s\S]*?)(<\/h3>)/;
        content = content.replace(busCardRegex, `$1${newTitle}$3`);

        fs.writeFileSync(filePath, content);
        console.log(`Updated Bus title in ${filePath} to: ${newTitle}`);
    }
});
