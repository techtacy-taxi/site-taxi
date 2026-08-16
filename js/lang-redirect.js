/**
 * Auto Language Redirect — TaxiAthensTransfers.com
 * ================================================
 *
 * Στέλνει τον επισκέπτη στη ΓΛΩΣΣΑ ΤΟΥ BROWSER ΤΟΥ, από ΟΠΟΙΑΔΗΠΟΤΕ σελίδα
 * κι αν ξεκινήσει — ακόμη κι αν το link που του έδωσες έχει ήδη γλώσσα.
 *
 * ΔΙΑΤΗΡΕΙ:
 *   • Τη σελίδα:      /no/booking      → /de/booking   (όχι στην αρχική)
 *   • Το hash:        #air+raf#hilton  (φίλτρο συνεργάτη)
 *   • Τα query params: ?foo=bar
 *   • Clean URLs του Cloudflare Pages (/no/booking χωρίς .html)
 *
 * ⚠️ ΔΕΝ ΚΑΝΕΙ ΠΟΤΕ REDIRECT ΟΤΑΝ:
 *   1. Ο πελάτης ΕΠΙΣΤΡΕΦΕΙ ΑΠΟ ΠΛΗΡΩΜΗ (Viva/Stripe).
 *      ΚΡΙΣΙΜΟ: το Viva Source έχει ΣΤΑΘΕΡΟ success URL. Αν κάναμε redirect
 *      εκείνη τη στιγμή, θα χάνονταν τα query params της συναλλαγής και η
 *      κράτηση ΔΕΝ θα επιβεβαιωνόταν ποτέ.
 *   2. Υπάρχει ?nolang στο URL (χειροκίνητη παράκαμψη για δοκιμές).
 *   3. Ο χρήστης έχει ήδη διαλέξει γλώσσα σε αυτή τη συνεδρία.
 */
