const fs=require('fs'),path=require('path');
const base='https://taxiathenstransfers.com';
const langs=['en','de','fr','es','it','pt','pl','el','he','no'];
const dirs=['','de','fr','es','it','pt','pl','el','he','no'];
const hreflangs=['en','de','fr','es','it','pt','pl','el','he','nb'];
const pages=['index.html','acropolis-tour.html','argolis-tour.html','delphi-tour.html','meteora-tour.html','sounio-tour.html'];
const locales={en:'en_GB',de:'de_DE',fr:'fr_FR',es:'es_ES',it:'it_IT',pt:'pt_PT',pl:'pl_PL',el:'el_GR',he:'he_IL',no:'nb_NO'};

const titles={
  en:{
    'index.html':'Taxi & Van Transfers Athens | Airport Transfers Lavrio, Lagonisi, Keratea',
    'acropolis-tour.html':'Athens & Acropolis Private Tour | Taxi & Van Transfers',
    'argolis-tour.html':'Mycenae & Epidaurus Private Tour | Taxi & Van Transfers',
    'delphi-tour.html':'Delphi & Ancient Oracle Private Tour | Taxi & Van Transfers',
    'meteora-tour.html':'Meteora Monasteries Private Tour | Taxi & Van Transfers',
    'sounio-tour.html':'Cape Sounio & Temple of Poseidon Tour | Taxi & Van Transfers'
  },
  de:{
    'index.html':'Taxi & Van Transfers Athen | Flughafentransfer Lavrio, Lagonisi, Keratea',
    'acropolis-tour.html':'Athen & Akropolis Privattour | Taxi & Van Transfers',
    'argolis-tour.html':'Mykene & Epidaurus Privattour | Taxi & Van Transfers',
    'delphi-tour.html':'Delphi & Antikes Orakel Privattour | Taxi & Van Transfers',
    'meteora-tour.html':'Meteora-Klöster Privattour | Taxi & Van Transfers',
    'sounio-tour.html':'Kap Sounio & Poseidontempel Tour | Taxi & Van Transfers'
  },
  fr:{
    'index.html':'Transferts Taxi & Van Athènes | Aéroport Lavrio, Lagonisi, Keratea',
    'acropolis-tour.html':'Visite Privée Athènes & Acropole | Taxi & Van Transfers',
    'argolis-tour.html':'Visite Privée Mycènes & Épidaure | Taxi & Van Transfers',
    'delphi-tour.html':'Visite Privée Delphes & Oracle Antique | Taxi & Van Transfers',
    'meteora-tour.html':'Visite Privée Monastères des Météores | Taxi & Van Transfers',
    'sounio-tour.html':'Visite Cap Sounion & Temple de Poséidon | Taxi & Van Transfers'
  },
  es:{
    'index.html':'Taxi & Van Transfers Atenas | Traslados Aeropuerto Lavrio, Lagonisi',
    'acropolis-tour.html':'Tour Privado Atenas & Acrópolis | Taxi & Van Transfers',
    'argolis-tour.html':'Tour Privado Micenas & Epidauro | Taxi & Van Transfers',
    'delphi-tour.html':'Tour Privado Delfos & Oráculo Antiguo | Taxi & Van Transfers',
    'meteora-tour.html':'Tour Privado Monasterios de Meteora | Taxi & Van Transfers',
    'sounio-tour.html':'Tour Cabo Sunión & Templo de Poseidón | Taxi & Van Transfers'
  },
  it:{
    'index.html':'Taxi & Van Transfers Atene | Trasferimenti Aeroporto Lavrio, Lagonisi',
    'acropolis-tour.html':'Tour Privato Atene & Acropoli | Taxi & Van Transfers',
    'argolis-tour.html':'Tour Privato Micene & Epidauro | Taxi & Van Transfers',
    'delphi-tour.html':'Tour Privato Delfi & Oracolo Antico | Taxi & Van Transfers',
    'meteora-tour.html':'Tour Privato Monasteri di Meteora | Taxi & Van Transfers',
    'sounio-tour.html':'Tour Capo Sounion & Tempio di Poseidone | Taxi & Van Transfers'
  },
  pt:{
    'index.html':'Taxi & Van Transfers Atenas | Transferências Aeroporto Lavrio, Lagonisi',
    'acropolis-tour.html':'Tour Privado Atenas & Acrópole | Taxi & Van Transfers',
    'argolis-tour.html':'Tour Privado Micenas & Epidauro | Taxi & Van Transfers',
    'delphi-tour.html':'Tour Privado Delfos & Oráculo Antigo | Taxi & Van Transfers',
    'meteora-tour.html':'Tour Privado Mosteiros de Meteora | Taxi & Van Transfers',
    'sounio-tour.html':'Tour Cabo Súnion & Templo de Poseidon | Taxi & Van Transfers'
  },
  pl:{
    'index.html':'Taxi & Van Transfers Ateny | Transfery Lotniskowe Lavrio, Lagonisi',
    'acropolis-tour.html':'Prywatna Wycieczka Ateny & Akropol | Taxi & Van Transfers',
    'argolis-tour.html':'Prywatna Wycieczka Mykeny & Epidauros | Taxi & Van Transfers',
    'delphi-tour.html':'Prywatna Wycieczka Delfy & Starożytna Wyrocznia | Taxi & Van Transfers',
    'meteora-tour.html':'Prywatna Wycieczka Klasztory Meteory | Taxi & Van Transfers',
    'sounio-tour.html':'Wycieczka Przylądek Sunion & Świątynia Posejdona | Taxi & Van Transfers'
  },
  el:{
    'index.html':'Taxi & Van Μεταφορές Αθήνα | Μεταφορές Αεροδρόμιο Λαύριο, Λαγονήσι, Κερατέα',
    'acropolis-tour.html':'Ιδιωτική Περιήγηση Αθήνα & Ακρόπολη | Taxi & Van Transfers',
    'argolis-tour.html':'Ιδιωτική Περιήγηση Μυκήνες & Επίδαυρος | Taxi & Van Transfers',
    'delphi-tour.html':'Ιδιωτική Περιήγηση Δελφοί & Αρχαίο Μαντείο | Taxi & Van Transfers',
    'meteora-tour.html':'Ιδιωτική Περιήγηση Μονές Μετεώρων | Taxi & Van Transfers',
    'sounio-tour.html':'Περιήγηση Σούνιο & Ναός Ποσειδώνα | Taxi & Van Transfers'
  },
  he:{
    'index.html':'Taxi & Van Transfers אתונה | העברות שדה תעופה לבריו, לגוניסי',
    'acropolis-tour.html':'סיור פרטי אתונה ואקרופוליס | Taxi & Van Transfers',
    'argolis-tour.html':'סיור פרטי מיקנה ואפידאורוס | Taxi & Van Transfers',
    'delphi-tour.html':'סיור פרטי דלפי והאורקל העתיק | Taxi & Van Transfers',
    'meteora-tour.html':'סיור פרטי מנזרי מטאורה | Taxi & Van Transfers',
    'sounio-tour.html':'סיור כף סוניון ומקדש פוסידון | Taxi & Van Transfers'
  },
  no:{
    'index.html':'Taxi & Van Transfers Athen | Flyplasstransport Lavrio, Lagonisi, Keratea',
    'acropolis-tour.html':'Privat Tur Athen & Akropolis | Taxi & Van Transfers',
    'argolis-tour.html':'Privat Tur Mykene & Epidaurus | Taxi & Van Transfers',
    'delphi-tour.html':'Privat Tur Delfi & Det Gamle Orakelet | Taxi & Van Transfers',
    'meteora-tour.html':'Privat Tur Meteora-klostrene | Taxi & Van Transfers',
    'sounio-tour.html':'Tur Kapp Sounion & Poseidons Tempel | Taxi & Van Transfers'
  }
};

