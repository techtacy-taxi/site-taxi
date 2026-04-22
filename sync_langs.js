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
        { code: 'EL', flag: 'gr', link: `${prefix}el/${fileName}` }
    ];

    const dropdownHtml = `
                <div class="dropdown-content">
                    ${languages.map(l => `<a href="${l.link}"><img src="https://flagcdn.com/w20/${l.flag}.png" width="20" alt="${l.code}" style="vertical-align: middle; margin-right: 8px;"> ${l.code}</a>`).join('\n                    ')}
                </div>`;

    // Replace the entire dropdown-content block
    content = content.replace(/<div class="dropdown-content">[\s\S]*?<\/div>/, dropdownHtml.trim());

    // Update the main button (dropbtn) based on current language
    let currentLang = languages.find(l => l.link.includes(`${lang}/`) || (lang === 'root' && !l.link.includes('/')));
    if (lang === 'he') currentLang = languages.find(l => l.code === 'HE');
    if (lang === 'el') currentLang = languages.find(l => l.code === 'EL');
    
    const flag = currentLang ? currentLang.flag : 'gb';
    const code = currentLang ? currentLang.code : 'EN';

    const newBtn = `<button class="dropbtn"><i class="fas fa-globe"></i> <img src="https://flagcdn.com/w20/${flag}.png" width="18" style="margin: 0 5px;"> ${code} <i class="fas fa-chevron-down"></i></button>`;
    content = content.replace(/<button class="dropbtn">[\s\S]*?<\/button>/, newBtn);

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

const langs = ['root', 'de', 'es', 'pt', 'fr', 'it', 'pl', 'no', 'he', 'el'];
rootFiles.forEach(f => {
    langs.forEach(l => {
        const path = l === 'root' ? f : `${l}/${f}`;
        updateFile(path, l, f);
    });
});

console.log('All language switchers and paths synchronized.');
