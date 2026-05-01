const fs=require('fs'),p=require('path');
const d=['','de','fr','es','it','pt','pl','el','he','no','zh','ja','hu','ru'];
const pgs=['index.html','acropolis-tour.html','argolis-tour.html','delphi-tour.html','meteora-tour.html','sounio-tour.html'];
let ok=0,fail=0;
for(const dir of d){
  for(const pg of pgs){
    const fp=dir?p.join(__dirname,dir,pg):p.join(__dirname,pg);
    if(!fs.existsSync(fp)){console.log('MISS:',(dir||'en')+'/'+pg);fail++;continue;}
    const h=fs.readFileSync(fp,'utf8');
    const can=h.includes('rel="canonical"');
    const href=h.includes('hreflang');
    const og=h.includes('og:type');
    const tw=h.includes('twitter:card');
    const rob=h.includes('robots');
    const desc=h.includes('description');
    if(can&&href&&og&&tw&&rob&&desc){ok++;}
    else{fail++;console.log('FAIL:',(dir||'en')+'/'+pg,'canonical:'+can,'hreflang:'+href,'og:'+og,'twitter:'+tw,'robots:'+rob,'desc:'+desc);}
  }
}
console.log('\nPass:',ok,'| Fail:',fail,'| Total:',ok+fail);
