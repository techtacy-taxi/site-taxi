const fs = require('fs');
const path = require('path');
const { base, langs, dirs, hreflangs, pages, locales, titles } = require('./seo_fix_v2_part1');
const { descs } = require('./seo_fix_v2_part2');

const root = __dirname;

const faqData = {
  en: {
    title: "Frequently Asked Questions",
    desc: "Find answers to common questions about our taxi, van, and transfer services in Athens.",
    faqs: [
      { q: "How do I book a transfer?", a: "You can book easily and instantly by clicking our WhatsApp button. We are available 24/7 to confirm your transfer and answer any questions." },
      { q: "What happens if my flight is delayed?", a: "We monitor all flight arrivals in real-time. Your driver will be waiting for you at the airport at the actual arrival time, with no extra charges for flight delays." },
      { q: "Are your prices fixed?", a: "Yes, all our prices are fixed and agreed upon before your trip. There are no hidden fees, toll charges, or extra luggage costs." },
      { q: "Where will the driver meet me?", a: "For airport pickups, the driver will meet you inside the arrival terminal holding a sign with your name. For hotel or port pickups, the driver will meet you at the lobby or outside the cruise terminal." },
      { q: "Do you offer private tours?", a: "Yes, we specialize in private sightseeing tours around Athens (Acropolis, Cape Sounio) and other historic areas in Greece (Delphi, Meteora, Argolis). All tours are fully customizable." }
    ]
  },
  de: {
    title: "Häufig gestellte Fragen (FAQ)",
    desc: "Finden Sie Antworten auf häufige Fragen zu unseren Taxi-, Van- und Transferdiensten in Athen.",
    faqs: [
      { q: "Wie buche ich einen Transfer?", a: "Sie können einfach und sofort buchen, indem Sie auf unseren WhatsApp-Button klicken. Wir sind rund um die Uhr für Sie da, um Ihre Buchung zu bestätigen und Fragen zu beantworten." },
      { q: "Was passiert, wenn mein Flug Verspätung hat?", a: "Wir überwachen alle Flugankünfte in Echtzeit. Ihr Fahrer erwartet Sie ohne Aufpreis zur tatsächlichen Ankunftszeit am Flughafen." },
      { q: "Sind Ihre Preise Festpreise?", a: "Ja, alle unsere Preise sind Festpreise und werden vor der Fahrt vereinbart. Es gibt keine versteckten Gebühren, Mautgebühren oder zusätzliche Gepäckkosten." },
      { q: "Wo holt mich der Fahrer ab?", a: "Bei Abholungen am Flughafen erwartet Sie der Fahrer in der Ankunftshalle mit einem Schild, auf dem Ihr Name steht. Bei Hotels oder Häfen holt er Sie in der Lobby bzw. vor dem Terminal ab." },
      { q: "Bieten Sie private Touren an?", a: "Ja, wir sind auf private Besichtigungstouren in Athen (Akropolis, Kap Sounio) und anderen historischen Regionen Griechenlands (Delphi, Meteora, Argolis) spezialisiert. Alle Touren sind anpassbar." }
    ]
  },
  fr: {
    title: "Foire Aux Questions",
    desc: "Trouvez des réponses aux questions courantes sur nos services de taxi, van et transfert à Athènes.",
    faqs: [
      { q: "Comment réserver un transfert ?", a: "Vous pouvez réserver facilement et instantanément en cliquant sur notre bouton WhatsApp. Nous sommes disponibles 24h/24 et 7j/7 pour confirmer votre réservation et répondre à vos questions." },
      { q: "Que se passe-t-il si mon vol est retardé ?", a: "We monitor all flight arrivals in real-time. Your driver will be waiting for you at the airport at the actual arrival time, with no extra charges for flight delays. Nous suivons tous les vols en temps réel. Votre chauffeur vous attendra à l'aéroport à l'heure réelle d'arrivée, sans frais supplémentaires pour les retards de vol." },
      { q: "Vos tarifs sont-ils fixes ?", a: "Oui, tous nos prix sont fixes et convenus avant le trajet. Il n'y a pas de frais cachés, de frais de péage ou de coûts de bagages supplémentaires." },
      { q: "Où le chauffeur va-t-il me rencontrer ?", a: "Pour les transferts depuis l'aéroport, le chauffeur vous attendra à l'intérieur du terminal d'arrivée avec une pancarte à votre nom. Pour les hôtels ou ports, il vous attendra dans le hall ou devant le terminal." },
      { q: "Proposez-vous des visites privées ?", a: "Oui, nous sommes spécialisés dans les visites privées d'Athènes (Acropole, Cap Sounion) et d'autres sites historiques en Grèce (Delphes, Météores, Argolide). Toutes les visites sont personnalisables." }
    ]
  },
  es: {
    title: "Preguntas Frecuentes",
    desc: "Encuentre respuestas a preguntas comunes sobre nuestros servicios de taxi, van y traslado en Atenas.",
    faqs: [
      { q: "¿Cómo reservo un traslado?", a: "Puede reservar de forma fácil e instantánea haciendo clic en nuestro botón de WhatsApp. Estamos disponibles 24/7 para confirmar su reserva y responder cualquier pregunta." },
      { q: "¿Qué pasa si mi vuelo se retrasa?", a: "Monitoreamos todos los vuelos en tiempo real. Su conductor le esperará en el aeropuerto a la hora real de llegada, sin cargos adicionales por retrasos." },
      { q: "¿Son fijos sus precios?", a: "Sí, todos nuestros precios son fijos y acordados antes del viaje. No hay tarifas ocultas, peajes ni costos adicionales por equipaje." },
      { q: "¿Dónde me recibirá el conductor?", a: "Para recogidas en el aeropuerto, el conductor le esperará dentro de la terminal de llegadas con un cartel con su nombre. Para hoteles o puertos, le esperará en el lobby o fuera de la terminal." },
      { q: "¿Ofrecen tours privados?", a: "Sí, nos especializamos en tours privados por Atenas (Acrópolis, Cabo Sunión) y otras zonas históricas de Grecia (Delfos, Meteora, Argólida). Todos los tours son personalizables." }
    ]
  },
  it: {
    title: "Domande Frequenti",
    desc: "Trova le risposte alle domande comuni sui nostri servizi di taxi, van e trasferimento ad Atene.",
    faqs: [
      { q: "Come posso prenotare un trasferimento?", a: "Puoi prenotare facilmente e istantaneamente cliccando sul nostro pulsante WhatsApp. Siamo disponibili 24/7 per confermare la tua prenotazione e rispondere a qualsiasi domanda." },
      { q: "Cosa succede se il mio volo è in ritardo?", a: "Monitoriamo tutti i voli in tempo reale. Il tuo autista ti aspetterà all'aeroporto all'ora di arrivo effettiva, senza costi aggiuntivi per ritardi del volo." },
      { q: "I vostri prezzi sono fissi?", a: "Sì, tutti i nostri prezzi sono fissi e concordati prima del viaggio. Non ci sono costi nascosti, pedaggi o costi aggiuntivi per i bagagli." },
      { q: "Dove mi incontrerà l'autista?", a: "Per i prelievi in aeroporto, l'autista ti aspetterà all'interno del terminal degli arrivi con un cartello con il tuo nome. Per hotel o porti, ti aspetterà nella hall o all'esterno del terminal." },
      { q: "Offrite tour privati?", a: "Sì, siamo specializzati in tour privati ad Atene (Acropoli, Capo Sounion) e in altre aree storiche della Grecia (Delfi, Meteora, Argolide). Tutti i tour sono personalizzabili." }
    ]
  },
  pt: {
    title: "Perguntas Frequentes",
    desc: "Encontre respostas a perguntas comuns sobre os nossos serviços de táxi, van e transfer em Atenas.",
    faqs: [
      { q: "Como posso reservar um transfer?", a: "Pode reservar de forma fácil e instantânea clicando no nosso botão do WhatsApp. Estamos disponíveis 24/7 para confirmar a sua reserva e responder a qualquer pergunta." },
      { q: "O que acontece se o meu voo estiver atrasado?", a: "Monitorizamos todos os voos em tempo real. O seu motorista estará à sua espera no aeroporto à hora real de chegada, sem custos adicionais por atrasos no voo." },
      { q: "Os vossos preços são fixos?", a: "Sim, todos os nossos preços são fixos e acordados antes da viagem. Não há taxas ocultas, portagens ou custos adicionais de bagagem." },
      { q: "Onde é que o motorista me vai encontrar?", a: "Para recolhas no aeroporto, o motorista irá encontrá-lo dentro do terminal de chegadas com uma placa com o seu nome. Para hotéis ou portos, irá encontrá-lo no lobby ou fora do terminal." },
      { q: "Oferecem tours privados?", a: "Sim, somos especializados em tours privados por Atenas (Acrópole, Cabo Súnion) e outras regiões históricas da Grécia (Delfos, Meteora, Argólida). Todos os tours são personalizáveis." }
    ]
  },
  pl: {
    title: "Najczęściej Zadawane Pytania",
    desc: "Znajdź odpowiedzi na najczęściej zadawane pytania dotyczące naszych usług taksówkowych, vanów i transferów w Atenach.",
    faqs: [
      { q: "Jak mogę zarezerwować transfer?", a: "Możesz zarezerwować łatwo i natychmiast, klikając nasz przycisk WhatsApp. Jesteśmy dostępni 24/7, aby potwierdzić rezerwację i odpowiedzieć na wszelkie pytania." },
      { q: "Co się stanie, jeśli mój lot będzie opóźniony?", a: "Monitorujemy wszystkie przyloty w czasie rzeczywistym. Twój kierowca będzie czekał na Ciebie na lotnisku o rzeczywistej godzinie przylotu, bez dodatkowych opłat za opóźnienia." },
      { q: "Czy ceny są stałe?", a: "Tak, wszystkie nasze ceny są stałe i uzgadniane przed podróżą. Nie ma ukrytych opłat, opłat drogowych ani dodatkowych kosztów bagażu." },
      { q: "Gdzie spotkam się z kierowcą?", a: "W przypadku odbioru z lotniska, kierowca będzie czekał wewnątrz terminala przylotów z tabliczką z Twoim nazwiskiem. W przypadku hoteli lub portów spotka Cię w lobby lub przed terminalem." },
      { q: "Czy oferujecie prywatne wycieczki?", a: "Tak, specjalizujemy się w prywatnych wycieczkach po Atenach (Akropol, Przylądek Sunion) i innych historycznych miejscach w Grecji (Delfy, Meteory, Argolida). Wszystkie wycieczki można dostosować do własnych potrzeb." }
    ]
  },
  el: {
    title: "Συχνές Ερωτήσεις",
    desc: "Βρείτε απαντήσεις σε συχνές ερωτήσεις σχετικά με τις υπηρεσίες ταξί, βαν και μεταφορών μας στην Αθήνα.",
    faqs: [
      { q: "Πώς μπορώ να κλείσω μια μεταφορά;", a: "Μπορείτε να κάνετε κράτηση εύκολα και άμεσα κάνοντας κλικ στο κουμπί WhatsApp. Είμαστε διαθέσιμοι 24/7 για να επιβεβαιώσουμε την κράτησή σας και να απαντήσουμε σε κάθε ερώτηση." },
      { q: "Τι συμβαίνει εάν η πτήση μου καθυστερήσει;", a: "Παρακολουθούμε όλες τις πτήσεις σε πραγματικό χρόνο. Ο οδηγός σας θα σας περιμένει στο αεροδρόμιο την πραγματική ώρα άφιξης, χωρίς επιπλέον χρέωση για την καθυστέρηση της πτήσης." },
      { q: "Είναι οι τιμές σας σταθερές;", a: "Ναι, όλες οι τιμές μας είναι σταθερές και συμφωνούνται πριν από τη μεταφορά. Δεν υπάρχουν κρυφές χρεώσεις, διόδια ή επιπλέον έξοδα για αποσκευές." },
      { q: "Πού θα με συναντήσει ο οδηγός;", a: "Για παραλαβή από το αεροδρόμιο, ο οδηγός θα σας περιμένει μέσα στην αίθουσα αφίξεων κρατώντας μια πινακίδα με το όνομά σας. Για ξενοδοχεία ή λιμάνια, θα σας συναντήσει στο λόμπι ή έξω από τον τερματικό σταθμό." },
      { q: "Προσφέρετε ιδιωτικές περιηγήσεις;", a: "Διαθέτουμε μεγάλη εμπειρία σε ιδιωτικές περιηγήσεις στην Αθήνα (Ακρόπολη, Σούνιο) και σε άλλες ιστορικές περιοχές της Ελλάδας (Δελφοί, Μετέωρα, Αργολίδα). Όλες οι περιηγήσεις είναι πλήρως παραμετροποιήσιμες." }
    ]
  },
  he: {
    title: "שאלות נפוצות",
    desc: "מצאו תשובות לשאלות נפוצות על שירותי המוניות, הוואנים וההסעות שלנו באתונה.",
    faqs: [
      { q: "איך מזמינים הסעה?", a: "ניתן להזמין בקלות ובאופן מיידי על ידי לחיצה על כפתור הוואטסאפ שלנו. אנו זמינים 24/7 כדי לאשר את הזמנתכם ולענות על כל שאלה." },
      { q: "מה קורה אם הטיסה שלי מתעכבת?", a: "אנו עוקבים אחר כל הטיסות בזמן אמת. הנהג שלכם ימתין לכם בשדה התعופה בזמן ההגעה בפועל, ללא תוספת תשלום על עיכובי טיסה." },
      { q: "האם המחירים שלכם קבועים?", a: "כן, כל המחירים שלנו קבועים ומסוכמים מראש לפני הנסיעה. אין עמלות נסתרות, אגרות כביש או עלויות כבודה נוספות." },
      { q: "איפה הנהג יפגוש אותי?", a: "באיסוף משדה התעופה, הנהг ימתין לכם בתוך טרמינל הנוסעים הנכנסים עם שלט הנושא את שמכם. באיסוף ממלונות או נמלים, הנהג יפגוש אתכם בלובי או מחוץ לטרמינל." },
      { q: "האם אתם מציעים סיורים פרטיים?", a: "כן, אנו מתמחים בסיורים פרטיים באתונה (אקרופוליס, כף סוניון) ובאזורים היסטוריים אחרים ביוון (דלפי, מטאורה, ארגוליס). כל הסיורים ניתנים להתאמה אישית מלאה." }
    ]
  },
  no: {
    title: "Ofte stilte spørsmål (FAQ)",
    desc: "Finn svar på vanlige spørsmål om våre taxi-, van- og transporttjenester i Athen.",
    faqs: [
      { q: "Hvordan bestiller jeg en transport?", a: "Du kan bestille enkelt og umiddelbart ved å klikke på vår WhatsApp-knapp. Vi er tilgjengelige 24/7 for å bekrefte bestillingen din og svare på spørsmål." },
      { q: "Hva skjer hvis flyet mitt er forsinket?", a: "Vi overvåker alle flyankomster i sanntid. Sjåføren din vil vente på deg på flyplassen til det faktiske ankomsttidspunktet, uten ekstra kostnader for flyforsinkelser." },
      { q: "Er prisene deres faste?", a: "Ja, alle våre priser er faste og avtales på forhånd. Det er ingen skjulte avgifter, bompenger eller ekstra bagasjekostnader." },
      { q: "Hvor vil sjåføren møte meg?", a: "For henting på flyplassen vil sjåføren møte deg inne i ankomstterminalen med et skilt med navnet ditt. For hotell- eller havnehenting vil sjåføren møte deg i lobbyen eller utenfor terminalen." },
      { q: "Tilbyr dere private turer?", a: "Ja, vi spesialiserer oss på private sightseeingturer i Athen (Akropolis, Kapp Sounion) og andre historiske områder i Hellas (Delfi, Meteora, Argolis). Alle turer kan tilpasses." }
    ]
  },
  zh: {
    title: "常见问题",
    desc: "在此查找关于我们在雅典的出租车、面包车和接送服务的常见问题解答。",
    faqs: [
      { q: "如何预订接送服务？", a: "您可以通过点击我们的 WhatsApp 按钮轻松即时预订。我们提供 24/7 全天候服务，确认您的预订并回答任何疑问。" },
      { q: "如果我的航班延误了怎么办？", a: "我们实时监控所有航班动态。您的司机将在机场的实际到达时间迎接您，航班延误不会产生额外费用。" },
      { q: "价格是固定的吗？", a: "是的，我们所有的价格都是固定的，并在行程前商定。没有任何隐藏费用、过路费或额外的行李费。" },
      { q: "司机将在哪里与我见面？", a: "对于机场接机，司机将在到达大厅内拿着写有您名字的牌子等候。对于酒店或港口接送，司机将在大堂或游轮码头外与您会面。" },
      { q: "你们提供私人游览服务吗？", a: "是的，我们专注于雅典（卫城、苏尼翁角）以及希腊其他历史地区（德尔斐、梅黛奥拉、阿哥利斯）的私人观光游览。所有行程均可完全定制。" }
    ]
  },
  ja: {
    title: "よくある質問",
    desc: "アテネでのタクシー、バン、送迎サービスに関するよくある質問と回答をご紹介します。",
    faqs: [
      { q: "送迎サービスの予約方法は？", a: "WhatsAppボタンをクリックするだけで、簡単かつ即座にご予約いただけます。ご予約の確認やご質問には、24時間年中無休で対応しております。" },
      { q: "飛行機が遅延した場合はどうなりますか？", a: "すべての到着便をリアルタイムで追跡しています。フライト遅延による追加料金は発生せず、ドライバーは実際の到着時刻に合わせて空港でお待ちいたします。" },
      { q: "料金は固定ですか？", a: "はい、すべての料金は事前確定の固定料金です。隠れた手数料、通行料、追加の手荷物料金などは一切ありません。" },
      { q: "ドライバーとはどこで合流しますか？", a: "空港へのお迎えの場合、ドライバーは到着ロビー内でお名前を書いたプレートを持ってお待ちしています。ホテルや港の場合は、ロビーやターミナルビルの外で合流します。" },
      { q: "プライベートツアーはありますか？", a: "はい、アテネ市内（アクロポリス、スニオン岬）やギリシャの他の歴史的地域（デルフィ、メテオラ、アルゴリス）のプライベート観光ツアーを専門としています。プランは自由に変更可能です。" }
    ]
  },
  hu: {
    title: "Gyakran Ismételt Kérdések",
    desc: "Itt megtalálja a választ az athéni taxi-, van- és transzferszolgáltatásainkkal kapcsolatos leggyakoribb kérdésekre.",
    faqs: [
      { q: "Hogyan tudok transzfert foglalni?", a: "Egyszerűen és azonnal foglalhat a WhatsApp gombra kattintva. 24/7 elérhetőek vagyunk, hogy megerősítsük foglalását és válaszoljunk a kérdéseire." },
      { q: "Mi történik, ha késik a járatom?", a: "Valós időben követjük a járatok érkezését. A sofőr a tényleges érkezési időpontban fogja várni Önt a repülőtéren, járatkésés esetén felár nélkül." },
      { q: "Fixek az áraik?", a: "Igen, minden árunk fix és az utazás előtt kerül megbeszélésre. Nincsenek rejtett költségek, autópályadíjak vagy extra poggyászdíjak." },
      { q: "Hol fog találkozni velem a sofőr?", a: "Repülőtéri felvétel esetén a sofőr az érkezési terminálon belül várja Önt az Ön nevével ellátott táblával. Hotel vagy kikötő esetén a lobbyban vagy a terminál előtt találkoznak." },
      { q: "Kínálnak privát túrákat?", a: "Igen, privát városnéző túrákra szakosodtunk Athénban (Akropolisz, Szunion-fok) és Görögország más történelmi részein (Delfi, Meteora, Argolisz). Minden túránk személyre szabható." }
    ]
  },
  ru: {
    title: "Часто задаваемые вопросы",
    desc: "Найдите ответы на часто задаваемые вопросы о наших услугах такси, минивэнов и трансферов в Афинах.",
    faqs: [
      { q: "Как я могу забронировать трансфер?", a: "Вы можете легко и мгновенно забронировать трансфер, нажав на нашу кнопку WhatsApp. Мы доступны 24/7, чтобы подтвердить ваше бронирование и ответить на любые вопросы." },
      { q: "Что произойдет, если мой рейс задержится?", a: "Мы отслеживаем все рейсы в режиме реального времени. Ваш водитель будет ждать вас в аэропорту к фактическому времени прибытия, без каких-либо доплат за задержку рейса." },
      { q: "Ваши цены фиксированы?", a: "Да, все наши цены фиксированы и согласовываются до поездки. Нет никаких скрытых сборов, дорожных пошлин или дополнительных расходов за багаж." },
      { q: "Где меня встретит водитель?", a: "При встрече в аэропорту водитель встретит вас внутри терминала прибытия с табличкой с вашим именем. При встрече в отеле или порту водитель встретит вас в лобби или у терминала." },
      { q: "Предлагаете ли вы частные экскурсии?", a: "Да, мы специализируемся на частных экскурсиях по Афинам (Акрополь, мыс Сунион) и другим историческим местам Греции (Дельфы, Метеоры, Арголида). Все туры полностью настраиваемы." }
    ]
  }
};

