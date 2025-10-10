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

// Efek fade navbar saat scroll
const navbar = document.querySelector(".navbar");
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.style.backgroundColor = "rgba(15, 15, 20, 0.95)";
  } else {
    navbar.style.backgroundColor = "rgba(15, 15, 20, 0.7)";
  }
});
