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
