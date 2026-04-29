const fs = require('fs');
const path = require('path');

const baseDir = 'c:\\Users\\rs125\\.gemini\\antigravity\\scratch\\taxi_van_transfers';
const languages = ['de', 'el', 'es', 'fr', 'he', 'it', 'ja', 'no', 'pl', 'pt', 'zh', '']; // '' for root (EN)

const translations = {
    'en': { taxi: 'Executive Taxi', van: 'Luxury Van', bus: 'Bus & Mini Bus' },
    'el': { taxi: 'Executive Ταξί', van: 'Πολυτελές Van', bus: 'Λεωφορείο & Mini Bus' },
    'de': { taxi: 'Executive Taxi', van: 'Luxus-Van', bus: 'Bus & Minibus' },
    'es': { taxi: 'Taxi Ejecutivo', van: 'Van de Lujo', bus: 'Autobús y Minibús' },
    'fr': { taxi: 'Taxi Exécutif', van: 'Van de Luxe', bus: 'Bus et Minibus' },
    'it': { taxi: 'Taxi Executive', van: 'Van di Lusso', bus: 'Autobus e Minibus' },
    'pt': { taxi: 'Táxi Executivo', van: 'Van de Luxo', bus: 'Ônibus e Micro-ônibus' },
    'pl': { taxi: 'Taxi Executive', van: 'Luksusowy Van', bus: 'Autobus i Minibus' },
    'no': { taxi: 'Executive Taxi', van: 'Luksus Van', bus: 'Buss og Minibuss' },
    'he': { taxi: 'מונית אקזקיוטיב', van: 'ואן יוקרתי', bus: 'אוטובוס ומיניבוס' },
    'zh': { taxi: '行政出租车', van: '豪华商务车', bus: '巴士和迷你巴士' },
    'ja': { taxi: 'エグゼクティブタクシー', van: '豪華なバン', bus: 'バスとミニバス' }
};

languages.forEach(lang => {
    const filePath = lang === '' ? path.join(baseDir, 'index.html') : path.join(baseDir, lang, 'index.html');
    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8');
        const langKey = lang === '' ? 'en' : lang;
        const t = translations[langKey];

        // Replace Taxi title
        // Pattern: <h3 style="margin: 0;">...</h3> within Taxi card
        // We know Taxi is the first card, Van is second, Bus is third.
        
        // Find Taxi card
        const taxiMatch = content.match(/<!-- Taxi Card -->[\s\S]*?<h3 style="margin: 0;">([\s\S]*?)<\/h3>/);
        if (taxiMatch) {
            content = content.replace(taxiMatch[0], taxiMatch[0].replace(taxiMatch[1], t.taxi));
        }

        // Find Van card
        const vanMatch = content.match(/<!-- Van Card -->[\s\S]*?<h3 style="margin: 0;">([\s\S]*?)<\/h3>/);
        if (vanMatch) {
            content = content.replace(vanMatch[0], vanMatch[0].replace(vanMatch[1], t.van));
        }

        // Find Bus card
        const busMatch = content.match(/<!-- Bus & Mini Bus Card -->[\s\S]*?<h3 style="margin: 0;">([\s\S]*?)<\/h3>/);
        if (busMatch) {
            content = content.replace(busMatch[0], busMatch[0].replace(busMatch[1], t.bus));
        }

        fs.writeFileSync(filePath, content);
        console.log(`Updated titles in ${filePath}`);
    }
});