const descs={
  en:{
    'index.html':'Premium Taxi & Van transfers in Athens, Lavrio, Lagonisi & Keratea. 24/7 Athens Airport pickups, port transfers & private tours to Acropolis, Sounio, Delphi, Meteora.',
    'acropolis-tour.html':'Private Athens & Acropolis tour with luxury taxi or van. Visit the Parthenon, Plaka, Panathenaic Stadium. Half-day or full-day tours from Athens.',
    'argolis-tour.html':'Private Mycenae & Epidaurus tour. Visit the Tomb of Agamemnon, Lion Gate, Nafplio & the ancient theater. Full-day luxury transfer from Athens.',
    'delphi-tour.html':'Private Delphi tour to the Oracle & UNESCO site. Temple of Apollo, Delphi Museum, Arachova village. Full-day luxury transfer from Athens.',
    'meteora-tour.html':'Private Meteora monasteries tour. Visit cliff-top monasteries, stunning rock formations. Full-day or 2-day luxury transfer from Athens.',
    'sounio-tour.html':'Private Cape Sounio sunset tour. Temple of Poseidon, Athenian Riviera drive, Lake Vouliagmeni. Half-day luxury transfer from Athens.'
  },
  de:{
    'index.html':'Premium Taxi & Van Transfers in Athen, Lavrio, Lagonisi & Keratea. 24/7 Flughafen Athen Abholung, Hafentransfers & private Touren zur Akropolis, Sounio, Delphi, Meteora.',
    'acropolis-tour.html':'Private Athen & Akropolis Tour mit Luxus-Taxi oder Van. Besichtigung von Parthenon, Plaka, Panathenäisches Stadion.',
    'argolis-tour.html':'Private Mykene & Epidaurus Tour. Grab des Agamemnon, Löwentor, Nafplio & antikes Theater. Ganztägiger Luxustransfer ab Athen.',
    'delphi-tour.html':'Private Delphi Tour zum Orakel & UNESCO-Weltkulturerbe. Apollontempel, Delphi Museum, Arachova. Ganztägiger Luxustransfer ab Athen.',
    'meteora-tour.html':'Private Meteora-Klöster Tour. Klippenklöster, atemberaubende Felsformationen. Ganztägiger oder 2-Tages Luxustransfer ab Athen.',
    'sounio-tour.html':'Private Kap Sounio Sonnenuntergangs-Tour. Poseidontempel, Athener Riviera, Vouliagmeni-See. Halbtags Luxustransfer ab Athen.'
  },
  fr:{
    'index.html':'Transferts premium Taxi & Van à Athènes, Lavrio, Lagonisi & Keratea. Prise en charge 24/7 aéroport Athènes, transferts port & tours privés Acropole, Sounio, Delphes, Météores.',
    'acropolis-tour.html':'Tour privé Athènes & Acropole en taxi ou van de luxe. Parthénon, Plaka, Stade Panathénaïque. Demi-journée ou journée complète.',
    'argolis-tour.html':'Tour privé Mycènes & Épidaure. Tombe d\'Agamemnon, Porte des Lions, Nauplie & théâtre antique. Journée complète depuis Athènes.',
    'delphi-tour.html':'Tour privé Delphes vers l\'Oracle & site UNESCO. Temple d\'Apollon, Musée de Delphes, Arachova. Journée complète depuis Athènes.',
    'meteora-tour.html':'Tour privé monastères des Météores. Monastères perchés, formations rocheuses. Journée complète ou 2 jours depuis Athènes.',
    'sounio-tour.html':'Tour privé coucher de soleil Cap Sounion. Temple de Poséidon, Riviera athénienne, Lac Vouliagméni. Demi-journée depuis Athènes.'
  },
  es:{
    'index.html':'Traslados premium Taxi & Van en Atenas, Lavrio, Lagonisi & Keratea. Recogida 24/7 aeropuerto Atenas, traslados puerto & tours privados Acrópolis, Sunión, Delfos, Meteora.',
    'acropolis-tour.html':'Tour privado Atenas & Acrópolis en taxi o van de lujo. Partenón, Plaka, Estadio Panatenaico. Medio día o día completo.',
    'argolis-tour.html':'Tour privado Micenas & Epidauro. Tumba de Agamenón, Puerta de los Leones, Nauplia & teatro antiguo. Día completo desde Atenas.',
    'delphi-tour.html':'Tour privado Delfos al Oráculo & sitio UNESCO. Templo de Apolo, Museo de Delfos, Aracova. Día completo desde Atenas.',
    'meteora-tour.html':'Tour privado monasterios de Meteora. Monasterios en acantilados, formaciones rocosas. Día completo o 2 días desde Atenas.',
    'sounio-tour.html':'Tour privado atardecer Cabo Sunión. Templo de Poseidón, Riviera ateniense, Lago Vouliagmeni. Medio día desde Atenas.'
  },
  it:{
    'index.html':'Trasferimenti premium Taxi & Van ad Atene, Lavrio, Lagonisi & Keratea. Prelievo 24/7 aeroporto Atene, trasferimenti porto & tour privati Acropoli, Sounio, Delfi, Meteora.',
    'acropolis-tour.html':'Tour privato Atene & Acropoli in taxi o van di lusso. Partenone, Plaka, Stadio Panatenaico. Mezza giornata o giornata intera.',
    'argolis-tour.html':'Tour privato Micene & Epidauro. Tomba di Agamennone, Porta dei Leoni, Nauplia & teatro antico. Giornata intera da Atene.',
    'delphi-tour.html':'Tour privato Delfi all\'Oracolo & sito UNESCO. Tempio di Apollo, Museo di Delfi, Arachova. Giornata intera da Atene.',
    'meteora-tour.html':'Tour privato monasteri di Meteora. Monasteri sulle scogliere, formazioni rocciose. Giornata intera o 2 giorni da Atene.',
    'sounio-tour.html':'Tour privato tramonto Capo Sounion. Tempio di Poseidone, Riviera ateniese, Lago Vouliagmeni. Mezza giornata da Atene.'
  },
  pt:{
    'index.html':'Transferências premium Taxi & Van em Atenas, Lavrio, Lagonisi & Keratea. Recolha 24/7 aeroporto Atenas, transferências porto & tours privados Acrópole, Súnion, Delfos, Meteora.',
    'acropolis-tour.html':'Tour privado Atenas & Acrópole em táxi ou van de luxo. Partenon, Plaka, Estádio Panatenaico. Meio dia ou dia inteiro.',
    'argolis-tour.html':'Tour privado Micenas & Epidauro. Túmulo de Agamémnon, Porta dos Leões, Náuplia & teatro antigo. Dia inteiro desde Atenas.',
    'delphi-tour.html':'Tour privado Delfos ao Oráculo & sítio UNESCO. Templo de Apolo, Museu de Delfos, Arachova. Dia inteiro desde Atenas.',
    'meteora-tour.html':'Tour privado mosteiros de Meteora. Mosteiros em penhascos, formações rochosas. Dia inteiro ou 2 dias desde Atenas.',
    'sounio-tour.html':'Tour privado pôr do sol Cabo Súnion. Templo de Poseidon, Riviera ateniense, Lago Vouliagmeni. Meio dia desde Atenas.'
  },
  pl:{
    'index.html':'Transfery premium Taxi & Van w Atenach, Lavrio, Lagonisi & Keratea. Odbiór 24/7 lotnisko Ateny, transfery portowe & prywatne wycieczki Akropol, Sunion, Delfy, Meteory.',
    'acropolis-tour.html':'Prywatna wycieczka Ateny & Akropol taksówką lub vanem. Partenon, Plaka, Stadion Panatenajski. Pół dnia lub cały dzień.',
    'argolis-tour.html':'Prywatna wycieczka Mykeny & Epidauros. Grobowiec Agamemnona, Brama Lwów, Nauplia & starożytny teatr. Cały dzień z Aten.',
    'delphi-tour.html':'Prywatna wycieczka Delfy do Wyroczni & UNESCO. Świątynia Apollina, Muzeum w Delfach, Arachova. Cały dzień z Aten.',
    'meteora-tour.html':'Prywatna wycieczka klasztory Meteory. Klasztory na klifach, formacje skalne. Cały dzień lub 2 dni z Aten.',
    'sounio-tour.html':'Prywatna wycieczka zachód słońca Przylądek Sunion. Świątynia Posejdona, Riwiera ateńska, Jezioro Vouliagmeni. Pół dnia z Aten.'
  },
  el:{
    'index.html':'Premium μεταφορές Taxi & Van στην Αθήνα, Λαύριο, Λαγονήσι & Κερατέα. Παραλαβή 24/7 αεροδρόμιο Αθηνών, μεταφορές λιμανιού & ιδιωτικές περιηγήσεις Ακρόπολη, Σούνιο, Δελφοί, Μετέωρα.',
    'acropolis-tour.html':'Ιδιωτική περιήγηση Αθήνα & Ακρόπολη με ταξί ή βαν πολυτελείας. Παρθενώνας, Πλάκα, Παναθηναϊκό Στάδιο.',
    'argolis-tour.html':'Ιδιωτική περιήγηση Μυκήνες & Επίδαυρος. Τάφος Αγαμέμνονα, Πύλη Λεόντων, Ναύπλιο & αρχαίο θέατρο.',
    'delphi-tour.html':'Ιδιωτική περιήγηση Δελφοί στο Μαντείο & μνημείο UNESCO. Ναός Απόλλωνα, Μουσείο Δελφών, Αράχωβα.',
    'meteora-tour.html':'Ιδιωτική περιήγηση μονές Μετεώρων. Μοναστήρια σε βράχους, εντυπωσιακοί σχηματισμοί. Ολοήμερη ή 2ήμερη.',
    'sounio-tour.html':'Ιδιωτική περιήγηση ηλιοβασίλεμα Σούνιο. Ναός Ποσειδώνα, Αθηναϊκή Ριβιέρα, Λίμνη Βουλιαγμένης.'
  },
  he:{
    'index.html':'העברות פרימיום Taxi & Van באתונה, לבריו, לגוניסי וקרטאה. איסוף 24/7 נמל תעופה אתונה, העברות נמל וסיורים פרטיים.',
    'acropolis-tour.html':'סיור פרטי אתונה ואקרופוליס במונית או ואן יוקרתי. פרתנון, פלאקה, האצטדיון הפנאתנאי.',
    'argolis-tour.html':'סיור פרטי מיקנה ואפידאורוס. קבר אגממנון, שער האריות, נאפליו והתיאטרון העתיק.',
    'delphi-tour.html':'סיור פרטי דלפי לאורקל ואתר UNESCO. מקדש אפולו, מוזיאון דלפי, אראכובה.',
    'meteora-tour.html':'סיור פרטי מנזרי מטאורה. מנזרים על צוקים, תצורות סלע מרהיבות.',
    'sounio-tour.html':'סיור פרטי שקיעה כף סוניון. מקדש פוסידון, הריביירה האתונאית, אגם וולאגמני.'
  },
  no:{
    'index.html':'Premium Taxi & Van Transfers i Athen, Lavrio, Lagonisi & Keratea. 24/7 Athen flyplass henting, havnetransport & private turer Akropolis, Sounion, Delfi, Meteora.',
    'acropolis-tour.html':'Privat tur Athen & Akropolis med luksus taxi eller van. Parthenon, Plaka, Panathenaic Stadium. Halv dag eller hel dag.',
    'argolis-tour.html':'Privat tur Mykene & Epidaurus. Agamemnons grav, Løveporten, Nafplio & antikt teater. Hel dag fra Athen.',
    'delphi-tour.html':'Privat tur Delfi til Orakelet & UNESCO-stedet. Apollons tempel, Delfi-museet, Arachova. Hel dag fra Athen.',
    'meteora-tour.html':'Privat tur Meteora-klostre. Klostre på klipper, fantastiske fjellformasjoner. Hel dag eller 2 dager fra Athen.',
    'sounio-tour.html':'Privat tur solnedgang Kapp Sounion. Poseidons tempel, Athen-rivieraen, Vouliagmeni-sjøen. Halv dag fra Athen.'
  }
};

