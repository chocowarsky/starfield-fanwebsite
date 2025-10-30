// Fade-in effect saat elemen masuk ke viewport
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

faders.forEach((el) => {
  appearOnScroll.observe(el);
});

// Load Navbar dynamically
document.addEventListener("DOMContentLoaded", () => {
  fetch("../pages/navbar.html")
    .then(res => res.text())
    .then(data => {
      document.getElementById("navbar").innerHTML = data;

      // Efek fade navbar saat scroll (setelah navbar dimuat)
      const navbar = document.querySelector(".navbar");
    })
    .catch(err => console.error("Navbar failed to load:", err));
});

// === Infinite Scroll Planet Cards ===
const scrollTrack = document.getElementById("scroll-track");
const cards = Array.from(scrollTrack.children);

// Duplikasi isi untuk efek loop halus
cards.forEach((card) => {
  const clone = card.cloneNode(true);
  scrollTrack.appendChild(clone);
});

// Variabel animasi
let position = 0;
let speed = 1; // kecepatan scroll
let isPaused = false;

function loopScroll() {
  if (!isPaused) {
    position -= speed;

    // Hitung total lebar set pertama (sebelum clone)
    const firstSetWidth = scrollTrack.scrollWidth / 2;

    // Reset posisi kalau udah lewat set pertama
    if (Math.abs(position) >= firstSetWidth) {
      position = 0;
    }

    scrollTrack.style.transform = `translateX(${position}px)`;
  }

  requestAnimationFrame(loopScroll);
}

loopScroll();

// Pause saat di-hover
scrollTrack.addEventListener("mouseenter", () => {
  isPaused = true;
});

// Lanjut lagi saat mouse keluar
scrollTrack.addEventListener("mouseleave", () => {
  isPaused = false;
});

// FACTION SCROLL ANIMATION
const factions = document.querySelectorAll('.faction');

function revealFactions() {
  factions.forEach(faction => {
    const rect = faction.getBoundingClientRect();
    if (rect.top < window.innerHeight - 150) {
      faction.classList.add('visible');
    }
  });
}

window.addEventListener('scroll', revealFactions);
revealFactions();
