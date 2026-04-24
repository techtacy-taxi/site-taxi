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

const fixes = [
    // Global & Sidebar
    [/4 - 5 Hours/g, '4～5時間'],
    [/or Sedan/gi, 'またはセダン'],
    [/Entrance fees not included/gi, '入場料は含まれていません'],
    [/Entrance Fees Not Included/gi, '入場料は含まれていません'],
    [/Book via\s+WhatsApp/gi, 'WhatsAppで予約'],
    [/Send\s+Inquiry/gi, '問い合わせを送信'],

    // Sounio Tour
    [/A magical drive along the Athenian Riviera leading to one of the most stunning[\s\S]*?sunsets in Greece\./g, 'アテニアン・リビエラに沿った魔法のドライブで、ギリシャで最も見事な夕日の1つへ。'],
    [/Escape the bustling city of Athens and embark on a scenic drive along the mesmerizing[\s\S]*?Temple of Poseidon\./g, '活気あるアテネの街から抜け出し、魅惑的で美しいアテニアン・リビエラに沿って景色を楽しみながらドライブに出発しましょう。目的地はアッティカ半島の最南端であるスニオン岬で、壮大なポセイドン神殿で有名です。'],
    [/Built in the 5th century BC to honor the God of the Sea, the temple stands proudly on a[\s\S]*?sunset in all of Greece\./g, '海の神を称えるために紀元前5世紀に建てられたこの神殿は、エーゲ海を見下ろす岩山に誇らしげに立っています。魅力的な歴史を発見するだけでなく、ギリシャ全土で最も息をのむような夕日と多くの人が考えるものを体験することもできます。'],
    [/Your private driver will pick you up directly from your hotel\/apartment in a luxurious,[\s\S]*?before sunset\./g, 'プライベートドライバーが、エアコン完備の豪華な車両でホテルやアパートメントまで直接お迎えにあがります。通常、日没の数時間前に出発することをお勧めします。'],
    [/We'll drive along the beautiful coastal road, passing through upscale Athenian suburbs like[\s\S]*?Saronic Gulf\./g, '美しい海岸道路をドライブし、グリファダ、ヴォウリアグメニ、ヴァルキザなどの高級なアテネ郊外を通り抜け、サロニコス湾の遮るもののない景色を楽しみます。'],
    [/A quick stop at the natural spa lake of Vouliagmeni, famous for its warm therapeutic waters and[\s\S]*?rock formations\./g, '温かい治療用の水と印象的な岩の地層で有名な、ヴォウリアグメニの自然のスパ湖に短時間立ち寄ります。'],
    [/We arrive at the tip of the peninsula\. You will have plenty of time to walk up to the temple,[\s\S]*?horizon\./g, '半島の先端に到着します。神殿まで歩いて登り、遺跡を鑑賞し、太陽が地平線に沈む魔法のような瞬間を待つ時間が十分にあります。'],
    [/After sunset, you will meet your driver and enjoy a relaxed, comfortable ride back to your[\s\S]*?Athens\./g, '日没後、ドライバーと合流し、アテネの宿泊施設までリラックスして快適なドライブをお楽しみください。'],

    // Acropolis Tour
    [/Discover the cradle of Western civilization\. A complete journey through the[\s\S]*?highlights of Athens\./g, '西洋文明のゆりかごを発見してください。アテネの歴史的ハイライトを巡る完全な旅。'],
    [/Athens is a city where ancient mythology and modern vibrancy exist side-by-side\. Our[\s\S]*?comfort\./g, 'アテネは、古代の神話と現代の活気が共存する都市です。当社のプライベートアテネ市内ツアーは、あなたの場所からお迎えし、最高の快適さで歴史的中心部をドライブすることで、街の輝かしい過去を包括的に理解できるように設計されています。'],
    [/You will witness architectural masterpieces such as the Parthenon on the Acropolis[\s\S]*?own pace\./g, 'アクロポリスの丘の上のパルテノン神殿などの建築の傑作を目撃し、アテネの最も古い地区の魅力を体験し、第1回近代オリンピックが開催された場所を見学します。ドライバーが歴史的な背景を提供し、自分のペースで各記念碑を探索できます。'],
    [/Your private driver will meet you at your hotel, apartment, or cruise ship port to begin the tour[\s\S]*?luxury vehicle\./g, 'プライベートドライバーがホテル、アパートメント、またはクルーズ船の港でお出迎えし、エアコン完備の豪華な車両でツアーを開始します。'],
    [/Our first stop is the world-famous Acropolis\. You will have time to walk up the hill, explore the[\s\S]*?from the top\./g, '最初の目的地は世界的に有名なアクロポリスです。丘を登り、壮大なパルテノン神殿、アテナ・ニケ神殿を探索し、頂上から街全体のパノラマ写真を撮る時間があります。'],
    [/We will drive down to see the colossal Temple of Olympian Zeus, dedicated to the king of the[\s\S]*?Hadrian's Arch\./g, '車で下って、オリンポスの神々の王に捧げられた巨大なオリンピアゼウス神殿を見学し、そのすぐ外にある象徴的なハドリアヌスの凱旋門を鑑賞します。'],
    [/We'll stop at the Panathenaic Stadium \(Kallimarmaro\), the only stadium in the world built[\s\S]*?in 1896\./g, '世界で唯一、全体が白い大理石で建てられたパナシナイコ・スタジアム（カリマルマロ）に立ち寄ります。ここは1896年の第1回近代オリンピックの開催地です。'],
    [/Witness the precision and tradition of the Evzones \(Presidential Guards\) in their traditional[\s\S]*?Syntagma Square\./g, 'シンタグマ広場の無名戦士の墓の前で、エヴゾネス（大統領近衛兵）の伝統的な制服を着た彼らの正確さと伝統を目撃してください。'],
    [/We will drive to the highest point of central Athens\. Enjoy an unmatched, 360-degree panoramic[\s\S]*?sea\./g, 'アテネ中心部の最高地点までドライブします。眼下に広がる街並みから海まで、比類のない360度のパノラマの景色をお楽しみください。'],
    [/We end the tour in Plaka, the charming "Neighborhood of the Gods\." Here you can stroll[\s\S]*?a traditional meal\./g, '魅力的な「神々の近隣」であるプラカでツアーを終了します。ここでは、狭い通りを散歩したり、お土産を買ったり、伝統的な食事を楽しんだりできます。'],

    // Delphi Tour
    [/Journey to the center of the ancient world\. Discover the mysteries of the Oracle of Apollo in a[\s\S]*?setting\./g, '古代世界の中心への旅。見事な山岳地帯でアポロンの神託の謎を発見してください。'],
    [/Considered the "Navel of the World" in ancient times, Delphi was the most important religious[\s\S]*?Mount Parnassus\./g, '古代において「世界のへそ」と考えられていたデルフィは、ギリシャで最も重要な宗教的聖地でした。この終日プライベートツアーでは、壮大な山々の景色を抜けてパルナッソス山の斜面へと向かいます。'],
    [/You will explore the ruins of the Temple of Apollo, where the Pythia delivered her famous[\s\S]*?village of Arachova\./g, 'ピュティアが有名な予言を伝えたアポロン神殿の遺跡を探索し、博物館で古代美術の傑作を鑑賞し、アラホバの美しい伝統的な山村を訪れます。'],
    [/We start with a scenic drive through the fertile plains of Boeotia, passing by the agricultural[\s\S]*?Levadia\./g, 'テーベやレヴァディアの町を通り過ぎながら、ボイオティアの肥沃な平野を巡る景色を楽しみながらドライブを始めます。'],
    [/A short stop at the picturesque mountain village of Arachova, famous for its hand-woven carpets[\s\S]*?traditional cheese\./g, '手織りの絨毯や伝統的なチーズで有名な、絵のように美しい山村アラホバに短時間立ち寄ります。'],
    [/Walk the Sacred Way, see the Athenian Treasury, and stand before the ruins of the Temple of Apollo[\s\S]*?spoke\./g, '聖なる道を歩き、アテネ人の宝庫を見て、神託が語られたアポロン神殿の遺跡の前に立ちます。'],
    [/Admire world-class artifacts including the famous Charioteer of Delphi, the Sphinx of Naxos, and the[\s\S]*?Kouroi\./g, '有名なデルフィの御者、ナクソスのスフィンクス、双子のクーロスなど、世界クラスの工芸品を鑑賞してください。'],
    [/After lunch in a local tavern overlooking the valley of olive trees, we will begin our comfortable[\s\S]*?Athens\./g, 'オリーブの木の谷を見下ろす地元の居酒屋での昼食後、アテネへの快適なドライブを開始します。'],

    // Meteora Tour
    [/Witness a geological miracle\. Explore the Byzantine monasteries suspended in the air on giant[\s\S]*?pillars\./g, '地質学的な奇跡を目撃してください。巨大な岩柱の上に宙に浮くように建つビザンチン様式の修道院を探索しましょう。'],
    [/Meteora is one of the most spectacular and extraordinary landscapes in the world\. This tour[\s\S]*?Orthodox monasteries\./g, 'メテオラは、世界で最も壮大で並外れた風景の1つです。このツアーでは、ギリシャ本土の中心部へと向かい、空に向かって数百メートルもそびえ立つ巨大な砂岩の岩柱と、その頂上に建つ歴史的な正教会の修道院を見学します。'],
    [/A UNESCO World Heritage site, Meteora offers a unique combination of natural beauty and[\s\S]*?overnight experience\./g, 'ユネスコ世界遺産であるメテオラは、自然の美しさと精神的な遺産のユニークな組み合わせを提供しています。長い終日ツアー、またはリラックスした2日間の宿泊体験として提供しています。'],
    [/A comfortable drive through the Greek countryside, passing the Thessalian plain and the[\s\S]*?Trikala\./g, 'テッサリア平原やラミア、トリカラの都市を通り過ぎる、ギリシャの田舎を走る快適なドライブ。'],
    [/Arrival at the town of Kalambaka, located at the very base of the majestic Meteora rocks\. Time for a[\s\S]*?lunch\./g, '雄大なメテオラの岩のふもとに位置するカランバカの町に到着。伝統的なランチの時間です。'],
    [/We will drive up the winding roads to visit 2 or 3 of the remaining active monasteries \(such as the[\s\S]*?Holy Trinity\)\./g, '曲がりくねった道を車で登り、現在も活動している残りの修道院（メガロ・メテオロン、ヴァルラアム、またはアギア・トリアダなど）のうち2つまたは3つを訪問します。'],
    [/We will make multiple stops at the best viewpoints so you can capture the breathtaking landscape[\s\S]*?sunset\./g, '息をのむような風景や夕日を写真に収めることができるように、最高のビューポイントで何度も停車します。'],
    [/We begin our descent and the comfortable highway drive back to Athens in the evening\./g, '夕方、下山を開始し、アテネへの快適な高速道路ドライブを開始します。'],

    // Argolis Tour
    [/Step back into the Bronze Age and classical antiquity\. A journey through the mythical[\s\S]*?Peloponnese\./g, '青銅器時代と古代の古典期にタイムスリップ。神話のペロポネソス半島を巡る旅。'],
    [/Join us on an unforgettable journey to the Argolis peninsula where Greek mythology comes alive\.[\s\S]*?Trojan War\./g, 'ギリシャ神話が息づくアルゴリス半島への忘れられない旅にご参加ください。この終日プライベートツアーでは、アガメムノン王やトロイア戦争の伝説に彩られた、古代ギリシャの最も重要な考古学遺跡のいくつかをご案内します。'],
    [/You will walk through the imposing Lion Gate of Mycenae, explore the monumental Tholos tombs,[\s\S]*?perfect acoustics\./g, 'ミケーネの堂々たる獅子門を歩き、記念碑的なトロス墓を探索し、近代ギリシャの最初の首都であるナフプリオのロマンチックな通りを散策します。そして最後は、完璧な音響で有名な古代劇場があるエピダウロスのアスクレピオス聖域を訪れます。'],
    [/Your private driver will pick you up in Athens\. Our first major stop will be to admire the[\s\S]*?Ionian seas\./g, 'プライベートドライバーがアテネでお迎えにあがります。最初の主要な目的地は、エーゲ海とイオニア海を結ぶ工学の驚異、コリントス運河の息をのむような景色です。'],
    [/Enter the ancient kingdom of Agamemnon through the legendary Lion Gate\. Explore the[\s\S]*?Tomb of Agamemnon\)\./g, '伝説の獅子門から古代のアガメムノンの王国へ。キュクロプス式の城壁、王家の墓、そして畏敬の念を抱かせるアトレウスの宝庫（アガメムノンの墓）を探索します。'],
    [/We'll stop at the picturesque coastal city of Nafplio\. Stroll through the charming narrow streets,[\s\S]*?Greek lunch\./g, '絵のように美しい沿岸都市ナフプリオに立ち寄ります。魅力的な狭い通りを散歩し、海に浮かぶブルジ要塞を鑑賞し、伝統的なギリシャのランチをお楽しみください。'],
    [/The tour concludes with a visit to the ancient Theater of Epidaurus, famous worldwide for its[\s\S]*?seating rows\./g, 'ツアーの最後は、完璧な音響で世界的に有名なエピダウロスの古代劇場を訪れます。ステージでのささやき声でさえ、一番上の座席列まではっきりと聞こえます。'],
    [/After a day full of mythological wonders and magnificent architecture, relax in our premium vehicle[\s\S]*?in Athens\./g, '神話の驚異と壮大な建築に満ちた1日の後は、アテネの宿泊施設へ向かう間、プレミアムな車両でおくつろぎください。'],

    // Missed UI/Sidebar elements
    [/Photo Stops/gi, '写真スポット'],
    [/Sunset Views/gi, '夕日の景色'],
    [/Epic view from the Temple/gi, '神殿からの壮大な景色'],
    [/Lake Vouliagmeni & Riviera/gi, 'ヴォウリアグメニ湖とリビエラ'],
    [/Hotel Pickup/gi, 'ホテル送迎'],
    [/The Athenian Riviera Drive/gi, 'アテニアン・リビエラ ドライブ'],
    [/Vouliagmeni Lake \(Optional Stop\)/gi, 'ヴォウリアグメニ湖（オプション）'],
    [/Arrival at Sounio/gi, 'スニオン岬到着'],
    [/Return to Athens/gi, 'アテネへの帰還'],
    [/Plaka District/gi, 'プラカ地区'],
    [/The Neighborhood of the Gods/gi, '神々の近隣'],
    [/Parthenon & Erechtheion/gi, 'パルテノン神殿とエレクテイオン'],
    [/Premium Pickup/gi, 'プレミアム送迎'],
    [/The Acropolis & Parthenon/gi, 'アクロポリスとパルテノン神殿'],
    [/Temple of Zeus & Hadrian's Arch/gi, 'ゼウス神殿とハドリアヌスの凱旋門'],
    [/Panathenaic Stadium/gi, 'パナシナイコ・スタジアム'],
    [/Changing of the Guards/gi, '衛兵交代式'],
    [/Lycabettus Hill & Plaka/gi, 'リカヴィトスの丘とプラカ'],
    [/Temple of Apollo/gi, 'アポロン神殿'],
    [/Delphi Museum/gi, 'デルフィ博物館'],
    [/Drive through Boeotia/gi, 'ボイオティアをドライブ'],
    [/Arachova Village/gi, 'アラホバ村'],
    [/Archaeological Site of Delphi/gi, 'デルフィの考古遺跡'],
    [/Delphi Archaeological Museum/gi, 'デルフィ考古学博物館'],
    [/Suspended in the air/gi, '空中に浮かぶ'],
    [/Journey through Central Greece/gi, 'ギリシャ中部の旅'],
    [/Kalambaka Town/gi, 'カランバカの町'],
    [/Monastery Visits/gi, '修道院訪問'],
    [/Panoramic Photo Stops/gi, 'パノラマ写真の撮影スポット'],
    [/Return Journey/gi, '帰路'],
    [/Departure & Corinth Canal/gi, '出発とコリントス運河'],
    [/Ancient Mycenae/gi, '古代ミケーネ'],
    [/Nafplio City/gi, 'ナフプリオ市'],
    [/Ancient Theater of Epidaurus/gi, 'エピダウロスの古代劇場'],
    [/Kingdom of Agamemnon/gi, 'アガメムノンの王国'],
    [/The Great Theater/gi, '壮大な劇場']
];

files.forEach(file => {
    const jaPath = path.join(__dirname, 'ja', file);
    if (fs.existsSync(jaPath)) {
        let content = fs.readFileSync(jaPath, 'utf8');
        
        fixes.forEach(([regex, replacement]) => {
            content = content.replace(regex, replacement);
        });

        fs.writeFileSync(jaPath, content, 'utf8');
        console.log(`Applied robust fixes to ja/${file}`);
    }
});
