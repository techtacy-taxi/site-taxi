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
    // --- Specific / Long Strings first to avoid partial replacement ---
    [/Half Day \(4-5h\) or Full Day \(8h\)/gi, '半日（4-5小时）或全天（8小时）'],
    [/Duration: Full Day \(10 - 12 Hours\)/gi, '时长: 全天 (10 - 12 小时)'],
    [/Duration: Full Day \(8 - 10 Hours\)/gi, '时长: 全天 (8 - 10 小时)'],
    [/Luxury Van or Sedan/gi, '豪华面包车或轿车'],
    [/English Speaking Driver/g, '英语司机'],
    [/Entrance Fees Not Included/gi, '门票不含'],
    [/The Acropolis & Parthenon/g, '雅典卫城与帕特农神庙'],
    [/The Acropolis/g, '雅典卫城'],
    [/Plaka District/g, '普拉卡区'],
    [/Book via\s+WhatsApp/gi, '通过WhatsApp预订'],
    [/Send Inquiry/gi, '发送咨询'],

    // Global Elements
    [/Taxi & Van Transfers/g, '雅典出租车与面包车接送'],
    [/The Rocks/g, '岩层'],
    [/Services/g, '服务'],
    [/Why Choose Us/g, '为什么选择我们'],
    [/Book Now/g, '立即预订'],
    [/Home/g, '首页'],
    [/Why Us/g, '关于我们'],
    [/Quick Links/g, '快速链接'],
    [/Contact Info/g, '联系方式'],
    [/Your reliable partner for luxury transfers and tours in Greece\./g, '您在希腊值得信赖的豪华接送与旅游合作伙伴。'],
    [/All Rights Reserved\./g, '版权所有。'],
    [/See how customers review us/g, '查看客户评价'],

    // Homepage Hero & CTA
    [/Premium Taxi & Van Transfers in Athens & Lavrio/g, '雅典与拉夫里奥优质出租车及面包车接送'],
    [/"Reliable Taxi & Luxury Van services in Lavrio, Lagonisi, and Keratea\./g, '“在拉夫里奥、拉戈尼西和科拉蒂亚提供可靠的出租车与豪华面包车服务。'],
    [/Specialized in seamless Athens Airport pickups, port transfers, and private sightseeing tours\./g, '专注于无缝的雅典机场接机、港口接送及私人观光旅游。”'],
    [/Best way to reach us/g, '联系我们的最佳方式'],
    [/Instant replies &bull; Quick booking &bull; 24\/7 available/g, '即时回复 &bull; 快速预订 &bull; 24/7 全天候服务'],
    [/Chat on\s+WhatsApp/gi, 'WhatsApp 在线咨询'],
    [/View Fleet/g, '查看车队'],
    [/Chat with us/g, '在线咨询'],
    [/Send Email/gi, '发送邮件'],

    // Services Section
    [/Our Premium Fleet and Services/g, '我们的优质车队与服务'],
    [/Select the perfect ride for your needs, whether you're traveling solo or with a group, discover Greece\./g, '根据您的需求选择完美的座驾，无论您是独自旅行还是团体出游，尽情探索希腊。'],
    [/Executive Taxi/g, '行政出租车'],
    [/Only with\s+pre-booking/gi, '仅限提前预订'],
    [/Gallery/g, '图库'],
    [/Perfect for solo travelers or couples\. Fast, efficient, and comfortable city or airport transfers\./g, '独行旅客或情侣的理想选择。快速、高效、舒适的城市或机场接送。'],
    [/1-4 Passengers/g, '1-4 名乘客'],
    [/3 Standard Bags/g, '3件标准行李'],
    [/Free Wi-Fi/g, '免费无线网络'],
    [/Book Taxi/g, '预订出租车'],
    [/Most Popular/g, '最受欢迎'],
    [/Luxury Van/g, '豪华面包车'],
    [/Spacious travel for families, groups or sailing crews\. Premium comfort with extra room for luggage\./g, '适合家庭、团体或航海人员的宽敞旅行。卓越的舒适感，充足的行李空间。'],
    [/1-8 Passengers/g, '1-8 名乘客'],
    [/8-10 Bags/g, '8-10件行李'],
    [/Bottled Water Included/g, '包含瓶装水'],
    [/Book Van/g, '预订面包车'],
    [/Bus & Minibus/g, '巴士与微型巴士'],

    [/Athens Airport Transfer/g, '雅典机场接送'],
    [/Direct pickup from the gate so you don't have to walk\. Skip the long taxi lines and arrive/g, '直接在登机口接机，无需步行。跳过冗长的出租车排队，'],
    [/stress-free\. We monitor your flight\./g, '无忧抵达。我们实时监控您的航班。'],
    [/Gate Pickup, No Walking/g, '登机口接机，无需步行'],
    [/Skip Taxi Queues/g, '免排队等候'],
    [/60m Free Wait Time/g, '60分钟免费等待'],
    [/Book Transfer/g, '预订接送'],
    [/Select Transfer Type:/g, '选择接送类型:'],
    [/Arrival \(From Airport\)/g, '到达（机场出发）'],
    [/Departure \(To Airport\)/g, '出发（前往机场）'],

    [/Lavrio Port, Olympic Marine/g, '拉夫里奥港，奥林匹克码头'],
    [/"Seamless pickup directly from your yacht\. Specialized in transfers for sailing crews with/g, '“直接从您的游艇无缝接载。专为帆船船员提供'],
    [/high-capacity vans for extra gear and heavy bags\./g, '大容量面包车，满足额外装备与沉重行李的需求。'],
    [/No need to struggle finding a vehicle that fits your entire crew and equipment\."/g, '无需费力寻找能容纳所有船员及设备的车辆。”'],
    [/Crew Vans Available/g, '提供船员专用车'],
    [/Excess Luggage Friendly/g, '行李额度宽松'],
    [/Point-to-Point Service/g, '点对点服务'],

    [/Main Ports: Piraeus, Rafina, Lavrio/g, '主要港口：比雷埃夫斯、拉菲纳、拉夫里奥'],
    [/Seamless pickup directly from your ferry, cruise ship, or hydrofoil\. Skip the long taxi queues at/g, '从渡轮、游轮或水翼船直接无缝接机。跳过'],
    [/busy ports and enjoy a fixed-price transfer/g, '繁忙港口的冗长排队，享受固定价格的接送服务'],
    [/to your hotel or Athens Airport\. We monitor ferry arrivals/g, '前往您的酒店或雅典机场。我们实时监控渡轮到达时间'],
    [/Pier-Side Pickup/g, '码头边接送'],
    [/Fixed & Upfront Pricing/g, '固定且透明的价格'],
    [/We Monitor Ferry Times/g, '监控渡轮时间'],

    [/Airbnb villas and hotels/g, 'Airbnb 别墅与酒店'],
    [/Reliable 24\/7 transfers directly to your villa, apartment, or hotel\. We specialize in finding even/g, '全天候可靠接送，直达您的别墅、公寓或酒店。我们擅长寻找'],
    [/the most remote locations in Lagonisi and Keratea\./g, '拉戈尼西和科拉蒂亚最偏远的位置。'],
    [/Enjoy a stress-free arrival with a professional driver waiting for you\./g, '专业司机等候，享受无忧抵达。'],
    [/Door-to-Door Service/g, '门到门服务'],
    [/Perfect for Families/g, '家庭出游理想选择'],
    [/Local Area Experts/g, '当地专家'],

    [/Athens & Acropolis Tour/g, '雅典与卫城之旅'],
    [/Explore the historical heart of Greece\. Full or half-day private tours of the Acropolis, Plaka, and/g, '探索希腊的历史核心。卫城、普拉卡等地的全天或半天私人游览。'],
    [/more\./g, '更多精彩。'],
    [/Panoramic Stops/g, '全景停靠点'],
    [/4 to 8 Hours/g, '4到8小时'],
    [/Knowledgeable Driver/g, '知识渊博的司机'],
    [/View Details/g, '查看详情'],

    [/Sounio & Temple of Poseidon/g, '苏尼翁与波塞冬神庙'],
    [/Experience the breathtaking sunset at Cape Sounio along the beautiful Athenian Riviera\./g, '沿着美丽的雅典海滨体验苏尼翁角令人叹为观止的日落。'],
    [/Coastal Scenic Drive/g, '沿海风景驱车'],
    [/4 to 5 Hours/g, '4到5小时'],
    [/Sunset Views/g, '日落美景'],

    [/Delphi & Ancient Oracle/g, '德尔斐与古老神谕'],
    [/Discover the center of the ancient world\. Full-day private tour to the UNESCO World Heritage site\./g, '探索古代世界的中心。前往联合国教科文组织世界遗产的全天私人游览。'],
    [/Scenic Mountain Drive/g, '风景优美的山区驾车'],
    [/8 to 10 Hours/g, '8到10小时'],
    [/Historical Ruins/g, '历史遗迹'],

    [/Meteora Monasteries/g, '梅黛奥拉修道院'],
    [/Marvel at the breathtaking rock formations and visit the spectacular cliff-top monasteries\./g, '惊叹于令人叹为观止的岩层，参观壮观的悬崖顶修道院。'],
    [/Spectacular Views/g, '壮观景色'],
    [/Full Day \/ 2 Days/g, '全天 / 2天'],
    [/Monastery Visits/g, '修道院参观'],

    [/Mycenae & Epidaurus/g, '迈锡尼与埃皮达鲁斯'],
    [/Explore the legendary Tomb of Agamemnon and the ancient theater with perfect acoustics\./g, '探索传奇的阿伽门农墓和拥有完美音响效果的古剧院。'],
    [/Ancient Theater/g, '古剧院'],
    [/Historic Ruins/g, '历史遗迹'],

    // Why Choose Us
    [/Why Travel With Us\?/g, '为什么选择我们？'],
    [/We pride ourselves on providing a top-tier experience for every passenger\./g, '我们以能为每一位乘客提供顶级的体验而自豪。'],
    [/Available 24\/7/g, '全天候服务'],
    [/Day or night, our drivers are ready to pick you up whenever you need\./g, '无论白天还是黑夜，我们的司机随时准备接您。'],
    [/Fixed Pricing/g, '固定价格'],
    [/No hidden fees\. Know exactly what you are paying before you book\./g, '无隐藏费用。预订前确切了解您要支付的费用。'],
    [/English Speaking/g, '英语服务'],
    [/All our professional drivers are fluent in English and ready to assist you\./g, '我们所有专业的司机都能流利使用英语，随时准备为您提供帮助。'],
    [/Premium Vehicles/g, '高级车辆'],
    [/Immaculately clean, air-conditioned fleet maintained to the highest standards\./g, '无可挑剔的整洁、配有空调的车队，始终保持最高标准。'],

    [/Ready for a stress-free transfer\?/g, '准备好享受无忧接送了吗？'],
    [/Contact us via WhatsApp for instant booking capability and pricing inquiries\./g, '通过 WhatsApp 联系我们，进行即时预订和价格咨询。'],

    // Shared tour strings
    [/Back to All Tours/gi, '返回所有游览'],
    [/Tour Overview/g, '游览概述'],
    [/What To Expect/gi, '行程亮点'],
    [/Tour Details/g, '游览详情'],
    [/Price Upon Request/gi, '价格另询'],
    [/Duration/g, '时长'],
    [/Private Tour \(1-8 pax\)/g, '私人游览 (1-8 人)'],

    [/5-Star Rated/g, '五星级评价'],
    [/Our customers have rated us 5 out of 5 stars on Google Reviews for our excellent service\./g, '我们的客户在 Google 评论中为我们的卓越服务打出了 5 星满分。'],
    [/No Waiting in Lines/g, '无需排队'],
    [/Pre-book to avoid long queues, especially during Athens' high season when taxi shortages are a major\s*problem\./g, '提前预订以避免冗长的排队，特别是在雅典旺季出租车严重短缺的时候。'],
    [/Local Concierge Support/g, '当地礼宾支持'],
    [/Contact us even for recommendations on where to eat or what to see\. We are here to help you\s*throughout your entire trip\./g, '无论是餐厅推荐还是观光建议，都可以联系我们。我们在您的整个旅程中为您提供帮助。'],
    [/Call Us/g, '致电我们'],
    [/Only with pre-booking/g, '仅限提前预订'],
    [/Up to 50 Passengers/g, '最多 50 名乘客'],
    [/Ample Luggage Space/g, '充足的行李空间'],
    [/Fully Air-Conditioned/g, '全空调环境'],
    [/Ideal for large groups and corporate events\./g, '大型团体和公司活动的理想选择。'],

    // --- Tour Content Specific ---

    // Acropolis Tour
    [/Athens & Acropolis Experience/g, '雅典与卫城体验'],
    [/Discover the cradle of Western civilization\. A complete journey through the\s*historical highlights of Athens\./g, '发现西方文明的摇篮。一次穿越雅典历史亮点的全面旅程。'],
    [/Athens is a city where ancient mythology and modern vibrancy exist side-by-side\. Our\s*private Athens City Tour is designed to give you a comprehensive understanding of the city's glorious\s*past, picking you up from your location and driving you through the historical center in ultimate\s*comfort\./g, '雅典是一座古代神话与现代活力共存的城市。我们的私人雅典城市游旨在让您全面了解这座城市辉煌的过去，从您的所在地接您，并在极致舒适的环境中带您穿梭于历史中心。'],
    [/You will witness architectural masterpieces such as the Parthenon on the Acropolis\s*hill, experience the charm of the oldest neighborhood of Athens, and see where the first modern Olympic\s*Games took place\. Your driver will provide historical context and let you explore each monument at your\s*own pace\./g, '您将见证卫城山上的帕特农神庙等建筑杰作，体验雅典最古老街区的魅力，并参观第一届现代奥运会的举办地。您的司机将提供历史背景，让您按自己的节奏探索每座古迹。'],
    [/Parthenon & Erechtheion/g, '帕特农神庙与伊瑞克提翁神庙'],
    [/The Neighborhood of the Gods/g, '众神居住的街区'],
    [/1\. Premium Pickup/g, '1. 高级接送'],
    [/Your private driver will meet you at your hotel, apartment, or cruise ship port to begin the tour\s*in our fully air-conditioned luxury vehicle\./g, '您的私人司机将在您的酒店、公寓或邮轮港口与您会合，乘坐我们的全空调豪华车辆开启旅程。'],
    [/2\. The Acropolis & Parthenon/g, '2. 卫城与帕特农神庙'],
    [/Our first stop is the world-famous Acropolis\. You will have time to walk up the hill, explore the\s*magnificent Parthenon, the Temple of Athena Nike, and take panoramic photos of the entire city\s*from the top\./g, '我们的第一站是世界闻名的卫城。您将有时间爬上山丘，探索宏伟的帕特农神庙、雅典娜胜利神庙，并从山顶拍摄整个城市的全景照片。'],
    [/3\. Panathenaic Stadium/g, '3. 泛雅典体育场'],
    [/We'll drive to the impressive all-marble Panathenaic Stadium, the historic site of the first\s*modern Olympic Games held in 1896\./g, '我们将驱车前往令人印象深刻的全大理石泛雅典体育场，这里是 1896 年举办的第一届现代奥运会的历史遗址。'],
    [/4\. Changing of the Guards/g, '4. 卫兵交接仪式'],
    [/Next stop is Syntagma Square and the Greek Parliament to witness the traditional changing of the\s*Presidential Guards \(Evzones\) at the Tomb of the Unknown Soldier\./g, '下一站是宪法广场和希腊议会，在无名烈士墓前见证总统卫队（Evzones）传统的换岗仪式。'],
    [/5\. Mount Lycabettus & Plaka/g, '5. 利卡维多斯山与普拉卡'],
    [/We'll drive up Lycabettus Hill for the highest viewpoint in Athens, and conclude with a walk\s*through Plaka, the charming old town full of traditional tavernas and shops before returning to\s*your hotel\./g, '我们将驱车前往利卡维多斯山，欣赏雅典的最高视角，最后漫步在充满传统小酒馆和商店的迷人旧城区普拉卡，然后返回您的酒店。'],

    // Argolis
    [/Step into the Homeric epics\. Visit the golden city of Mycenae and the acoustic\s*marvel of Epidaurus\./g, '步入荷马史诗。参观迈锡尼黄金之城和埃皮达鲁斯的声学奇迹。'],
    [/Join us on an unforgettable journey to the Argolis peninsula, where Greek mythology\s*comes to life\. This full-day private tour takes you to some of the most significant archaeological sites\s*of ancient Greece, steeped in the legends of King Agamemnon and the Trojan War\./g, '加入我们，前往阿尔戈利斯半岛开启一段难忘的旅程，让希腊神话在您眼前复活。这次全天私人游览将带您前往古希腊一些最重要的考古遗址，沉浸在阿伽门农国王和特洛伊战争的传说中。'],
    [/You will walk through the imposing Lion Gate of Mycenae, explore monumental tholos\s*tombs, stroll through the romantic streets of Nafplio \(the first capital of modern Greece\), and finish\s*at the breathtaking Sanctuary of Asklepios in Epidaurus, home to the ancient theater famous for its\s*perfect acoustics\./g, '您将穿过庄严的迈锡尼狮子门，探索宏伟的圆顶墓，漫步在纳夫普利奥（现代希腊的第一个首都）浪漫的街道上，最后抵达令人惊叹的埃皮达鲁斯阿斯克勒庇俄斯圣域，这里有以完美音响效果闻名的古剧院。'],
    [/Mycenae Citadel/g, '迈锡尼城堡'],
    [/Tomb of Agamemnon/g, '阿伽门农墓'],
    [/Ancient Epidaurus/g, '古埃皮达鲁斯'],
    [/The acoustic masterpiece/g, '声学杰作'],
    [/1\. Departure & Corinth Canal/g, '1. 出发与科林斯运河'],
    [/Your private driver will pick you up in Athens\. Our first major stop will be a breathtaking view\s*of the Corinth Canal, an engineering marvel that connects the Aegean and Ionian seas\./g, '您的私人司机将在雅典接您。我们的第一个主要停靠点是科林斯运河，这是连接爱琴海和爱奥尼亚海的工程奇迹，景色令人叹为观止。'],
    [/2\. Ancient Mycenae/g, '2. 古迈锡尼'],
    [/Enter the ancient kingdom of Agamemnon through the legendary Lion Gate\. Explore the Cyclopean\s*walls, the Royal Tombs, and the awe-inspiring Treasury of Atreus \(Tomb of Agamemnon\)\./g, '穿过传奇的狮子门，进入阿伽门农的古代王国。探索独眼巨人城墙、皇家陵墓以及令人敬畏的阿特柔斯宝库（阿伽门农墓）。'],
    [/3\. Nafplio City/g, '3. 纳夫普利奥市'],
    [/We'll stop at the picturesque coastal city of Nafplio\. Enjoy a walk through its charming narrow\s*streets, admire the Bourtzi fortress in the water, and have a traditional Greek lunch\./g, '我们将在风景如画的沿海城市纳夫普利奥停留。漫步于迷人的狭窄街道，欣赏水中的布尔齐堡垒，并享用传统的希腊午餐。'],
    [/4\. Theater of Epidaurus/g, '4. 埃皮达鲁斯剧院'],
    [/The tour concludes with a visit to the ancient Theater of Epidaurus, renowned worldwide for its\s*flawless acoustics\. Even a whisper on the stage can be heard clearly in the highest seating\s*rows\./g, '行程以参观埃皮达鲁斯古剧院结束，该剧院以其完美的音响效果闻名于世。即使是舞台上的低语，在最高排的座位上也能清晰听到。'],
    [/5\. Return to Athens/g, '5. 返回雅典'],
    [/After a day full of mythological wonders and magnificent architecture, relax in your premium\s*vehicle as we head back to your accommodation in Athens\./g, '在充满神话奇观和宏伟建筑的一天之后，坐在您的高级车辆中放松休息，我们将返回您在雅典的住所。'],

    // Delphi
    [/Delphi & Ancient Oracle/g, '德尔斐与古老神谕'],
    [/Journey to the "Navel of the World" and immerse yourself in the mystique of\s*ancient Greece\./g, '前往“世界中心”，让自己沉浸在古希腊的神秘氛围中。'],
    [/Step back in time with a full-day excursion to Delphi, considered by ancient Greeks to\s*be the center of the world\. Nestled on the slopes of Mount Parnassus, Delphi is one of the most stunning\s*UNESCO World Heritage sites in Greece\./g, '参加德尔斐全天远足，重返昔日时光。德尔斐被古希腊人视为世界的中心。德尔斐坐落在帕纳塞斯山坡上，是希腊最迷人的联合国教科文组织世界遗产之一。'],
    [/On this private day trip, you will marvel at the Temple of Apollo where the famous\s*Oracle delivered her prophecies, explore the ancient theater, and witness incredible artifacts in the\s*Delphi Archaeological Museum\. The route also takes you through scenic mountain landscapes and\s*traditional villages\./g, '在这次私人一日游中，您将惊叹于著名的神谕发布预言的阿波罗神庙，探索古剧院，并在德尔斐考古博物馆见证令人难以置信的文物。路线还将带您穿越优美的山区风光和传统村庄。'],
    [/The sanctuary of the Oracle/g, '神谕圣域'],
    [/Picturesque mountain town/g, '风景如画的山城'],
    [/1\. Hotel \/ Port Pickup/g, '1. 酒店 / 港口接送'],
    [/Start your day early as your private driver picks you up from your Athens location in a premium,\s*climate-controlled vehicle\./g, '尽早开启您的一天，您的私人司机将乘坐配有空调的高级车辆从您的雅典所在地接您。'],
    [/2\. Scenic Mountain Drive/g, '2. 风景优美的山区驾车'],
    [/Enjoy a relaxing drive through the fertile plain of Boeotia, crossing the towns of Thebes and\s*Levadia before ascending the majestic Mount Parnassus\./g, '驱车穿越维奥蒂亚肥沃的平原，经过底比斯和莱瓦迪亚镇，然后登上雄伟的帕纳塞斯山，享受轻松的旅程。'],
    [/3\. Delphi Archaeological Site/g, '3. 德尔斐考古遗址'],
    [/Arrive at Delphi to explore the incredible ruins\. Walk the Sacred Way, visit the Temple of\s*Apollo, the ancient Theater, and the Stadium where the Pythian Games were held\./g, '抵达德尔斐，探索令人难以置信的遗址。漫步神圣之路，访问阿波罗神庙、古剧院，以及举办皮提亚运动会的体育场。'],
    [/4\. Delphi Museum/g, '4. 德尔斐博物馆'],
    [/Discover masterpieces of ancient Greek sculpture, including the famous bronze Charioteer and the\s*Sphinx of Naxos\./g, '发现古希腊雕塑的杰作，包括著名的青铜战车御者和纳克索斯的斯芬克斯。'],
    [/5\. Arachova & Lunch/g, '5. 阿拉霍瓦与午餐'],
    [/Stop at the beautiful mountain village of Arachova for a traditional Greek lunch \(optional\) and\s*some souvenir shopping before we begin our comfortable drive back to Athens\./g, '在美丽的山村阿拉霍瓦停靠，享用传统的希腊午餐（可选）并购买纪念品，然后开启返回雅典的舒适旅程。'],

    // Meteora
    [/A spiritual journey to the sky\. Visit the spectacular cliff-top monasteries of Central Greece\./g, '通往天空的精神之旅。参观希腊中部壮观的悬崖顶修道院。'],
    [/Meteora is one of the most stunning places on Earth\. Massive limestone pillars rise from the plain of Thessaly, topped by ancient Byzantine monasteries that seem to float in the air\./g, '梅黛奥拉是地球上最迷人的地方之一。巨大的石灰岩柱从色萨利平原升起，顶部是古老的拜占庭修道院，仿佛漂浮在空中。'],
    [/Our private Meteora tour takes you on a scenic journey through mainland Greece to witness this UNESCO World Heritage site\. You will have the opportunity to visit the interior of the most significant monasteries and enjoy panoramic views that are truly out of this world\./g, '我们的私人梅黛奥拉之旅带您穿越希腊大陆开启一段优美的旅程，见证这一联合国教科文组织世界遗产。您将有机会参观最重要的修道院内部，并欣赏真正超凡脱俗的全景。'],
    [/Cliff-top Monasteries/g, '悬崖顶修道院'],
    [/UNESCO World Heritage/g, '联合国教科文组织世界遗产'],
    [/Panoramic Views/g, '全景'],
    [/Central Greece Landscapes/g, '希腊中部风景'],
    [/1\. Athens Departure/g, '1. 雅典出发'],
    [/Your journey begins in Athens, where your private driver will pick you up for a comfortable drive north through the fertile plains of Thessaly\./g, '您的旅程始于雅典，您的私人司机将接您，向北穿过色萨利肥沃的平原，享受舒适的驾车旅程。'],
    [/2\. Arrival at Meteora/g, '2. 抵达梅黛奥拉'],
    [/As we reach the town of Kalabaka, the towering rocks of Meteora come into view\. We'll begin our ascent to the monastic complex\./g, '当我们到达卡兰巴卡镇时，巍峨的梅黛奥拉岩石映入眼帘。我们将开始登上修道院建筑群。'],
    [/3\. Monastery Visits/g, '3. 修道院参观'],
    [/Visit 2 or 3 of the active monasteries \(depending on the day's schedule\)\. Explore the incredible Byzantine frescoes, religious icons, and the daily life of the monks\./g, '参观 2 或 3 座活跃的修道院（取决于当天的行程）。探索令人难以置信的拜占庭壁画、宗教图标以及僧侣的日常生活。'],
    [/4\. Panoramic Photo Stops/g, '4. 全景摄影停靠点'],
    [/We'll stop at several panoramic viewpoints for breathtaking photos of the entire monastic forest and the town of Kalabaka below\./g, '我们将在几个全景视角停靠，拍摄整个修道院森林和下方卡兰巴卡镇的壮丽照片。'],
    [/5\. Local Lunch & Return/g, '5. 当地午餐与返回'],
    [/Enjoy a traditional lunch in a local tavern in Kalabaka or Kastraki village before our comfortable return journey to Athens \(or an overnight stay if selected\)\./g, '在舒适地返回雅典（或选择过夜）之前，在卡兰巴卡或卡斯特拉基村的一家当地小酒馆享用传统午餐。'],

    // Sounio
    [/Sunset at the edge of the world\. Experience the breathtaking beauty of the Athenian Riviera\./g, '世界尽头的日落。体验雅典海滨扣人心弦的美景。'],
    [/Cape Sounio is one of the most romantic and historical spots in Greece\. Standing at the southernmost tip of Attica, the Temple of Poseidon overlooks the Aegean Sea, offering one of the most famous sunsets in the world\./g, '苏尼翁角是希腊最浪漫、最具历史意义的景点之一。波塞冬神庙矗立在阿提卡的最南端，俯瞰着爱琴海，呈现出世界上最著名的日落景观之一。'],
    [/This private tour takes you along the scenic coastal road of the Athenian Riviera, passing through beautiful suburbs and beaches, before arriving at the majestic ruins of the sea god's temple\./g, '这次私人游览将带您沿着雅典海滨优美的沿海公路，经过美丽的郊区和海滩，最后抵达宏伟的海神庙遗址。'],
    [/Temple of Poseidon/g, '波塞冬神庙'],
    [/Ancient architecture/g, '古代建筑'],
    [/Athenian Riviera/g, '雅典海滨'],
    [/Scenic coastal drive/g, '优美的沿海驾车'],
    [/1\. Coastal Drive/g, '1. 沿海驾车'],
    [/Your private driver will pick you up for a scenic drive along the Saronic Gulf, passing through the beautiful seaside suburbs of Glyfada, Vouliagmeni, and Varkiza\./g, '您的私人司机将接您，沿着萨罗尼克湾开启一段优美的驾车旅程，经过格利法达、武利亚格梅尼和瓦尔基扎等美丽的海滨郊区。'],
    [/2\. Lake Vouliagmeni/g, '2. 武利亚格梅尼湖'],
    [/We'll make a short stop at the natural thermal Lake Vouliagmeni, a hidden gem of the Riviera known for its healing waters and stunning cliff backdrop\./g, '我们将在天然温泉湖武利亚格梅尼湖短暂停留，这是海滨的一颗隐藏明珠，以其具有疗愈功效的湖水和迷人的悬崖背景而闻名。'],
    [/3\. Cape Sounio Arrival/g, '3. 抵达苏尼翁角'],
    [/Arrive at the southernmost tip of Attica\. The Temple of Poseidon, built in 444 BC, stands proudly on the cliffs 60 meters above the sea\./g, '抵达阿提卡的最南端。建于公元前 444 年的波塞冬神庙傲然屹立在海拔 60 米的悬崖上。'],
    [/4\. Sunset Experience/g, '4. 日落体验'],
    [/Witness the legendary sunset from the temple ruins\. Watch the sun dip into the Aegean Sea in a spectacle of vibrant colors\./g, '从神庙遗址见证传奇日落。在色彩斑斓的壮观景象中观看太阳沉入爱琴海。'],
    [/5\. Seaside Dinner & Return/g, '5. 海滨晚餐与返回'],
    [/Enjoy an optional dinner at a traditional fish tavern by the sea before your comfortable return drive to Athens\./g, '在舒适地驱车返回雅典之前，在海边的一家传统鱼肉小酒馆享用可选晚餐。'],

    // --- Sounio Tour Content ---
    [/A magical drive along the Athenian Riviera leading to one of the most stunning/g, '沿着雅典海滨开启一段奇幻驾车之旅，通往希腊最迷人的'],
    [/sunsets in Greece\./g, '日落之一。'],
    [/Built in the 5th century BC to honor the God of the Sea, the temple stands proudly on a/g, '这座神庙建于公元前 5 世纪，用于祭祀海神，傲然屹立在'],
    [/rocky hill overlooking the Aegean Sea\. Not only will you discover fascinating history, but you will also/g, '俯瞰爱琴海的岩石山丘上。您不仅会发现引人入胜的历史，还会'],
    [/experience what many consider to be the most breathtaking sunset in all of Greece\./g, '体验被许多人认为是全希腊最扣人心弦的日落。'],
    [/Photo Stops/g, '摄影点'],
    [/Lake Vouliagmeni & Riviera/g, '武利亚格梅尼湖与海滨'],
    [/Epic view from the Temple/g, '神庙的壮丽景色'],
    [/1\. Hotel Pickup/g, '1. 酒店接送'],
    [/Your private driver will pick you up directly from your hotel\/apartment in a luxurious,/g, '您的私人司机将乘坐豪华且配有'],
    [/climate-controlled vehicle\. We usually recommend starting a few hours before sunset\./g, '空调的车辆直接从您的酒店/公寓接您。我们通常建议在日落前几小时出发。'],
    [/2\. The Athenian Riviera Drive/g, '2. 雅典海滨驾车'],
    [/We'll drive along the beautiful coastal road, passing through upscale Athenian suburbs like/g, '我们将沿着美丽的沿海公路行驶，经过格利法达、武利亚格梅尼和瓦尔基扎等雅典高档郊区，'],
    [/Glyfada, Vouliagmeni, and Varkiza, enjoying uninterrupted views of the Saronic Gulf\./g, '欣赏萨罗尼克湾一览无余的美景。'],
    [/3\. Vouliagmeni Lake \(Optional Stop\)/g, '3. 武利亚格梅尼湖（可选停靠点）'],
    [/A quick stop at the natural spa lake of Vouliagmeni, famous for its warm therapeutic waters and/g, '在武利亚格梅尼天然水疗湖短暂停留，该湖以其温暖的疗愈湖水和'],
    [/impressive rock formations\./g, '令人印象深刻的岩石构造而闻名。'],
    [/4\. Temple of Poseidon/g, '4. 波塞冬神庙'],
    [/Arrive at Cape Sounio\. You will have plenty of time to explore the ancient ruins, take stunning/g, '抵达苏尼翁角。您将有充足的时间探索古代遗迹，拍摄惊艳的照片，'],
    [/photos, and watch the sun dip below the Aegean horizon\./g, '并观看太阳沉入爱琴海地平线。'],
    [/5\. Return or Seaside Dinner/g, '5. 返回或海滨晚餐'],
    [/After the sunset, we can head back to Athens or, if you prefer, stop at a traditional Greek/g, '日落后，我们可以返回雅典，或者如果您愿意，可以停留在海边的传统希腊'],
    [/tavern by the sea for fresh seafood before returning\./g, '小酒馆享用新鲜海鲜后再返回。'],

    // --- Final generic terms ---
    [/Gallery/g, '图库'],
    [/Meteora Monasteries/g, '梅黛奥拉修道院'],
    [/Acropolis/g, '雅典卫城'],
    [/Delphi/g, '德尔斐'],
    [/Sounio/g, '苏尼翁'],
    [/Argolis/g, '阿尔戈利斯'],
    [/Mycenae/g, '迈锡尼'],
    [/Epidaurus/g, '埃皮达鲁斯'],
    [/LIVE RIGHT NOW: KONSTANTINOS/g, '在线咨询：KONSTANTINOS'],
    [/Only with\s+pre-booking/gi, '仅限提前预订'],
    [/Temple of Apollo/g, '阿波罗神庙'],
    [/Arachova Village/g, '阿拉霍瓦村'],
    [/No need to struggle finding a vehicle that fits your entire crew and equipment\./g, '无需费力寻找能容纳所有船员及设备的车辆。'],
];

// Create zh directory if not exists
const zhDir = path.join(__dirname, 'zh');
if (!fs.existsSync(zhDir)) {
    fs.mkdirSync(zhDir);
}

files.forEach(file => {
    const enPath = path.join(__dirname, file);
    const zhPath = path.join(__dirname, 'zh', file);
    
    if (fs.existsSync(enPath)) {
        let content = fs.readFileSync(enPath, 'utf8');

        translations.forEach(([regex, replacement]) => {
            content = content.replace(regex, replacement);
        });

        // SEO Meta Tags Translation
        content = content.replace(/<title>.*?<\/title>/, '<title>雅典出租车与面包车接送 | 机场接送拉夫里奥、拉戈尼西、科拉蒂亚</title>');
        content = content.replace(/meta name="description" content=".*?"/, 'meta name="description" content="雅典、拉夫里奥、拉戈尼西和科拉蒂亚的优质出租车与面包车接送服务。24/7 雅典机场接机、港口接送，以及前往卫城、苏尼翁、德尔斐、梅黛奥拉的私人游览。"');

        // FIX: Revert accidentally translated function names and property keys
        content = content.replace(/openVehicle图库/g, 'openVehicleGallery');
        content = content.replace(/closeVehicle图库/g, 'closeVehicleGallery');

        // Set language attribute
        content = content.replace(/<html lang="en">/, '<html lang="zh-CN">');

        // FIX: Favicon and Asset paths for subdirectories
        content = content.replace(/href="css\//g, 'href="../css/');
        content = content.replace(/src="images\//g, 'src="../images/');
        content = content.replace(/href="images\//g, 'href="../images/');
        content = content.replace(/src="js\//g, 'src="../js/');
        content = content.replace(/url\('images\//g, "url('../images/");
        content = content.replace(/url\("images\//g, 'url("../images/');

        fs.writeFileSync(zhPath, content, 'utf8');
        console.log(`Translated ${file} to zh`);
    }
});

// Create ja directory if not exists
const jaDir = path.join(__dirname, 'ja');
if (!fs.existsSync(jaDir)) {
    fs.mkdirSync(jaDir);
}

files.forEach(file => {
    const enPath = path.join(__dirname, file);
    const jaPath = path.join(__dirname, 'ja', file);
    
    if (fs.existsSync(enPath)) {
        let content = fs.readFileSync(enPath, 'utf8');

        translations.forEach(([regex, replacement]) => {
            content = content.replace(regex, replacement);
        });

        // SEO Meta Tags Translation
        content = content.replace(/<title>.*?<\/title>/, '<title>アテネ・タクシー＆バン送迎 | アテネ空港、ラブリオ、ラゴニシ、ケラテア送迎</title>');
        content = content.replace(/meta name="description" content=".*?"/, 'meta name="description" content="アテネ、ラブリオ、ラゴニシ、ケラテアでのプレミアムタクシー＆バン送迎。24時間365日のアテネ空港送迎、港送迎、アクロポリス、スニオン、デルフィ、メテオラへのプライベートツアー。"');

        // FIX: Revert accidentally translated function names and property keys
        content = content.replace(/openVehicleギャラリー/g, 'openVehicleGallery');
        content = content.replace(/closeVehicleギャラリー/g, 'closeVehicleGallery');

        // Set language attribute
        content = content.replace(/<html lang="en">/, '<html lang="ja">');

        // FIX: Favicon and Asset paths for subdirectories
        content = content.replace(/href="css\//g, 'href="../css/');
        content = content.replace(/src="images\//g, 'src="../images/');
        content = content.replace(/href="images\//g, 'href="../images/');
        content = content.replace(/src="js\//g, 'src="../js/');
        content = content.replace(/url\('images\//g, "url('../images/");
        content = content.replace(/url\("images\//g, 'url("../images/');

        fs.writeFileSync(jaPath, content, 'utf8');
        console.log(`Translated ${file} to ja`);
    }
});
