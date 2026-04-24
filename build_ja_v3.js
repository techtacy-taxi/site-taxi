const fs = require('fs');
const path = require('path');

const files = [
    'acropolis-tour.html',
    'argolis-tour.html',
    'delphi-tour.html',
    'meteora-tour.html',
    'sounio-tour.html'
];

const fixes = [
    // Acropolis
    [/We'll drive to the impressive all-marble パナシナイコ・スタジアム, the historic site of the first[\s\S]*?held in 1896\./g, '1896年に第1回近代オリンピックが開催された歴史的な場所である、印象的な総大理石のパナシナイコ・スタジアムへドライブします。'],
    [/Next stop is Syntagma Square and the Greek Parliament to witness the traditional changing of the[\s\S]*?Unknown Soldier\./g, '次の目的地はシンタグマ広場とギリシャ国会議事堂で、無名戦士の墓で大統領近衛兵（エヴゾネス）の伝統的な交代式を見学します。'],
    [/We'll drive up Lycabettus Hill for the highest viewpoint in Athens, and conclude with a walk[\s\S]*?returning to[\s\S]*?your hotel\./g, 'アテネで最も高い展望台であるリカヴィトスの丘までドライブし、ホテルに戻る前に、伝統的なタベルナやショップが立ち並ぶ魅力的な旧市街プラカの散策で締めくくります。'],

    // Argolis
    [/The tour concludes with a visit to the ancient Theater of エピダウロス, renowned worldwide for its[\s\S]*?seating[\s\S]*?rows\./g, 'ツアーの最後は、完璧な音響で世界的に有名なエピダウロスの古代劇場を訪れます。ステージでのささやき声でさえ、一番上の座席列まではっきりと聞こえます。'],
    [/Step into the ホームric epics\./g, '叙事詩のような歴史に足を踏み入れましょう。'],

    // Delphi
    [/Journey to the "Navel of the World" and immerse yourself in the mystique of/g, '「世界のへそ」への旅に出かけ、神秘に浸ってください'],
    [/Step back in time with a full-day excursion to Delphi, considered by ancient Greeks to[\s\S]*?be the center of the world\. Nestled on the slopes of Mount Parnassus, Delphi is one of the most stunning[\s\S]*?UNESCO World Heritage sites in Greece\./g, '古代ギリシャ人によって世界の中心と見なされていたデルフィへの終日エクスカーションで時間を遡りましょう。パルナッソス山の斜面に囲まれたデルフィは、ギリシャで最も素晴らしいユネスコ世界遺産の1つです。'],
    [/On this private day trip, you will marvel at the アポロン神殿 where the famous[\s\S]*?Oracle delivered her prophecies, explore the ancient theater, and witness incredible artifacts in the[\s\S]*?デルフィ考古学博物館\. The route also takes you through scenic mountain landscapes and[\s\S]*?traditional villages\./g, 'このプライベート日帰り旅行では、有名な神託が予言を伝えたアポロン神殿に驚嘆し、古代劇場を探索し、デルフィ考古学博物館で信じられないほどの工芸品を目撃します。ルートはまた、美しい山岳風景と伝統的な村を通ります。'],
    [/The sanctuary of the Oracle/g, '神託の聖域'],
    [/Picturesque mountain town/g, '絵のように美しい山間の町'],
    [/Start your day early as your private driver picks you up from your Athens location in a premium,/g, 'プライベートドライバーがプレミアムな車両でアテネの場所からお迎えにあがるため、一日を早く始めましょう。'],
    [/Enjoy a relaxing drive through the fertile plain of Boeotia, crossing the towns of Thebes and[\s\S]*?Levadia before ascending the majestic Mount Parnassus\./g, 'ボイオティアの肥沃な平野を通るリラックスしたドライブを楽しみ、テーベやレヴァディアの町を横断してから、雄大なパルナッソス山に登ります。'],
    [/3\. Delphi Archaeological Site/g, '3. デルフィの考古遺跡'],
    [/Arrive at Delphi to explore the incredible ruins\. Walk the Sacred Way, visit the Temple of[\s\S]*?Apollo, the ancient Theater, and the Stadium where the Pythian Games were held\./g, '信じられないほどの遺跡を探索するためにデルフィに到着します。聖なる道を歩き、アポロン神殿、古代劇場、ピュティア祭が開催されたスタジアムを訪れます。'],
    [/Discover masterpieces of ancient Greek sculpture, including the famous bronze Charioteer and the/g, '有名な青銅の御者を含む、古代ギリシャの彫刻の傑作を発見してください'],
    [/Stop at the beautiful mountain village of Arachova for a traditional Greek lunch \(optional\) and[\s\S]*?some souvenir shopping before we begin our comfortable drive back to Athens\./g, '美しい山村のアラホバに立ち寄り、伝統的なギリシャのランチ（オプション）とお土産の買い物を楽しんでから、アテネへの快適なドライブを始めます。'],

    // Meteora
    [/Explore the spectacular "columns of the sky\." A magical journey to Greece's[\s\S]*?most awe-inspiring natural and spiritual site\./g, '壮大な「空の柱」を探索してください。ギリシャで最も畏敬の念を起こさせる自然と精神的な場所への魔法の旅。'],
    [/Meteora is truly a geological phenomenon\. Here, massive dark rock pillars rise[\s\S]*?dramatically from the plains of Thessaly, crowned by ancient Eastern Orthodox monasteries\. It is a[\s\S]*?UNESCO World Heritage site and offers some of the most surreal landscapes in Europe\./g, 'メテオラはまさに地質学的な現象です。ここでは、巨大な黒い岩柱がテッサリア平原から劇的にそびえ立ち、古代の東方正教会の修道院が頂上にあります。ここはユネスコの世界遺産であり、ヨーロッパで最も超現実的な風景を提供しています。'],
    [/On this private grand tour, you will travel north through the Greek mainland\. Our[\s\S]*?knowledgeable drivers will ensure a comfortable journey\. Upon arriving at Kalambaka, you'll be driven up[\s\S]*?to the immense rock formations to visit the historic monasteries, witness the breathtaking panoramic[\s\S]*?views, and learn about the monastic life\./g, 'このプライベートグランドツアーでは、ギリシャ本土を北上します。知識豊富なドライバーが快適な旅をお約束します。カランバカに到着すると、巨大な奇岩まで車で登り、歴史的な修道院を訪れ、息をのむようなパノラマの景色を目撃し、修道院の生活について学びます。'],
    [/Giant natural sandstone pillars/g, '巨大な天然の砂岩の柱'],
    [/Built perfectly on the cliffs/g, '崖の上に完璧に建てられています'],
    [/Since Meteora is located in central Greece, we begin our day early\. Your private driver will pick[\s\S]*?you up from your Athens hotel for the road trip north\./g, 'メテオラはギリシャ中部に位置しているため、一日を早く始めます。北へのロードトリップのために、プライベートドライバーがアテネのホテルからお迎えにあがります。'],
    [/Enjoy the beautiful changing landscapes, passing by the battlefield of Thermopylae \(the monument[\s\S]*?of King Leonidas\) and across the fertile Thessalian plain\./g, 'テルモピュライの戦場（レオニダス王の記念碑）を通り過ぎ、肥沃なテッサリア平原を横切り、美しく変化する風景をお楽しみください。'],
    [/3\. Arrival at Kalambaka/g, '3. カランバカ到着'],
    [/Reach the picturesque town of Kalambaka, which rests right at the foot of the Meteora rocks\. From[\s\S]*?here, the towering cliffs become visible\./g, 'メテオラの岩のふもとにある絵のように美しいカランバカの町に到着します。ここからはそびえ立つ崖が見えます。'],
    [/We'll drive you safely up the winding roads to visit 2 or 3 of the active monasteries \(like Great[\s\S]*?Meteoron or Varlaam\)\. You will have time to explore and take incredible photos from the best/g, '曲がりくねった道を安全に運転し、現在も活動している修道院（メガロ・メテオロンやヴァルラアムなど）のうち2つまたは3つを訪れます。探索して最高の写真を撮る時間があります。'],
    [/After a traditional Greek lunch in Kalambaka or Kastraki village, you can sit back and relax as[\s\S]*?we drive you comfortably back to Athens\./g, 'カランバカまたはカストラキ村での伝統的なギリシャのランチの後、私たちがアテネに快適にお送りする間、ゆったりとリラックスしてください。'],

    // Sounio
    [/A magical drive along the アテニアン・リビエラ leading to one of the most stunning[\s\S]*?sunsets in Greece\./g, 'アテニアン・リビエラ沿いの魔法のドライブは、ギリシャで最も素晴らしい夕日の1つにつながります。'],
    [/Escape the bustling city of Athens and embark on a scenic drive along the mesmerizing[\s\S]*?and beautiful アテニアン・リビエラ\. Our destination is Cape Sounio, the southernmost tip of the Attica[\s\S]*?peninsula, famous for its majestic ポセイドン神殿\./g, 'アテネの喧騒から逃れ、魅惑的で美しいアテニアン・リビエラに沿って風光明媚なドライブに出かけましょう。目的地はアッティカ半島の最南端にあるスニオン岬で、壮大なポセイドン神殿で有名です。'],
    [/Arrive at Cape Sounio\. You will have plenty of time to explore the ancient ruins, take stunning[\s\S]*?photos, and watch the sun dip below the Aegean horizon\./g, 'スニオン岬に到着。古代遺跡を探索したり、見事な写真を撮ったり、太陽がエーゲ海の地平線の下に沈むのを見たりする時間がたくさんあります。'],
    [/5\. Return or Seaside Dinner/g, '5. 帰路または海辺のディナー'],
    [/After the sunset, we can head back to Athens or, if you prefer, stop at a traditional Greek[\s\S]*?tavern by the sea for fresh seafood before returning\./g, '日没後、アテネに戻ることもできますし、お好みで帰る前に海辺の伝統的なギリシャのタベルナに立ち寄って新鮮なシーフードを楽しむこともできます。']
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
