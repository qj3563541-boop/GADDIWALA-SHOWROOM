/**
 * Gaddiwala Showroom • Service Centre • Workshop
 * Interactive JavaScript Engine
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. AUTO-OPEN WELCOME POP-UP MODAL (Requirement 1)
    setTimeout(() => {
        openWelcomeModal();
    }, 600);

    // 2. INITIALIZE 3D TILT EFFECT FOR SERVICES CARDS (Requirement 3)
    init3DTilt();

    // 3. INITIALIZE MOBILE MENU TOGGLE
    initMobileNav();

    // 4. KEYBOARD ACCESSIBILITY (ESC key to close modals)
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeWelcomeModal();
            closeAuctionModal();
        }
    });

    // 5. ATTACH CHASSIS VERIFY BUTTON
    const verifyBtn = document.getElementById('btnVerifyChassis');
    if (verifyBtn) {
        verifyBtn.addEventListener('click', handleChassisVerification);
    }
});

/* ==========================================================================
   MODAL CONTROLS: WELCOME MODAL
   ========================================================================== */
function openWelcomeModal() {
    const modal = document.getElementById('welcomeModal');
    if (modal) {
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
}

function closeWelcomeModal() {
    const modal = document.getElementById('welcomeModal');
    if (modal) {
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }
}

/* Close if clicked on modal backdrop */
window.addEventListener('click', (e) => {
    const welcomeModal = document.getElementById('welcomeModal');
    const auctionModal = document.getElementById('auctionModal');
    if (e.target === welcomeModal) {
        closeWelcomeModal();
    }
    if (e.target === auctionModal) {
        closeAuctionModal();
    }
});

/* ==========================================================================
   MODAL CONTROLS: AUCTION SHEET VERIFICATION MODAL (Requirement 7)
   ========================================================================== */
function openAuctionModal() {
    const modal = document.getElementById('auctionModal');
    if (modal) {
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
}

function closeAuctionModal() {
    const modal = document.getElementById('auctionModal');
    if (modal) {
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }
}

/* Sample Chassis Autofill */
function fillChassis(chassisNumber) {
    const input = document.getElementById('chassisInput');
    if (input) {
        input.value = chassisNumber;
        input.focus();
    }
}

/* Interactive Chassis Verification Engine */
function handleChassisVerification() {
    const input = document.getElementById('chassisInput');
    let chassis = input ? input.value.trim().toUpperCase() : '';

    if (!chassis) {
        chassis = 'NHP10-6653678';
        if (input) input.value = chassis;
    }

    // Vehicle database simulation
    const carData = {
        'NHP10-6653678': {
            name: 'Toyota Aqua Hybrid (Package S)',
            engine: '1500cc 1NZ-FXE Hybrid (Color: 1F7 Silver)',
            grade: 'Grade S / 4.5 (Pristine Condition)',
            mileage: '413 km (Certified Japanese Original)',
            interior: 'Grade A (Flawless, smoke-free)',
            exterior: 'Grade A (Scratchless, original panels)',
            house: 'USS Tokyo Auction Lot #2041'
        },
        'ZVW50-2049182': {
            name: 'Toyota Prius A Touring Selection',
            engine: '1800cc 2ZR-FXE Hybrid (Color: 070 Pearl White)',
            grade: 'Grade 5.0 (Showroom Fresh)',
            mileage: '12,450 km (Genuine Verified)',
            interior: 'Grade A (Leather seats & radar cruise)',
            exterior: 'Grade A (Original paint, zero repainted panels)',
            house: 'TAA Kinki Auction Lot #8812'
        },
        'DAA-GP5-1049281': {
            name: 'Honda Fit Hybrid L Package',
            engine: '1500cc i-DCD Earth Dreams (Color: Premium Blue)',
            grade: 'Grade 4.0 (Very Good)',
            mileage: '38,900 km (Genuine Japanese Record)',
            interior: 'Grade B (Neat & Clean)',
            exterior: 'Grade B (A1 minor pin scratch documented)',
            house: 'CAA Chubu Auction Lot #4510'
        }
    };

    const details = carData[chassis] || {
        name: `Japanese Certified Vehicle (${chassis})`,
        engine: '1000cc - 1800cc Verified Japanese Import',
        grade: 'Grade 4.5 / A (Official Auction Record Found)',
        mileage: 'Certified Low Mileage (USS Japan Verified)',
        interior: 'Grade A (Clean, Airbag Intact)',
        exterior: 'Grade A/B (Authentic Inspection Diagram Available)',
        house: 'USS / TAA Japan Direct Database'
    };

    // Update Modal DOM
    const resCarName = document.getElementById('resCarName');
    const resChassis = document.getElementById('resChassis');
    const resGrade = document.getElementById('resGrade');
    const resEngine = document.getElementById('resEngine');
    const resMileage = document.getElementById('resMileage');

    if (resCarName) resCarName.textContent = details.name;
    if (resChassis) resChassis.textContent = chassis;
    if (resGrade) resGrade.textContent = details.grade;
    if (resEngine) resEngine.textContent = details.engine;
    if (resMileage) resMileage.textContent = details.mileage;

    // Open verification modal
    openAuctionModal();
}

/* ==========================================================================
   3D TILT EFFECT FOR SERVICES CARDS (Requirement 3)
   ========================================================================== */
function init3DTilt() {
    const cards = document.querySelectorAll('.service-card-3d');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            // Calculate rotation angle (max 10 degrees)
            const rotateX = ((y - centerY) / centerY) * -9;
            const rotateY = ((x - centerX) / centerX) * 9;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
        });
    });
}

