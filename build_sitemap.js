const fs = require('fs');

const base = 'https://taxiathenstransfers.com';
const langs = ['', 'de', 'fr', 'es', 'it', 'pt', 'pl', 'el', 'he', 'no', 'zh', 'ja'];
const hreflangs = ['en', 'de', 'fr', 'es', 'it', 'pt', 'pl', 'el', 'he', 'nb', 'zh', 'ja'];
const pages = [
    { url: '', priority: '1.0' },
    { url: 'acropolis-tour.html', priority: '0.9' },
    { url: 'argolis-tour.html', priority: '0.8' },
    { url: 'delphi-tour.html', priority: '0.8' },
    { url: 'meteora-tour.html', priority: '0.8' },
    { url: 'sounio-tour.html', priority: '0.9' }
];

let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n`;

for (let i = 0; i < langs.length; i++) {
    const langDir = langs[i];
    
    for (const page of pages) {
        let pageUrl = langDir ? `${base}/${langDir}/${page.url}` : `${base}/${page.url}`;
        if (pageUrl.endsWith('/')) pageUrl = pageUrl.slice(0, -1); // remove trailing slash for clean URLs if needed, but index.html is empty string
        if (page.url === '') pageUrl = langDir ? `${base}/${langDir}/` : `${base}/`;

        xml += `  <url>\n`;
        xml += `    <loc>${pageUrl}</loc>\n`;
        xml += `    <changefreq>weekly</changefreq>\n`;
        xml += `    <priority>${page.priority}</priority>\n`;

        // Add hreflang links for all languages
        for (let j = 0; j < langs.length; j++) {
            const hLangDir = langs[j];
            const hCode = hreflangs[j];
            let hUrl = hLangDir ? `${base}/${hLangDir}/${page.url}` : `${base}/${page.url}`;
            if (page.url === '') hUrl = hLangDir ? `${base}/${hLangDir}/` : `${base}/`;
            
            xml += `    <xhtml:link rel="alternate" hreflang="${hCode}" href="${hUrl}" />\n`;
        }
        // x-default
        let xDefaultUrl = `${base}/${page.url}`;
        if (page.url === '') xDefaultUrl = `${base}/`;
        xml += `    <xhtml:link rel="alternate" hreflang="x-default" href="${xDefaultUrl}" />\n`;
        
        xml += `  </url>\n`;
    }
}

xml += `</urlset>`;

fs.writeFileSync('sitemap.xml', xml, 'utf8');
console.log('Sitemap generated.');
