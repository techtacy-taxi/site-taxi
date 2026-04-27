const fs = require('fs');
const path = require('path');

const translations = {
    'en': {
        noWaitingTitle: 'No Waiting in Lines',
        noWaitingDesc: 'Pre-book to avoid long queues and ensure a taxi is always available for you.',
        fiveStarTitle: '5-Star Rated',
        fiveStarDesc: 'Our customers have rated us 5 out of 5 stars on Google Reviews for our excellent service.'
    },
    'el': {
        noWaitingTitle: 'Χωρίς Αναμονή',
        noWaitingDesc: 'Προκρατήστε για να μην περιμένετε σε ουρές ή βρεθείτε χωρίς διαθεσιμότητα ταξί.',
        fiveStarTitle: '5 Αστέρια στο Google',
        fiveStarDesc: 'Οι πελάτες μας μάς έχουν βαθμολογήσει με 5 στα 5 αστέρια στο Google Reviews για την άψογη εξυπηρέτησή μας.'
    },
    'de': {
        noWaitingTitle: 'Keine Wartezeiten',
        noWaitingDesc: 'Buchen Sie im Voraus, um lange Warteschlangen zu vermeiden und sicherzustellen, dass immer ein Taxi für Sie verfügbar ist.',
        fiveStarTitle: 'Mit 5 Sternen bewertet',
        fiveStarDesc: 'Unsere Kunden haben uns auf Google Reviews mit 5 von 5 Sternen für unseren exzellenten Service bewertet.'
    },
    'es': {
        noWaitingTitle: 'Sin Esperas',
        noWaitingDesc: 'Reserve con antelación para evitar largas colas y asegurarse de que siempre haya un taxi disponible para usted.',
        fiveStarTitle: 'Calificación de 5 Estrellas',
        fiveStarDesc: 'Nuestros clientes nos han calificado con 5 de 5 estrellas en Google Reviews por nuestro excelente servicio.'
    },
    'pt': {
        noWaitingTitle: 'Sem Filas de Espera',
        noWaitingDesc: 'Reserve com antecedência para evitar longas filas e garantir que um táxi esteja sempre disponível para si.',
        fiveStarTitle: 'Avaliação de 5 Estrelas',
        fiveStarDesc: 'Os nossos clientes avaliaram-nos com 5 em 5 estrelas no Google Reviews pelo nosso excelente serviço.'
    },
    'fr': {
        noWaitingTitle: 'Pas d\'Attente',
        noWaitingDesc: 'Réservez à l\'avance pour éviter les longues files d\'attente et vous assurer qu\'un taxi est toujours disponible pour vous.',
        fiveStarTitle: 'Noté 5 Étoiles',
        fiveStarDesc: 'Nos clients nous ont attribué 5 étoiles sur 5 sur Google Reviews pour notre excellent service.'
    },
    'it': {
        noWaitingTitle: 'Nessuna Attesa',
        noWaitingDesc: 'Prenota in anticipo per evitare lunghe code e assicurarti che un taxi sia sempre disponibile per te.',
        fiveStarTitle: 'Valutato 5 Stelle',
        fiveStarDesc: 'I nostri clienti ci hanno valutato 5 stelle su 5 su Google Reviews per il nostro eccellente servizio.'
    },
    'pl': {
        noWaitingTitle: 'Bez Czekania',
        noWaitingDesc: 'Zarezerwuj z wyprzedzeniem, aby uniknąć długich kolejek i mieć pewność, że taksówka jest zawsze dla Ciebie dostępna.',
        fiveStarTitle: 'Ocenione na 5 Gwiazdek',
        fiveStarDesc: 'Nasi klienci ocenili nas na 5 z 5 gwiazdek w Google Reviews za naszą doskonałą obsługę.'
    },
    'no': {
        noWaitingTitle: 'Ingen Ventetid',
        noWaitingDesc: 'Forhåndsbestill for å unngå lange køer og sikre at en taxi alltid er tilgjengelig for deg.',
        fiveStarTitle: '5-Stjerners Vurdering',
        fiveStarDesc: 'Våre kunder har gitt oss 5 av 5 stjerner på Google Reviews for vår utmerkede service.'
    },
    'he': {
        noWaitingTitle: 'ללא המתנה',
        noWaitingDesc: 'הזמן מראש כדי להימנע מתורים ארוכים ולהבטיח שמונית תמיד זמינה עבורך.',
        fiveStarTitle: 'מדורג 5 כוכבים',
        fiveStarDesc: 'הלקוחות שלנו דירגו אותנו 5 מתוך 5 כוכבים ב-Google Reviews על השירות המצוין שלנו.'
    },
    'zh': {
        noWaitingTitle: '无需等待',
        noWaitingDesc: '提前预订可避免排长队，并确保随时为您提供出租车。',
        fiveStarTitle: '5星好评',
        fiveStarDesc: '我们的客户在Google评论上为我们的优质服务给出了5星（满分5星）的评价。'
    },
    'ja': {
        noWaitingTitle: '待ち時間なし',
        noWaitingDesc: '長い列を避け、常にタクシーが利用できるように事前予約してください。',
        fiveStarTitle: '5つ星の高評価',
        fiveStarDesc: 'お客様から、Googleレビューで5つ星中5つ星の素晴らしいサービス評価をいただいております。'
    }
};

