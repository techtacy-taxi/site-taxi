const fs = require('fs');
const path = require('path');

const dirs = ['.', 'de', 'es', 'fr', 'it', 'pt', 'pl', 'no', 'el', 'he', 'zh', 'ja'];
const files = ['index.html', 'acropolis-tour.html', 'argolis-tour.html', 'delphi-tour.html', 'meteora-tour.html', 'sounio-tour.html'];

const callTranslations = {
    '.': 'Call Us',
    'de': 'Rufen Sie uns an',
    'es': 'Llámanos',
    'fr': 'Appelez-nous',
    'it': 'Chiamaci',
    'pt': 'Ligue para nós',
    'pl': 'Zadzwoń do nas',
    'no': 'Ring oss',
    'el': 'Καλέστε μας',
    'he': 'התקשר אלינו',
    'zh': '给我们打电话',
    'ja': 'お電話ください'
};

dirs.forEach(dir => {
    files.forEach(file => {
        const filePath = path.join(__dirname, dir, file);
        if (!fs.existsSync(filePath)) return;

        let content = fs.readFileSync(filePath, 'utf8');

        // 1. Replace Footer Phone
        content = content.replace(/<p><i class="fas fa-phone"><\/i>\s*\+30 6936123322<\/p>/g, '<p><i class="fas fa-phone"></i> <a href="tel:+306936123322" style="color: inherit; text-decoration: none;">+30 6936123322</a></p>');
        
        // 2. Replace Footer Email
        content = content.replace(/<p><i class="fas fa-envelope"><\/i>\s*book@taxiathenstransfers\.com<\/p>/g, '<p><i class="fas fa-envelope"></i> <a href="mailto:book@taxiathenstransfers.com" style="color: inherit; text-decoration: none;">book@taxiathenstransfers.com</a></p>');

        // 3. Add Call Us button in booking-cta (only on index.html)
        if (file === 'index.html') {
            const callText = callTranslations[dir] || 'Call Us';
            const emailBtnRegex = /(<a href="mailto:book@taxiathenstransfers\.com" class="btn-outline dark-btn">[\s\S]*?<\/a>)/;
            
            // Check if we haven't already added the phone button
            if (!content.includes('href="tel:+306936123322" class="btn-outline dark-btn"')) {
                const callBtnHTML = `\n                <a href="tel:+306936123322" class="btn-outline dark-btn" style="margin-left: 10px;"><i class="fas fa-phone"></i> ${callText}</a>`;
                content = content.replace(emailBtnRegex, `$1${callBtnHTML}`);
            }
        }

        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated ${filePath}`);
    });
});
