const fs = require('fs');
const path = require('path');

const translations = {
    'en': {
        noWaitingTitle: 'No Waiting in Lines',
        noWaitingDesc: 'Pre-book to avoid long queues, especially during Athens\' high season when taxi shortages are a major problem.'
    },
    'el': {
        noWaitingTitle: 'Χωρίς Αναμονή',
        noWaitingDesc: 'Προκρατήστε για να αποφύγετε τις ουρές, ειδικά κατά την high season όπου η Αθήνα αντιμετωπίζει τεράστιο πρόβλημα διαθεσιμότητας ταξί.'
    },
    'de': {
        noWaitingTitle: 'Keine Wartezeiten',
        noWaitingDesc: 'Buchen Sie im Voraus, um lange Warteschlangen zu vermeiden, besonders in der Hochsaison in Athen, wenn Taxis knapp sind.'
    },
    'es': {
        noWaitingTitle: 'Sin Esperas',
        noWaitingDesc: 'Reserve con antelación para evitar largas colas, especialmente durante la temporada alta en Atenas, cuando hay escasez de taxis.'
    },
    'pt': {
        noWaitingTitle: 'Sem Filas de Espera',
        noWaitingDesc: 'Reserve com antecedência para evitar longas filas, especialmente durante a alta temporada de Atenas, quando há grande escassez de táxis.'
    },
    'fr': {
        noWaitingTitle: 'Pas d\'Attente',
        noWaitingDesc: 'Réservez à l\'avance pour éviter les files d\'attente, surtout pendant la haute saison à Athènes où il est très difficile de trouver un taxi.'
    },
    'it': {
        noWaitingTitle: 'Nessuna Attesa',
        noWaitingDesc: 'Prenota in anticipo per evitare lunghe code, specialmente durante l\'alta stagione ad Atene, quando c\'è una grave carenza di taxi.'
    },
    'pl': {
        noWaitingTitle: 'Bez Czekania',
        noWaitingDesc: 'Zarezerwuj z wyprzedzeniem, aby uniknąć długich kolejek, zwłaszcza w szczycie sezonu w Atenach, kiedy brakuje taksówek.'
    },
    'no': {
        noWaitingTitle: 'Ingen Ventetid',
        noWaitingDesc: 'Forhåndsbestill for å unngå lange køer, spesielt i høysesongen i Athen når det er stor mangel på taxier.'
    },
    'he': {
        noWaitingTitle: 'ללא המתנה',
        noWaitingDesc: 'הזמן מראש כדי למנוע תורים ארוכים, במיוחד בעונת השיא באתונה כאשר יש מחסור חמור במוניות.'
    },
    'zh': {
        noWaitingTitle: '无需等待',
        noWaitingDesc: '请提前预订以避免排长队，特别是在雅典的旅游旺季，因为届时很难找到出租车。'
    },
    'ja': {
        noWaitingTitle: '待ち時間なし',
        noWaitingDesc: '特にタクシーが不足するアテネのハイシーズン中は、長い列を避けるために事前予約をお勧めします。'
    }
};

const dirs = ['', 'de', 'es', 'pt', 'fr', 'it', 'pl', 'no', 'he', 'el', 'zh', 'ja'];

dirs.forEach(dir => {
    const filePath = path.join(__dirname, dir, 'index.html');
    if (fs.existsSync(filePath)) {
        let html = fs.readFileSync(filePath, 'utf8');
        const langKey = dir === '' ? 'en' : dir;
        const trans = translations[langKey];

        // 1. Remove the existing fa-taxi block
        // We use a regex that looks for <div class="feature-item... and contains fa-taxi, up to the closing </div>
        const regex = /<div class="feature-item[^>]*>\s*<i class="fas fa-taxi"><\/i>[\s\S]*?<\/div>/i;
        if (regex.test(html)) {
            html = html.replace(regex, '');
        }

        // 2. Prepare the new block
        const injectionString = `
            <div class="feature-item reveal-left">
                <i class="fas fa-taxi"></i>
                <h4>${trans.noWaitingTitle}</h4>
                <p>${trans.noWaitingDesc}</p>
            </div>`;

        // 3. Insert it right after <div class="features-grid">
        const gridTargetStr = `<div class="features-grid">`;
        if (html.includes(gridTargetStr)) {
             html = html.replace(gridTargetStr, gridTargetStr + injectionString);
             fs.writeFileSync(filePath, html, 'utf8');
             console.log(`Updated ${langKey}`);
        } else {
             console.log(`Could not find features-grid in ${langKey}`);
        }
    } else {
        console.log(`File not found: ${filePath}`);
    }
});
