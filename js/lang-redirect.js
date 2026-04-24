/**
 * Auto Language Redirect
 * Detects browser language and redirects to the correct localized version.
 * Respects manual language selection via the language switcher.
 * Only triggers once per session on the English (default) pages.
 */
(function () {
    'use strict';

    // Available languages mapped to directory names
    const LANG_MAP = {
        'de': 'de',
        'fr': 'fr',
        'es': 'es',
        'it': 'it',
        'pt': 'pt',
        'pt-br': 'pt',
        'pl': 'pl',
        'el': 'el',
        'he': 'he',
        'iw': 'he',  // Old Hebrew code
        'nb': 'no',
        'nn': 'no',
        'no': 'no'
    };

    const STORAGE_KEY = 'tvt_lang_manual';
    const SESSION_KEY = 'tvt_lang_redirected';

    // Check if user manually selected a language (from lang switcher click)
    if (localStorage.getItem(STORAGE_KEY)) {
        return;
    }

    // Check if already redirected this session
    if (sessionStorage.getItem(SESSION_KEY)) {
        return;
    }

    // Only redirect from English (root) pages — not from /de/, /fr/, etc.
    var currentPath = window.location.pathname;
    var langDirs = ['de', 'fr', 'es', 'it', 'pt', 'pl', 'el', 'he', 'no'];
    for (var i = 0; i < langDirs.length; i++) {
        if (currentPath.indexOf('/' + langDirs[i] + '/') !== -1) {
            return; // Already on a localized page
        }
    }

    // Mark this session as handled
    sessionStorage.setItem(SESSION_KEY, '1');

    // Detect browser language
    var browserLangs = navigator.languages || [navigator.language || navigator.userLanguage || ''];
    var targetDir = null;

    for (var j = 0; j < browserLangs.length; j++) {
        var lang = browserLangs[j].toLowerCase();

        // Try exact match first (e.g., "pt-br")
        if (LANG_MAP[lang]) {
            targetDir = LANG_MAP[lang];
            break;
        }

        // Try base language (e.g., "pt" from "pt-BR")
        var baseLang = lang.split('-')[0];
        if (LANG_MAP[baseLang]) {
            targetDir = LANG_MAP[baseLang];
            break;
        }
    }

    // If target is English or not found, stay on current page
    if (!targetDir) {
        return;
    }

    // Build redirect URL
    var page = currentPath.split('/').pop() || 'index.html';
    if (page === '' || page === '/') page = 'index.html';

    // Handle both root domain and subdirectory deployments
    var basePath = currentPath.substring(0, currentPath.lastIndexOf('/') + 1);
    var newUrl = basePath + targetDir + '/' + page;

    // Redirect
    window.location.replace(newUrl);
})();