const dirs = ['', 'de', 'es', 'pt', 'fr', 'it', 'pl', 'no', 'he', 'el', 'zh', 'ja'];

dirs.forEach(dir => {
    const filePath = path.join(__dirname, dir, 'index.html');
    if (fs.existsSync(filePath)) {
        let html = fs.readFileSync(filePath, 'utf8');
        const langKey = dir === '' ? 'en' : dir;
        const trans = translations[langKey];

        const injectionString = `
            <div class="feature-item reveal-left">
                <i class="fas fa-taxi"></i>
                <h4>${trans.noWaitingTitle}</h4>
                <p>${trans.noWaitingDesc}</p>
            </div>
            <div class="feature-item reveal">
                <i class="fab fa-google"></i>
                <h4>${trans.fiveStarTitle}</h4>
                <p>${trans.fiveStarDesc}</p>
            </div>
        </div>
    </section>`;

        // Check if already injected
        if (html.includes('fa-taxi') && html.includes(trans.noWaitingTitle)) {
            console.log(`Skipping ${langKey}, already added.`);
            return;
        }

        // We need to find the closing div of the .features-grid, which is followed by the closing section of why-us.
        // It looks like:
        //             </div>
        //         </div>
        //     </section>
        
        // A safer way is to use regex or split on a known pattern inside that section.
        // Let's find the closing tags for the features-grid and section in the 'why-us' section.
        
        // We know the features-grid ends with:
        //             </div>
        //         </div>
        //     </section>
        //     <!-- Quick Booking CTA -->

        // Let's split using the end of the section right before "Quick Booking CTA"
        const targetEndStr = `        </div>\n    </section>\n\n    <!-- Quick Booking CTA -->`;
        const targetEndStr2 = `        </div>\r\n    </section>\r\n\r\n    <!-- Quick Booking CTA -->`;
        
        if (html.includes(targetEndStr)) {
             html = html.replace(targetEndStr, injectionString + `\n\n    <!-- Quick Booking CTA -->`);
             fs.writeFileSync(filePath, html, 'utf8');
             console.log(`Updated ${langKey}`);
        } else if (html.includes(targetEndStr2)) {
             html = html.replace(targetEndStr2, injectionString + `\r\n\r\n    <!-- Quick Booking CTA -->`);
             fs.writeFileSync(filePath, html, 'utf8');
             console.log(`Updated ${langKey} (CRLF)`);
        } else {
             console.log(`Could not find injection point in ${langKey}`);
        }
    } else {
        console.log(`File not found: ${filePath}`);
    }
});