(function () {
  'use strict';

  // ── 1. ΦΡΕΝΟ ΠΛΗΡΩΜΗΣ — έχει απόλυτη προτεραιότητα ──────────────────────
  // Όλες οι παράμετροι επιστροφής Viva & Stripe, σε κάθε παραλλαγή πεζών.
  var PAYMENT_PARAMS = [
    't', 'transactionId', 'TransactionId',
    'eventId', 'EventId',
    's', 'orderCode', 'OrderCode',
    'stripe_session_id'
  ];

  var search = window.location.search || '';

  try {
    var params = new URLSearchParams(search);
    for (var i = 0; i < PAYMENT_PARAMS.length; i++) {
      if (params.has(PAYMENT_PARAMS[i])) return;   // επιστροφή πληρωμής → ΣΤΟΠ
    }
    if (params.has('nolang')) return;
  } catch (e) {
    // Παλιός browser χωρίς URLSearchParams — έλεγχος με string.
    for (var k = 0; k < PAYMENT_PARAMS.length; k++) {
      if (search.indexOf(PAYMENT_PARAMS[k] + '=') !== -1) return;
    }
    if (search.indexOf('nolang') !== -1) return;
  }

  // Δεύτερο δίχτυ ασφαλείας: αν υπάρχει εκκρεμής κράτηση στη συνεδρία, ο
  // χρήστης είναι στη μέση ροής πληρωμής — μην τον μετακινήσεις.
  try {
    if (sessionStorage.getItem('athenstaxi_pending_booking')) return;
  } catch (e) {}

  // ── 2. Χειροκίνητη επιλογή γλώσσας → σεβασμός ───────────────────────────
  try {
    if (sessionStorage.getItem('lang_chosen')) return;
  } catch (e) {}

  // ── 3. Χάρτες γλωσσών ───────────────────────────────────────────────────
  var LANG_DIRS = ['de','el','es','fr','he','hu','it','ja','no','pl','pt','ru','zh'];

  var langMap = {
    'en':'en','en-us':'en','en-gb':'en','en-ca':'en','en-au':'en','en-ie':'en','en-nz':'en','en-za':'en','en-in':'en',
    'de':'de','de-de':'de','de-at':'de','de-ch':'de','de-lu':'de','de-li':'de',
    'fr':'fr','fr-fr':'fr','fr-be':'fr','fr-ca':'fr','fr-ch':'fr','fr-lu':'fr','fr-mc':'fr',
    'es':'es','es-es':'es','es-mx':'es','es-ar':'es','es-co':'es','es-cl':'es','es-pe':'es','es-ve':'es','es-ec':'es','es-gt':'es','es-cu':'es','es-bo':'es','es-do':'es','es-hn':'es','es-py':'es','es-sv':'es','es-ni':'es','es-cr':'es','es-pa':'es','es-uy':'es',
    'it':'it','it-it':'it','it-ch':'it','it-va':'it','it-sm':'it',
    'pt':'pt','pt-pt':'pt','pt-br':'pt','pt-ao':'pt','pt-mz':'pt',
    'pl':'pl','pl-pl':'pl',
    'el':'el','el-gr':'el','el-cy':'el',
    'he':'he','he-il':'he','iw':'he',
    'nb':'no','nn':'no','no':'no','nb-no':'no','nn-no':'no','no-no':'no',
    'zh':'zh','zh-cn':'zh','zh-tw':'zh','zh-hk':'zh','zh-sg':'zh','zh-mo':'zh','zh-hans':'zh','zh-hant':'zh',
    'ja':'ja','ja-jp':'ja',
    'hu':'hu','hu-hu':'hu',
    'ru':'ru','ru-ru':'ru','uk':'ru','uk-ua':'ru','be':'ru','be-by':'ru','kk':'ru','kk-kz':'ru'
  };

  var countryMap = {
    'US':'en','GB':'en','CA':'en','AU':'en','NZ':'en','IE':'en','ZA':'en','IN':'en',
    'DE':'de','AT':'de','CH':'de','LU':'de','LI':'de',
    'FR':'fr','BE':'fr','MC':'fr','SN':'fr','CI':'fr','CM':'fr','MG':'fr','BF':'fr','ML':'fr','NE':'fr','BJ':'fr','TG':'fr',
    'ES':'es','MX':'es','AR':'es','CO':'es','CL':'es','PE':'es','VE':'es','EC':'es','GT':'es','CU':'es','BO':'es','DO':'es','HN':'es','PY':'es','SV':'es','NI':'es','CR':'es','PA':'es','UY':'es',
    'IT':'it','SM':'it','VA':'it',
    'PT':'pt','BR':'pt','AO':'pt','MZ':'pt','CV':'pt','GW':'pt','ST':'pt',
    'PL':'pl',
    'GR':'el','CY':'el',
    'IL':'he',
    'NO':'no',
    'CN':'zh','TW':'zh','HK':'zh','MO':'zh','SG':'zh',
    'JP':'ja',
    'HU':'hu',
    'RU':'ru','BY':'ru','KZ':'ru','UA':'ru'
  };

  // ── 4. Πού βρισκόμαστε τώρα ─────────────────────────────────────────────
  var path = window.location.pathname || '/';
  var segs = path.split('/').filter(function (x) { return x.length > 0; });

  var currentLang = 'en';
  var pageSegs = segs;
  if (segs.length && LANG_DIRS.indexOf(segs[0].toLowerCase()) !== -1) {
    currentLang = segs[0].toLowerCase();
    pageSegs = segs.slice(1);
  }
  var page = pageSegs.join('/');   // '' = αρχική, 'booking' ή 'booking.html' κλπ.

  // ── 5. Ποια γλώσσα θέλει ο browser ──────────────────────────────────────
  function detectFromBrowser() {
    var list = [];
    if (navigator.languages && navigator.languages.length) {
      list = navigator.languages;
    } else if (navigator.language || navigator.userLanguage) {
      list = [navigator.language || navigator.userLanguage];
    }
    for (var i = 0; i < list.length; i++) {
      var l = String(list[i]).toLowerCase();
      var hit = langMap[l] || langMap[l.split('-')[0]];
      if (hit) return hit;
    }
    return null;
  }

  // ── 6. Μετάβαση ─────────────────────────────────────────────────────────
  function markChosen(lang) {
    try { sessionStorage.setItem('lang_chosen', lang); } catch (e) {}
  }

  function go(target) {
    if (!target) return;
    markChosen(target);
    if (target === currentLang) return;   // ήδη σωστά — τίποτα να κάνουμε

    var newPath;
    if (target === 'en') {
      newPath = '/' + page;                     // αγγλικά = ρίζα
    } else {
      newPath = '/' + target + (page ? '/' + page : '/');
    }
    if (newPath.length > 1 && !page) {
      // ομαλοποίηση: πάντα με κάθετο στο τέλος για αρχικές σελίδες
      if (newPath.charAt(newPath.length - 1) !== '/') newPath += '/';
    }

    // ΔΙΑΤΗΡΗΣΗ query params ΚΑΙ hash (#φίλτρο συνεργάτη).
    var dest = window.location.origin + newPath + search + (window.location.hash || '');
    window.location.replace(dest);
  }

  var fromBrowser = detectFromBrowser();
  if (fromBrowser) { go(fromBrowser); return; }

  // ── 7. Εφεδρικό: geo-IP μέσω Cloudflare ─────────────────────────────────
  try {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/cdn-cgi/trace', true);
    xhr.timeout = 2000;
    xhr.onload = function () {
      if (xhr.status !== 200) { markChosen(currentLang); return; }
      var lines = xhr.responseText.split('\n');
      var country = '';
      for (var i = 0; i < lines.length; i++) {
        if (lines[i].indexOf('loc=') === 0) { country = lines[i].split('=')[1]; break; }
      }
      if (country && countryMap[country]) go(countryMap[country]);
      else markChosen(currentLang);
    };
    xhr.onerror   = function () { markChosen(currentLang); };
    xhr.ontimeout = function () { markChosen(currentLang); };
    xhr.send();
  } catch (e) {
    markChosen(currentLang);
  }
})();

/**
 * Σεβασμός χειροκίνητης επιλογής γλώσσας.
 * Ο language switcher είναι απλά <a href> links. Χωρίς αυτό, μόλις ο
 * χρήστης επέλεγε γλώσσα, το script τον γύριζε αμέσως πίσω στη γλώσσα του
 * browser — και δεν θα μπορούσε ΠΟΤΕ να αλλάξει γλώσσα χειροκίνητα.
 */
(function () {
  'use strict';
  document.addEventListener('click', function (ev) {
    var a = ev.target && ev.target.closest ? ev.target.closest('a') : null;
    if (!a) return;
    if (!a.closest('.lang-switcher, .dropdown-content')) return;
    try { sessionStorage.setItem('lang_chosen', 'manual'); } catch (e) {}
  }, true);
})();
