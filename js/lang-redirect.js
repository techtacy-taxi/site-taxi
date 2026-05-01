/**
 * Auto Language Redirect
 * 1. Checks browser language first
 * 2. Falls back to Cloudflare geo-IP country detection
 * Only runs on the root/English homepage.
 * Uses sessionStorage to avoid redirect loops.
 */
(function () {
    // Only redirect from the root/English homepage
    var path = window.location.pathname;
    var isRoot = path === '/' || path === '/index.html' || path.endsWith('/taxi_van_transfers/') || path.endsWith('/taxi_van_transfers/index.html');
    if (!isRoot) return;

    // Don't redirect if user already chose a language
    if (sessionStorage.getItem('lang_chosen')) return;

    // Don't redirect if ?nolang param present
    if (window.location.search.indexOf('nolang') !== -1) return;

    // Browser language → site directory
    var langMap = {
        'en': 'en', 'en-us': 'en', 'en-gb': 'en', 'en-ca': 'en', 'en-au': 'en', 'en-ie': 'en', 'en-nz': 'en',
        'de': 'de', 'de-de': 'de', 'de-at': 'de', 'de-ch': 'de', 'de-lu': 'de', 'de-li': 'de',
        'fr': 'fr', 'fr-fr': 'fr', 'fr-be': 'fr', 'fr-ca': 'fr', 'fr-ch': 'fr', 'fr-lu': 'fr', 'fr-mc': 'fr',
        'es': 'es', 'es-es': 'es', 'es-mx': 'es', 'es-ar': 'es', 'es-co': 'es', 'es-cl': 'es', 'es-pe': 'es', 'es-ve': 'es', 'es-ec': 'es', 'es-gt': 'es', 'es-cu': 'es', 'es-bo': 'es', 'es-do': 'es', 'es-hn': 'es', 'es-py': 'es', 'es-sv': 'es', 'es-ni': 'es', 'es-cr': 'es', 'es-pa': 'es', 'es-uy': 'es',
        'it': 'it', 'it-it': 'it', 'it-ch': 'it', 'it-va': 'it', 'it-sm': 'it',
        'pt': 'pt', 'pt-pt': 'pt', 'pt-br': 'pt', 'pt-ao': 'pt', 'pt-mz': 'pt',
        'pl': 'pl', 'pl-pl': 'pl',
        'el': 'el', 'el-gr': 'el', 'el-cy': 'el',
        'he': 'he', 'he-il': 'he',
        'nb': 'no', 'nn': 'no', 'no': 'no', 'nb-no': 'no', 'nn-no': 'no',
        'zh': 'zh', 'zh-cn': 'zh', 'zh-tw': 'zh', 'zh-hk': 'zh', 'zh-sg': 'zh', 'zh-mo': 'zh',
        'ja': 'ja', 'ja-jp': 'ja',
        'hu': 'hu', 'hu-hu': 'hu',
        'ru': 'ru', 'ru-ru': 'ru', 'uk': 'ru', 'uk-ua': 'ru', 'be': 'ru', 'be-by': 'ru', 'kk': 'ru', 'kk-kz': 'ru'
    };

    // Country code → site directory (Cloudflare geo-IP fallback)
    var countryMap = {
        'US': 'en', 'GB': 'en', 'CA': 'en', 'AU': 'en', 'NZ': 'en', 'IE': 'en',
        'DE': 'de', 'AT': 'de', 'CH': 'de', 'LU': 'de', 'LI': 'de',
        'FR': 'fr', 'BE': 'fr', 'MC': 'fr', 'SN': 'fr', 'CI': 'fr', 'CM': 'fr', 'MG': 'fr', 'BF': 'fr', 'ML': 'fr', 'NE': 'fr', 'BJ': 'fr', 'TG': 'fr',
        'ES': 'es', 'MX': 'es', 'AR': 'es', 'CO': 'es', 'CL': 'es', 'PE': 'es', 'VE': 'es', 'EC': 'es', 'GT': 'es', 'CU': 'es', 'BO': 'es', 'DO': 'es', 'HN': 'es', 'PY': 'es', 'SV': 'es', 'NI': 'es', 'CR': 'es', 'PA': 'es', 'UY': 'es',
        'IT': 'it', 'SM': 'it', 'VA': 'it',
        'PT': 'pt', 'BR': 'pt', 'AO': 'pt', 'MZ': 'pt', 'CV': 'pt', 'GW': 'pt', 'ST': 'pt',
        'PL': 'pl',
        'GR': 'el', 'CY': 'el',
        'IL': 'he',
        'NO': 'no',
        'CN': 'zh', 'TW': 'zh', 'HK': 'zh', 'MO': 'zh', 'SG': 'zh',
        'JP': 'ja',
        'HU': 'hu',
        'RU': 'ru', 'BY': 'ru', 'KZ': 'ru', 'UA': 'ru'
    };

    function doRedirect(targetDir) {
        if (!targetDir) return;
        sessionStorage.setItem('lang_chosen', targetDir);

        // If target is English, stay on root
        if (targetDir === 'en') return;

        var base = window.location.origin;
        var cleanPath = path.replace(/index\.html$/, '').replace(/\/$/, '');
        if (cleanPath.endsWith('/taxi_van_transfers')) {
            window.location.replace(cleanPath + '/' + targetDir + '/index.html');
        } else {
            window.location.replace(base + '/' + targetDir + '/');
        }
    }

    // Step 1: Check browser language
    var browserLang = (navigator.language || navigator.userLanguage || 'en').toLowerCase();
    var targetFromLang = langMap[browserLang] || langMap[browserLang.split('-')[0]];

    if (targetFromLang) {
        doRedirect(targetFromLang);
        return;
    }

    // Step 2: If browser language is English/unknown, try Cloudflare geo-IP
    // Cloudflare exposes /cdn-cgi/trace on all CF-proxied domains
    try {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', '/cdn-cgi/trace', true);
        xhr.timeout = 2000; // 2 second timeout
        xhr.onload = function () {
            if (xhr.status === 200) {
                var lines = xhr.responseText.split('\n');
                var country = '';
                for (var i = 0; i < lines.length; i++) {
                    if (lines[i].indexOf('loc=') === 0) {
                        country = lines[i].split('=')[1];
                        break;
                    }
                }
                if (country && countryMap[country]) {
                    doRedirect(countryMap[country]);
                } else {
                    // No match — stay on English, mark as chosen
                    sessionStorage.setItem('lang_chosen', 'en');
                }
            }
        };
        xhr.onerror = function () {
            // Cloudflare not available (local dev) — stay on English
            sessionStorage.setItem('lang_chosen', 'en');
        };
        xhr.ontimeout = function () {
            sessionStorage.setItem('lang_chosen', 'en');
        };
        xhr.send();
    } catch (e) {
        // Fallback — stay on English
        sessionStorage.setItem('lang_chosen', 'en');
    }
})();