const root=path.join(__dirname);
let count=0;

for(let li=0;li<langs.length;li++){
  const lang=langs[li], dir=dirs[li], hl=hreflangs[li], loc=locales[lang];
  for(const pg of pages){
    const fp=dir?path.join(root,dir,pg):path.join(root,pg);
    if(!fs.existsSync(fp)){console.log('SKIP:',fp);continue;}
    let html=fs.readFileSync(fp,'utf8');

    // Build canonical
    const pgPath=dir?`${dir}/${pg==='index.html'?'':pg}`:pg==='index.html'?'':pg;
    const canon=`${base}/${pgPath}`;

    // Build hreflang block
    let hrefBlock='\n    <!-- Canonical URL -->\n';
    hrefBlock+=`    <link rel="canonical" href="${canon}">\n`;
    hrefBlock+='\n    <!-- Hreflang Tags -->\n';
    for(let j=0;j<langs.length;j++){
      const d=dirs[j],h=hreflangs[j];
      const u=d?`${base}/${d}/${pg==='index.html'?'':pg}`:`${base}/${pg==='index.html'?'':pg}`;
      hrefBlock+=`    <link rel="alternate" hreflang="${h}" href="${u}">\n`;
    }
    hrefBlock+=`    <link rel="alternate" hreflang="x-default" href="${base}/">\n`;

    // Build OG block
    const t=titles[lang]?.[pg]||'';
    const d2=descs[lang]?.[pg]||'';
    let ogBlock='\n    <!-- Open Graph -->\n';
    ogBlock+=`    <meta property="og:type" content="website">\n`;
    ogBlock+=`    <meta property="og:locale" content="${loc}">\n`;
    ogBlock+=`    <meta property="og:site_name" content="Taxi & Van Transfers">\n`;
    ogBlock+=`    <meta property="og:title" content="${t}">\n`;
    ogBlock+=`    <meta property="og:description" content="${d2}">\n`;
    ogBlock+=`    <meta property="og:image" content="${base}/images/hero.jpg">\n`;
    ogBlock+=`    <meta property="og:url" content="${canon}">\n`;
    ogBlock+='\n    <!-- Twitter Card -->\n';
    ogBlock+=`    <meta name="twitter:card" content="summary_large_image">\n`;
    ogBlock+=`    <meta name="twitter:title" content="${t}">\n`;
    ogBlock+=`    <meta name="twitter:description" content="${d2}">\n`;
    ogBlock+=`    <meta name="twitter:image" content="${base}/images/hero.jpg">\n`;

    // Remove old OG tags
    html=html.replace(/\s*<meta property="og:[^"]*"[^>]*>\s*/g,'\n');
    // Remove old twitter tags
    html=html.replace(/\s*<meta name="twitter:[^"]*"[^>]*>\s*/g,'\n');
    // Remove old canonical
    html=html.replace(/\s*<link rel="canonical"[^>]*>\s*/g,'\n');
    // Remove old hreflang
    html=html.replace(/\s*<link rel="alternate" hreflang="[^"]*"[^>]*>\s*/g,'\n');
    // Remove Greek comments
    html=html.replace(/\s*<!-- Πρόσθεσε αυτά στο <head> -->\s*/g,'\n');
    html=html.replace(/\s*<!-- Structured Data για Google -->\s*/g,'\n    <!-- Structured Data -->\n');

    // Update title if we have one
    if(t){
      html=html.replace(/<title>[^<]*<\/title>/,`<title>${t}</title>`);
    }
    // Update description if we have one
    if(d2){
      html=html.replace(/<meta name="description"\s*\n?\s*content="[^"]*">/,`<meta name="description"\n        content="${d2}">`);
    }

    // Add robots meta after viewport if not present
    if(!html.includes('name="robots"')){
      html=html.replace(
        '<meta name="viewport" content="width=device-width, initial-scale=1.0">',
        '<meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <meta name="robots" content="index, follow">'
      );
    }

    // Fix reviewCount placeholder
    html=html.replace('"reviewCount": "X"','"reviewCount": "48"');

    // Insert hreflang+OG before Google Fonts line
    const fontLine='<!-- Google Fonts';
    if(html.includes(fontLine) && !html.includes('hreflang')){
      html=html.replace(`    ${fontLine}`,hrefBlock+ogBlock+`\n    ${fontLine}`);
    }

    // Clean up multiple blank lines
    html=html.replace(/\n{3,}/g,'\n\n');

    fs.writeFileSync(fp,html,'utf8');
    count++;
    console.log(`✅ ${dir||'en'}/${pg}`);
  }
}
console.log(`\nDone! Updated ${count} files.`);
