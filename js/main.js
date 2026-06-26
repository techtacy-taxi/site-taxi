document.addEventListener('DOMContentLoaded', () => {
    // Reveal animations on scroll
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    const revealOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    if ('IntersectionObserver' in window) {
        const revealOnScroll = new IntersectionObserver(function (entries, observer) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target);
                }
            });
        }, revealOptions);

        revealElements.forEach(el => {
            revealOnScroll.observe(el);
        });
    } else {
        // Fallback for older browsers
        revealElements.forEach(el => el.classList.add('active'));
    }

    // Force check for elements already in view
    setTimeout(() => {
        revealElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight) {
                el.classList.add('active');
            }
        });
    }, 500);

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    mobileToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = mobileToggle.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Close mobile menu when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = mobileToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });

    // Save manual language choice when user clicks language switcher
    document.querySelectorAll('.dropdown-content a').forEach(link => {
        link.addEventListener('click', () => {
            sessionStorage.setItem('lang_chosen', 'manual');
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navHeight = navbar.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Lightbox Logic for Tour Galleries
    const galleryImages = document.querySelectorAll('.tour-gallery img');
    galleryImages.forEach(img => {
        img.onerror = function() {
            this.style.display = 'none';
            // Also hide the parent link/container if it's just a wrapper
            if (this.parentElement.classList.contains('gallery-item')) {
                this.parentElement.style.display = 'none';
            }
        };
    });
    if (galleryImages.length > 0) {
        // Create modal elements dynamically
        const modal = document.createElement('div');
        modal.classList.add('lightbox-modal');
        
        const closeBtn = document.createElement('span');
        closeBtn.classList.add('lightbox-close');
        closeBtn.innerHTML = '&times;';
        
        const modalImg = document.createElement('img');
        modalImg.classList.add('lightbox-content');
        
        modal.appendChild(closeBtn);
        modal.appendChild(modalImg);
        document.body.appendChild(modal);

        // Open lightbox when clicking on an image
        galleryImages.forEach(img => {
            img.addEventListener('click', () => {
                modalImg.src = img.src;
                modal.classList.add('active');
                document.body.style.overflow = 'hidden'; // stop background scrolling
            });
        });

        // Functionality to close the lightbox
        const closeLightbox = () => {
            modal.classList.remove('active');
            document.body.style.overflow = '';
            // Small delay to clear img src after fade out
            setTimeout(() => {
                if(!modal.classList.contains('active')) {
                    modalImg.src = '';
                }
            }, 300);
        };

        closeBtn.addEventListener('click', closeLightbox);
        
        // Close if clicking anywhere outside the image
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeLightbox();
            }
        });
        
        // Close with escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                closeLightbox();
            }
        });
    }

    // Airport Popup Logic
    const airportBtn = document.getElementById('airport-transfer-btn');
    const airportPopup = document.getElementById('airport-popup');
    
    if (airportBtn && airportPopup) {
        // Toggle popup on button click
        airportBtn.addEventListener('click', (e) => {
            e.preventDefault();
            airportPopup.classList.toggle('active');
        });

        // Close popup when clicking outside of it
        document.addEventListener('click', (e) => {
            if (!airportBtn.contains(e.target) && !airportPopup.contains(e.target)) {
                airportPopup.classList.remove('active');
            }
        });

        // Close popup on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && airportPopup.classList.contains('active')) {
                airportPopup.classList.remove('active');
            }
        });
    }

    // --- Scroll Down Indicator Logic ---
    const scrollIndicator = document.createElement('div');
    scrollIndicator.classList.add('scroll-indicator');
    scrollIndicator.innerHTML = '<i class="fas fa-chevron-down"></i>';
    document.body.appendChild(scrollIndicator);

    const updateScrollIndicator = () => {
        // Distance from bottom of the page
        const scrollBottom = document.documentElement.scrollHeight - window.innerHeight - window.scrollY;
        
        // If we are near the bottom (less than 100px), hide it
        if (scrollBottom < 100) {
            scrollIndicator.classList.add('hidden');
        } else {
            scrollIndicator.classList.remove('hidden');
        }
    };

    // Initialize and listen to scroll
    updateScrollIndicator();
    window.addEventListener('scroll', updateScrollIndicator);
    window.addEventListener('resize', updateScrollIndicator);
    // Handle gallery image loading errors (skip missing images)
    const galleryImg = document.getElementById('vehicle-gallery-img');
    if (galleryImg) {
        galleryImg.onerror = function () {
            // Find which gallery this image belongs to and remove it
            for (const type in vehicleGalleries) {
                const index = vehicleGalleries[type].indexOf(currentGalleryArr[currentImgIndex]);
                if (index !== -1) {
                    vehicleGalleries[type].splice(index, 1);
                    break;
                }
            }

            // Also remove from current session array
            currentGalleryArr.splice(currentImgIndex, 1);

            if (currentGalleryArr.length === 0) {
                closeVehicleGallery();
            } else {
                currentImgIndex = currentImgIndex % currentGalleryArr.length;
                // Refresh the whole gallery UI to update dots
                const type = document.getElementById('vehicle-gallery-title').innerText.toLowerCase().includes('taxi') ? 'taxi' :
                             document.getElementById('vehicle-gallery-title').innerText.toLowerCase().includes('van') ? 'van' : 'bus';
                openVehicleGallery(type, currentImgIndex % currentGalleryArr.length); 
            }
        };
    }

    // FAQ Accordion Toggle
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', () => {
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });
                item.classList.toggle('active');
            });
        }
    });
});

