// ===============================
// 🌌 MAIN.JS – STARFIELD PROJECT
// ===============================

// === Fade-in effect saat elemen masuk ke viewport ===
const faders = document.querySelectorAll(".fade-up");

const appearOnScroll = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

faders.forEach((el) => appearOnScroll.observe(el));


// ===============================
// === Navbar Auto-Move on Scroll ===
// ===============================
let lastScrollTop = 0; // Menyimpan posisi scroll terakhir

window.addEventListener("scroll", () => {
  const navContainer = document.querySelector(".nav-container");

  if (navContainer) {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop && scrollTop > 150) {
      navContainer.classList.add("nav-scrolled");
    } else {
      navContainer.classList.remove("nav-scrolled");
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  }
});


// ===============================
// === Load Konten Dinamis (Navbar & Footer) & Event Listeners ===
// ===============================
document.addEventListener("DOMContentLoaded", () => {

  // Definisikan file HTML yang akan kita ambil
  const fetchNavbar = fetch("../pages/navbar.html").then(res => res.text());
  const fetchFooter = fetch("../pages/footer.html").then(res => res.text());

  // Gunakan Promise.all untuk mengambil keduanya sekaligus
  Promise.all([fetchNavbar, fetchFooter])
    .then(([navbarData, footerData]) => {

      // 1. Inject HTML ke placeholder-nya
      document.getElementById("navbar").innerHTML = navbarData;
      document.getElementById("footer-placeholder").innerHTML = footerData;

      // 2. Setup Event Listener untuk Hamburger (SETELAH navbar di-load)
      const menuToggle = document.getElementById("menu-toggle");
      const navLinks = document.getElementById("nav-links");

      if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", () => {
          navLinks.classList.toggle("active");
          menuToggle.classList.toggle("active");
        });
      }

      // 3. Setup Event Listener untuk Tab Faction
      const factionTabs = document.querySelectorAll(".faction-tab-btn");
      const factionContents = document.querySelectorAll(".faction-content");

      factionTabs.forEach(tab => {
        tab.addEventListener("click", () => {
          const targetId = tab.dataset.factionTab;
          const targetContent = document.getElementById(`faction-content-${targetId}`);

          factionTabs.forEach(t => t.classList.remove("active"));
          tab.classList.add("active");

          factionContents.forEach(content => {
            content.classList.add("hidden");
            content.classList.remove("active");
          });

          if (targetContent) {
            targetContent.classList.remove("hidden");
            targetContent.classList.add("active");
          }
        });
      });
      // (Jika ada listener lain, letakkan di sini)

    })
    .catch((err) => console.error("Failed to load components:", err));
});
