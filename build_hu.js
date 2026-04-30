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

    // --- Athens & Acropolis Tour ---
    [/Athens & Acropolis Experience/g, 'Athén και Akropolisz élmény'],
    [/Discover the cradle of Western civilization\. A complete journey through the/g, 'Fedezze fel a nyugati civilizáció bölcsőjét. Teljes utazás Athén'],
    [/historical highlights of Athens\./g, 'történelmi látványosságain keresztül.'],
    [/Athens is a city where ancient mythology and modern vibrancy exist side-by-side\. Our/g, 'Athén egy olyan város, ahol az ókori mitológia és a modern pezsgés egymás mellett él. A'],
    [/private Athens City Tour is designed to give you a comprehensive understanding of the city's glorious/g, 'privát athéni városnézésünket úgy alakítottuk ki, hogy átfogó képet kapjon a város dicső'],
    [/past, picking you up from your location and driving you through the historical center in ultimate/g, 'múltjáról, felvéve Önt a tartózkodási helyéről, και a történelmi központon keresztül szállítva a legnagyobb'],
    [/comfort\./g, 'kényelemben.'],
    [/You will witness architectural masterpieces such as the Parthenon on the Acropolis/g, 'Szemtanúja lesz olyan építészeti remekműveknek, mint az Akropolisz-dombon található Parthenon,'],
    [/hill, experience the charm of the oldest neighborhood of Athens, and see where the first modern Olympic/g, 'megismerheti Athén legrégebbi negyedének varázsát, και láthatja, hol rendezték meg az első modern olimpiai'],
    [/Games took place\. Your driver will provide historical context and let you explore each monument at your/g, 'játékokat. Sofőrje történelmi kontextust biztosít, και hagyja, hogy minden emlékművet a saját'],
    [/own pace\./g, 'tempójában fedezzen fel.'],
    [/Parthenon & Erechtheion/g, 'Parthenon és Erektheion'],
    [/The Neighborhood of the Gods/g, 'Az istenek negyede'],
    [/1\. Premium Pickup/g, '1. Prémium felvétel'],
    [/Your private driver will meet you at your hotel, apartment, or cruise ship port to begin the tour/g, 'Privát sofőrje a szállodájánál, apartmanjánál vagy a hajókikötőben várja Önt, hogy megkezdjék a túrát'],
    [/in our fully air-conditioned luxury vehicle\./g, 'teljesen légkondicionált luxusjárművünkben.'],
    [/2\. The Acropolis & Parthenon/g, '2. Az Akropolisz και a Parthenon'],
    [/Our first stop is the world-famous Acropolis\. You will have time to walk up the hill, explore the/g, 'Első állomásunk a világhírű Akropolisz. Lesz ideje felgyalogolni a dombra, felfedezni a'],
    [/magnificent Parthenon, the Temple of Athena Nike, and take panoramic photos of the entire city/g, 'pompás Parthenont, Athéné Niké templomát, και panorámafotókat készíteni az egész városról'],
    [/from the top\./g, 'a fentről.'],
    [/3\. Panathenaic Stadium/g, '3. Panathinaiko Stadion'],
    [/We'll drive to the impressive all-marble Panathenaic Stadium, the historic site of the first/g, 'Elautózunk a lenyűgöző, csupa márvány Panathinaiko Stadionhoz, az 1896-ban megrendezett első'],
    [/modern Olympic Games held in 1896\./g, 'modern olimpiai játékok történelmi helyszínére.'],
    [/4\. Changing of the Guards/g, '4. Őrségváltás'],
    [/Next stop is Syntagma Square and the Greek Parliament to witness the traditional changing of the/g, 'A következő állomás a Szintagma tér και a görög parlament, ahol megtekinthetjük az'],
    [/Presidential Guards \(Evzones\) at the Tomb of the Unknown Soldier\./g, 'elnöki gárda (Evzones) hagyományos őrségváltását az Ismeretlen Katona Sírjánál.'],
    [/5\. Mount Lycabettus & Plaka/g, '5. Lükabéttosz-hegy και Plaka'],
    [/We'll drive up Lycabettus Hill for the highest viewpoint in Athens, and conclude with a walk/g, 'Felautózunk a Lükabéttosz-dombra Athén legmagasabb kilátópontjáért, και egy sétával zárjuk a'],
    [/through Plaka, the charming old town full of traditional tavernas and shops before returning to/g, 'Plakán, a hagyományos tavernákkal και üzletekkel teli bájos óvároson keresztül, mielőtt visszatérnénκ a'],
    [/your hotel\./g, 'szállodájába.'],

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
    [/LIVE RIGHT NOW: KONSTANTINOS/g, 'JELENLEG ELÉRHETŐ: KONSTANTINOS'],
    [/Only with\s+pre-booking/gi, 'Csak előfoglalással'],

    // --- Services Section Missing ---
    [/Athens Airport Transfer/g, 'Athéni repülőtéri transzfer'],
    [/Direct pickup from the gate so you don't have to walk\. Skip the long taxi lines and arrive/g, 'Közvetlen felvétel a kapunál, így nem kell gyalogolnia. Kerülje el a hosszú taxi sorokat és érkezzen meg'],
    [/stress-free\. We monitor your flight\./g, 'stresszmentesen. Figyeljük a járatát.'],
    [/Gate Pickup, No Walking/g, 'Felvétel a kapunál, nincs gyaloglás'],
    [/Skip Taxi Queues/g, 'Taxisorok kihagyása'],
    [/60m Free Wait Time/g, '60 perc ingyenes várakozás'],
    [/Book Transfer/g, 'Transzfer foglalása'],
    [/Select Transfer Type:/g, 'Válassza ki a transzfer típusát:'],
    [/Arrival \(From Airport\)/g, 'Érkezés (repülőtérről)'],
    [/Departure \(To Airport\)/g, 'Indulás (repülőtérre)'],

    [/Lavrio Port, Olympic Marine/g, 'Lavrio kikötő, Olympic Marine'],
    [/"Seamless pickup directly from your yacht\. Specialized in transfers for sailing crews with/g, '"Zökkenőmentes felvétel közvetlenül a jachtjáról. Vitorlás személyzetek transzferére szakosodva,'],
    [/high-capacity vans for extra gear and heavy bags\./g, 'nagy kapacitású furgonokkal az extra felszerelésekhez és nehéz csomagokhoz.'],
    [/No need to struggle finding a vehicle that fits your entire crew and equipment\./g, 'Nem kell küzdenie olyan jármű megtalálásával, amelybe az egész személyzet és a felszerelés is befér.'],
    [/Crew Vans Available/g, 'Személyzeti furgonok elérhetők'],
    [/Excess Luggage Friendly/g, 'Túlsúlyos csomag barát'],
    [/Point-to-Point Service/g, 'Ponttól-pontig szolgáltatás'],

    [/Main Ports: Piraeus, Rafina, Lavrio/g, 'Fő kikötők: Pireusz, Rafina, Lavrio'],
    [/Seamless pickup directly from your ferry, cruise ship, or hydrofoil\. Skip the long taxi queues at/g, 'Zökkenőmentes felvétel közvetlenül a kompról, luxushajóról vagy szárnyashajóról. Kerülje el a hosszú taxisorokat'],
    [/busy ports and enjoy a fixed-price transfer/g, 'a forgalmas kikötőkben, και élvezze a fix áras transzfert'],
    [/to your hotel or Athens Airport\. We monitor ferry arrivals/g, 'szállodájába vagy az athéni repülőtérre. Figyeljük a kompok érkezését'],
    [/Pier-Side Pickup/g, 'Felvétel a mólónál'],
    [/Fixed & Upfront Pricing/g, 'Fix és előre látható árazás'],
    [/We Monitor Ferry Times/g, 'Figyeljük a komp menetrendet'],

    [/Airbnb villas and hotels/g, 'Airbnb villák és szállodák'],
    [/Reliable 24\/7 transfers directly to your villa, apartment, or hotel\. We specialize in finding even/g, 'Megbízható 24/7 transzferek közvetlenül villájába, apartmanjába vagy szállodájába. Sikerrel megtaláljuk még'],
    [/the most remote locations in Lagonisi and Keratea\./g, 'a legtávolabbi helyszíneket is Lagonisiben és Kerateában.'],
    [/Enjoy a stress-free arrival with a professional driver waiting for you\./g, 'Élvezze a stresszmentes érkezést egy profi sofőrrel, aki várja Önt.'],
    [/Door-to-Door Service/g, 'Háztól házig szolgáltatás'],
    [/Perfect for Families/g, 'Tökéletes családoknak'],
    [/Local Area Experts/g, 'A környék szakértői'],

    [/Athens & Akropolisz Tour/g, 'Athén és Akropolisz túra'],
    [/Explore the historical heart of Greece\. Full or half-day private tours of the Akropolisz, Plaka, and/g, 'Fedezze fel Görögország történelmi szívét. Egész vagy félnapos privát túrák az Akropolisznál, a Plakánál és'],
    [/more\./g, 'egyebeknél.'],
    [/Panoramic Stops/g, 'Panorámás megállók'],
    [/4 to 8 Hours/g, '4-8 óra'],
    [/Knowledgeable Driver/g, 'Hozzáértő sofőr'],
    [/View Details/g, 'Részletek megtekintése'],

    [/Szounio & Poszeidón-temploma/g, 'Szounio és Poszeidón-temploma'],
    [/Experience the breathtaking sunset at Cape Szounio along the beautiful Athéni riviéra\./g, 'Tapasztalja meg a lélegzetelállító naplementét a Szounio-foknál a gyönyörű Athéni riviéra mentén.'],
    [/Coastal Scenic Drive/g, 'Part menti panorámaút'],
    [/4 to 5 Hours/g, '4-5 óra'],
    [/Sunset Views/g, 'Naplemente kilátás'],

    [/Delphoi & Ancient Oracle/g, 'Delphoi και az ókori jósda'],
    [/Journey to the "Navel of the World" and immerse yourself in the mystique of/g, 'Utazzon a „világ köldökéhez”, και merüljön el az ókori Görögország'],
    [/ancient Greece\./g, 'misztikumában.'],
    [/Step back in time with a full-day excursion to Delphi, considered by ancient Greeks to/g, 'Lépjen vissza az időben egy egész napos delphoi kirándulással, amelyet az ókori görögök'],
    [/be the center of the world\. Nestled on the slopes of Mount Parnassus, Delphi is one of the most stunning/g, 'a világ központjának tartottak. A Parnasszosz-hegy lejtőin fekvő Delphoi Görögország egyik leglenyűgözőbb'],
    [/UNESCO World Heritage sites in Greece\./g, 'UNESCO Világörökségi helyszíne.'],
    [/On this private day trip, you will marvel at the Temple of Apollo where the famous/g, 'Ezen a privát egynapos kiránduláson megcsodálhatja az Apolló-templomot, ahol a híres'],
    [/Oracle delivered her prophecies, explore the ancient theater, and witness incredible artifacts in the/g, 'Püthia jóslatait adta, felfedezheti az ókori színházat, και hihetetlen leleteket láthat a'],
    [/Delphi Archaeological Museum\. The route also takes you through scenic mountain landscapes and/g, 'Delphoi Régészeti Múzeumban. Az útvonal látványos hegyi tájakon και'],
    [/traditional villages\./g, 'hagyományos falvakon keresztül vezet.'],
    [/The sanctuary of the Oracle/g, 'A jósda szentélye'],
    [/Picturesque mountain town/g, 'Festői hegyi város'],
    [/1\. Hotel \/ Port Pickup/g, '1. Szállodai / kikötői felvétel'],
    [/Start your day early as your private driver picks you up from your Athens location in a premium,/g, 'Kezdje korán a napot, amint privát sofőrje felveszi Önt athéni tartózkodási helyéről egy prémium,'],
    [/climate-controlled vehicle\./g, 'légkondicionált járművel.'],
    [/2\. Scenic Mountain Drive/g, '2. Panorámás hegyi út'],
    [/Enjoy a relaxing drive through the fertile plain of Boeotia, crossing the towns of Thebes and/g, 'Élvezze a pihentető autózást Boiótia termékeny síkságán keresztül, áthaladva Théba και'],
    [/Levadia before ascending the majestic Mount Parnassus\./g, 'Levadia városán, mielőtt felkapaszkodna a fenséges Parnasszosz-hegyre.'],
    [/3\. Delphi Archaeological Site/g, '3. Delphoi régészeti lelőhely'],
    [/Arrive at Delphi to explore the incredible ruins\. Walk the Sacred Way, visit the Temple of/g, 'Érkezés Delphoiba a hihetetlen romok felfedezéséhez. Sétáljon a Szent Úton, látogassa meg Apolló'],
    [/Apollo, the ancient Theater, and the Stadium where the Pythian Games were held\./g, 'templomát, az ókori színházat és a stadiont, ahol a püthiai játékokat tartották.'],
    [/4\. Delphi Museum/g, '4. Delphoi Múzeum'],
    [/Discover masterpieces of ancient Greek sculpture, including the famous bronze Charioteer and the/g, 'Fedezze fel az ókori görög szobrászat remekműveit, köztük a híres bronz kocsihajtót és a'],
    [/Sphinx of Naxos\./g, 'Naxoszi Szfinxet.'],
    [/5\. Arachova & Lunch/g, '5. Arachova és ebéd'],
    [/Stop at the beautiful mountain village of Arachova for a traditional Greek lunch \(optional\) and/g, 'Álljon meg Arachova gyönyörű hegyi falujában egy hagyományos görög ebédre (opcionális) és'],
    [/some souvenir shopping before we begin our comfortable drive back to Athens\./g, 'szuvenírvásárlásra, mielőtt megkezdenénk kényelmes visszautazásunkat Athénba.'],
    [/Historical Ruins/g, 'Történelmi romok'],

    [/Meteora Monasteries/g, 'Meteora kolostorok'],
    [/Marvel at the breathtaking rock formations and visit the spectacular cliff-top monasteries\./g, 'Csodálja meg a lélegzetelállító sziklaalakzatokat και látogassa meg a látványos sziklatetőn lévő kolostorokat.'],
    [/Spectacular Views/g, 'Látványos kilátás'],
    [/Full Day \/ 2 Days/g, 'Egész nap / 2 nap'],
    [/Monastery Visits/g, 'Kolostorlátogatások'],

    [/Mycenae & Epidaurus/g, 'Mükéné και Epidaurusz'],
    [/Explore the legendary Tomb of Agamemnon and the ancient theater with perfect acoustics\./g, 'Fedezze fel Agamemnón legendás sírját és az ókori színházat a tökéletes akusztikájával.'],
    [/Ancient Theater/g, 'Ókori színház'],
    [/Historic Ruins/g, 'Történelmi romok'],

    // Why Us Section
    [/Why Travel With Us\?/g, 'Miért utazzon velünk?'],
    [/We pride ourselves on providing a top-tier experience for every passenger\./g, 'Büszkék vagyunk rá, hogy minden utas számára kiváló élményt nyújtunk.'],
    [/No Waiting in Lines/g, 'Nincs várakozás sorban'],
    [/Pre-book to avoid long queues, especially during Athens' high season when taxi shortages are a major/g, 'Foglaljon előre, hogy elkerülje a hosszú sorokat, különösen az athéni főszezonban, amikor a taxishiány jelentős'],
    [/problem\./g, 'problémát jelent.'],
    [/Local Concierge Support/g, 'Helyi portaszolgálat'],
    [/Contact us even for recommendations on where to eat or what to see\. We are here to help you/g, 'Keressen minket éttermi ajánlásokért vagy látnivalókért is. Azért vagyunk itt, hogy segítsünk'],
    [/throughout your entire trip\./g, 'az egész utazása alatt.'],
    [/Available 24\/7/g, 'Elérhető 24/7'],
    [/Day or night, our drivers are ready to pick you up whenever you need\./g, 'Nappal vagy éjjel, sofőreink készen állnak, hogy felvegyék Önt, amikor csak szüksége van rá.'],
    [/Fixed Pricing/g, 'Fix árazás'],
    [/No hidden fees\. Know exactly what you are paying before you book\./g, 'Nincsenek rejtett költségek. Tudja meg pontosan, mennyit fizet a foglalás előtt.'],
    [/English Speaking/g, 'Angolul beszélő'],
    [/All our professional drivers are fluent in English and ready to assist you\./g, 'Minden profi sofőrünk folyékonyan beszél angolul, és készen áll a segítségnyújtásra.'],
    [/Premium Vehicles/g, 'Prémium járművek'],
    [/Immaculately clean, air-conditioned fleet maintained to the highest standards\./g, 'Makulátlanul tiszta, légkondicionált flotta, a legmagasabb követelményeknek megfelelően karbantartva.'],
    [/5-Star Rated/g, '5 csillagos minősítés'],
    [/Our customers have rated us 5 out of 5 stars on Google Reviews for our excellent service\./g, 'Ügyfeleink 5-ből 5 csillagra értékelték kiváló szolgáltatásunkat a Google Véleményekben.'],

    // Final CTA
    [/Ready for a stress-free transfer\?/g, 'Készen áll egy stresszmentes transzferre?'],
    [/Contact us via WhatsApp for instant booking capability and pricing inquiries\./g, 'Lépjen kapcsolatba velünk WhatsApp-on az azonnali foglalási lehetőségért και árajánlatért.'],
    [/Chat on\s+WhatsApp/gi, 'WhatsApp csevegés'],
    [/Send\s+Email/gi, 'E-mail küldése'],
    [/Call Us/g, 'Hívjon minket'],
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

        // SEO Meta Tags Translation
        content = content.replace(/<title>.*?<\/title>/, '<title>Taxi és Van Transzfer Athén | Repülőtéri transzfer Lavrio, Lagonisi, Keratea</title>');
        content = content.replace(/meta name="description" content=".*?"/, 'meta name="description" content="Prémium taxi- και furgontranszfer Athénban, Lavrióban, Lagonisiben και Kerateában. 24/7 athéni reptéri felvétel, kikötői transzferek και privát túrák az Akropoliszhoz, Szouniohoz, Delphoihoz, Meteorához."');

        // FIX: Revert accidentally translated function names and property keys
        content = content.replace(/openVehicleGaléria/g, 'openVehicleGallery');
        content = content.replace(/closeVehicleGaléria/g, 'closeVehicleGallery');
        content = content.replace(/openVehicle图库/g, 'openVehicleGallery');
        content = content.replace(/closeVehicle图库/g, 'closeVehicleGallery');
        content = content.replace(/openVehicleギャラリー/g, 'openVehicleGallery');
        content = content.replace(/closeVehicleギャラリー/g, 'closeVehicleGallery');

        // Set language attribute
        content = content.replace(/<html lang="en">/, '<html lang="hu">');

        // FIX: Favicon and Asset paths for subdirectories
        content = content.replace(/href="css\//g, 'href="../css/');
        content = content.replace(/src="images\//g, 'src="../images/');
        content = content.replace(/href="images\//g, 'href="../images/');
        content = content.replace(/url\('images\//g, "url('../images/");
        content = content.replace(/url\("images\//g, 'url("../images/');

        fs.writeFileSync(huPath, content, 'utf8');
        console.log(`Translated ${file} to hu`);
    }
});