const homeNames = {
  en: "Home",
  de: "Startseite",
  fr: "Accueil",
  es: "Inicio",
  it: "Home",
  pt: "Início",
  pl: "Strona główna",
  el: "Αρχική",
  he: "בית",
  no: "Hjem",
  zh: "首页",
  ja: "ホーム",
  hu: "Főoldal",
  ru: "Главная"
};

const heroImages = {
  'acropolis-tour.html': 'https://taxiathenstransfers.com/images/acropolis_hero.jpg',
  'sounio-tour.html': 'https://taxiathenstransfers.com/images/sounio_hero.png',
  'delphi-tour.html': 'https://taxiathenstransfers.com/images/delphi_hero.jpg',
  'meteora-tour.html': 'https://taxiathenstransfers.com/images/meteora_hero.jpg',
  'argolis-tour.html': 'https://taxiathenstransfers.com/images/mycenae_hero.jpg'
};

let count = 0;

for (let li = 0; li < langs.length; li++) {
  const lang = langs[li];
  const dir = dirs[li];
  const loc = locales[lang];

  for (const pg of pages) {
    const fp = dir ? path.join(root, dir, pg) : path.join(root, pg);
    if (!fs.existsSync(fp)) {
      console.log('SKIP:', fp);
      continue;
    }

    let html = fs.readFileSync(fp, 'utf8');

    // Build canonical URL (removing index.html for index page)
    const pgPath = pg === 'index.html' ? '' : pg;
    const canon = dir ? `${base}/${dir}/${pgPath}` : `${base}/${pgPath}`;

    // 1. Update Title and Description tags
    const t = titles[lang]?.[pg] || '';
    if (t) {
      html = html.replace(/<title>[^<]*<\/title>/, `<title>${t}</title>`);
    }
    const d = descs[lang]?.[pg] || '';
    if (d) {
      html = html.replace(/<meta name="description"\s*\n?\s*content="[^"]*">/, `<meta name="description"\n        content="${d}">`);
    }

    // 2. Remove all old canonical, hreflang, OG, Twitter, and JSON-LD script blocks from <head>
    html = html.replace(/\s*<link rel="canonical"[^>]*>\s*/g, '\n');
    html = html.replace(/\s*<link rel="alternate" hreflang="[^"]*"[^>]*>\s*/g, '\n');
    html = html.replace(/\s*<meta property="og:[^"]*"[^>]*>\s*/g, '\n');
    html = html.replace(/\s*<meta name="twitter:[^"]*"[^>]*>\s*/g, '\n');
    html = html.replace(/\s*<script type="application\/ld\+json">[\s\S]*?<\/script>\s*/g, '\n');

    // 3. Build Head Blocks (Canonical, Hreflangs, OG, Twitter, JSON-LD)
    let headBlock = '\n    <!-- Canonical URL -->\n';
    headBlock += `    <link rel="canonical" href="${canon}">\n`;
    headBlock += '\n    <!-- Hreflang Tags -->\n';
    for (let j = 0; j < langs.length; j++) {
      const dd = dirs[j];
      const hh = hreflangs[j];
      const u = dd ? `${base}/${dd}/${pgPath}` : `${base}/${pgPath}`;
      headBlock += `    <link rel="alternate" hreflang="${hh}" href="${u}">\n`;
    }
    headBlock += `    <link rel="alternate" hreflang="x-default" href="${base}/${pgPath}">\n`;

    // Open Graph
    headBlock += '\n    <!-- Open Graph -->\n';
    headBlock += `    <meta property="og:type" content="website">\n`;
    headBlock += `    <meta property="og:locale" content="${loc}">\n`;
    headBlock += `    <meta property="og:site_name" content="Taxi &amp; Van Transfers">\n`;
    headBlock += `    <meta property="og:title" content="${t}">\n`;
    headBlock += `    <meta property="og:description" content="${d}">\n`;
    
    // Choose og:image (hero image for tours, logo for index)
    const pageImage = heroImages[pg] || `${base}/images/logo.jpg`;
    headBlock += `    <meta property="og:image" content="${pageImage}">\n`;
    headBlock += `    <meta property="og:url" content="${canon}">\n`;

    // Twitter Card
    headBlock += '\n    <!-- Twitter Card -->\n';
    headBlock += `    <meta name="twitter:card" content="summary_large_image">\n`;
    headBlock += `    <meta name="twitter:title" content="${t}">\n`;
    headBlock += `    <meta name="twitter:description" content="${d}">\n`;
    headBlock += `    <meta name="twitter:image" content="${pageImage}">\n`;

    // JSON-LD Schemas block
    headBlock += '\n    <!-- Structured Data (JSON-LD) -->\n';

    if (pg === 'index.html') {
      // 1. LocalBusiness Schema
      const localBusinessSchema = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "Taxi & Van Transfers",
        "description": d,
        "image": `${base}/images/logo.jpg`,
        "url": canon,
        "telephone": "+306936123322",
        "email": "book@taxiathenstransfers.com",
        "priceRange": "$$",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Lavrio",
          "addressRegion": "Attica",
          "addressCountry": "GR"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "37.7163",
          "longitude": "24.0611"
        },
        "openingHoursSpecification": {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
          "opens": "00:00",
          "closes": "23:59"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "5",
          "bestRating": "5",
          "reviewCount": "219"
        },
        "sameAs": []
      };
      headBlock += `    <script type="application/ld+json">\n    ${JSON.stringify(localBusinessSchema, null, 2).replace(/\n/g, '\n    ')}\n    </script>\n`;

      // 2. FAQPage Schema
      const fData = faqData[lang] || faqData['en'];
      const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": fData.faqs.map(f => ({
          "@type": "Question",
          "name": f.q,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": f.a
          }
        }))
      };
      headBlock += `    <script type="application/ld+json">\n    ${JSON.stringify(faqSchema, null, 2).replace(/\n/g, '\n    ')}\n    </script>\n`;

    } else {
      // Tour pages:
      // 1. BreadcrumbList Schema
      const homeLabel = homeNames[lang] || homeNames['en'];
      const cleanTourName = t.split('|')[0].trim();
      const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": homeLabel,
            "item": dir ? `${base}/${dir}/` : `${base}/`
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": cleanTourName,
            "item": canon
          }
        ]
      };
      headBlock += `    <script type="application/ld+json">\n    ${JSON.stringify(breadcrumbSchema, null, 2).replace(/\n/g, '\n    ')}\n    </script>\n`;

      // 2. TouristTrip Schema
      const itemRegex = /<h4>\s*\d+\.\s*([^<]+)<\/h4>/g;
      let match;
      const itineraryItems = [];
      while ((match = itemRegex.exec(html)) !== null) {
        itineraryItems.push(match[1].trim());
      }

      const tripSchema = {
        "@context": "https://schema.org",
        "@type": "TouristTrip",
        "name": cleanTourName,
        "description": d,
        "image": pageImage,
        "touristType": "Sightseeing",
        "offers": {
          "@type": "Offer",
          "priceCurrency": "EUR",
          "price": "0",
          "priceSpecification": {
            "@type": "PriceSpecification",
            "price": "0",
            "priceCurrency": "EUR",
            "valueAddedTaxIncluded": "true"
          },
          "description": "Price upon request"
        }
      };

      if (itineraryItems.length > 0) {
        tripSchema.itinerary = {
          "@type": "ItemList",
          "numberOfItems": itineraryItems.length,
          "itemListElement": itineraryItems.map((name, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": name
          }))
        };
      }
      headBlock += `    <script type="application/ld+json">\n    ${JSON.stringify(tripSchema, null, 2).replace(/\n/g, '\n    ')}\n    </script>\n`;
    }

    // 4. Remove comments placeholders to clean up insertion
    html = html.replace(/\s*<!-- Canonical URL -->\s*/g, '\n');
    html = html.replace(/\s*<!-- Hreflang Tags -->\s*/g, '\n');
    html = html.replace(/\s*<!-- Open Graph -->\s*/g, '\n');
    html = html.replace(/\s*<!-- Twitter Card -->\s*/g, '\n');
    html = html.replace(/\s*<!-- Structured Data - LocalBusiness -->\s*/g, '\n');
    html = html.replace(/\s*<!-- Structured Data -->\s*/g, '\n');

    // 5. Insert headBlock before Google Fonts line
    const fontMarker = '<!-- Google Fonts';
    const fontRegex = new RegExp(`(\\s*)${fontMarker}`);
    if (html.match(fontRegex)) {
      html = html.replace(fontRegex, (match, spaces) => headBlock + '\n' + spaces + fontMarker);
    } else {
      // fallback to placing it before </head>
      html = html.replace('</head>', headBlock + '\n</head>');
    }

    // 6. Common HTML wrapping and modifications
    // Ensure viewport + robots tag
    if (!html.includes('name="robots"')) {
      html = html.replace(
        '<meta name="viewport" content="width=device-width, initial-scale=1.0">',
        '<meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <meta name="robots" content="index, follow">'
      );
    }

    // Wrap body content in <main> if not already wrapped
    if (!html.includes('<main>')) {
      // Insert <main> right after </header>
      html = html.replace('</header>', '</header>\n\n    <main>');
      // Close </main> right before floating WhatsApp button or footer
      if (html.includes('<!-- Floating WhatsApp Button -->')) {
        html = html.replace('<!-- Floating WhatsApp Button -->', '</main>\n\n    <!-- Floating WhatsApp Button -->');
      } else if (html.includes('<!-- Footer -->')) {
        html = html.replace('<!-- Footer -->', '</main>\n\n    <!-- Footer -->');
      } else if (html.includes('<footer>')) {
        html = html.replace('<footer>', '</main>\n\n    <footer>');
      }
    }

    // 7. Tour specific body changes
    if (pg !== 'index.html') {
      // Replace <section class="tour-content"> with <article class="tour-content">
      html = html.replace('<section class="tour-content">', '<article class="tour-content">');
      html = html.replace(/<\/section>\s*\n?\s*<!-- Floating WhatsApp Button -->/, '</article>\n\n    <!-- Floating WhatsApp Button -->');
      html = html.replace(/<\/section>\s*\n?\s*<!-- Footer -->/, '</article>\n\n    <!-- Footer -->');

      // Add loading="lazy" to gallery images
      html = html.replace(/<img src="(?:\.\.\/)?images\/[^"]+_gallery_[^"]+"([^>]*)>/g, (match) => {
        if (!match.includes('loading="lazy"')) {
          return match.replace('<img ', '<img loading="lazy" ');
        }
        return match;
      });
    }

    // 8. Index specific body changes (FAQ HTML insertion)
    if (pg === 'index.html') {
      // Remove old FAQ section if it exists to avoid duplication
      html = html.replace(/\s*<!-- FAQ Section -->[\s\S]*?<\/section>\s*/g, '\n');

      const fData = faqData[lang] || faqData['en'];
      
      let faqHtml = `\n    <!-- FAQ Section -->\n`;
      faqHtml += `    <section class="faq reveal" id="faq">\n`;
      faqHtml += `        <div class="section-header dark reveal">\n`;
      faqHtml += `            <h2>${fData.title}</h2>\n`;
      faqHtml += `            <p>${fData.desc}</p>\n`;
      faqHtml += `        </div>\n`;
      faqHtml += `        <div class="faq-container">\n`;
      fData.faqs.forEach(f => {
        faqHtml += `            <div class="faq-item reveal">\n`;
        faqHtml += `                <div class="faq-question">\n`;
        faqHtml += `                    <h3>${f.q}</h3>\n`;
        faqHtml += `                    <span class="faq-icon"><i class="fas fa-plus"></i></span>\n`;
        faqHtml += `                </div>\n`;
        faqHtml += `                <div class="faq-answer">\n`;
        faqHtml += `                    <p>${f.a}</p>\n`;
        faqHtml += `                </div>\n`;
        faqHtml += `            </div>\n`;
      });
      faqHtml += `        </div>\n`;
      faqHtml += `    </section>\n`;

      // Insert FAQ section before Quick Booking CTA
      if (html.includes('<!-- Quick Booking CTA -->')) {
        html = html.replace('<!-- Quick Booking CTA -->', faqHtml + '\n    <!-- Quick Booking CTA -->');
      } else if (html.includes('id="booking"')) {
        html = html.replace(/<section class="booking-cta"[^>]*>/, match => faqHtml + '\n    ' + match);
      }
    }

    // Clean up double main / article replacements to be safe
    // Replace duplicate main or articles
    html = html.replace(/<\/main>\s*<\/main>/g, '</main>');

    // Clean up multiple blank lines
    html = html.replace(/\n{3,}/g, '\n\n');

    fs.writeFileSync(fp, html, 'utf8');
    count++;
    console.log(`Updated: ${dir || 'en'}/${pg}`);
  }
}

console.log(`\nSuccessfully processed ${count} files!`);
