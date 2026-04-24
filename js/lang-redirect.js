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
        'de': 'de', 'de-de': 'de', 'de-at': 'de', 'de-ch': 'de',
        'fr': 'fr', 'fr-fr': 'fr', 'fr-be': 'fr', 'fr-ca': 'fr', 'fr-ch': 'fr',
        'es': 'es', 'es-es': 'es', 'es-mx': 'es', 'es-ar': 'es', 'es-co': 'es',
        'it': 'it', 'it-it': 'it', 'it-ch': 'it',
        'pt': 'pt', 'pt-pt': 'pt', 'pt-br': 'pt',
        'pl': 'pl', 'pl-pl': 'pl',
        'el': 'el', 'el-gr': 'el',
        'he': 'he', 'he-il': 'he',
        'nb': 'no', 'nn': 'no', 'no': 'no', 'nb-no': 'no', 'nn-no': 'no'
    };

    // Country code → site directory (Cloudflare geo-IP fallback)
    var countryMap = {
        'DE': 'de', 'AT': 'de', 'CH': 'de',
        'FR': 'fr', 'BE': 'fr', 'MC': 'fr',
        'ES': 'es', 'MX': 'es', 'AR': 'es', 'CO': 'es', 'CL': 'es', 'PE': 'es',
        'IT': 'it', 'SM': 'it',
        'PT': 'pt', 'BR': 'pt',
        'PL': 'pl',
        'GR': 'el', 'CY': 'el',
        'IL': 'he',
        'NO': 'no'
    };

    function doRedirect(targetDir) {
        if (!targetDir) return;
        sessionStorage.setItem('lang_chosen', targetDir);
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
