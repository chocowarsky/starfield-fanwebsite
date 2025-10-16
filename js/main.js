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
      window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
          navbar.style.backgroundColor = "rgba(15, 15, 20, 0.95)";
        } else {
          navbar.style.backgroundColor = "rgba(15, 15, 20, 0.7)";
        }
      });
    })
    .catch(err => console.error("Navbar failed to load:", err));
});


window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// infinite cardto

document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector(".scroll-track");
  let scrollSpeed = 1; // pixel per frame
  let position = 0;

  function animateScroll() {
    position -= scrollSpeed;
    track.style.transform = `translateX(${position}px)`;

    const firstCard = track.firstElementChild;
    const trackWidth = track.scrollWidth;
    const firstCardWidth = firstCard.offsetWidth + 24; // include gap

    // kalau card pertama sudah lewat dari layar kiri, pindahkan ke belakang
    if (Math.abs(position) >= firstCardWidth) {
      track.appendChild(firstCard);
      position += firstCardWidth; // reset posisi biar halus
    }

    requestAnimationFrame(animateScroll);
  }

  animateScroll();
});

// let paused = false;

// track.addEventListener("mouseenter", () => (paused = true));
// track.addEventListener("mouseleave", () => (paused = false));

// function animateScroll() {
//   if (!paused) position -= scrollSpeed;
//   track.style.transform = `translateX(${position}px)`;
// }
