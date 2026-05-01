// Quick fix for files that missed the insertion due to formatting
const fs=require('fs'),path=require('path');
const {base,langs,dirs,hreflangs,pages,locales,titles}=require('./seo_fix_v2_part1');
const {descs}=require('./seo_fix_v2_part2');
const root=__dirname;
let fixed=0;

for(let li=0;li<langs.length;li++){
  const lang=langs[li],dir=dirs[li],loc=locales[lang];
  for(const pg of pages){
    const fp=dir?path.join(root,dir,pg):path.join(root,pg);
    if(!fs.existsSync(fp)) continue;
    let html=fs.readFileSync(fp,'utf8');

    // Check if OG tags already exist
    if(html.includes('og:title')) continue;

    const t=titles[lang]?.[pg]||'';
    const d=descs[lang]?.[pg]||'';
    const pgPath=dir?`${dir}/${pg}`:`${pg}`;
    const canon=`${base}/${pgPath}`;

    let seoBlock='\n    <!-- Canonical URL -->\n';
    seoBlock+=`    <link rel="canonical" href="${canon}">\n`;
    seoBlock+='\n    <!-- Hreflang Tags -->\n';
    for(let j=0;j<langs.length;j++){
      const dd=dirs[j],hh=hreflangs[j];
      const u=dd?`${base}/${dd}/${pg}`:`${base}/${pg}`;
      seoBlock+=`    <link rel="alternate" hreflang="${hh}" href="${u}">\n`;
    }
    seoBlock+=`    <link rel="alternate" hreflang="x-default" href="${base}/${pg}">\n`;
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
    seoBlock+=`    <meta name="twitter:image" content="${base}/images/logo.jpg">\n\n`;

    // Try multiple marker patterns
    const markers=['    <!-- Google Fonts','<!-- Google Fonts'];
    let inserted=false;
    for(const m of markers){
      if(html.includes(m)){
        html=html.replace(m, seoBlock+m);
        inserted=true;
        break;
      }
    }
    if(inserted){
      html=html.replace(/\n{3,}/g,'\n\n');
      fs.writeFileSync(fp,html,'utf8');
      fixed++;
      console.log(`🔧 Fixed: ${dir||'en'}/${pg}`);
    }
  }
}
console.log(`\n✅ Fixed ${fixed} files that were missing OG/Twitter tags.`);
