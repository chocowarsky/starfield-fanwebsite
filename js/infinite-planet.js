// ==========================================
// 🌌 Infinite Feed (Planet Section)
// ==========================================

const scrollTrack = document.getElementById("scroll-track");

if (scrollTrack) {
  let position = 0;
  const speed = 0.6;
  let isPaused = false;

  let cards = Array.from(scrollTrack.children);

  // Clone items for smooth looping
  for (let i = 0; i < 3; i++) {
    cards.forEach((card) => {
      const clone = card.cloneNode(true);
      scrollTrack.appendChild(clone);
    });
  }

  // Update array after cloning
  cards = Array.from(scrollTrack.children);

  // Calculate card width + gap once
  let totalCardWidth = 0;
  if (cards.length > 1) {
    const firstCardRect = cards[0].getBoundingClientRect();
    const secondCardRect = cards[1].getBoundingClientRect();
    totalCardWidth = secondCardRect.left - firstCardRect.left;
  } else if (cards.length === 1) {
    totalCardWidth = cards[0].offsetWidth;
  }

  function updateScroll() {
    if (!isPaused && totalCardWidth > 0) {
      position -= speed;

      // Check loop condition
      if (Math.abs(position) >= totalCardWidth) {
        const firstCard = cards.shift();
        scrollTrack.appendChild(firstCard);
        cards.push(firstCard);
        position += totalCardWidth;
      }

      scrollTrack.style.transform = `translate3d(${position}px, 0, 0)`;
    }

    requestAnimationFrame(updateScroll);
  }

  if (totalCardWidth > 0) {
    updateScroll();
  }

  // Pause on hover
  scrollTrack.addEventListener("mouseenter", () => (isPaused = true));
  scrollTrack.addEventListener("mouseleave", () => (isPaused = false));
}
