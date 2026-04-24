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

    // Track manual language selection from the language switcher
    const langLinks = document.querySelectorAll('.dropdown-content a');
    langLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            localStorage.setItem('tvt_lang_manual', '1');
        });
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
    ]
};

let currentGalleryArr = [];
let currentImgIndex = 0;

function openVehicleGallery(type) {
    currentGalleryArr = vehicleGalleries[type];
    currentImgIndex = 0;
    
    // Set title
    const title = document.getElementById('vehicle-gallery-title');
    title.innerText = type === 'taxi' ? 'Executive Taxi Gallery' : 'Luxury Van Gallery';
    
    // Create dots
    const indicatorContainer = document.getElementById('vehicle-indicators');
    indicatorContainer.innerHTML = '';
    currentGalleryArr.forEach((_, idx) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (idx === 0) dot.classList.add('active');
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
    imgEl.src = currentGalleryArr[currentImgIndex];

    const dots = document.querySelectorAll('#vehicle-indicators .dot');
    dots.forEach((dot, idx) => {
        if (idx === currentImgIndex) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

