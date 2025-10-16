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

const scrollTrack = document.getElementById('scroll-track');
const cards = Array.from(scrollTrack.children);

// Gandakan isi track untuk loop seamless
cards.forEach(card => {
  const clone = card.cloneNode(true);
  scrollTrack.appendChild(clone);
});

let position = 0;
let speed = 0.5; // ubah untuk kontrol kecepatan
let isPaused = false;

function animateScroll() {
  if (!isPaused) {
    position -= speed;
    if (Math.abs(position) >= scrollTrack.scrollWidth / 2) {
      position = 0;
    }
    scrollTrack.style.transform = `translateX(${position}px)`;
  }
  requestAnimationFrame(animateScroll);
}

animateScroll();

// Pause ketika di-hover
scrollTrack.addEventListener('mouseenter', () => {
  isPaused = true;
});

// Lanjut lagi saat mouse keluar
scrollTrack.addEventListener('mouseleave', () => {
  isPaused = false;
});