/* ==========================================================================
   MOBILE NAVIGATION TOGGLE
   ========================================================================== */
function initMobileNav() {
    const toggle = document.getElementById('mobileToggle');
    const nav = document.getElementById('navMenu');

    if (toggle && nav) {
        toggle.addEventListener('click', () => {
            nav.classList.toggle('show');
            toggle.classList.toggle('active');
        });

        // Close on link click
        nav.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('show');
                toggle.classList.remove('active');
            });
        });
    }
}

/* ==========================================================================
   INTERACTIVE BRAND FILTER & SERVICE INQUIRY
   ========================================================================== */
function filterByBrand(brandName) {
    const whatsappMsg = `Hello Gaddiwala Showroom, I am looking for available vehicles and auction stock for *${brandName}* at your Faizpur showroom.`;
    const url = `https://wa.me/923211118799?text=${encodeURIComponent(whatsappMsg)}`;
    
    // Quick prompt & redirect option
    if (confirm(`Would you like to check available ${brandName} vehicles with our sales team on WhatsApp?`)) {
        window.open(url, '_blank');
    }
}

function inquireService(serviceName) {
    const select = document.getElementById('serviceInterest');
    if (select) {
        for (let i = 0; i < select.options.length; i++) {
            if (select.options[i].text.includes(serviceName) || select.options[i].value.includes(serviceName)) {
                select.selectedIndex = i;
                break;
            }
        }
    }

    const contactSec = document.getElementById('contact');
    if (contactSec) {
        contactSec.scrollIntoView({ behavior: 'smooth' });
    }
}

/* ==========================================================================
   CONTACT FORM SUBMISSION TO WHATSAPP
   ========================================================================== */
function handleFormSubmit(e) {
    e.preventDefault();

    const name = document.getElementById('userName').value.trim();
    const phone = document.getElementById('userPhone').value.trim();
    const service = document.getElementById('serviceInterest').value;
    const msg = document.getElementById('userMessage').value.trim();

    const text = `*New Website Inquiry - Gaddiwala Showroom*\n` +
                 `👤 *Name:* ${name}\n` +
                 `📞 *Contact:* ${phone}\n` +
                 `🚗 *Service / Interest:* ${service}\n` +
                 `📝 *Details:* ${msg || 'None provided'}\n\n` +
                 `📍 *Location:* Faizpur Interchange, M-2 Motorway, SKP`;

    const whatsappUrl = `https://wa.me/923211118799?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank');
}
