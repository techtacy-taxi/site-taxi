const fs = require('fs');
const path = require('path');

const files = [
    'index.html',
    'acropolis-tour.html',
    'argolis-tour.html',
    'delphi-tour.html',
    'meteora-tour.html',
    'sounio-tour.html'
];

const translations = [
    // --- Specific / Long Strings first ---
    [/Half Day \(4-5h\) or Full Day \(8h\)/gi, 'Félnap (4-5 óra) vagy egész nap (8 óra)'],
    [/Duration: Full Day \(10 - 12 Hours\)/gi, 'Időtartam: Egész nap (10 - 12 óra)'],
    [/Duration: Full Day \(8 - 10 Hours\)/gi, 'Időtartam: Egész nap (8 - 10 óra)'],
    [/Luxury Van or Sedan/gi, 'Luxus furgon vagy limuzin'],
    [/English Speaking Driver/g, 'Angolul beszélő sofőr'],
    [/Entrance Fees Not Included/gi, 'A belépőjegyeket nem tartalmazza'],
    [/The Acropolis & Parthenon/g, 'Az Akropolisz és a Parthenon'],
    [/The Acropolis/g, 'Az Akropolisz'],
    [/Plaka District/g, 'Plaka negyed'],
    [/Book via\s+WhatsApp/gi, 'Foglalás WhatsApp-on'],
    [/Send Inquiry/gi, 'Érdeklődés küldése'],

    // Global
    [/Taxi & Van Transfers/g, 'Taxi és Van Transzfer'],
    [/Services/g, 'Szolgáltatások'],
    [/Why Choose Us/g, 'Miért válasszon minket?'],
    [/Book Now/g, 'Foglaljon most'],
    [/Home/g, 'Főoldal'],
    [/Why Us/g, 'Miért mi?'],
    [/Quick Links/g, 'Gyors linkek'],
    [/Contact Info/g, 'Kapcsolat'],
    [/Your reliable partner for luxury transfers and tours in Greece\./g, 'Az Ön megbízható partnere luxus transzferekben és túrákban Görögországban.'],
    [/All Rights Reserved\./g, 'Minden jog fenntartva.'],
    [/See how customers review us/g, 'Nézze meg ügyfeleink véleményét'],

    // Homepage
    [/Premium Taxi & Van Transfers in Athens & Lavrio/g, 'Prémium taxi- és furgontranszfer Athénban és Lavrióban'],
    [/"Reliable Taxi & Luxury Van services in Lavrio, Lagonisi, and Keratea\./g, '"Megbízható taxi- és luxus furgon szolgáltatások Lavrióban, Lagonisiben és Kerateában.'],
    [/Specialized in seamless Athens Airport pickups, port transfers, and private sightseeing tours\./g, 'Zökkenőmentes athéni reptéri felvételre, kikötői transzferekre és privát városnéző túrákra specializálódva.'],
    [/Best way to reach us/g, 'A legjobb módja, hogy elérjen minket'],
    [/Chat with us/g, 'Csevegjen velünk'],
    [/Vehicle Gallery/g, 'Gépjárműpark galéria'],
    [/View Fleet/g, 'Gépjárműpark megtekintése'],
    [/Our Premium Fleet and Services/g, 'Prémium flottánk és szolgáltatásaink'],
    [/Our Premium Fleet and Services/g, 'Prémium flottánk és szolgáltatásaink'],
    [/Select the perfect ride for your needs, whether you're traveling solo or with a group, discover Greece\./g, 'Válassza ki az igényeinek megfelelő járművet, akár egyedül, akár csoporttal utazik, és fedezze fel Görögországot.'],
    [/Instant replies &bull; Quick booking &bull; 24\/7 available/g, 'Azonnali válasz &bull; Gyors foglalás &bull; 24/7 elérhető'],
    [/Chat on WhatsApp/g, 'WhatsApp csevegés'],
    [/Executive Taxi/g, 'Prémium taxi'],
    [/Only with\s+pre-booking/gi, 'Csak előfoglalással'],
    [/LIVE RIGHT NOW: KONSTANTINOS/g, 'JELENLEG ELÉRHETŐ: KONSTANTINOS'],
    [/Most Popular/g, 'Legnépszerűbb'],
    [/Luxury Van/g, 'Luxus furgon'],
    [/1-4 Passengers/g, '1-4 utas'],
    [/3 Standard Bags/g, '3 szabványos csomag'],
    [/Free Wi-Fi/g, 'Ingyenes Wi-Fi'],
    [/1-8 Passengers/g, '1-8 utas'],
    [/8-10 Bags/g, '8-10 csomag'],
    [/Bottled Water Included/g, 'Palackozott víz biztosítva'],
    [/Bus & Minibus/g, 'Busz és kisbusz'],
    [/Up to 50 Passengers/g, 'Akár 50 utas'],
    [/Ample Luggage Space/g, 'Bőséges hely a csomagoknak'],
    [/Fully Air-Conditioned/g, 'Teljesen légkondicionált'],
    [/Book Taxi/g, 'Taxi foglalása'],
    [/Book Van/g, 'Furgon foglalása'],
    [/Perfect for solo travelers or couples\. Fast, efficient, and comfortable city or airport transfers\./g, 'Tökéletes egyéni utazóknak vagy pároknak. Gyors, hatékony és kényelmes városi vagy reptéri transzferek.'],
    [/Spacious travel for families, groups or sailing crews\. Premium comfort with extra room for luggage\./g, 'Tágas utazás családoknak, csoportoknak vagy hajózó személyzetnek. Prémium kényelem extra helyet biztosítva a csomagoknak.'],
    [/Ideal for large groups and corporate events\./g, 'Ideális nagy csoportok és céges események számára.'],

    // Shared tour
    [/Back to All Tours/gi, 'Vissza az összes túrához'],
    [/Tour Overview/g, 'Túra áttekintése'],
    [/What To Expect/gi, 'Mire számíthat'],
    [/Tour Details/g, 'Túra részletei'],
    [/Price Upon Request/gi, 'Ár érdeklődésre'],
    [/Duration/g, 'Időtartam'],
    [/Private Tour \(1-8 pax\)/g, 'Privát túra (1-8 fő)'],

    // --- Meteora specific ---
    [/Explore the spectacular "columns of the sky\." A magical journey to Greece's\s*most awe-inspiring natural and spiritual site\./g, 'Fedezze fel a látványos „ég oszlopait”. Varázslatos utazás Görögország legfélelmetesebb természeti és spirituális helyszínére.'],
    [/Meteora is truly a geological phenomenon\. Here, massive dark rock pillars rise\s*dramatically from the plains of Thessaly, crowned by ancient Eastern Orthodox monasteries\. It is a\s*UNESCO World Heritage site and offers some of the most surreal landscapes in Europe\./g, 'Meteora valóban geológiai jelenség. Itt hatalmas, sötét sziklaoszlopok emelkednek ki drámaian a Thesszáliai-síkságból, melyeket ősi ortodox kolostorok koronáznak. Ez az UNESCO Világörökség része, és Európa legszürreálisabb tájait kínálja.'],
    [/On this private grand tour, you will travel north through the Greek mainland\. Our\s*knowledgeable drivers will ensure a comfortable journey\. Upon arriving at Kalambaka, you'll be driven up\s*to the immense rock formations to visit the historic monasteries, witness the breathtaking panoramic\s*views, and learn about the monastic life\./g, 'Ezen a privát nagy túrán észak felé utazik a görög szárazföldön keresztül. Hozzáértő sofőreink kényelmes utazást biztosítanak. Kalambakába érkezve felvisszük Önöket a hatalmas sziklaalakzatokhoz, hogy meglátogassák a történelmi kolostorokat, szemtanúi legyenek a lélegzetelállító panorámának, és megismerjék a szerzetesi életet.'],
    [/The Rocks/g, 'A sziklák'],
    [/Giant natural sandstone pillars/g, 'Hatalmas természetes homokkő oszlopok'],
    [/The Monasteries/g, 'A kolostorok'],
    [/Built perfectly on the cliffs/g, 'Tökéletesen a sziklákra építve'],
    [/1\. Early Departure/g, '1. Korai indulás'],
    [/Since Meteora is located in central Greece, we begin our day early\. Your private driver will pick\s*you up from your Athens hotel for the road trip north\./g, 'Mivel Meteora Közép-Görögországban található, korán kezdjük a napot. Privát sofőrje felveszi Önt athéni szállodájából az északi utazáshoz.'],
    [/2\. The Greek Mainland/g, '2. A görög szárazföld'],
    [/Enjoy the beautiful changing landscapes, passing by the battlefield of Thermopylae \(the monument\s*of King Leonidas\) and across the fertile Thessalian plain\./g, 'Élvezze a gyönyörű, változó tájakat, elhaladva a Thermopülai csatatér (Leonidasz király emlékműve) mellett és a termékeny Thesszáliai-síkságon keresztül.'],
    [/3\. Arrival at Kalambaka/g, '3. Érkezés Kalambakába'],
    [/Reach the picturesque town of Kalambaka, which rests right at the foot of the Meteora rocks\. From\s*here, the towering cliffs become visible\./g, 'Elérjük Kalambaka festői városát, amely közvetlenül a Meteora-sziklák lábánál fekszik. Innen már láthatóvá válnak a tornyosuló sziklák.'],
    [/4\. Monastery Visits & Sightseeing/g, '4. Kolostorlátogatások és városnézés'],
    [/We'll drive you safely up the winding roads to visit 2 or 3 of the active monasteries \(like Great\s*Meteoron or Varlaam\)\. You will have time to explore and take incredible photos from the best\s*viewpoints\./g, 'Biztonságban felvisszük Önöket a kanyargós utakon, hogy meglátogassanak 2 vagy 3 aktív kolostورت (például a Nagy Meteoront vagy a Varlaamot). Lesz idejük felfedezni és hihetetlen fotókat készíteni a legjobb kilátópontokról.'],
    [/5\. Lunch & Smooth Return/g, '5. Ebéd és zökkenőmentes visszatérés'],
    [/After a traditional Greek lunch in Kalambaka or Kastraki village, you can sit back and relax as\s*we drive you comfortably back to Athens\./g, 'Egy hagyományos görög ebéd után Kalambakában vagy Kastraki faluban, dőljön hátra és lazítson, miközben kényelmesen visszaszállítjuk Athénba.'],

    // --- Sounio specific ---
    [/Sunset at the edge of the world\. Experience the breathtaking beauty of the Athenian Riviera\./g, 'Naplemente a világ peremén. Tapasztalja meg az athéni riviéra lélegzetelállító szépségét.'],
    [/Escape the bustling city of Athens and embark on a scenic drive along the mesmerizing\s*and beautiful Athenian Riviera\. Our destination is Cape Sounio, the southernmost tip of the Attica\s*peninsula, famous for its majestic Temple of Poseidon\./g, 'Meneküljön el Athén nyüzsgő városából, és induljon el egy látványos autózásra a lenyűgöző és gyönyörű athéni riviéra mentén. Úticélunk a Szounio-fok, az Attika-félsziget legdélibbi csücske, amely fenséges Poszeidón-templomáról híres.'],
    [/Arrive at Cape Sounio\. You will have plenty of time to explore the ancient ruins, take stunning\s*photos, and watch the sun dip below the Aegean horizon\./g, 'Érkezés a Szounio-fokhoz. Bőséges ideje lesz a romok felfedezésére, lenyűγöző fotók készítésére, és végignézheti, ahogy a nap az égei horizont alá süllyed.'],
    [/Temple of Poseidon/g, 'Poszeidón-temploma'],
    [/Ancient architecture/g, 'Ókori építészet'],
    [/Athenian Riviera/g, 'Athéni riviéra'],
    [/Scenic coastal drive/g, 'Part menti panorámás út'],
    [/1\. Coastal Drive/g, '1. Part menti út'],
    [/Your private driver will pick you up for a scenic drive along the Saronic Gulf, passing through the\s*beautiful seaside suburbs of Glyfada, Vouliagmeni, and Varkiza\./g, 'Privát sofőrje felveszi Önt egy látványos autózásra a Szaroniki-öböl mentén, áthaladva Glyfada, Vouliagmeni és Varkiza gyönyörű tengerparti külvárosain.'],
    [/2\. Lake Vouliagmeni/g, '2. Vouliagmeni-tó'],
    [/We'll make a short stop at the natural thermal Lake Vouliagmeni, a hidden gem of the Riviera known\s*for its healing waters and stunning cliff backdrop\./g, 'Rövid megállót teszünk a természetes termálvizű Vouliagmeni-tónál, a riviéra rejtett gyöngyszeménél, amely gyógyvizéről és lenyűgöző sziklahátteréről híres.'],
    [/3\. Cape Sounio Arrival/g, '3. Érkezés a Szounio-fokhoz'],
    [/4\. Sunset Experience/g, '4. Naplemente élmény'],
    [/Witness the legendary sunset from the temple ruins\. Watch the sun dip into the Aegean Sea in a\s*spectacle of vibrant colors\./g, 'Legyen tanúja a legendás naplementének a templomromoktól. Nézze meg, ahogy a nap az Égei-tengerbe merül az élénk színek látványosságában.'],
    [/5\. Return or Seaside Dinner/g, '5. Visszatérés vagy tengerparti vacsora'],
    [/After the sunset, we can head back to Athens or, if you prefer, stop at a traditional Greek\s*tavern by the sea for fresh seafood before returning\./g, 'A naplemente után visszaindulhatunk Athénba, vagy ha úgy tetszik, megállhatunk egy hagyományos görög haltavernában a tengerparton friss tengeri ételekre a visszatérés előtt.'],
    [/Gallery/g, 'Galéria'],
    [/Meteora Monasteries/g, 'Meteora kolostorok'],
    [/Acropolis/g, 'Akropolisz'],
    [/Delphi/g, 'Delphoi'],
    [/Sounio/g, 'Szounio'],
    [/Argolis/g, 'Argolisz'],
    [/Mycenae/g, 'Mükéné'],
    [/Epidaurus/g, 'Epidaurusz'],
];

// Create hu directory if not exists
const huDir = path.join(__dirname, 'hu');
if (!fs.existsSync(huDir)) {
    fs.mkdirSync(huDir);
}

files.forEach(file => {
    const enPath = path.join(__dirname, file);
    const huPath = path.join(__dirname, 'hu', file);
    
    if (fs.existsSync(enPath)) {
        let content = fs.readFileSync(enPath, 'utf8');

        translations.forEach(([regex, replacement]) => {
            content = content.replace(regex, replacement);
        });

        // Set language attribute
        content = content.replace(/<html lang="en">/, '<html lang="hu">');

        // FIX: Revert accidentally translated function names and property keys
        content = content.replace(/openVehicleGaléria/g, 'openVehicleGallery');
        content = content.replace(/closeVehicleGaléria/g, 'closeVehicleGallery');
        content = content.replace(/Vehicle Galéria/g, 'Gépjárműpark galéria');

        fs.writeFileSync(huPath, content, 'utf8');
        console.log(`Translated ${file} to hu`);
    }
});
