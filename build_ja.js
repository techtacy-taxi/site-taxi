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
    [/Half Day \(4-5h\) or Full Day \(8h\)/gi, '半日（4～5時間）または終日（8時間）'],
    [/Duration: Full Day \(10 - 12 Hours\)/gi, '所要時間: 終日（10～12時間）'],
    [/Duration: Full Day \(8 - 10 Hours\)/gi, '所要時間: 終日（8～10時間）'],
    [/Luxury Van or Sedan/gi, '豪華バン またはセダン'],
    [/English Speaking Driver/g, '英語対応 ドライバー'],
    [/Entrance Fees Not Included/gi, '入場料は含まれていません'],
    [/The Acropolis & Parthenon/g, 'アクロポリスとパルテノン神殿'],
    [/The Acropolis/g, 'アクロポリス'],
    [/Plaka District/g, 'プラカ地区'],
    [/Book via\s+WhatsApp/gi, 'WhatsAppで予約'],
    [/Send Inquiry/gi, '問い合わせを送信'],

    // Global
    [/Taxi & Van Transfers/g, 'タクシー＆バン送迎'],
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

    // Homepage
    [/Premium Taxi & Van Transfers in Athens & Lavrio/g, 'アテネ＆ラブリオのプレミアムタクシー＆バン送迎'],
    [/Best way to reach us/g, 'お問い合わせに最適な方法'],
    [/Chat with us/g, 'チャットする'],
    [/Vehicle Gallery/g, '車両ギャラリー'],
    [/View Fleet/g, '車両ラインナップを見る'],

    // Shared tour
    [/Back to All Tours/gi, 'すべてのツアーに戻る'],
    [/Tour Overview/g, 'ツアーの概要'],
    [/What To Expect/gi, 'ツアーの内容'],
    [/Tour Details/g, 'ツアー詳細'],
    [/Price Upon Request/gi, '価格はお問い合わせください'],
    [/Duration/g, '所要時間'],
    [/Private Tour \(1-8 pax\)/g, 'プライベートツアー（1～8名様）'],

    // --- Meteora specific ---
    [/Explore the spectacular "columns of the sky\." A magical journey to Greece's\s*most awe-inspiring natural and spiritual site\./g, '壮観な「空の柱」を探索してください。ギリシャで最も畏敬の念を抱かせる自然的、精神的な場所への魔法のような旅。'],
    [/Meteora is truly a geological phenomenon\. Here, massive dark rock pillars rise\s*dramatically from the plains of Thessaly, crowned by ancient Eastern Orthodox monasteries\. It is a\s*UNESCO World Heritage site and offers some of the most surreal landscapes in Europe\./g, 'メテオラはまさに地質学的現象です。ここでは、テッサリア平原から巨大な暗い岩の柱が劇的にそびえ立ち、古代の東方正教会の修道院がその頂上に鎮座しています。ユネスコの世界遺産であり、ヨーロッパで最もシュールな景観を提供しています。'],
    [/On this private grand tour, you will travel north through the Greek mainland\. Our\s*knowledgeable drivers will ensure a comfortable journey\. Upon arriving at Kalambaka, you'll be driven up\s*to the immense rock formations to visit the historic monasteries, witness the breathtaking panoramic\s*views, and learn about the monastic life\./g, 'このプライベートグランドツアーでは、ギリシャ本土を北上します。当社の知識豊富なドライバーが快適な旅をお約束します。カランバカに到着後、巨大な岩の層へとドライブし、歴史的な修道院を訪れ、息を呑むようなパノラマビューを目の当たりにし、修道生活について学びます。'],
    [/The Rocks/g, '岩々'],
    [/Giant natural sandstone pillars/g, '巨大な天然の砂岩の柱'],
    [/The Monasteries/g, '修道院'],
    [/Built perfectly on the cliffs/g, '崖の上に完璧に建てられた'],
    [/1\. Early Departure/g, '1. 早朝出発'],
    [/Since Meteora is located in central Greece, we begin our day early\. Your private driver will pick\s*you up from your Athens hotel for the road trip north\./g, 'メテオラはギリシャ中部に位置するため、一日の始まりは早いです。プライベートドライバーがアテネのホテルまでお迎えに上がり、北へのロードトリップを開始します。'],
    [/2\. The Greek Mainland/g, '2. ギリシャ本土'],
    [/Enjoy the beautiful changing landscapes, passing by the battlefield of Thermopylae \(the monument\s*of King Leonidas\) and across the fertile Thessalian plain\./g, 'テルモピュライの戦場（レオニダス王の記念碑）を通り、肥沃なテッサリア平原を横切る、美しく変化する景色をお楽しみください。'],
    [/3\. Arrival at Kalambaka/g, '3. カランバカ到着'],
    [/Reach the picturesque town of Kalambaka, which rests right at the foot of the Meteora rocks\. From\s*here, the towering cliffs become visible\./g, 'メテオラの岩のふもとに位置する絵のように美しい町、カランバカに到着します。ここから、そびえ立つ断崖が見えてきます。'],
    [/4\. Monastery Visits & Sightseeing/g, '4. 修道院訪問と観光'],
    [/We'll drive you safely up the winding roads to visit 2 or 3 of the active monasteries \(like Great\s*Meteoron or Varlaam\)\. You will have time to explore and take incredible photos from the best\s*viewpoints\./g, '曲がりくねった道を安全にドライブし、活動中の修道院（大メテオロンやバルラームなど）を2、3か所訪れます。探索したり、最高のビューポイントから素晴らしい写真を撮ったりする時間があります。'],
    [/5\. Lunch & Smooth Return/g, '5. ランチとスムーズな帰路'],
    [/After a traditional Greek lunch in Kalambaka or Kastraki village, you can sit back and relax as\s*we drive you comfortably back to Athens\./g, 'カランバカまたはカストラキ村で伝統的なギリシャ料理のランチを楽しんだ後、アテネへの快適なドライブの間、ゆったりとリラックスしてください。'],

    // --- Sounio specific ---
    [/Sunset at the edge of the world\. Experience the breathtaking beauty of the Athenian Riviera\./g, '世界の果ての夕日。アテニアン・リビエラの息をのむような美しさを体験してください。'],
    [/Escape the bustling city of Athens and embark on a scenic drive along the mesmerizing\s*and beautiful Athenian Riviera\. Our destination is Cape Sounio, the southernmost tip of the Attica\s*peninsula, famous for its majestic Temple of Poseidon\./g, 'アテネの喧騒を離れ、魅惑的で美しいアテニアン・リビエラ沿いの風光明媚なドライブに出かけましょう。目的地は、壮大なポセイドン神殿で有名なアッティカ半島の最南端、スニオン岬です。'],
    [/Arrive at Cape Sounio\. You will have plenty of time to explore the ancient ruins, take stunning\s*photos, and watch the sun dip below the Aegean horizon\./g, 'スニオン岬に到着。古代の遺跡を探索し、素晴らしい写真を撮り、太陽がエーゲ海の水平線に沈むのを眺める時間が十分にあります。'],
    [/Temple of Poseidon/g, 'ポセイドン神殿'],
    [/Ancient architecture/g, '古代建築'],
    [/Athenian Riviera/g, 'アテニアン・リビエラ'],
    [/Scenic coastal drive/g, '風光明媚な海岸沿いのドライブ'],
    [/1\. Coastal Drive/g, '1. 海岸沿いのドライブ'],
    [/Your private driver will pick you up for a scenic drive along the Saronic Gulf, passing through the\s*beautiful seaside suburbs of Glyfada, Vouliagmeni, and Varkiza\./g, 'プライベートドライバーが、サロニコス湾沿いの風光明媚なドライブへお連れします。グリファダ、ヴリアグメニ、ヴァルキザなどの美しい海辺の郊外を通ります。'],
    [/2\. Lake Vouliagmeni/g, '2. ヴリアグメニ湖'],
    [/We'll make a short stop at the natural thermal Lake Vouliagmeni, a hidden gem of the Riviera known\s*for its healing waters and stunning cliff backdrop\./g, '癒しの水と素晴らしい断崖の背景で知られるリビエラの隠れた宝石、天然熱水湖のヴリアグメニ湖に少し立ち寄ります。'],
    [/3\. Cape Sounio Arrival/g, '3. スニオン岬到着'],
    [/4\. Sunset Experience/g, '4. 夕日体験'],
    [/Witness the legendary sunset from the temple ruins\. Watch the sun dip into the Aegean Sea in a\s*spectacle of vibrant colors\./g, '神殿の遺跡から伝説の夕日を目撃してください。太陽が鮮やかな色彩のスペクタクルの中でエーゲ海に沈むのを見守りましょう。'],
    [/5\. Return or Seaside Dinner/g, '5. 帰路または海辺のディナー'],
    [/After the sunset, we can head back to Athens or, if you prefer, stop at a traditional Greek\s*tavern by the sea for fresh seafood before returning\./g, '夕日の後は、アテネに戻ることもできますし、ご希望であれば、戻る前に海辺の伝統的なギリシャ料理のタベルナに立ち寄って新鮮なシーフードを楽しむこともできます。'],
    [/Gallery/g, 'ギャラリー'],
    [/Meteora Monasteries/g, 'メテオラ修道院'],
    [/Acropolis/g, 'アクロポリス'],
    [/Delphi/g, 'デルフィ'],
    [/Sounio/g, 'スニオン'],
    [/Argolis/g, 'アルゴリス'],
    [/Mycenae/g, 'ミケーネ'],
    [/Epidaurus/g, 'エピダウロス'],
    [/Sounio & Temple of Poseidon/g, 'スニオン岬とポセイドン神殿'],
    [/A magical drive along the Athenian Riviera leading to one of the most stunning\s+sunsets in Greece\./g, 'アテニアン・リビエラに沿った魔法のドライブで、ギリシャで最も見事な夕日の1つへ。'],
    [/Escape the bustling city of Athens and embark on a scenic drive along the mesmerizing\s+and beautiful Athenian Riviera\. Our destination is Cape Sounio, the southernmost tip of the Attica\s+peninsula, famous for its majestic Temple of Poseidon\./g, '活気あるアテネの街から抜け出し、魅惑的で美しいアテニアン・リビエラに沿って景色を楽しみながらドライブに出発しましょう。目的地はアッティカ半島の最南端であるスニオン岬で、壮大なポセイドン神殿で有名です。'],
    [/Delphi & Ancient Oracle/g, 'デルフィと古代の神託'],
    [/Journey to the "Navel of the World" and immerse yourself in the mystique of\s+ancient Greece\./g, '「世界のへそ」への旅に出かけ、古代ギリシャの神秘に浸ってください。'],
    [/Step back in time with a full-day excursion to Delphi,[\s\S]*?be the center of the world\./g, '古代ギリシャ人によって世界の中心と見なされていたデルフィへの終日エクスカーションで時間を遡りましょう。'],
    [/Nestled on the slopes of Mount Parnassus, Delphi is one of the most stunning[\s\S]*?UNESCO World Heritage sites in Greece\./g, 'パルナッソス山の斜面に位置するデルフィは、ギリシャで最も素晴らしいユネスコ世界遺産の1つです。'],
    [/On this private day trip, you will marvel at the Temple of Apollo where the famous[\s\S]*?Oracle delivered her prophecies,/g, 'このプライベート日帰り旅行では、有名な神託が予言を伝えたアポロン神殿に驚嘆し、'],
    [/explore the ancient theater, and witness incredible artifacts in the[\s\S]*?Delphi Archaeological Museum\./g, '古代劇場を探索し、デルフィ考古学博物館で驚くべき工芸品を目撃します。'],
    [/The route also takes you through scenic mountain landscapes and[\s\S]*?traditional villages\./g, 'ルートはまた、美しい山岳風景と伝統的な村々を通ります。'],
    [/The sanctuary of the Oracle/g, '神託の聖域'],
    [/Picturesque mountain town/g, '絵のように美しい山間の町'],
    [/Mycenae & Epidaurus/g, 'ミケーネとエピダウロス'],
    [/Step into the Homeric epics\. Visit the golden city of Mycenae and the acoustic\s+marvel of Epidaurus\./g, 'ホメロスの叙事詩の世界へ。黄金の都市ミケーネと、音響の驚異エピダウロスを訪ねて。'],
    [/Join us on an unforgettable journey to the Argolis peninsula, where Greek mythology\s+comes to life\. This full-day private tour takes you to some of the most significant archaeological sites\s+of ancient Greece, steeped in the legends of King Agamemnon and the Trojan War\./g, 'ギリシャ神話が息づくアルゴリス半島への忘れられない旅に出かけましょう。この終日プライベートツアーでは、アガメムノン王やトロイア戦争の伝説に彩られた、古代ギリシャで最も重要な考古学遺跡のいくつかをご案内します。'],
    [/You will walk through the imposing Lion Gate of Mycenae, explore monumental tholos\s+tombs, stroll through the romantic streets of Nafplio \(the first capital of modern Greece\), and finish\s+at the breathtaking Sanctuary of Asklepios in Epidaurus, home to the ancient theater famous for its\s+perfect acoustics\./g, 'ミケーネの堂々たる獅子門をくぐり、記念碑的なトロス墓を探索し、近代ギリシャ最初の首都ナフプリオのロマンチックな通りを散策します。最後は、完璧な音響で世界的に有名な古代劇場があるエピダウロスのアスクレピオス聖域で締めくくります。'],
    [/Mycenae Citadel/g, 'ミケーネの城塞'],
    [/Tomb of Agamemnon/g, 'アガメムノンの墓'],
    [/Ancient Epidaurus/g, '古代エピダウロス'],
    [/The acoustic masterpiece/g, '音響の傑作'],
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

        fs.writeFileSync(jaPath, content, 'utf8');
        console.log(`Translated ${file} to ja`);
    }
});
