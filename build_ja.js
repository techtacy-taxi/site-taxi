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
    // Global Elements
    [/Taxi & Van Transfers/g, 'タクシー & バン送迎'],
    [/Services/g, 'サービス'],
    [/Why Choose Us/g, '選ばれる理由'],
    [/Book Now/g, '今すぐ予約'],
    [/Home/g, 'ホーム'],
    [/Why Us/g, '選ばれる理由'],
    [/Quick Links/g, 'クイックリンク'],
    [/Contact Info/g, 'お問い合わせ'],
    [/Your reliable partner for luxury transfers and tours in Greece\./g, 'ギリシャでの高級送迎とツアーの信頼できるパートナー。'],
    [/All Rights Reserved\./g, '全著作権所有。'],
    [/See how customers review us/g, 'お客様のレビューを見る'],

    // Homepage Hero & CTA
    [/Premium Taxi & Van Transfers in Athens & Lavrio/g, 'アテネとラブリオの高級タクシー＆バン送迎'],
    [/"Reliable Taxi & Luxury Van services in Lavrio, Lagonisi, and Keratea\./g, '「ラブリオ、ラゴニシ、ケラテアでの信頼できるタクシーと高級バンサービス。'],
    [/Specialized in seamless Athens Airport pickups, port transfers, and private sightseeing tours\."/g, 'スムーズなアテネ空港送迎、港送迎、プライベート観光ツアーを専門としています。」'],
    [/Best way to reach us/g, 'おすすめの連絡方法'],
    [/Instant replies &bull; Quick booking &bull; 24\/7 available/g, '即時返信 &bull; 迅速な予約 &bull; 年中無休'],
    [/Chat on\s+WhatsApp/gi, 'WhatsAppでチャット'],
    [/View Fleet/g, '車両を見る'],
    [/Chat with us/g, 'チャットする'],
    [/Send\s+Email/gi, 'メールを送信'],
    [/Send Email/gi, 'メールを送信'],

    // Services Section
    [/Our Premium Fleet and Services/g, '当社のプレミアム車両とサービス'],
    [/Our Premium Fleet and/gi, '当社のプレミアム車両と'],
    [/Select the perfect ride for your needs, whether you're traveling solo or with a group, discover Greece\./g, '一人旅でもグループ旅行でも、ニーズに合った最適な車両を選んでギリシャを探索しましょう。'],
    [/Executive Taxi/g, 'エグゼクティブタクシー'],
    [/Gallery/g, 'ギャラリー'], // Warning: be careful with JS
    [/Perfect for solo travelers or couples\. Fast, efficient, and comfortable city or airport transfers\./g, '一人旅やカップルに最適です。迅速、効率的、かつ快適な市内または空港への送迎。'],
    [/1-4 Passengers/g, '1-4名様'],
    [/3 Standard Bags/g, '標準的な荷物3個'],
    [/Free Wi-Fi/g, '無料Wi-Fi'],
    [/Book Taxi/g, 'タクシーを予約'],
    [/Most Popular/g, '一番人気'],
    [/Luxury Van/g, '高級バン'],
    [/Spacious travel for families, groups or sailing crews\. Premium comfort with extra room for luggage\./g, 'ご家族、グループ、またはセーリングクルーのための広々とした移動。荷物を置くスペースに余裕があるプレミアムな快適さ。'],
    [/1-8 Passengers/g, '1-8名様'],
    [/8-10 Bags/g, '荷物8-10個'],
    [/Bottled Water Included/g, 'ボトル入り飲料水付き'],
    [/Book Van/g, 'バンを予約'],

    [/Athens Airport Transfer/g, 'アテネ空港送迎'],
    [/Direct pickup from the gate so you don't have to walk\. Skip the long taxi lines and arrive/g, '歩く必要がないようにゲートから直接お迎え。タクシーの長い列をスキップして到着。'],
    [/stress-free\. We monitor your flight\./g, 'ストレスフリー。フライト状況を監視します。'],
    [/Gate Pickup, No Walking/g, 'ゲートでのお迎え、徒歩なし'],
    [/Skip Taxi Queues/g, 'タクシーの列をスキップ'],
    [/60m Free Wait Time/g, '60分の無料待機時間'],
    [/Book Transfer/g, '送迎を予約'],
    [/Select Transfer Type:/g, '送迎タイプを選択:'],
    [/Arrival \(From Airport\)/g, '到着（空港から）'],
    [/Departure \(To Airport\)/g, '出発（空港へ）'],

    [/Lavrio Port, Olympic Marine/g, 'ラブリオ港、オリンピックマリーナ'],
    [/"Seamless pickup directly from your yacht\. Specialized in transfers for sailing crews with/g, '「ヨットから直接スムーズにお迎えします。セーリングクルーの送迎に特化しており、'],
    [/high-capacity vans for extra gear and heavy bags\./g, '追加の装備や重い荷物に対応する大容量のバンをご用意しています。'],
    [/No need to struggle finding a vehicle that fits your entire crew and equipment\."/g, 'クルー全員と機材が収まる車両を探すのに苦労する必要はありません。」'],
    [/Crew Vans Available/g, 'クルー用バンあり'],
    [/Excess Luggage Friendly/g, '超過手荷物対応'],
    [/Point-to-Point Service/g, 'ポイント・ツー・ポイントサービス'],

    [/Main Ports: Piraeus, Rafina, Lavrio/g, '主要港：ピレウス、ラフィナ、ラブリオ'],
    [/Seamless pickup directly from your ferry, cruise ship, or hydrofoil\. Skip the long taxi queues at/g, 'フェリー、クルーズ船、水中翼船から直接スムーズにお迎え。混雑した港での長いタクシーの列をスキップして、'],
    [/busy ports and enjoy a fixed-price transfer/g, '固定料金の送迎をお楽しみください。'],
    [/to your hotel or Athens Airport\. We monitor ferry arrivals/g, 'ホテルやアテネ空港まで。フェリーの到着を監視します。'],
    [/Pier-Side Pickup/g, '埠頭でのお迎え'],
    [/Fixed & Upfront Pricing/g, '固定の明朗会計'],
    [/We Monitor Ferry Times/g, 'フェリーの時間を監視'],

    [/Airbnb villas and hotels/g, 'Airbnbヴィラとホテル'],
    [/Reliable 24\/7 transfers directly to your villa, apartment, or hotel\. We specialize in finding even/g, 'ヴィラ、アパートメント、ホテルへの24時間年中無休の信頼できる直接送迎。私たちは、見つけるのが難しい'],
    [/the most remote locations in Lagonisi and Keratea\./g, 'ラゴニシやケラテアの最も離れた場所でも専門としています。'],
    [/Enjoy a stress-free arrival with a professional driver waiting for you\./g, 'プロのドライバーがお待ちしておりますので、ストレスなくご到着いただけます。'],
    [/Door-to-Door Service/g, 'ドア・ツー・ドア サービス'],
    [/Perfect for Families/g, 'ご家族に最適'],
    [/Local Area Experts/g, '地元の専門家'],

    [/Athens & Acropolis Tour/g, 'アテネとアクロポリスのツアー'],
    [/Explore the historical heart of Greece\. Full or half-day private tours of the Acropolis, Plaka, and/g, 'ギリシャの歴史的中心部を探索しましょう。アクロポリス、プラカなどの終日または半日プライベートツアー。'],
    [/more\./g, ''],
    [/Panoramic Stops/g, 'パノラマの立ち寄りポイント'],
    [/4 to 8 Hours/g, '4～8時間'],
    [/Knowledgeable Driver/g, '知識豊富なドライバー'],
    [/View Details/g, '詳細を見る'],

    [/Sounio & Temple of Poseidon/g, 'スニオン岬とポセイドン神殿'],
    [/Experience the breathtaking sunset at Cape Sounio along the beautiful Athenian Riviera\./g, '美しいアテニアン・リビエラに沿って、スニオン岬で息をのむような夕日を体験してください。'],
    [/Coastal Scenic Drive/g, '海岸沿いの絶景ドライブ'],
    [/4 to 5 Hours/g, '4～5時間'],
    [/Sunset Views/g, '夕日の絶景'],

    [/Delphi & Ancient Oracle/g, 'デルフィと古代の神託'],
    [/Discover the center of the ancient world\. Full-day private tour to the UNESCO World Heritage site\./g, '古代世界の中心を発見してください。ユネスコ世界遺産への終日プライベートツアー。'],
    [/Scenic Mountain Drive/g, '風光明媚な山岳ドライブ'],
    [/8 to 10 Hours/g, '8～10時間'],
    [/Historical Ruins/g, '歴史的遺跡'],

    [/Meteora Monasteries/g, 'メテオラ修道院群'],
    [/Marvel at the breathtaking rock formations and visit the spectacular cliff-top monasteries\./g, '息をのむような奇岩に驚嘆し、壮観な崖の上の修道院を訪れてください。'],
    [/Spectacular Views/g, '壮大な景色'],
    [/Full Day \/ 2 Days/g, '終日 / 2日間'],
    [/Monastery Visits/g, '修道院訪問'],

    [/Mycenae & Epidaurus/g, 'ミケーネとエピダウロス'],
    [/Explore the legendary Tomb of Agamemnon and the ancient theater with perfect acoustics\./g, '伝説のアガメムノンの墓と、完璧な音響を持つ古代劇場を探索してください。'],
    [/Ancient Theater/g, '古代劇場'],
    [/Historic Ruins/g, '歴史的遺跡'],

    // Why Choose Us
    [/Why Travel With Us\?/g, '当社を利用する理由'],
    [/We pride ourselves on providing a top-tier experience for every passenger\./g, '私たちは、すべてのお客様にトップクラスの体験を提供することに誇りを持っています。'],
    [/Available 24\/7/g, '24時間年中無休'],
    [/Day or night, our drivers are ready to pick you up whenever you need\./g, '昼夜を問わず、お客様の必要な時にいつでもドライバーがお迎えにあがります。'],
    [/Fixed Pricing/g, '固定料金'],
    [/No hidden fees\. Know exactly what you are paying before you book\./g, '隠れた費用はありません。予約する前に支払う金額を正確に把握できます。'],
    [/English Speaking/g, '英語対応'],
    [/All our professional drivers are fluent in English and ready to assist you\./g, '当社のプロのドライバーは全員英語に堪能で、お客様をサポートする準備ができています。'],
    [/Premium Vehicles/g, 'プレミアム車両'],
    [/Immaculately clean, air-conditioned fleet maintained to the highest standards\./g, '最高水準で維持された、非の打ち所のない清潔でエアコン完備の車両。'],

    [/Ready for a stress-free transfer\?/g, 'ストレスのない送迎の準備はできましたか？'],
    [/Contact us via WhatsApp for instant booking capability and pricing inquiries\./g, '即時予約や価格の問い合わせについては、WhatsApp経由でお問い合わせください。'],
    [/Vehicle Gallery/g, '車両ギャラリー'],

    // Shared tour strings
    [/Back to All Tours/gi, 'すべてのツアーに戻る'],
    [/Back to all Tours/gi, 'すべてのツアーに戻る'],
    [/Tour Overview/g, 'ツアーの概要'],
    [/What To Expect/gi, 'ツアーの内容'],
    [/Tour Details/g, 'ツアー詳細'],
    [/Price Upon Request/gi, '価格はお問い合わせください'],
    [/Duration/g, '所要時間'],
    [/Private Tour \(1-8 pax\)/g, 'プライベートツアー（1～8名様）'],
    [/Luxury Van or Sedan/gi, '高級バンまたはセダン'],
    [/English Speaking Driver/g, '英語を話すドライバー'],
    [/Entrance fees not included/gi, '入場料は含まれていません'],
    [/Entrance Fees Not Included/gi, '入場料は含まれていません'],
    [/Book via\s+WhatsApp/gi, 'WhatsAppで予約'],
    [/Send\s+Inquiry/gi, '問い合わせを送信'],
    [/Full Day \(8 - 10 Hours\)/gi, '終日（8～10時間）'],
    [/Full Day \(4 - 5 Hours\)/gi, '半日（4～5時間）'],

    // Acropolis
    [/Athens & Acropolis Experience/g, 'アテネとアクロポリスの体験'],
    [/Discover the cradle of Western civilization\. A comprehensive journey through the historical landmarks of Athens\./g, '西洋文明のゆりかごを発見してください。アテネの歴史的建造物を巡る包括的な旅。'],
    [/Join us for an unforgettable journey into the heart of ancient democracy and philosophy[\s\S]*?the vibrant modern city life\./g, '古代の民主主義と哲学の中心へと向かう忘れられない旅にご参加ください。この終日または半日のプライベートツアーでは、ギリシャの首都の最も象徴的な記念碑を巡り、数千年の歴史と活気ある現代の都市生活を組み合わせて体験できます。'],
    [/You will walk on the sacred rock of the Acropolis[\s\S]*?Lycabettus Hill\./g, 'アクロポリスの神聖な岩の上を歩き、第1回近代オリンピックの大理石のスタジアムを鑑賞し、リカヴィトスの丘からアテネの最も壮大なパノラマの景色をお楽しみいただけます。'],
    [/The Acropolis/g, 'アクロポリス'],
    [/The majestic Parthenon/g, '雄大なパルテノン神殿'],
    [/Historic Center/g, '歴史地区'],
    [/Plaka and Monastiraki/g, 'プラカとモナスティラキ'],
    [/1\. The Sacred Rock of Acropolis/g, '1. アクロポリスの聖なる岩'],
    [/Your private driver will pick you up from your hotel[\s\S]*?Temple of Athena Nike\./g, 'プライベートドライバーがホテルまでお迎えにあがります。最初で最も重要な目的地はアクロポリスです。そこでは、パルテノン神殿、エレクテイオン、アテナ・ニケ神殿を訪れます。'],
    [/2\. Temple of Olympian Zeus/g, '2. オリンピアゼウス神殿'],
    [/Admire the colossal columns of one of the largest temples in the ancient world, along with Hadrian's Arch\./g, '古代世界最大の神殿の1つである巨大な柱と、ハドリアヌスの凱旋門を鑑賞してください。'],
    [/3\. Panathenaic Stadium/g, '3. パナシナイコ・スタジアム'],
    [/See the impressive white marble stadium, the historic site of the first modern Olympic Games in 1896\./g, '1896年の第1回近代オリンピックの歴史的な場所である、印象的な白い大理石のスタジアムをご覧ください。'],
    [/4\. Changing of the Guards/g, '4. 衛兵交代式'],
    [/We will watch the traditional ceremony of the Evzones outside the Greek Parliament at Syntagma Square\./g, 'シンタグマ広場にあるギリシャ国会議事堂の外で、エヴゾネス（大統領近衛兵）の伝統的な儀式を見学します。'],
    [/5\. Lycabettus Hill & Plaka/g, '5. リカヴィトスの丘とプラカ'],
    [/We will drive up Lycabettus Hill for the best panoramic view of Athens and finish with a walk in the charming Plaka neighborhood\./g, 'アテネの最高のパノラマの景色を楽しむためにリカヴィトスの丘まで車で登り、魅力的なプラカ地区の散歩でツアーを終了します。'],

    // Argolis
    [/Mycenae & Epidaurus Experience/g, 'ミケーネとエピダウロスの体験'],
    [/Step back into the Bronze Age and classical antiquity\. A journey through the mythical Peloponnese\./g, '青銅器時代と古代の古典期にタイムスリップ。神話のペロポネソス半島を巡る旅。'],
    [/Join us on an unforgettable journey to the Argolis peninsula[\s\S]*?King Agamemnon and the Trojan War\./g, 'ギリシャ神話が息づくアルゴリス半島への忘れられない旅にご参加ください。この終日プライベートツアーでは、アガメムノン王やトロイア戦争の伝説に彩られた、古代ギリシャの最も重要な考古学遺跡のいくつかをご案内します。'],
    [/You will walk through the imposing Lion Gate of Mycenae[\s\S]*?perfect acoustics\./g, 'ミケーネの堂々たる獅子門を歩き、記念碑的なトロス墓を探索し、近代ギリシャの最初の首都であるナフプリオのロマンチックな通りを散策します。そして最後は、完璧な音響で有名な古代劇場があるエピダウロスのアスクレピオス聖域を訪れます。'],
    [/Ancient Mycenae/g, '古代ミケーネ'],
    [/Kingdom of Agamemnon/g, 'アガメムノンの王国'],
    [/Epidaurus/g, 'エピダウロス'],
    [/The Great Theater/g, '壮大な劇場'],
    [/1\. Departure & Corinth Canal/g, '1. 出発とコリントス運河'],
    [/Your private driver will pick you up in Athens[\s\S]*?Aegean and Ionian seas\./g, 'プライベートドライバーがアテネでお迎えにあがります。最初の主要な目的地は、エーゲ海とイオニア海を結ぶ工学の驚異、コリントス運河の息をのむような景色です。'],
    [/2\. 古邁錫尼|2\. 古迈锡尼/g, '2. 古代ミケーネ'], 
    [/2\. Ancient Mycenae/g, '2. 古代ミケーネ'],
    [/Enter the ancient kingdom of Agamemnon through the legendary Lion Gate[\s\S]*?Treasury of Atreus \(Tomb of Agamemnon\)\./g, '伝説の獅子門から古代のアガメムノンの王国へ。キュクロプス式の城壁、王家の墓、そして畏敬の念を抱かせるアトレウスの宝庫（アガメムノンの墓）を探索します。'],
    [/3\. Nafplio City/g, '3. ナフプリオ市'],
    [/We'll stop at the picturesque coastal city of Nafplio[\s\S]*?traditional Greek lunch\./g, '絵のように美しい沿岸都市ナフプリオに立ち寄ります。魅力的な狭い通りを散歩し、海に浮かぶブルジ要塞を鑑賞し、伝統的なギリシャのランチをお楽しみください。'],
    [/4\. Theater of 埃皮达鲁斯/g, '4. エピダウロスの劇場'],
    [/4\. Ancient Theater of Epidaurus/g, '4. エピダウロスの古代劇場'],
    [/The tour concludes with a visit to the ancient Theater of 埃皮达鲁斯[\s\S]*?highest seating\s*rows\./g, 'ツアーの最後は、完璧な音響で世界的に有名なエピダウロスの古代劇場を訪れます。ステージでのささやき声でさえ、一番上の座席列まではっきりと聞こえます。'],
    [/The tour concludes with a visit to the ancient Theater of Epidaurus[\s\S]*?highest seating\s*rows\./gi, 'ツアーの最後は、完璧な音響で世界的に有名なエピダウロスの古代劇場を訪れます。ステージでのささやき声でさえ、一番上の座席列まではっきりと聞こえます。'],
    [/5\. Return to Athens/g, '5. アテネへの帰還'],
    [/After a day full of mythological wonders and magnificent architecture[\s\S]*?accommodation in Athens\./g, '神話の驚異と壮大な建築に満ちた1日の後は、アテネの宿泊施設へ向かう間、プレミアムな車両でおくつろぎください。'],
    [/Mycenae Citadel/g, 'ミケーネの城塞'],
    [/Tomb of Agamemnon/g, 'アガメムノンの墓'],
    [/Ancient 埃皮达鲁斯/g, '古代エピダウロス'],
    [/The acoustic masterpiece/g, '音響の傑作'],
    [/Treasury of Atreus/g, 'アトレウスの宝庫'],
    [/Internal Entrance/g, '内部入口'],
    [/Aerial View/g, '俯瞰図'],

    // Delphi
    [/Delphi Oracle Experience/g, 'デルフィの神託体験'],
    [/Journey to the center of the ancient world\. Discover the mysteries of the Oracle of Apollo in a stunning mountain setting\./g, '古代世界の中心への旅。見事な山岳地帯でアポロンの神託の謎を発見してください。'],
    [/Considered the "Navel of the World" in ancient times[\s\S]*?slopes of Mount Parnassus\./g, '古代において「世界のへそ」と考えられていたデルフィは、ギリシャで最も重要な宗教的聖地でした。この終日プライベートツアーでは、壮大な山々の景色を抜けてパルナッソス山の斜面へと向かいます。'],
    [/You will explore the ruins of the Temple of Apollo[\s\S]*?traditional mountain village of Arachova\./g, 'ピュティアが有名な予言を伝えたアポロン神殿の遺跡を探索し、博物館で古代美術の傑作を鑑賞し、アラホバの美しい伝統的な山村を訪れます。'],
    [/Temple of Apollo/g, 'アポロン神殿'],
    [/The Ancient Oracle/g, '古代の神託'],
    [/Delphi Museum/g, 'デルフィ博物館'],
    [/Ancient Masterpieces/g, '古代の傑作'],
    [/1\. Drive through Boeotia/g, '1. ボイオティアをドライブ'],
    [/We start with a scenic drive through the fertile plains of Boeotia[\s\S]*?towns of Thebes and Levadia\./g, 'テーベやレヴァディアの町を通り過ぎながら、ボイオティアの肥沃な平野を巡る景色を楽しみながらドライブを始めます。'],
    [/2\. Arachova Village/g, '2. アラホバ村'],
    [/A short stop at the picturesque mountain village of Arachova[\s\S]*?traditional cheese\./g, '手織りの絨毯や伝統的なチーズで有名な、絵のように美しい山村アラホバに短時間立ち寄ります。'],
    [/3\. Archaeological Site of Delphi/g, '3. デルフィの考古遺跡'],
    [/Walk the Sacred Way, see the Athenian Treasury[\s\S]*?where the Oracle spoke\./g, '聖なる道を歩き、アテネ人の宝庫を見て、神託が語られたアポロン神殿の遺跡の前に立ちます。'],
    [/4\. Delphi Archaeological Museum/g, '4. デルフィ考古学博物館'],
    [/Admire world-class artifacts including the famous Charioteer of Delphi[\s\S]*?Twin Kouroi\./g, '有名なデルフィの御者、ナクソスのスフィンクス、双子のクーロスなど、世界クラスの工芸品を鑑賞してください。'],

    // Meteora
    [/Meteora Monasteries Experience/g, 'メテオラ修道院体験'],
    [/Witness a geological miracle\. Explore the Byzantine monasteries suspended in the air on giant rock pillars\./g, '地質学的な奇跡を目撃してください。巨大な岩柱の上に宙に浮くように建つビザンチン様式の修道院を探索しましょう。'],
    [/Meteora is one of the most spectacular and extraordinary landscapes[\s\S]*?historic Orthodox monasteries\./g, 'メテオラは、世界で最も壮大で並外れた風景の1つです。このツアーでは、ギリシャ本土の中心部へと向かい、空に向かって数百メートルもそびえ立つ巨大な砂岩の岩柱と、その頂上に建つ歴史的な正教会の修道院を見学します。'],
    [/A UNESCO World Heritage site, Meteora offers a unique combination[\s\S]*?relaxed 2-day overnight experience\./g, 'ユネスコ世界遺産であるメテオラは、自然の美しさと精神的な遺産のユニークな組み合わせを提供しています。長い終日ツアー、またはリラックスした2日間の宿泊体験として提供しています。'],
    [/The Monasteries/g, '修道院'],
    [/Suspended in the air/g, '空中に浮かぶ'],
    [/Natural Wonder/g, '自然の驚異'],
    [/Giant Rock Formations/g, '巨大な奇岩'],
    [/1\. Journey through Central Greece/g, '1. ギリシャ中部の旅'],
    [/A comfortable drive through the Greek countryside[\s\S]*?cities of Lamia and Trikala\./g, 'テッサリア平原やラミア、トリカラの都市を通り過ぎる、ギリシャの田舎を走る快適なドライブ。'],
    [/2\. Kalambaka Town/g, '2. カランバカの町'],
    [/Arrival at the town of Kalambaka, located at the very base[\s\S]*?traditional lunch\./g, '雄大なメテオラの岩のふもとに位置するカランバカの町に到着。伝統的なランチの時間です。'],
    [/3\. Monastery Visits/g, '3. 修道院訪問'],
    [/We will drive up the winding roads to visit 2 or 3 of the remaining active monasteries[\s\S]*?Holy Trinity\)\./g, '曲がりくねった道を車で登り、現在も活動している残りの修道院（メガロ・メテオロン、ヴァルラアム、またはアギア・トリアダなど）のうち2つまたは3つを訪問します。'],
    [/4\. Panoramic Photo Stops/g, '4. パノラマ写真の撮影スポット'],
    [/We will make multiple stops at the best viewpoints so you can capture the breathtaking landscape and sunset\./g, '息をのむような風景や夕日を写真に収めることができるように、最高のビューポイントで何度も停車します。'],

    // Sounio
    [/Cape Sounio Sunset Experience/g, 'スニオン岬の夕日体験'],
    [/Drive along the beautiful Athenian Riviera and witness a magical sunset at the Temple of Poseidon\./g, '美しいアテニアン・リビエラに沿ってドライブし、ポセイドン神殿での魔法のような夕日を目撃してください。'],
    [/Escape the bustling city and enjoy a relaxing half-day tour[\s\S]*?breathtaking views over the Aegean Sea\./g, '賑やかな街を抜け出し、アテニアン・リビエラの風光明媚な海岸道路に沿ってリラックスした半日ツアーをお楽しみください。アッティカ半島の最南端であるスニオン岬からは、エーゲ海の息をのむような景色を眺めることができます。'],
    [/Perched on the edge of the cliff stands the magnificent Temple of Poseidon[\s\S]*?unforgettable experience\./g, '崖の端には、古代ギリシャの海の神であるポセイドンの壮大な神殿が建っています。この神話上の見晴らしの良い場所から、太陽が地平線の下に沈むのを見るのは、忘れられない経験です。'],
    [/Temple of Poseidon/g, 'ポセイドン神殿'],
    [/Ancient Sea God/g, '古代の海の神'],
    [/Athenian Riviera/g, 'アテニアン・リビエラ'],
    [/Scenic Coastal Drive/g, '海岸沿いの絶景ドライブ'],
    [/1\. The Athenian Riviera/g, '1. アテニアン・リビエラ'],
    [/Enjoy a scenic coastal drive passing through the upscale suburbs of Glyfada, Voula, and Vouliagmeni\./g, 'グリファダ、ヴォウラ、ヴォウリアグメニの高級郊外を通り抜ける風光明媚な海岸沿いのドライブをお楽しみください。'],
    [/2\. Lake Vouliagmeni/g, '2. ヴォウリアグメニ湖'],
    [/A short stop at the hidden geological treasure of Lake Vouliagmeni, famous for its thermal waters and stunning rock walls\./g, '温泉と見事な岩壁で有名な、ヴォウリアグメニ湖という隠された地質学的宝物で短時間立ち寄ります。'],
    [/3\. Cape Sounio/g, '3. スニオン岬'],
    [/Arrival at the dramatic cliffs of Cape Sounio where the ancient Greeks built their monument to the god of the sea\./g, '古代ギリシャ人が海の神の記念碑を建てた、スニオン岬のドラマチックな崖に到着します。'],
    [/4\. The Sunset/g, '4. 夕日'],
    [/Explore the ruins of the Temple of Poseidon and watch one of the most famous and romantic sunsets in Greece\./g, 'ポセイドン神殿の遺跡を探索し、ギリシャで最も有名でロマンチックな夕日の1つをご覧ください。'],

    // Missed items
    [/Step into the 首页ric epics/g, '叙事詩のような歴史に足を踏み入れましょう'],
    [/Step into the historic epics/gi, '叙事詩のような歴史に足を踏み入れましょう'],
    [/Visit the golden city of Mycenae and the acoustic\s*marvel of エピダウロス/g, '黄金の都市ミケーネとエピダウロスの音響の驚異を訪れてください'],
    [/Visit the golden city of Mycenae and the acoustic\s*marvel of Epidaurus/gi, '黄金の都市ミケーネとエピダウロスの音響の驚異を訪れてください'],
    [/Driver/g, 'ドライバー']
];

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

        // Set language attribute
        content = content.replace(/<html lang="en">/, '<html lang="ja">');

        // Note: we MUST NOT translate JS function names. If we did accidentally, fix them.
        content = content.replace(/openVehicleギャラリー/g, 'openVehicleGallery');
        content = content.replace(/closeVehicleギャラリー/g, 'closeVehicleGallery');

        fs.writeFileSync(jaPath, content, 'utf8');
        console.log(`Translated ${file} to ja`);
    }
});
