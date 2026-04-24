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
    [/Our Premium Fleet and 服务/g, '我们的优质车队和服务'],
    [/Chat on WhatsApp/g, '通过WhatsApp聊天'],
    [/Send\s*Email/g, '发送邮件'],
    [/Back to All Tours/g, '返回所有游览'],
    [/Price Upon Request/g, '价格另询'],
    [/Entrance Fees Not Included/g, '门票不含'],
    [/Book via WhatsApp/g, '通过WhatsApp预订'],
    [/Send Inquiry/g, '发送咨询'],
    [/Full Day \(8 - 10 Hours\)/g, '全天（8-10小时）'],
    [/Full Day \(4 - 5 Hours\)/g, '半天（4-5小时）'],
    [/Full Day \/ 2 Days/g, '全天 / 2天'],
    [/4 to 5 Hours/g, '4到5小时'],
    [/8 to 10 Hours/g, '8到10小时'],
    [/4 to 8 Hours/g, '4到8小时'],
    [/or Sedan/g, '或轿车'],
    [/Driver/g, '司机'],
    [/Entrance fees not included/g, '不包含门票'],

    // Acropolis
    [/Join us for an unforgettable journey into the heart of ancient democracy and philosophy[\s\S]*?the vibrant modern city life\./g, '加入我们，开启一段难忘的旅程，深入探索古代民主和哲学的核心。这次全天或半天的私人游览将带您穿梭于希腊首都最具标志性的古迹之中，将几千年的历史与充满活力的现代城市生活完美结合。'],
    [/You will walk on the sacred rock of the Acropolis[\s\S]*?Lycabettus Hill\./g, '您将漫步在雅典卫城神圣的岩石上，欣赏第一届现代奥运会的大理石体育场，并从利卡维多斯山上将雅典最壮观的全景尽收眼底。'],
    [/Your private driver will pick you up from your hotel[\s\S]*?Temple of Athena Nike\./g, '您的私人司机将从酒店接您。我们的第一站也是最重要的一站将是雅典卫城，您将在这里参观帕特农神庙、伊瑞克提翁神庙和雅典娜胜利女神庙。'],
    [/Admire the colossal columns of one of the largest temples in the ancient world, along with Hadrian's Arch\./g, '欣赏古代世界最大神庙之一的巨大石柱，以及哈德良拱门。'],
    [/See the impressive white marble stadium, the historic site of the first modern Olympic Games in 1896\./g, '参观令人印象深刻的白色大理石体育场，这里是1896年第一届现代奥运会的历史遗址。'],
    [/We will watch the traditional ceremony of the Evzones outside the Greek Parliament at Syntagma Square\./g, '我们将在宪法广场的希腊议会大厦外，观看传统的总统卫队（Evzones）换岗仪式。'],
    [/We will drive up Lycabettus Hill for the best panoramic view of Athens and finish with a walk in the charming Plaka neighborhood\./g, '我们将驱车前往利卡维多斯山，欣赏雅典最棒的全景，最后在迷人的普拉卡街区漫步结束我们的行程。'],
    [/1\. The Sacred Rock of Acropolis/g, '1. 神圣的卫城岩石'],
    [/2\. Temple of Olympian Zeus/g, '2. 奥林匹亚宙斯神庙'],
    [/3\. Panathenaic Stadium/g, '3. 泛雅典体育场'],
    [/4\. Changing of the Guards/g, '4. 卫兵交接'],
    [/5\. Lycabettus Hill & Plaka/g, '5. 利卡维多斯山和普拉卡'],

    // Argolis
    [/Join us on an unforgettable journey to the Argolis peninsula[\s\S]*?King Agamemnon and the Trojan War\./g, '加入我们，前往阿尔戈利斯半岛展开一段难忘的旅程，让希腊神话在您眼前生动再现。这次全天私人游览将带您参观古希腊一些最重要的考古遗址，这些遗址沉浸在阿伽门农王和特洛伊战争的传说中。'],
    [/You will walk through the imposing Lion Gate of Mycenae[\s\S]*?perfect acoustics\./g, '您将穿过宏伟的迈锡尼狮子门，探索巨大的圆顶墓，漫步在纳夫普利奥（现代希腊的首个首都）浪漫的街道上，最后在埃皮达鲁斯令人叹为观止的阿斯克勒庇俄斯神庙结束行程，这里有以完美音响效果闻名的古剧院。'],
    [/Your private driver will pick you up in Athens[\s\S]*?Aegean and Ionian seas\./g, '您的私人司机将在雅典接您。我们的第一个主要停靠点将是欣赏科林斯运河的壮丽景色，这是一个连接爱琴海和爱奥尼亚海的工程奇迹。'],
    [/Enter the ancient kingdom of Agamemnon through the legendary Lion Gate[\s\S]*?Treasury of Atreus \(Tomb of Agamemnon\)\./g, '穿过传奇的狮子门进入古老的阿伽门农王国。探索独眼巨人城墙、皇家陵墓，以及令人敬畏的阿特柔斯宝库（阿伽门农墓）。'],
    [/We'll stop at the picturesque coastal city of Nafplio[\s\S]*?traditional Greek lunch\./g, '我们将在风景如画的沿海城市纳夫普利奥停靠。在迷人的狭窄街道上漫步，欣赏水中的布尔齐堡垒，并享用传统的希腊午餐。'],
    [/The tour concludes with a visit to the ancient Theater of 埃皮达鲁斯[\s\S]*?highest seating rows\./g, '游览以参观埃皮达鲁斯古剧院结束，该剧院以其完美的音响效果闻名于世。即使在舞台上轻声细语，坐在最高排座位的观众也能听得清清楚楚。'],
    [/After a day full of mythological wonders and magnificent architecture[\s\S]*?accommodation in Athens\./g, '在充满神话奇观和宏伟建筑的一天结束后，您可以在我们的高级车辆中放松身心，我们将带您返回雅典的住宿地。'],
    [/1\. Departure & Corinth Canal/g, '1. 出发与科林斯运河'],
    [/2\. 古迈锡尼/g, '2. 古迈锡尼'],
    [/3\. 纳夫普利奥市/g, '3. 纳夫普利奥市'],
    [/4\. Theater of 埃皮达鲁斯/g, '4. 埃皮达鲁斯剧院'],
    [/5\. Return to Athens/g, '5. 返回雅典'],

    // Delphi
    [/Considered the "Navel of the World" in ancient times[\s\S]*?slopes of Mount Parnassus\./g, '在古代，德尔斐被认为是“世界的肚脐”，是希腊最重要的宗教圣地。这次全天私人游览将带您穿过壮观的山区风景，来到帕纳塞斯山坡。'],
    [/You will explore the ruins of the Temple of Apollo[\s\S]*?traditional mountain village of Arachova\./g, '您将探索阿波罗神庙的遗址，皮提亚曾在那里传达她著名的神谕，在博物馆中欣赏古代艺术的杰作，并参观美丽的传统山村阿拉霍瓦。'],
    [/We start with a scenic drive through the fertile plains of Boeotia[\s\S]*?towns of Thebes and Levadia\./g, '我们的行程从驱车穿过肥沃的维奥蒂亚平原开始，沿途风景优美，途经底比斯和莱瓦迪亚等城镇。'],
    [/A short stop at the picturesque mountain village of Arachova[\s\S]*?traditional cheese\./g, '在风景如画的山村阿拉霍瓦短暂停留，该村以其手工编织的地毯和传统奶酪而闻名。'],
    [/Walk the Sacred Way, see the Athenian Treasury[\s\S]*?where the Oracle spoke\./g, '走过神圣之路，参观雅典人的金库，站在阿波罗神庙遗址前，这是曾经传达神谕的地方。'],
    [/Admire world-class artifacts including the famous Charioteer of Delphi[\s\S]*?Twin Kouroi\./g, '欣赏世界级的文物，包括著名的德尔斐战车御者、纳克索斯的狮身人面像和双胞胎青年雕像。'],
    [/1\. Drive through Boeotia/g, '1. 驱车穿过维奥蒂亚'],
    [/2\. Arachova Village/g, '2. 阿拉霍瓦村'],
    [/3\. Archaeological Site of Delphi/g, '3. 德尔斐考古遗址'],
    [/4\. Delphi Archaeological Museum/g, '4. 德尔斐考古博物馆'],

    // Meteora
    [/Meteora is one of the most spectacular and extraordinary landscapes[\s\S]*?historic Orthodox monasteries\./g, '梅黛奥拉是世界上最壮观和最不寻常的景观之一。这次游览将带您前往希腊大陆的中心地带，见证数百米高耸入云的巨大砂岩石柱，这些石柱的顶部坐落着历史悠久的东正教修道院。'],
    [/A UNESCO World Heritage site, Meteora offers a unique combination[\s\S]*?relaxed 2-day overnight experience\./g, '作为联合国教科文组织世界遗产，梅黛奥拉将自然美景与精神遗产独特地结合在一起。我们将此作为漫长的一日游或轻松的两日过夜体验提供。'],
    [/A comfortable drive through the Greek countryside[\s\S]*?cities of Lamia and Trikala\./g, '舒适地驱车穿过希腊乡村，途经色萨利平原以及拉米亚和特里卡拉等城市。'],
    [/Arrival at the town of Kalambaka, located at the very base[\s\S]*?traditional lunch\./g, '抵达位于雄伟梅黛奥拉岩石底部的卡兰巴卡镇。享受传统的希腊午餐。'],
    [/We will drive up the winding roads to visit 2 or 3 of the remaining active monasteries[\s\S]*?Holy Trinity\)\./g, '我们将沿着蜿蜒的道路驱车前往参观2到3座现存的活跃修道院（例如大梅黛奥拉修道院、瓦尔拉姆修道院或圣三一修道院）。'],
    [/We will make multiple stops at the best viewpoints so you can capture the breathtaking landscape and sunset\./g, '我们将在最佳观景点多次停靠，以便您捕捉令人叹为观止的风景和日落。'],
    [/1\. Journey through Central Greece/g, '1. 穿越希腊中部之旅'],
    [/2\. Kalambaka Town/g, '2. 卡兰巴卡镇'],
    [/3\. Monastery Visits/g, '3. 修道院参观'],
    [/4\. Panoramic Photo Stops/g, '4. 全景摄影停靠点'],

    // Sounio
    [/Escape the bustling city and enjoy a relaxing half-day tour[\s\S]*?breathtaking views over the Aegean Sea\./g, '逃离喧嚣的城市，沿着雅典海滨风景秀丽的沿海公路享受轻松的半日游。苏尼翁角位于阿提卡半岛的最南端，享有爱琴海令人叹为观止的美景。'],
    [/Perched on the edge of the cliff stands the magnificent Temple of Poseidon[\s\S]*?unforgettable experience\./g, '宏伟的波塞冬神庙矗立在悬崖边缘，波塞冬是古希腊的海神。从这个充满神话色彩的绝佳位置观看太阳沉入地平线是一次难忘的经历。'],
    [/Enjoy a scenic coastal drive passing through the upscale suburbs of Glyfada, Voula, and Vouliagmeni\./g, '享受风景秀丽的沿海驾驶，穿过格利法达、武拉和武利亚格梅尼的高档郊区。'],
    [/A short stop at the hidden geological treasure of Lake Vouliagmeni, famous for its thermal waters and stunning rock walls\./g, '在武利亚格梅尼湖这一隐藏的地质宝藏短暂停留，它以温泉水和令人惊叹的岩壁而闻名。'],
    [/Arrival at the dramatic cliffs of Cape Sounio where the ancient Greeks built their monument to the god of the sea\./g, '到达苏尼翁角引人注目的悬崖，古希腊人在这里为海神建造了他们的纪念碑。'],
    [/Explore the ruins of the Temple of Poseidon and watch one of the most famous and romantic sunsets in Greece\./g, '探索波塞冬神庙的遗址，并观看希腊最著名和浪漫的日落之一。'],
    [/1\. The Athenian Riviera/g, '1. 雅典海滨'],
    [/2\. Lake Vouliagmeni/g, '2. 武利亚格梅尼湖'],
    [/3\. Cape Sounio/g, '3. 苏尼翁角'],
    [/4\. The Sunset/g, '4. 日落'],
    
    // Miscellaneous missed items
    [/Step into the 首页ric epics/g, '步入史诗般的历史'],
    [/Visit the golden city of Mycenae and the acoustic\s*marvel of 埃皮达鲁斯/g, '参观金色的迈锡尼城和埃皮达鲁斯的声学奇迹'],
    [/Mycenae Citadel/g, '迈锡尼卫城'],
    [/Tomb of Agamemnon/g, '阿伽门农墓'],
    [/Ancient 埃皮达鲁斯/g, '古埃皮达鲁斯'],
    [/The acoustic masterpiece/g, '声学杰作'],
    [/What To Expect/g, '行程亮点'],
    [/Price Upon Request/gi, '价格另询'],
    [/Full Day/gi, '全天'],
    [/Half Day/gi, '半天'],
    [/or Sedan/gi, '或轿车'],
    [/Entrance Fees Not Included/gi, '不含门票'],
    [/Book via WhatsApp/gi, '通过WhatsApp预订'],
    [/Send Inquiry/gi, '发送咨询'],
    [/See how customers review us/g, '查看客户对我们的评价']
];

files.forEach(file => {
    const zhPath = path.join(__dirname, 'zh', file);
    if (fs.existsSync(zhPath)) {
        let content = fs.readFileSync(zhPath, 'utf8');
        
        translations.forEach(([regex, replacement]) => {
            content = content.replace(regex, replacement);
        });

        fs.writeFileSync(zhPath, content, 'utf8');
        console.log(`Updated translations in zh/${file}`);
    }
});
