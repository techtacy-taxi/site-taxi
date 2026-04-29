const fs = require('fs');
const path = require('path');

const rootFiles = ['index.html', 'acropolis-tour.html', 'argolis-tour.html', 'delphi-tour.html', 'meteora-tour.html', 'sounio-tour.html'];

function updateFile(filePath, lang, fileName) {
    if (!fs.existsSync(filePath)) return;
    let content = fs.readFileSync(filePath, 'utf-8');

    const prefix = lang === 'root' ? '' : '../';
    
    // Generate the correct dropdown HTML
    const languages = [
        { code: 'EN', flag: 'gb', link: `${prefix}${fileName}` },
        { code: 'DE', flag: 'de', link: `${prefix}de/${fileName}` },
        { code: 'ES', flag: 'es', link: `${prefix}es/${fileName}` },
        { code: 'PT', flag: 'pt', link: `${prefix}pt/${fileName}` },
        { code: 'FR', flag: 'fr', link: `${prefix}fr/${fileName}` },
        { code: 'IT', flag: 'it', link: `${prefix}it/${fileName}` },
        { code: 'PL', flag: 'pl', link: `${prefix}pl/${fileName}` },
        { code: 'NO', flag: 'no', link: `${prefix}no/${fileName}` },
        { code: 'HE', flag: 'il', link: `${prefix}he/${fileName}` },
        { code: 'EL', flag: 'gr', link: `${prefix}el/${fileName}` },
        { code: 'ZH', flag: 'cn', link: `${prefix}zh/${fileName}` },
        { code: 'JA', flag: 'jp', link: `${prefix}ja/${fileName}` },
        { code: 'HU', flag: 'hu', link: `${prefix}hu/${fileName}` }
    ];

    // Update the main button (dropbtn) based on current language
    let currentLang = languages.find(l => l.link.includes(`${lang}/`) || (lang === 'root' && !l.link.includes('/')));
    if (lang === 'he') currentLang = languages.find(l => l.code === 'HE');
    if (lang === 'el') currentLang = languages.find(l => l.code === 'EL');
    if (lang === 'zh') currentLang = languages.find(l => l.code === 'ZH');
    if (lang === 'ja') currentLang = languages.find(l => l.code === 'JA');
    if (lang === 'hu') currentLang = languages.find(l => l.code === 'HU');
    
    const flag = currentLang ? currentLang.flag : 'gb';
    const code = currentLang ? currentLang.code : 'EN';

    // Better: Generate the whole lang-switcher block
    const switcherHtml = `
                <div class="lang-switcher">
                    <button class="dropbtn"><i class="fas fa-globe"></i> <img src="https://flagcdn.com/w20/${flag}.png" width="18" style="margin: 0 5px;"> ${code} <i class="fas fa-chevron-down"></i></button>
                    <div class="dropdown-content">
                        ${languages.map(l => `<a href="${l.link}"><img src="https://flagcdn.com/w20/${l.flag}.png" width="20" alt="${l.code}" style="vertical-align: middle; margin-right: 8px;"> ${l.code}</a>`).join('\n                        ')}
                    </div>
                </div>`;

    // Replace the lang-switcher block
    content = content.replace(/<div class="lang-switcher">[\s\S]*?<\/div>[\s\S]*?<\/div>/, switcherHtml.trim());

    // Also ensure the nav-right and nav-actions structure exists if it's missing (for localized files)
    if (!content.includes('class="nav-right"')) {
        // This is a bit more complex, let's just replace the whole header inner content if possible
        // or just move the switcher in localized files manually once and then let the script handle the content.
    }

    // Set paths for subdirectories
    if (lang !== 'root') {
        content = content.replace(/href="css\//g, 'href="../css/');
        content = content.replace(/src="js\//g, 'src="../js/');
        content = content.replace(/src="images\//g, 'src="../images/');
        content = content.replace(/url\('images\//g, "url('../images/");
        content = content.replace(/href="favicon_io/g, 'href="../images/favicon_io');
        content = content.replace(/href="..\/images\/favicon_io/g, 'href="../images/favicon_io');
        
        if (fileName !== 'index.html') {
            content = content.replace(/header class="navbar"/, 'header class="navbar scrolled"');
        }
        
        if (lang === 'he') {
            content = content.replace(/<html lang="[^"]*">/, '<html lang="he" dir="rtl">');
        } else {
            content = content.replace(/<html lang="[^"]*">/, `<html lang="${lang}">`);
            content = content.replace(/dir="rtl"/, ''); // Remove RTL if copied from HE
        }
    }

    fs.writeFileSync(filePath, content, 'utf-8');
}

const langs = ['root', 'de', 'es', 'pt', 'fr', 'it', 'pl', 'no', 'he', 'el', 'zh', 'ja', 'hu'];
rootFiles.forEach(f => {
    langs.forEach(l => {
        const path = l === 'root' ? f : `${l}/${f}`;
        updateFile(path, l, f);
    });
});

console.log('All language switchers and paths synchronized.');
