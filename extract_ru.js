const fs = require('fs');
const files = ['acropolis-tour.html', 'argolis-tour.html', 'delphi-tour.html', 'meteora-tour.html', 'sounio-tour.html'];

files.forEach(f => {
    let content = fs.readFileSync(`ru/${f}`, 'utf8');
    // We want to extract paragraphs inside <p class="tour-text">, <div class="highlight-box">, <div class="itinerary-item">, and sidebar details
    const textMatches = content.match(/<p[^>]*>(.*?)<\/p>|<h4[^>]*>(.*?)<\/h4>|<li><i[^>]*><\/i>\s*(.*?)<\/li>/gs);
    console.log(`\n\n=== ${f} ===\n`);
    if(textMatches) {
        textMatches.forEach(m => {
            let clean = m.replace(/<[^>]+>/g, '').trim();
            if(clean && !clean.match(/^[0-9]+$/)) { // filter empty or just numbers
                console.log(clean);
            }
        });
    }
});
