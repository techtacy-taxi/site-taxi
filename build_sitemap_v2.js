const fs=require('fs'),path=require('path');
const base='https://taxiathenstransfers.com';
const langs=['en','de','fr','es','it','pt','pl','el','he','no','zh','ja','hu','ru'];
const dirs= ['',  'de','fr','es','it','pt','pl','el','he','no','zh','ja','hu','ru'];
const hreflangs=['en','de','fr','es','it','pt','pl','el','he','nb','zh','ja','hu','ru'];
const pages=['index.html','acropolis-tour.html','argolis-tour.html','delphi-tour.html','meteora-tour.html','sounio-tour.html'];
const today=new Date().toISOString().split('T')[0];

let xml='<?xml version="1.0" encoding="UTF-8"?>\n';
xml+='<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n';

for(let li=0;li<langs.length;li++){
  const dir=dirs[li];
  for(let pi=0;pi<pages.length;pi++){
    const pg=pages[pi];
    const loc=dir?`${base}/${dir}/${pg}`:`${base}/${pg}`;
    const pri=pg==='index.html'?'1.0':(pi<=1?'0.9':'0.8');
    xml+=`  <url>\n    <loc>${loc}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>${pri}</priority>\n`;
    for(let j=0;j<langs.length;j++){
      const dd=dirs[j],hh=hreflangs[j];
      const u=dd?`${base}/${dd}/${pg}`:`${base}/${pg}`;
      xml+=`    <xhtml:link rel="alternate" hreflang="${hh}" href="${u}" />\n`;
    }
    xml+=`    <xhtml:link rel="alternate" hreflang="x-default" href="${base}/${pg}" />\n`;
    xml+=`  </url>\n`;
  }
}
xml+='</urlset>\n';
fs.writeFileSync(path.join(__dirname,'sitemap.xml'),xml,'utf8');
console.log(`✅ Sitemap updated with ${langs.length} languages × ${pages.length} pages = ${langs.length*pages.length} URLs, lastmod: ${today}`);
