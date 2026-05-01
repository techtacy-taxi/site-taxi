const fs = require('fs');
const path = require('path');

const ruDir = path.join(__dirname, 'ru');

const replacements = [
    ['Athens is a city where ancient mythology and modern vibrancy exist side-by-side. Our private Athens City Tour is designed to give you a comprehensive understanding of the city\'s glorious past, picking you up from your location and driving you through the historical center in ultimate comfort.', 'Афины — это город, где древняя мифология соседствует с современной динамичной жизнью. Наш частный тур по Афинам создан для того, чтобы дать вам всестороннее представление о славном прошлом города, забирая вас из вашего местоположения и провозя по историческому центру с максимальным комфортом.'],
    ['You will witness architectural masterpieces such as the Parthenon on the Acropolis hill, experience the charm of the oldest neighborhood of Athens, and see where the first modern Olympic Games took place. Your driver will provide historical context and let you explore each monument at your own pace.', 'Вы увидите такие архитектурные шедевры, как Парфенон на холме Акрополя, ощутите очарование старейшего района Афин и увидите место проведения первых современных Олимпийских игр. Ваш водитель расскажет исторический контекст и позволит вам исследовать каждый памятник в удобном для вас темпе.'],
    ['The Acropolis', 'Акрополь'],
    ['Parthenon & Erechtheion', 'Парфенон и Эрехтейон'],
    ['Plaka District', 'Район Плака'],
    ['The Neighborhood of the Gods', 'Район Богов'],
    ['1. Premium Pickup', '1. Премиум Встреча'],
    ['Your private driver will meet you at your hotel, apartment, or cruise ship port to begin the tour in our fully air-conditioned luxury vehicle.', 'Ваш личный водитель встретит вас в отеле, апартаментах или порту круизных лайнеров, чтобы начать тур на нашем роскошном автомобиле с кондиционером.'],
    ['2. The Acropolis & Parthenon', '2. Акрополь и Парфенон'],
    ['Our first stop is the world-famous Acropolis. You will have time to walk up the hill, explore the magnificent Parthenon, the Temple of Athena Nike, and take panoramic photos of the entire city from the top.', 'Наша первая остановка — всемирно известный Акрополь. У вас будет время подняться на холм, осмотреть великолепный Парфенон, Храм Ники Аптерос и сделать панорамные фотографии всего города с вершины.'],
    ['3. Panathenaic Stadium', '3. Панафинейский стадион'],
    ['We\'ll drive to the impressive all-marble Panathenaic Stadium, the historic site of the first modern Olympic Games held in 1896.', 'Мы доедем до впечатляющего полностью мраморного Панафинейского стадиона, исторического места проведения первых современных Олимпийских игр в 1896 году.'],
    ['4. Changing of the Guards', '4. Смена караула'],
    ['Next stop is Syntagma Square and the Greek Parliament to witness the traditional changing of the Presidential Guards (Evzones) at the Tomb of the Unknown Soldier.', 'Следующая остановка — площадь Синтагма и Греческий парламент, чтобы увидеть традиционную смену президентского караула (Эвзонов) у Могилы Неизвестного Солдата.'],
    ['5. Mount Lycabettus & Plaka', '5. Гора Ликавит и Плака'],
    ['We\'ll drive up Lycabettus Hill for the highest viewpoint in Athens, and conclude with a walk through Plaka, the charming old town full of traditional tavernas and shops before returning to your hotel.', 'Мы поднимемся на гору Ликавит, на самую высокую смотровую площадку Афин, и в завершение прогуляемся по Плаке, очаровательному старому городу, полному традиционных таверн и магазинов, прежде чем вернуться в ваш отель.'],
    ['Half Day (4-5h) or Full Day (8h)', 'Полдня (4-5 ч) или Полный день (8 ч)'],

    ['Journey into the heart of the Peloponnese to discover the golden era of the Mycenaean civilization.', 'Отправьтесь в сердце Пелопоннеса, чтобы открыть для себя золотую эру микенской цивилизации.'],
    ['This full-day private tour takes you out of Athens, crossing the famous Corinth Canal, and deep into the mythical Argolis region. You will explore two of the most significant archaeological sites in Greece: the ancient citadel of Mycenae and the Sanctuary of Asklepios at Epidaurus.', 'Этот полнодневный частный тур увезет вас из Афин, через знаменитый Коринфский канал, вглубь мифического региона Арголиды. Вы исследуете два самых значительных археологических памятника в Греции: древнюю цитадель Микены и Святилище Асклепия в Эпидавре.'],
    ['Between exploring the ruins, you will visit the romantic coastal city of Nafplio, the first capital of modern Greece, where you can enjoy a wonderful traditional lunch with views of the Bourtzi fortress.', 'Между осмотром руин вы посетите романтический прибрежный город Нафплион, первую столицу современной Греции, где сможете насладиться прекрасным традиционным обедом с видом на крепость Бурдзи.'],
    ['The Lion Gate & Agamemnon\'s Tomb', 'Львиные ворота и Гробница Агамемнона'],
    ['Ancient Theater of Epidaurus', 'Античный театр Эпидавра'],
    ['World-famous acoustics', 'Всемирно известная акустика'],
    ['1. The Corinth Canal', '1. Коринфский канал'],
    ['We begin with a scenic drive along the coast until we reach the engineering marvel of the Corinth Canal. We will make a short stop for photos of the deep gorge that separates the Peloponnese from mainland Greece.', 'Мы начнем с живописной поездки вдоль побережья до инженерного чуда Коринфского канала. Мы сделаем короткую остановку для фотографий глубокого ущелья, отделяющего Пелопоннес от материковой Греции.'],
    ['2. Ancient Mycenae', '2. Древние Микены'],
    ['Explore the kingdom of mythical King Agamemnon. Walk through the famous Lion Gate, see the Cyclopean Walls, and enter the massive beehive-shaped Treasury of Atreus.', 'Исследуйте королевство мифического царя Агамемнона. Пройдите через знаменитые Львиные ворота, осмотрите Циклопические стены и войдите в массивную Сокровищницу Атрея.'],
    ['3. Nafplio City', '3. Город Нафплион'],
    ['A stop at the picturesque town of Nafplio. Wander through its narrow Venetian streets, admire the Palamidi castle above, and enjoy a traditional lunch by the sea.', 'Остановка в живописном городе Нафплион. Прогуляйтесь по его узким венецианским улочкам, полюбуйтесь крепостью Паламиди наверху и насладитесь традиционным обедом у моря.'],
    ['4. Sanctuary of Epidaurus', '4. Святилище Эпидавра'],
    ['The tour concludes with a visit to the ancient Theater of Epidaurus, renowned worldwide for its flawless acoustics. Even a whisper on the stage can be heard clearly in the highest seating rows.', 'Тур завершается посещением античного театра Эпидавра, всемирно известного своей безупречной акустикой. Даже шепот на сцене ясно слышен на самых верхних рядах.'],
    ['5. Return to Athens', '5. Возвращение в Афины'],
    ['After a day full of mythological wonders and magnificent architecture, relax in your premium vehicle as we head back to your accommodation in Athens.', 'После дня, полного мифологических чудес и великолепной архитектуры, расслабьтесь в вашем премиальном автомобиле, пока мы возвращаемся к вашему месту проживания в Афинах.'],
    ['Full Day (8 - 10 Hours)', 'Полный день (8 - 10 часов)'],

    ['Journey to the "Navel of the World" and immerse yourself in the mystique of ancient Greece.', 'Отправьтесь к «Пупу Земли» и погрузитесь в мистику древней Греции.'],
    ['Step back in time with a full-day excursion to Delphi, considered by ancient Greeks to be the center of the world. Nestled on the slopes of Mount Parnassus, Delphi is one of the most stunning UNESCO World Heritage sites in Greece.', 'Совершите путешествие во времени на полнодневной экскурсии в Дельфы, которые древние греки считали центром мира. Расположенные на склонах горы Парнас, Дельфы являются одним из самых потрясающих объектов Всемирного наследия ЮНЕСКО в Греции.'],
    ['On this private day trip, you will marvel at the Temple of Apollo where the famous Oracle delivered her prophecies, explore the ancient theater, and witness incredible artifacts in the Delphi Archaeological Museum. The route also takes you through scenic mountain landscapes and traditional villages.', 'В этой частной однодневной поездке вы полюбуетесь Храмом Аполлона, где знаменитый Оракул произносил свои пророчества, исследуете античный театр и увидите невероятные артефакты в Археологическом музее Дельф. Маршрут также проходит через живописные горные пейзажи и традиционные деревни.'],
    ['Temple of Apollo', 'Храм Аполлона'],
    ['The sanctuary of the Oracle', 'Святилище Оракула'],
    ['Arachova Village', 'Деревня Арахова'],
    ['Picturesque mountain town', 'Живописный горный городок'],
    ['1. Hotel / Port Pickup', '1. Встреча в отеле / порту'],
    ['Start your day early as your private driver picks you up from your Athens location in a premium, climate-controlled vehicle.', 'Начните свой день рано, когда ваш личный водитель заберет вас из вашего местоположения в Афинах в премиальном автомобиле с климат-контролем.'],
    ['2. Scenic Mountain Drive', '2. Живописная горная дорога'],
    ['Enjoy a relaxing drive through the fertile plain of Boeotia, crossing the towns of Thebes and Levadia before ascending the majestic Mount Parnassus.', 'Наслаждайтесь расслабляющей поездкой через плодородную равнину Беотии, пересекая города Фивы и Левадия перед подъемом на величественную гору Парнас.'],
    ['3. Delphi Archaeological Site', '3. Археологический памятник Дельфы'],
    ['Arrive at Delphi to explore the incredible ruins. Walk the Sacred Way, visit the Temple of Apollo, the ancient Theater, and the Stadium where the Pythian Games were held.', 'Прибытие в Дельфы для осмотра невероятных руин. Прогуляйтесь по Священному пути, посетите Храм Аполлона, античный театр и стадион, где проводились Пифийские игры.'],
    ['4. Delphi Museum', '4. Музей Дельф'],
    ['Discover masterpieces of ancient Greek sculpture, including the famous bronze Charioteer and the Sphinx of Naxos.', 'Откройте для себя шедевры древнегреческой скульптуры, включая знаменитого бронзового Возничего и Сфинкса Наксосского.'],
    ['5. Arachova & Lunch', '5. Арахова и обед'],
    ['Stop at the beautiful mountain village of Arachova for a traditional Greek lunch (optional) and some souvenir shopping before we begin our comfortable drive back to Athens.', 'Остановитесь в красивой горной деревне Арахова для традиционного греческого обеда (по желанию) и покупки сувениров перед началом нашей комфортной поездки обратно в Афины.'],

    ['Explore the spectacular "columns of the sky." A magical journey to Greece\'s most awe-inspiring natural and spiritual site.', 'Исследуйте впечатляющие «столпы неба». Волшебное путешествие к самому впечатляющему природному и духовному месту Греции.'],
    ['Meteora is truly a geological phenomenon. Here, massive dark rock pillars rise dramatically from the plains of Thessaly, crowned by ancient Eastern Orthodox monasteries. It is a UNESCO World Heritage site and offers some of the most surreal landscapes in Europe.', 'Метеора — это поистине геологический феномен. Здесь массивные темные каменные столбы драматично возвышаются над равнинами Фессалии, увенчанные древними православными монастырями. Это объект Всемирного наследия ЮНЕСКО, предлагающий одни из самых сюрреалистичных пейзажей в Европе.'],
    ['On this private grand tour, you will travel north through the Greek mainland. Our knowledgeable drivers will ensure a comfortable journey. Upon arriving at Kalambaka, you\'ll be driven up to the immense rock formations to visit the historic monasteries, witness the breathtaking panoramic views, and learn about the monastic life.', 'В этом масштабном частном туре вы отправитесь на север через материковую Грецию. Наши знающие водители обеспечат комфортное путешествие. По прибытии в Каламбаку вас отвезут наверх к огромным скальным образованиям, чтобы посетить исторические монастыри, насладиться захватывающими дух панорамными видами и узнать о монашеской жизни.'],
    ['The Rocks', 'Скалы'],
    ['Giant natural sandstone pillars', 'Гигантские природные столбы из песчаника'],
    ['The Monasteries', 'Монастыри'],
    ['Built perfectly on the cliffs', 'Идеально построенные на скалах'],
    ['1. Early Departure', '1. Ранний выезд'],
    ['Since Meteora is located in central Greece, we begin our day early. Your private driver will pick you up from your Athens hotel for the road trip north.', 'Поскольку Метеора находится в центральной Греции, мы начинаем наш день рано. Ваш личный водитель заберет вас из вашего отеля в Афинах для поездки на север.'],
    ['2. The Greek Mainland', '2. Материковая Греция'],
    ['Enjoy the beautiful changing landscapes, passing by the battlefield of Thermopylae (the monument of King Leonidas) and across the fertile Thessalian plain.', 'Наслаждайтесь прекрасными меняющимися пейзажами, проезжая мимо поля битвы при Фермопилах (памятник царю Леониду) и через плодородную равнину Фессалии.'],
    ['3. Arrival at Kalambaka', '3. Прибытие в Каламбаку'],
    ['Reach the picturesque town of Kalambaka, which rests right at the foot of the Meteora rocks. From here, the towering cliffs become visible.', 'Прибытие в живописный городок Каламбака, который находится прямо у подножия скал Метеоры. Отсюда становятся видны возвышающиеся утесы.'],
    ['4. Monastery Visits & Sightseeing', '4. Посещение монастырей и экскурсия'],
    ['We\'ll drive you safely up the winding roads to visit 2 or 3 of the active monasteries (like Great Meteoron or Varlaam). You will have time to explore and take incredible photos from the best viewpoints.', 'Мы безопасно отвезем вас по извилистым дорогам, чтобы посетить 2 или 3 действующих монастыря (таких как Великий Метеор или Варлаам). У вас будет время исследовать их и сделать невероятные фотографии с лучших смотровых площадок.'],
    ['5. Lunch & Smooth Return', '5. Обед и возвращение'],
    ['After a traditional Greek lunch in Kalambaka or Kastraki village, you can sit back and relax as we drive you comfortably back to Athens.', 'После традиционного греческого обеда в Каламбаке или деревне Кастраки вы сможете расслабиться, пока мы с комфортом отвезем вас обратно в Афины.'],
    ['Full Day (10 - 12 Hours)', 'Полный день (10 - 12 часов)'],

    ['A magical drive along the Athenian Riviera leading to one of the most stunning sunsets in Greece.', 'Волшебная поездка вдоль Афинской Ривьеры, ведущая к одному из самых потрясающих закатов в Греции.'],
    ['Escape the bustling city of Athens and embark on a scenic drive along the mesmerizing and beautiful Athenian Riviera. Our destination is Cape Sounio, the southernmost tip of the Attica peninsula, famous for its majestic Temple of Poseidon.', 'Сбегите из шумного города Афин и отправьтесь в живописную поездку вдоль завораживающей и красивой Афинской Ривьеры. Наш пункт назначения — мыс Сунион, самая южная точка полуострова Аттика, знаменитая своим величественным Храмом Посейдона.'],
    ['Built in the 5th century BC to honor the God of the Sea, the temple stands proudly on a rocky hill overlooking the Aegean Sea. Not only will you discover fascinating history, but you will also experience what many consider to be the most breathtaking sunset in all of Greece.', 'Построенный в V веке до н.э. в честь бога моря, храм гордо стоит на скалистом холме с видом на Эгейское море. Вы не только откроете для себя увлекательную историю, но и увидите то, что многие считают самым захватывающим закатом во всей Греции.'],
    ['Photo Stops', 'Остановки для фото'],
    ['Lake Vouliagmeni & Riviera', 'Озеро Вулиагмени и Ривьера'],
    ['Sunset Views', 'Виды заката'],
    ['Epic view from the Temple', 'Эпический вид из храма'],
    ['1. Hotel Pickup', '1. Встреча в отеле'],
    ['Your private driver will pick you up directly from your hotel/apartment in a luxurious, climate-controlled vehicle. We usually recommend starting a few hours before sunset.', 'Ваш личный водитель заберет вас прямо из вашего отеля/апартаментов на роскошном автомобиле с климат-контролем. Обычно мы рекомендуем выезжать за несколько часов до заката.'],
    ['2. The Athenian Riviera Drive', '2. Поездка по Афинской Ривьере'],
    ['We\'ll drive along the beautiful coastal road, passing through upscale Athenian suburbs like Glyfada, Vouliagmeni, and Varkiza, enjoying uninterrupted views of the Saronic Gulf.', 'Мы проедем по красивой прибрежной дороге, проезжая через элитные пригороды Афин, такие как Глифада, Вулиагмени и Варкиза, наслаждаясь непрерывным видом на Саронический залив.'],
    ['3. Vouliagmeni Lake (Optional Stop)', '3. Озеро Вулиагмени (по желанию)'],
    ['A quick stop at the natural spa lake of Vouliagmeni, famous for its warm therapeutic waters and impressive rock formations.', 'Короткая остановка у природного спа-озера Вулиагмени, знаменитого своими теплыми лечебными водами и впечатляющими скальными образованиями.'],
    ['4. Temple of Poseidon', '4. Храм Посейдона'],
    ['Arrive at Cape Sounio. You will have plenty of time to explore the ancient ruins, take stunning photos, and watch the sun dip below the Aegean horizon.', 'Прибытие на мыс Сунион. У вас будет достаточно времени, чтобы осмотреть древние руины, сделать потрясающие фотографии и посмотреть, как солнце опускается за горизонт Эгейского моря.'],
    ['5. Return or Seaside Dinner', '5. Возвращение или ужин у моря'],
    ['After the sunset, we can head back to Athens or, if you prefer, stop at a traditional Greek tavern by the sea for fresh seafood before returning.', 'После заката мы можем вернуться в Афины или, если вы предпочитаете, остановиться в традиционной греческой таверне у моря для ужина из свежих морепродуктов перед возвращением.'],
    ['4 - 5 Hours', '4 - 5 часов']
];

function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

const files = fs.readdirSync(ruDir).filter(f => f.endsWith('.html'));

files.forEach(file => {
    let filePath = path.join(ruDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    for(const [en, ru] of replacements) {
        // Escape the english string, then replace all normal spaces with a regex that matches any whitespace
        const regexStr = escapeRegExp(en).replace(/ /g, '\\s+');
        content = content.replace(new RegExp(regexStr, 'g'), ru);
    }
    
    // Additional generic fixes
    content = content.replace(/>\s*Chat on\s+WhatsApp\s*</g, '>Чат в WhatsApp<');
    content = content.replace(/>\s*Call Us\s*</g, '>Позвоните нам<');
    content = content.replace(/Book via\s*WhatsApp/g, 'Бронь через WhatsApp');
    content = content.replace(/>\s*Send Inquiry\s*</g, '>Отправить запрос<');
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${file}`);
});
