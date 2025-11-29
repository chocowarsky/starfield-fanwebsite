// ===============================
// 🌌 MAIN.JS – STARFIELD PROJECT
// ===============================

document.addEventListener("DOMContentLoaded", () => {
    // 1. Inisialisasi logika halaman lokal (index.html)
    initScrollEffects();
    initFactionTabs();

    // 2. Memuat komponen eksternal (Navbar & Footer)
    loadDynamicComponents();
});

// --- FUNGSI 1: Animasi Scroll & Navbar Background ---
function initScrollEffects() {
    // Fade-up animation observer
    const faders = document.querySelectorAll(".fade-up");
    const appearOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    faders.forEach((el) => appearOnScroll.observe(el));

    // Navbar background transition on scroll
    let lastScrollTop = 0;
    window.addEventListener("scroll", () => {
        const navContainer = document.querySelector(".nav-container");
        if (navContainer) {
            let scrollTop = window.scrollY;
            if (scrollTop > lastScrollTop && scrollTop > 150) {
                navContainer.classList.add("nav-scrolled");
            } else {
                navContainer.classList.remove("nav-scrolled");
            }
            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
        }
    });
}

// --- FUNGSI 2: Tab System (Factions) ---
function initFactionTabs() {
    const factionTabs = document.querySelectorAll(".faction-tab-btn");
    const factionContents = document.querySelectorAll(".faction-content");

    if (factionTabs.length === 0) return;

    factionTabs.forEach(tab => {
        tab.addEventListener("click", () => {
            const targetId = tab.dataset.factionTab;
            const targetContent = document.querySelector(`#faction-content-${targetId}`);

            // Reset active state
            factionTabs.forEach(t => t.classList.remove("active"));
            factionContents.forEach(c => {
                c.classList.add("hidden");
                c.classList.remove("active");
            });

            // Set new active state
            tab.classList.add("active");
            if (targetContent) {
                targetContent.classList.remove("hidden");
                setTimeout(() => targetContent.classList.add("active"), 10);
            }
        });
    });
}

// --- FUNGSI 3: Load Navbar & Footer ---
function loadDynamicComponents() {
    const fetchNavbar = fetch("navbar.html").then(res => {
        if (!res.ok) throw new Error("Navbar not found");
        return res.text();
    });
    const fetchFooter = fetch("footer.html").then(res => {
        if (!res.ok) throw new Error("Footer not found");
        return res.text();
    });

    Promise.all([fetchNavbar, fetchFooter])
        .then(([navbarData, footerData]) => {
            document.getElementById("navbar").innerHTML = navbarData;
            document.getElementById("footer-placeholder").innerHTML = footerData;
            initMobileMenu();
        })
        .catch((err) => console.error("Failed to load components:", err));
}

// --- FUNGSI 4: Mobile Menu Logic ---
function initMobileMenu() {
    const menuToggle = document.getElementById("menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", () => {
            navLinks.classList.toggle("active");
            menuToggle.classList.toggle("active");
        });
    }
}
