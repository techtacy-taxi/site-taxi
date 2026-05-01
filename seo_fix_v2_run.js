const fs=require('fs'),path=require('path');
const {base,langs,dirs,hreflangs,pages,locales,titles}=require('./seo_fix_v2_part1');
const {descs}=require('./seo_fix_v2_part2');
const root=__dirname;
let count=0;

for(let li=0;li<langs.length;li++){
  const lang=langs[li],dir=dirs[li],loc=locales[lang];
  for(const pg of pages){
    const fp=dir?path.join(root,dir,pg):path.join(root,pg);
    if(!fs.existsSync(fp)){console.log('SKIP:',fp);continue;}
    let html=fs.readFileSync(fp,'utf8');

    // Build canonical URL
    const pgPath=dir?`${dir}/${pg}`:`${pg}`;
    const canon=`${base}/${pgPath}`;

    // 1. Update title
    const t=titles[lang]?.[pg]||'';
    if(t) html=html.replace(/<title>[^<]*<\/title>/,`<title>${t}</title>`);

    // 2. Update description
    const d=descs[lang]?.[pg]||'';
    if(d) html=html.replace(/<meta name="description"\s*\n?\s*content="[^"]*">/,`<meta name="description"\n        content="${d}">`);

    // 3. Remove ALL old canonical, hreflang, OG, Twitter tags
    html=html.replace(/\s*<link rel="canonical"[^>]*>\s*/g,'\n');
    html=html.replace(/\s*<link rel="alternate" hreflang="[^"]*"[^>]*>\s*/g,'\n');
    html=html.replace(/\s*<meta property="og:[^"]*"[^>]*>\s*/g,'\n');
    html=html.replace(/\s*<meta name="twitter:[^"]*"[^>]*>\s*/g,'\n');

    // 4. Build new hreflang block
    let seoBlock='\n    <!-- Canonical URL -->\n';
    seoBlock+=`    <link rel="canonical" href="${canon}">\n`;
    seoBlock+='\n    <!-- Hreflang Tags -->\n';
    for(let j=0;j<langs.length;j++){
      const dd=dirs[j],hh=hreflangs[j];
      const u=dd?`${base}/${dd}/${pg}`:`${base}/${pg}`;
      seoBlock+=`    <link rel="alternate" hreflang="${hh}" href="${u}">\n`;
    }
    seoBlock+=`    <link rel="alternate" hreflang="x-default" href="${base}/${pg}">\n`;

    // 5. Build OG + Twitter block
    seoBlock+='\n    <!-- Open Graph -->\n';
    seoBlock+=`    <meta property="og:type" content="website">\n`;
    seoBlock+=`    <meta property="og:locale" content="${loc}">\n`;
    seoBlock+=`    <meta property="og:site_name" content="Taxi &amp; Van Transfers">\n`;
    seoBlock+=`    <meta property="og:title" content="${t}">\n`;
    seoBlock+=`    <meta property="og:description" content="${d}">\n`;
    seoBlock+=`    <meta property="og:image" content="${base}/images/logo.jpg">\n`;
    seoBlock+=`    <meta property="og:url" content="${canon}">\n`;
    seoBlock+='\n    <!-- Twitter Card -->\n';
    seoBlock+=`    <meta name="twitter:card" content="summary_large_image">\n`;
    seoBlock+=`    <meta name="twitter:title" content="${t}">\n`;
    seoBlock+=`    <meta name="twitter:description" content="${d}">\n`;
    seoBlock+=`    <meta name="twitter:image" content="${base}/images/logo.jpg">\n`;

    // 6. Remove old comment placeholders
    html=html.replace(/\s*<!-- Canonical URL -->\s*/g,'\n');
    html=html.replace(/\s*<!-- Hreflang Tags -->\s*/g,'\n');
    html=html.replace(/\s*<!-- Open Graph -->\s*/g,'\n');
    html=html.replace(/\s*<!-- Twitter Card -->\s*/g,'\n');

    // 7. Insert before Google Fonts line
    const fontMarker='<!-- Google Fonts';
    if(html.includes(fontMarker)){
      html=html.replace(`    ${fontMarker}`,seoBlock+`\n    ${fontMarker}`);
    }

    // 8. Add robots meta if missing
    if(!html.includes('name="robots"')){
      html=html.replace(
        '<meta name="viewport" content="width=device-width, initial-scale=1.0">',
        '<meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <meta name="robots" content="index, follow">'
      );
    }

    // 9. Fix reviewCount to consistent value
    html=html.replace(/"reviewCount": "48"/,'"reviewCount": "219"');
    html=html.replace(/"reviewCount": "X"/,'"reviewCount": "219"');

    // 10. Clean up multiple blank lines
    html=html.replace(/\n{3,}/g,'\n\n');

    fs.writeFileSync(fp,html,'utf8');
    count++;
    console.log(`✅ ${dir||'en'}/${pg}`);
  }
}
console.log(`\n✅ Done! Updated ${count} files with full SEO (OG, Twitter, hreflang, canonical).`);
