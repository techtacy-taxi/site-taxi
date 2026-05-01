const fs=require('fs'),path=require('path');
const root=__dirname;
const ruDir=path.join(root,'ru');
if(!fs.existsSync(ruDir)) fs.mkdirSync(ruDir);

// Translation map for index.html
const indexReplacements=[
['<title>Taxi & Van Transfers Athens | Airport Transfers Lavrio, Lagonisi, Keratea</title>','<title>Такси и Вэн Трансферы Афины | Трансфер из Аэропорта Лавριο, Лагониси, Кератея</title>'],
['content="Premium Taxi & Van transfers in Athens, Lavrio, Lagonisi & Keratea. 24/7 Athens Airport pickups, port transfers & private tours to Acropolis, Sounio, Delphi, Meteora."','content="Премиум такси и вэн трансферы в Афинах, Лавριο, Лагониси и Кератее. Круглосуточный трансфер из аэропорта Афин, портовые трансферы и частные туры к Акрополю, Суниону, Дельфам, Метеорам."'],
['content="Athens taxi transfer, Lavrio port taxi','content="такси Афины трансфер, Лавριο порт такси'],
['<h1 class="fade-in-up">Premium Taxi & Van Transfers in Athens & Lavrio</h1>','<h1 class="fade-in-up">Премиум такси и вэн трансферы в Афинах и Лавριο</h1>'],
['See how customers review us','Посмотрите отзывы наших клиентов'],
['"Reliable Taxi & Luxury Van services in Lavrio, Lagonisi, and Keratea.','Надёжные такси и люксовые вэн-сервисы в Лавριο, Лагониси и Кератее.'],
['Specialized in seamless Athens Airport pickups, port transfers, and private sightseeing tours.','Специализируемся на трансферах из аэропорта Афин, портовых трансферах и частных экскурсиях.'],
['Best way to reach us','Лучший способ связаться с нами'],
['Instant replies &bull; Quick booking &bull; 24/7 available','Мгновенные ответы &bull; Быстрое бронирование &bull; Доступны 24/7'],
['Chat on WhatsApp','Чат в WhatsApp'],
['LIVE RIGHT NOW: KONSTANTINOS','ОНЛАЙН СЕЙЧАС: KONSTANTINOS'],
['Chat with us','Напишите нам'],
['View Fleet','Посмотреть автопарк'],
['>Our Premium Fleet and Services<','>Наш премиум автопарк и услуги<'],
['Select the perfect ride for your needs, whether you\'re traveling solo or with a group, discover Greece.','Выберите идеальный транспорт для ваших нужд, путешествуйте в одиночку или группой, откройте для себя Грецию.'],
['>Executive Taxi<','>Представительское такси<'],
['Gallery</button>','Галерея</button>'],
['Perfect for solo travelers or couples. Fast, efficient, and comfortable city or airport transfers.','Идеально для индивидуальных путешественников или пар. Быстрые, эффективные и комфортные городские или аэропортовые трансферы.'],
['1-4 Passengers','1-4 Пассажира'],
['3 Standard Bags','3 стандартных сумки'],
['Free Wi-Fi','Бесплатный Wi-Fi'],
['>Book Taxi<','>Забронировать такси<'],
['>Most Popular<','>Самый популярный<'],
['>Luxury Van<','>Люксовый вэн<'],
['Spacious travel for families, groups or sailing crews. Premium comfort with extra room for luggage.','Просторный транспорт для семей, групп или яхтенных экипажей. Премиум комфорт с дополнительным местом для багажа.'],
['1-8 Passengers','1-8 Пассажиров'],
['8-10 Bags','8-10 сумок'],
['Bottled Water Included','Бутилированная вода включена'],
['>Book Van<','>Забронировать вэн<'],
['>Bus & Minibus<','>Автобус и микроавтобус<'],
['Ideal for large groups and corporate events.','Идеально для больших групп и корпоративных мероприятий.'],
['Up to 50 Passengers','До 50 пассажиров'],
['Ample Luggage Space','Много места для багажа'],
['Fully Air-Conditioned','Полный кондиционер'],
['Only with\n                    pre-booking','Только по\n                    предварительному бронированию'],
['>Athens Airport Transfer<','>Трансфер из аэропорта Афин<'],
['Direct pickup from the gate so you don\'t have to walk. Skip the long taxi lines and arrive\n                    stress-free. We monitor your flight.','Прямая встреча у выхода, не нужно идти пешком. Пропустите длинные очереди такси и приезжайте без стресса. Мы отслеживаем ваш рейс.'],
['Gate Pickup, No Walking','Встреча у выхода, без ходьбы'],
['Skip Taxi Queues','Без очередей на такси'],
['60m Free Wait Time','60 мин бесплатного ожидания'],
['>Book Transfer<','>Забронировать трансфер<'],
['Book Transfer','Забронировать трансфер'],
['Select Transfer Type:','Выберите тип трансфера:'],
['Arrival (From Airport)','Прибытие (из аэропорта)'],
['Departure (To Airport)','Отправление (в аэропорт)'],
['>Lavrio Port, Olympic Marine<','>Порт Лавριο, Olympic Marine<'],
['"Seamless pickup directly from your yacht.','"Встреча прямо у вашей яхты.'],
['Specialized in transfers for sailing crews with\n                    high-capacity vans for extra gear and heavy bags.','Специализируемся на трансферах яхтенных экипажей с\n                    вместительными вэнами для дополнительного снаряжения и тяжёлого багажа.'],
['No need to struggle finding a vehicle that fits your entire crew and equipment.','Не нужно искать транспорт, который вместит весь ваш экипаж и оборудование.'],
['Crew Vans Available','Вэны для экипажей'],
['Excess Luggage Friendly','Для крупного багажа'],
['Point-to-Point Service','Сервис от точки до точки'],
['>Main Ports: Piraeus, Rafina, Lavrio<','>Основные порты: Пирей, Рафина, Лаврио<'],
['Seamless pickup directly from your ferry, cruise ship, or hydrofoil.','Встреча прямо у парома, круизного лайнера или катера.'],
['Skip the long taxi queues at\n                    busy ports and enjoy a fixed-price transfer','Пропустите длинные очереди такσι в\n                    загруженных портах и наслаждайтесь трансфером по фиксированной цене'],
['to your hotel or Athens Airport. We monitor ferry arrivals','до вашего отеля или аэропорта Афин. Мы следим за прибытием паромов'],
['Pier-Side Pickup','Встреча у причала'],
['Fixed & Upfront Pricing','Фиксированные и честные цены'],
['Fixed &amp; Upfront Pricing','Фиксированные и честные цены'],
['We Monitor Ferry Times','Мы отслеживаем расписание паромов'],
['>Airbnb villas and hotels<','>Airbnb виллы и отели<'],
['Reliable 24/7 transfers directly to your villa, apartment, or hotel.','Надёжные трансферы 24/7 прямо до вашей виллы, апартаментов или отеля.'],
['We specialize in finding even\n                    the most remote locations in Lagonisi and Keratea.','Мы специализируемся на поиске даже\n                    самых отдалённых мест в Лагониси и Кератее.'],
['Enjoy a stress-free arrival with a professional driver waiting for you.','Наслаждайтесь комфортным прибытием — профессиональный водитель ждёт вас.'],
['Door-to-Door Service','Сервис от двери до двери'],
['Perfect for Families','Идеально для семей'],
['Local Area Experts','Эксперты по региону'],
['>Athens & Acropolis Tour<','>Тур по Афинам и Акрополю<'],
['Athens & Acropolis Tour','Тур по Афинам и Акрополю'],
['Explore the historical heart of Greece. Full or half-day private tours of the Acropolis, Plaka, and\n                    more.','Исследуйте историческое сердце Греции. Полнодневные или полудневные частные туры к Акрополю, Плаке и другим достопримечательностям.'],
['Panoramic Stops','Панорамные остановки'],
['4 to 8 Hours','4-8 часов'],
['Knowledgeable Driver','Знающий водитель'],
['>View Details<','>Подробнее<'],
['View Details','Подробнее'],
['>Sounio & Temple of Poseidon<','>Сунион и Храм Посейдона<'],
['Sounio & Temple of Poseidon','Сунион и Храм Посейдона'],
['Experience the breathtaking sunset at Cape Sounio along the beautiful Athenian Riviera.','Насладитесь потрясающим закатом на мыσε Сунион вдоль красивейшей Афинской Ривьеры.'],
['Coastal Scenic Drive','Живописная прибрежная дорога'],
['4 to 5 Hours','4-5 часов'],
['Sunset Views','Виды заката'],
['>Delphi & Ancient Oracle<','>Дельфы и Древний Оракул<'],
['Delphi & Ancient Oracle','Дельфы и Древний Оракул'],
['Discover the center of the ancient world. Full-day private tour to the UNESCO World Heritage site.','Откройте центр древнего мира. Полнодневный частный тур к объекту Всемирного наследия ЮНЕСКО.'],
['Scenic Mountain Drive','Живописная горная дорога'],
['8 to 10 Hours','8-10 часов'],
['Historical Ruins','Исторические руины'],
['>Meteora Monasteries<','>Монастыри Метеоры<'],
['Marvel at the breathtaking rock formations and visit the spectacular cliff-top monasteries.','Полюбуйтесь потрясающими скальными образованиями и посетите впечатляющие монастыри на вершинах скал.'],
['Spectacular Views','Впечатляющие виды'],
['Full Day / 2 Days','Полный день / 2 дня'],
['Monastery Visits','Посещение монастырей'],
['>Mycenae & Epidaurus<','>Миκены и Эπιдавр<'],
['Mycenae & Epidaurus','Миκены и Эπιдавр'],
['Explore the legendary Tomb of Agamemnon and the ancient theater with perfect acoustics.','Исследуйте легендарную гробницу Агамемнона и античный театр с идеальной акустикой.'],
['Ancient Theater','Античный театр'],
['Historic Ruins','Исторические руины'],
['8 to 10 Hours','от 8 до 10 часов'],
['>Why Travel With Us?<','>Почему стоит путешествовать с нами?<'],
['We pride ourselves on providing a top-tier experience for every passenger.','Мы гордемся тем, что предоставляем первоклассный сервис каждому пассажиру.'],
['>No Waiting in Lines<','>Без очередей<'],
['Pre-book to avoid long queues, especially during Athens\' high season when taxi shortages are a major\n                    problem.','Забронируйте заранее, чтобы избежать длинных очередей, особенно в пик сезона в Афинах, когда нехватка такσι — серьёзная проблема.'],
['>Local Concierge Support<','>Местная консьерж-поддержка<'],
['Contact us even for recommendations on where to eat or what to see. We are here to help you\n                    throughout your entire trip.','Обращайтесь к нам за рекомендациями, где поесть или что посмотреть. Мы готовы помочь вам на протяжении всей поездки.'],
['>Available 24/7<','>Доступны 24/7<'],
['Day or night, our drivers are ready to pick you up whenever you need.','День или ночь — наши водители готовы забрать вас в любое время.'],
['>Fixed Pricing<','>Фиксированные цены<'],
['No hidden fees. Know exactly what you are paying before you book.','Никаких скрытых платежей. Точно знайте, сколько вы платите, до бронирования.'],
['>English Speaking<','>Англоговорящие водители<'],
['All our professional drivers are fluent in English and ready to assist you.','Все наши профессиональные водители свободно говорят по-английски и готовы помочь вам.'],
['>Premium Vehicles<','>Премиум автомобили<'],
['Immaculately clean, air-conditioned fleet maintained to the highest standards.','Безупречно чистый, кондиционированный автопарк, обслуживаемый по высшим стандартам.'],
['>5-Star Rated<','>Рейтинг 5 звёзд<'],
['Our customers have rated us 5 out of 5 stars on Google Reviews for our excellent service.','Наши клиенты оценили нас на 5 из 5 звёзд в Google Отзывах за отличный сервис.'],
['>Ready for a stress-free transfer?<','>Готовы к трансферу без стресса?<'],
['Contact us via WhatsApp for instant booking capability and pricing inquiries.','Свяжитесь с нами через WhatsApp для мгновенного бронирования и уточнения цен.'],
['Send\n                    Email','Отправить\n                    Email'],
['>Call Us<','>Позвоните нам<'],
['Call Us','Позвоните нам'],
['Book Transfer','Забронировать трансфер'],
['View Details','Подробнее'],
['>Vehicle Gallery<','>Галерея автомобилей<'],
['Your reliable partner for luxury transfers and tours in Greece.','Ваш надёжный партнер для люкσοвых трансферов и туров по Греции.'],
['>Quick Links<','>Быстрые ссылки<'],
['>Home<','>Главная<'],
['>Services<','>Услуги<'],
['>Why Us<','>Почему мы<'],
['>Contact Info<','>Контакты<'],
['&copy; 2026 Taxi & Van Transfers. All Rights Reserved.','&copy; 2026 Taxi & Van Transfers. Все права защищены.'],
// Nav
['>Services</a>','>Услуги</a>'],
['>Why Choose Us</a>','>Почему мы</a>'],
['>Book Now</a>','>Забронировать</a>'],
// Fix paths for subdirectory
['href="css/styles.css"','href="../css/styles.css"'],
['src="js/main.js"','src="../js/main.js"'],
['src="js/lang-redirect.js"','src="../js/lang-redirect.js"'],
['src="images/','src="../images/'],
['href="images/','href="../images/'],
['href="acropolis-tour.html"','href="acropolis-tour.html"'],
['href="sounio-tour.html"','href="sounio-tour.html"'],
['href="delphi-tour.html"','href="delphi-tour.html"'],
['href="meteora-tour.html"','href="meteora-tour.html"'],
['href="argolis-tour.html"','href="argolis-tour.html"'],
['href="index.html"','href="index.html"'],
// Language switcher - update flag
['src="https://flagcdn.com/w20/gb.png" width="18" style="margin: 0 5px;"> EN','src="https://flagcdn.com/w20/ru.png" width="18" style="margin: 0 5px;"> RU'],
// Language switcher links - make relative to ru/
['<a href="index.html"><img src="https://flagcdn.com/w20/gb.png"','<a href="../index.html"><img src="https://flagcdn.com/w20/gb.png"'],
['<a href="de/index.html">','<a href="../de/index.html">'],
['<a href="es/index.html">','<a href="../es/index.html">'],
['<a href="pt/index.html">','<a href="../pt/index.html">'],
['<a href="fr/index.html">','<a href="../fr/index.html">'],
['<a href="it/index.html">','<a href="../it/index.html">'],
['<a href="pl/index.html">','<a href="../pl/index.html">'],
['<a href="no/index.html">','<a href="../no/index.html">'],
['<a href="he/index.html">','<a href="../he/index.html">'],
['<a href="el/index.html">','<a href="../el/index.html">'],
['<a href="zh/index.html">','<a href="../zh/index.html">'],
['<a href="ja/index.html">','<a href="../ja/index.html">'],
['<a href="hu/index.html">','<a href="../hu/index.html">'],
];