// === Vehicle Gallery Logic (Global Scope) ===
const vehicleGalleries = {
    'taxi': [
        'images/taxi_w212.jpg',
        'images/taxi_w213.jpg',
        'images/taxi_tesla_y.jpg',
        'images/taxi_tesla_y_back.jpg'
    ],
    'van': [
        'images/van_exterior_1.jpg',
        'images/van_exterior_2.jpg',
        'images/van_interior_1.jpg',
        'images/van_interior_2.jpg'
    ],
    'bus': [
        'images/bus_black_port.jpg',
        'images/bus_black_acropolis.jpg',
        'images/bus_black_sounio.jpg',
        'images/bus_interior_1.jpg',
        'images/bus_interior_2.jpg'
    ]
};

let currentGalleryArr = [];
let currentImgIndex = 0;

function openVehicleGallery(type, startIndex = 0) {
    currentGalleryArr = vehicleGalleries[type];
    currentImgIndex = startIndex;
    
    // Set title
    const title = document.getElementById('vehicle-gallery-title');
    if (type === 'taxi') title.innerText = 'Executive Taxi Gallery';
    else if (type === 'van') title.innerText = 'Luxury Van Gallery';
    else if (type === 'bus') title.innerText = 'Bus & Mini Bus Gallery';
    
    // Create dots
    const indicatorContainer = document.getElementById('vehicle-indicators');
    indicatorContainer.innerHTML = '';
    currentGalleryArr.forEach((_, idx) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (idx === currentImgIndex) dot.classList.add('active');
        dot.onclick = () => goToVehicleImg(idx);
        indicatorContainer.appendChild(dot);
    });

    updateVehicleGalleryUI();

    const modal = document.getElementById('vehicle-gallery-modal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeVehicleGallery() {
    const modal = document.getElementById('vehicle-gallery-modal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

function nextVehicleImg() {
    currentImgIndex = (currentImgIndex + 1) % currentGalleryArr.length;
    updateVehicleGalleryUI();
}

function prevVehicleImg() {
    currentImgIndex = (currentImgIndex - 1 + currentGalleryArr.length) % currentGalleryArr.length;
    updateVehicleGalleryUI();
}

function goToVehicleImg(index) {
    currentImgIndex = index;
    updateVehicleGalleryUI();
}

function updateVehicleGalleryUI() {
    const imgEl = document.getElementById('vehicle-gallery-img');
    
    // Check if we are in a subdirectory (like /el/ or /de/)
    const path = window.location.pathname;
    const langs = ['de', 'el', 'es', 'fr', 'he', 'it', 'ja', 'no', 'pl', 'pt', 'zh', 'ru', 'hu'];
    let prefix = '';
    
    // Check if current URL path contains any of the language subdirectories
    for (const l of langs) {
        if (path.includes('/' + l + '/') || path.endsWith('/' + l) || path.endsWith('/' + l + '/index.html')) {
            prefix = '../';
            break;
        }
    }
    
    imgEl.src = prefix + currentGalleryArr[currentImgIndex];

    const dots = document.querySelectorAll('#vehicle-indicators .dot');
    dots.forEach((dot, idx) => {
        if (idx === currentImgIndex) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}



/* =========================================================
   MOBILE STICKY ACTION BAR (Call + WhatsApp) + "online" pill
   Auto-injected on every page. No HTML edits needed.
   Texts are localized by <html lang="..">.
   ========================================================= */
(function () {
    var PHONE = '+306936123322';
    var WA_TEXT = 'Hello!%20I%E2%80%99m%20interested%20in%20your%20services.%20Can%20you%20help%20me%3F';

    // Localized labels per language
    var T = {
        en: { call: 'Call', wa: 'WhatsApp', rec: 'Best way to reach us', online: 'Konstantinos is online', sub: 'Typically replies within minutes' },
        el: { call: 'Κλήση', wa: 'WhatsApp', rec: 'Ο καλύτερος τρόπος επικοινωνίας', online: 'Ο Κωνσταντίνος είναι online', sub: 'Απαντά συνήθως μέσα σε λίγα λεπτά' },
        de: { call: 'Anrufen', wa: 'WhatsApp', rec: 'Beste Möglichkeit, uns zu erreichen', online: 'Konstantinos ist online', sub: 'Antwortet meist innerhalb von Minuten' },
        es: { call: 'Llamar', wa: 'WhatsApp', rec: 'La mejor forma de contactarnos', online: 'Konstantinos está en línea', sub: 'Suele responder en pocos minutos' },
        fr: { call: 'Appeler', wa: 'WhatsApp', rec: 'Le meilleur moyen de nous joindre', online: 'Konstantinos est en ligne', sub: 'Répond généralement en quelques minutes' },
        it: { call: 'Chiama', wa: 'WhatsApp', rec: 'Il modo migliore per contattarci', online: 'Konstantinos è online', sub: 'Di solito risponde in pochi minuti' },
        pt: { call: 'Ligar', wa: 'WhatsApp', rec: 'A melhor forma de nos contactar', online: 'Konstantinos está online', sub: 'Costuma responder em poucos minutos' },
        pl: { call: 'Zadzwoń', wa: 'WhatsApp', rec: 'Najlepszy sposób kontaktu', online: 'Konstantinos jest online', sub: 'Zwykle odpowiada w ciągu kilku minut' },
        no: { call: 'Ring', wa: 'WhatsApp', rec: 'Beste måten å nå oss på', online: 'Konstantinos er pålogget', sub: 'Svarer vanligvis innen få minutter' },
        hu: { call: 'Hívás', wa: 'WhatsApp', rec: 'A legjobb módja a kapcsolatfelvételnek', online: 'Konstantinos online van', sub: 'Általában percek alatt válaszol' },
        ru: { call: 'Звонок', wa: 'WhatsApp', rec: 'Лучший способ связаться с нами', online: 'Константинос онлайн', sub: 'Обычно отвечает в течение нескольких минут' },
        ja: { call: '電話', wa: 'WhatsApp', rec: 'お問い合わせはこちらが最適', online: 'コンスタンティノスはオンラインです', sub: '通常数分で返信します' },
        zh: { call: '致电', wa: 'WhatsApp', rec: '联系我们的最佳方式', online: 'Konstantinos 在线', sub: '通常几分钟内回复' },
        he: { call: 'התקשרו', wa: 'WhatsApp', rec: 'הדרך הטובה ביותר ליצור קשר', online: 'קונסטנטינוס מחובר', sub: 'בדרך כלל מגיב תוך דקות' }
    };

    var lang = (document.documentElement.lang || 'en').toLowerCase().split('-')[0];
    var t = T[lang] || T.en;

    var waHref = 'https://wa.me/' + PHONE + '?text=' + WA_TEXT;
    var telHref = 'tel:' + PHONE;

    // Build the bobbing online pill
    var pill = document.createElement('div');
    pill.id = 'mobile-online-pill';
    pill.innerHTML =
        '<span class="mab-pill-dot"></span>' +
        '<span class="mab-pill-text">' + t.online + '</span>' +
        '<span class="mab-pill-sub">· ' + t.sub + '</span>';

    // Build the action bar
    var bar = document.createElement('div');
    bar.id = 'mobile-action-bar';
    bar.setAttribute('role', 'navigation');
    bar.innerHTML =
        '<p class="mab-recommend"><i class="fab fa-whatsapp"></i>' + t.rec + '</p>' +
        '<div class="mab-buttons">' +
            '<a class="mab-btn mab-call" href="' + telHref + '" aria-label="' + t.call + '">' +
                '<i class="fas fa-phone"></i> ' + t.call + '</a>' +
            '<a class="mab-btn mab-whatsapp" href="' + waHref + '" target="_blank" rel="noopener" aria-label="' + t.wa + '">' +
                '<i class="fab fa-whatsapp"></i> ' + t.wa + '</a>' +
        '</div>';

    document.body.appendChild(pill);
    document.body.appendChild(bar);

    // Show/hide on scroll direction: hide when scrolling up to read, show when scrolling down or idle
    var lastY = window.pageYOffset;
    var idleTimer = null;

    function showBar() {
        bar.classList.remove('bar-hidden');
        pill.classList.remove('pill-hidden');
    }
    function hideBar() {
        bar.classList.add('bar-hidden');
        pill.classList.add('pill-hidden');
    }

    window.addEventListener('scroll', function () {
        var y = window.pageYOffset;
        if (y < 80) {
            showBar();
        } else if (y < lastY - 6) {
            // scrolling up (reading) -> hide
            hideBar();
        } else if (y > lastY + 6) {
            // scrolling down -> show
            showBar();
        }
        lastY = y;

        // Re-show shortly after scrolling stops
        if (idleTimer) clearTimeout(idleTimer);
        idleTimer = setTimeout(showBar, 900);
    }, { passive: true });
})();
