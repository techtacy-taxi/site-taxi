const fs = require('fs');
const path = require('path');

const baseDir = 'c:\\Users\\rs125\\.gemini\\antigravity\\scratch\\taxi_van_transfers';
const languages = ['de', 'el', 'es', 'fr', 'he', 'it', 'ja', 'no', 'pl', 'pt', 'zh', ''];

const taxiTranslations = {
    'en': 'Executive Taxi',
    'el': 'Πολυτελές Ταξί',
    'de': 'Executive Taxi',
    'es': 'Taxi Ejecutivo',
    'fr': 'Taxi Exécutif',
    'it': 'Taxi Executive',
    'pt': 'Táxi Executivo',
    'pl': 'Taxi Executive',
    'no': 'Executive Taxi',
    'he': 'מונית אקזקיוטיβ',
    'zh': '行政出租车',
    'ja': 'エグゼクティブタクシー'
};

const vanTranslations = {
    'en': 'Luxury Van',
    'el': 'Πολυτελές Van',
    'de': 'Luxus-Van',
    'es': 'Van de Lujo',
    'fr': 'Van de Luxe',
    'it': 'Van di Lusso',
    'pt': 'Van de Luxo',
    'pl': 'Luksusowy Van',
    'no': 'Luksus Van',
    'he': 'ואן יוקרתי',
    'zh': '豪华商务车',
    'ja': '豪華なバン'
};

languages.forEach(lang => {
    const filePath = lang === '' ? path.join(baseDir, 'index.html') : path.join(baseDir, lang, 'index.html');
    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8');
        const langKey = lang === '' ? 'en' : lang;

        // Update Taxi title
        const taxiRegex = /(<!-- Taxi Card -->[\s\S]*?<h3 style="margin: 0;">)([\s\S]*?)(<\/h3>)/;
        content = content.replace(taxiRegex, `$1${taxiTranslations[langKey]}$3`);

        // Update Van title
        const vanRegex = /(<!-- Van Card -->[\s\S]*?<h3 style="margin: 0;">)([\s\S]*?)(<\/h3>)/;
        content = content.replace(vanRegex, `$1${vanTranslations[langKey]}$3`);

        fs.writeFileSync(filePath, content);
        console.log(`Updated Taxi/Van titles in ${filePath}`);
    }
});