function processHtml(html, replacements) {
  let result = html;
  for(const [from,to] of replacements){
    let escaped = from.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
    escaped = escaped.replace(/ /g, '\\s+');
    result=result.replace(new RegExp(escaped, 'g'),to);
  }
  
  // SEO Meta Fixes
  result = result.replace('<html lang="en">', '<html lang="ru">');
  result = result.replace(/content="en_GB"/g, 'content="ru_RU"');
  
  // Canonical and OG URL Fixes (Only replace if it doesn't already have /ru/ and is not an image)
  result = result.replace(/href="https:\/\/taxiathenstransfers\.com\/(?!ru\/|images\/)/g, 'href="https://taxiathenstransfers.com/ru/');
  result = result.replace(/content="https:\/\/taxiathenstransfers\.com\/(?!ru\/|images\/)/g, 'content="https://taxiathenstransfers.com/ru/');

  // Fix hreflang tags: RU should point to /ru/, others to root
  const langs = ['en', 'de', 'fr', 'es', 'it', 'pt', 'pl', 'el', 'he', 'nb', 'zh', 'ja', 'hu', 'x-default'];
  langs.forEach(l => {
    const search = `hreflang="${l}" href="https://taxiathenstransfers.com/ru/`;
    const replace = `hreflang="${l}" href="https://taxiathenstransfers.com/`;
    result = result.split(search).join(replace);
  });
  
  // Clean up any double /ru/ru/ if they still occurred
  result = result.replace(/https:\/\/taxiathenstransfers\.com\/ru\/ru\//g, 'https://taxiathenstransfers.com/ru/');

  return result;
}

// Build ru/index.html
let enIndex=fs.readFileSync(path.join(root,'index.html'),'utf8');
let ruIndex = processHtml(enIndex, indexReplacements);
// Fix RU link in index.html specifically to prevent ru/ru/
ruIndex=ruIndex.replace(/href="ru\/index\.html"/g, 'href="index.html"');
fs.writeFileSync(path.join(ruDir,'index.html'),ruIndex,'utf8');
console.log('✅ ru/index.html');

// Build tour pages
const tours=[
  {file:'acropolis-tour.html',h1:'Афины и Акрополь',sub:'Откройте колыбель западной цивилизации. Полное путешествие по историческим достопримечательностям Афин.'},
  {file:'sounio-tour.html',h1:'Мыс Сунион и Храм Посейдона',sub:'Насладитесь потрясающим закатом на мысе Сунион у величественного Храма Посейдона.'},
  {file:'delphi-tour.html',h1:'Дельфы и Древний Оракул',sub:'Откройте центр древнего мира — святилище Дельфы, объект Всемирного наследия ЮНЕСКО.'},
  {file:'meteora-tour.html',h1:'Монастыри Метеоры',sub:'Полюбуйтесь потрясающими скальными образованиями и посетите впечатляющие монастыри.'},
  {file:'argolis-tour.html',h1:'Микены и Эпидавр',sub:'Исследуйте легендарную гробницу Агамемнона и античный театр с идеальной акустикой.'}
];

const tourReplacements=[
['href="css/','href="../css/'],
['src="js/','src="../js/'],
['src="images/','src="../images/'],
['href="images/','href="../images/'],
['>Services</a>','>Услуги</a>'],
['>Why Choose Us</a>','>Почему мы</a>'],
['>Book Now</a>','>Забронировать</a>'],
['>What To Expect<','>Что вас ждёт<'],
['What To Expect','Что вас ждёт'],
['>Tour Overview<','>Обзор тура<'],
['Tour Overview','Обзор тура'],
['>Gallery<','>Галерея<'],
['Gallery','Галерея'],
['>Tour Details<','>Детали тура<'],
['Tour Details','Детали тура'],
['Price Upon Request','Цена по запросу'],
['Duration:','Продолжительность:'],
['Private Tour','Частный тур'],
['Luxury Van or Sedan','Люксовый вэн или седан'],
['English Speaking Driver','Англоговорящий водитель'],
['Entrance Fees Not Included','Входные билеты не включены'],
['>Book via\n                    WhatsApp<','>Бронь через\n                    WhatsApp<'],
['Book via\n                    WhatsApp','Бронь через\n                    WhatsApp'],
['>Send Inquiry<','>Отправить запрос<'],
['Send Inquiry','Отправить запрос'],
['Back to All Tours','Назад ко всем турам'],
['Your reliable partner for luxury transfers and tours in Greece.','Ваш надёжный партнер для люкσοвых трансферов и туров по Греции.'],
['>Quick Links<','>Быстрые ссылки<'],
['>Home<','>Главная<'],
['>Services<','>Услуги<'],
['>Why Us<','>Почему мы<'],
['>Contact Info<','>Контакты<'],
['&copy; 2026 Taxi & Van Transfers. All Rights Reserved.','&copy; 2026 Taxi & Van Transfers. Все права защищены.'],
['LIVE RIGHT NOW: KONSTANTINOS','ОНЛАЙН СЕЙЧАС: KONSTANTINOS'],
['Chat with us','Напишите нам'],
['src="https://flagcdn.com/w20/gb.png" width="18" style="margin: 0 5px;"> EN','src="https://flagcdn.com/w20/ru.png" width="18" style="margin: 0 5px;"> RU'],

// LONGEST STRINGS FIRST
['Athens is a city where ancient mythology and modern vibrancy exist side-by-side. Our private Athens City Tour is designed to give you a comprehensive understanding of the city\'s glorious past, picking you up from your location and driving you through the historical center in ultimate comfort.', 'Афины — это город, где древняя мифология соседствует с современной динамичной жизнью. Наш частный тур по Афинам создан для того, чтобы дать вам всестороннее представление о славном прошлом города, забирая вас из вашего местоположения и провозя по историческому центру с максимальным комфортом.'],
['You will witness architectural masterpieces such as the Parthenon on the Acropolis hill, experience the charm of the oldest neighborhood of Athens, and see where the first modern Olympic Games took place. Your driver will provide historical context and let you explore each monument at your own pace.', 'Вы увидите такие архитектурные шедевры, как Парфенон на холме Акрополя, ощутите очарование старейшего района Афин и увидите место проведения первых современных Олимпийских игр. Ваш водитель расскажет исторический контекст и позволит вам исследовать каждый памятник в удобном для вас темпе.'],
['Our first stop is the world-famous Acropolis. You will have time to walk up the hill, explore the magnificent Parthenon, the Temple of Athena Nike, and take panoramic photos of the entire city from the top.', 'Наша первая остановка — всемирно известный Акрополь. У вас будет время подняться на холм, осмотреть великолепный Парфенон, Храм Ники Аптерос и сделать панорамные фотографии всего города с вершины.'],
['Next stop is Syntagma Square and the Greek Parliament to witness the traditional changing of the Presidential Guards (Evzones) at the Tomb of the Unknown Soldier.', 'Следующая остановка — площадь Синтагμα и Греческий парламент, чтобы увидеть традиционную смену президентского караула (Эвзонов) у Могилы Неизвестного Солдата.'],
['We\'ll drive up Lycabettus Hill for the highest viewpoint in Athens, and conclude with a walk through Plaka, the charming old town full of traditional tavernas and shops before returning to your hotel.', 'Мы поднимемся на гору Ликавит, на самую высокую смотровую площадку Афин, и в завершение прогуляемся по Плаке, очаровательному старому городу, полному традиционных таверн и магазинов, прежде чем вернуться в ваш отель.'],
['Join us on an unforgettable journey to the Argolis peninsula, where Greek mythology comes to life. This full-day private tour takes you to some of the most significant archaeological sites of ancient Greece, steeped in the legends of King Agamemnon and the Trojan War.', 'Присоединяйтесь к нам в незабываемом путешествии на полуостров Арголида, где оживают греческие мифы. Этот полнодневный частный тур приведет вас к одним из самых значимых археологических памятников Древней Греции, овеянным легендами о царе Агамемноне и Троянской войне.'],
['You will walk through the imposing Lion Gate of Mycenae, explore monumental tholos tombs, stroll through the romantic streets of Nafplio (the first capital of modern Greece), and finish at the breathtaking Sanctuary of Asklepios in Epidaurus, home to the ancient theater famous for its perfect acoustics.', 'Вы пройдете через внушительные Львиные ворота Микен, исследуете монументальные гробницы-толосы, прогуляетесь по романтическим улочкам Нафплиона (первой столицы современной Греции) и закончите тур в захватывающем дух святилище Асклепия в Эпидавре, где находится древний театр, знаменитый своей идеальной акустикой.'],
['Step back in time with a full-day excursion to Delphi, considered by ancient Greeks to be the center of the world. Nestled on the slopes of Mount Parnassus, Delphi is one of the most stunning UNESCO World Heritage sites in Greece.', 'Совершите путешествие во времени на полнодневной экскурсии в Дельфы, которые древние греки считали центром мира. Расположенные на склонах горы Парнас, Дельфы являются одним из самых потрясающих объектов Всемирного наследия ЮНЕСКО в Греции.'],
['On this private day trip, you will marvel at the Temple of Apollo where the famous Oracle delivered her prophecies, explore the ancient theater, and witness incredible artifacts in the Delphi Archaeological Museum. The route also takes you through scenic mountain landscapes and traditional villages.', 'В этой частной однодневной поездке вы полюбуетесь Храмом Аполлона, где знаменитый Оракул произносил свои пророчества, исследуете античный театр и увидите невероятные артефакты в Археологическом музее Дельф. Маршрут также проходит через живописные горные пейзажи и традиционные деревни.'],
['Arrive at Delphi to explore the incredible ruins. Walk the Sacred Way, visit the Temple of Apollo, the ancient Theater, and the Stadium where the Pythian Games were held.', 'Прибытие в Дельфы для осмотра невероятных руин. Прогуляйтесь по Священному пути, посетите Храм Аполлона, античный театр и стадион, где проводились Пифийские игры.'],
['Stop at the beautiful mountain village of Arachova for a traditional Greek lunch (optional) and some souvenir shopping before we begin our comfortable drive back to Athens.', 'Остановитесь в красивой горной деревне Арахова для традиционного греческого обеда (по желанию) и покупки сувениров перед началом нашей комфортной поездки обратно в Афины.'],
['Enjoy a relaxing drive through the fertile plain of Boeotia, crossing the towns of Thebes and Levadia before ascending the majestic Mount Parnassus.', 'Наслаждайтесь расслабляющей поездкой через плодородную равнину Беотии, пересекая города Фивы и Левадия перед подъемом на величественную гору Парнас.'],
['Start your day early as your private driver picks you up from your Athens location in a premium, climate-controlled vehicle.', 'Начните свой день рано, когда ваш личный водитель забереτ вас из вашего местоположения в Афинах в премиальном автомобиле с климат-контролем.'],
['Enter the ancient kingdom of Agamemnon through the legendary Lion Gate. Explore the Cyclopean walls, the Royal Tombs, and the awe-inspiring Treasury of Atreus (Tomb of Agamemnon).', 'Войдите в древнее царство Агамемнона через легендарные Львиные ворота. Исследуйте Циклопические стены, Королевские гробницы и внушающую трепет Сокровищницу Атрея (Гробницу Агамемнона).'],
['We\'ll stop at the picturesque coastal city of Nafplio. Enjoy a walk through its charming narrow streets, admire the Bourtzi fortress in the water, and have a traditional Greek lunch.', 'Мы остановимся в живописном прибрежном городе Нафплион. Насладитесь прогулкой по его очаровательным узким улочкам, полюбуйтесь крепостью Бурдзи в воде и отведайте традиционный греческий обед.'],
['The tour concludes with a visit to the ancient Theater of Epidaurus, renowned worldwide for its flawless acoustics. Even a whisper on the stage can be heard clearly in the highest seating rows.', 'Тур завершается посещением древнего театра Эпидавра, известного во всем мире своей безупречной акустикой. Даже шепот на сцене отчетливо слышен на самых верхних рядах.'],
['After a day full of mythological wonders and magnificent architecture, relax in your premium vehicle as we head back to your accommodation in Athens.', 'После дня, полного мифологических чудес и великолепной архитектуры, расслабьтесь в вашем премиальном автомобиле, пока мы возвращаемся к вашему месту проживания в Афинах.'],
['Your private driver will meet you at your hotel, apartment, or cruise ship port to begin the tour in our fully air-conditioned luxury vehicle.', 'Ваш личный водитель встретит вас в отеле, апартаментах или порту круизных лайнеров, чтобы начать тур на нашем роскошном автомобиле с кондиционером.'],
['Your private driver will pick you up in Athens. Our first major stop will be a breathtaking view of the Corinth Canal, an engineering marvel that connects the Aegean and Ionian seas.', 'Ваш личный водитель заберет вас в Афинах. Нашей первой крупной остановкой станет захватывающий дух вид на Коринфский канал, инженерное чудо, соединяющее Эгейское и Ионическое моря.'],

// Delphi Museum specific split to avoid spacing issues
['Discover masterpieces of ancient Greek sculpture, including the famous bronze Charioteer', 'Откройте для себя шедевры древнегреческой скульптуры, включая знаменитого бронзового Возничего'],
['and the Sphinx of Naxos.', 'и Сфинкса Наксосского.'],

['Step into the Homeric epics. Visit the golden city of Mycenae and the acoustic marvel of Epidaurus.', 'Шагните в гомеровский эпос. Посетите золотой город Миκены и акустическое чудо Эпидавра.'],
['Journey to the "Navel of the World" and immerse yourself in the mystique of ancient Greece.', 'Отправьтесь к «Пупу Земли» и погрузитесь в мистику древней Греции.'],
['2. The Acropolis & Parthenon', '2. Акрополь и Парфенон'],
['1. Departure & Corinth Canal', '1. Отправление и Коринфский канал'],
['3. Delphi Archaeological Site', '3. Археологический памятник Дельфы'],
['The Neighborhood of the Gods', 'Район Богов'],
['Plaka District', 'Район Плака'],
['The Acropolis', 'Акрополь'],
['Parthenon & Erechtheion', 'Парфенон и Эрехтейон'],
['1. Premium Pickup', '1. Премиум Встреча'],
['3. Panathenaic Stadium', '3. Панафинейский стадион'],
['4. Changing of the Guards', '4. Смена караула'],
['5. Mount Lycabettus & Plaka', '5. Гора Ликавит и Плака'],
['Mycenae Citadel', 'Цитадель Микен'],
['Tomb of Agamemnon', 'Гробница Агамемнона'],
['Ancient Epidaurus', 'Древний Эпидавр'],
['The acoustic masterpiece', 'Акустический шедевр'],
['1. Hotel / Port Pickup', '1. Встреча в отеле / порту'],
['2. Scenic Mountain Drive', '2. Живописная горная дорога'],
['4. Delphi Museum', '4. Музей Дельф'],
['5. Arachova & Lunch', '5. Арахова и обед'],
['Temple of Apollo', 'Храм Аполлона'],
['The sanctuary of the Oracle', 'Святилище Оракула'],
['Arachova Village', 'Деревня Арахова'],
['Picturesque mountain town', 'Живописный горный городок'],
['4. Theater of Epidaurus', '4. Театр Эпидавра'],
['5. Return to Athens', '5. Возвращение в Афины'],
['2. Ancient Mycenae', '2. Древние Микены'],
['3. Nafplio City', '3. Город Нафплион'],
['Half Day (4-5h) or Full Day (8h)', 'Полдня (4-5 ч) или Полный день (8 ч)'],
['Half Day (4-5h)', 'Полдня (4-5 ч)'],
['Full Day (8 - 10 Hours)', 'Полный день (8 - 10 часов)'],
['Full Day (10 - 12 Hours)', 'Полный день (10 - 12 часов)'],
['4 - 5 Hours', '4 - 5 часов'],
];

for(const tour of tours){
  const enFile=path.join(root,tour.file);
  if(!fs.existsSync(enFile)){console.log('SKIP:',tour.file);continue;}
  let html=fs.readFileSync(enFile,'utf8');
  let ruHtml = processHtml(html, tourReplacements);

  // Translate Hero H1 and Subtitle (handle newlines with [\s\S])
  ruHtml=ruHtml.replace(/<h1 class="fade-in-up">[\s\S]*?<\/h1>/, `<h1 class="fade-in-up">${tour.h1}</h1>`);
  ruHtml=ruHtml.replace(/<p class="fade-in-up delay-1">[\s\S]*?<\/p>/, `<p class="fade-in-up delay-1">${tour.sub}</p>`);

  // Fix image paths (both src and url())
  ruHtml=ruHtml.replace(/src="images\//g, 'src="../images/');
  ruHtml=ruHtml.replace(/url\('images\//g, "url('../images/");
  ruHtml=ruHtml.replace(/href="images\//g, 'href="../images/');

  // Fix lang switcher links for tour pages
  const bn=tour.file;
  ruHtml=ruHtml.replace(new RegExp(`<a href="${bn}">`,'g'),`<a href="../${bn}">`);
  // Fix RU link specifically (prevent ru/ru/)
  ruHtml=ruHtml.replace(`<a href="ru/${bn}">`,`<a href="${bn}">`);
  
  // Fix other lang links
  ['de','es','pt','fr','it','pl','no','he','el','zh','ja','hu'].forEach(l=>{
    ruHtml=ruHtml.replace(`<a href="${l}/${bn}">`,`<a href="../${l}/${bn}">`);
  });
  // Fix nav links
  ruHtml=ruHtml.replace(/href="index\.html/g,'href="index.html');
  fs.writeFileSync(path.join(ruDir,tour.file),ruHtml,'utf8');
  console.log('✅ ru/'+tour.file);
}

console.log('\n✅ Russian pages created with PERFECT SEO fixes!');
