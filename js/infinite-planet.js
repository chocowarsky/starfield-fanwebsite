// ==========================================
// 🌌 Infinite Feed (Planet Section) — Starfield
// ==========================================

const scrollTrack = document.getElementById("scroll-track");

if (scrollTrack) {
  let position = 0;
  const speed = 0.6;
  let isPaused = false;

  let cards = Array.from(scrollTrack.children);

  // Gandakan lebih banyak biar looping halus
  for (let i = 0; i < 3; i++) {
    cards.forEach((card) => {
      const clone = card.cloneNode(true);
      scrollTrack.appendChild(clone);
    });
  }

  // Update array lagi setelah cloning
  cards = Array.from(scrollTrack.children);

  // --- 💡 INI PERBAIKANNYA 💡 ---
  // Hitung lebar total (kartu + gap) HANYA SEKALI di luar loop
  let totalCardWidth = 0;
  if (cards.length > 1) {
    // Ambil posisi kartu 1 dan 2
    const firstCardRect = cards[0].getBoundingClientRect();
    const secondCardRect = cards[1].getBoundingClientRect();

    // Lebar total = jarak antara awal kartu 1 dan awal kartu 2
    // Ini secara otomatis sudah (lebar kartu + gap)
    totalCardWidth = secondCardRect.left - firstCardRect.left;

  } else if (cards.length === 1) {
    // Fallback jika hanya ada 1 kartu (meski tidak akan loop)
    totalCardWidth = cards[0].offsetWidth;
  }
  // ------------------------------

  function updateScroll() {
    if (!isPaused && totalCardWidth > 0) { // Pastikan perhitungan berhasil
      position -= speed;

      // --- 💡 GUNAKAN LEBAR YANG SUDAH DIHITUNG 💡 ---
      // Cek apakah scroll sudah bergeser sejauh satu kartu penuh
      if (Math.abs(position) >= totalCardWidth) {

        // Ambil kartu pertama dari array
        const firstCard = cards.shift();
        // Pindahkan elemen DOM-nya ke paling akhir
        scrollTrack.appendChild(firstCard);
        // Masukkan kembali kartu itu ke akhir array
        cards.push(firstCard);

        // Reset posisi, tambahkan kembali lebar kartu yg sudah lewat
        position += totalCardWidth;
      }

      scrollTrack.style.transform = `translate3d(${position}px, 0, 0)`;
    }

    requestAnimationFrame(updateScroll);
  }

  // Hanya jalankan jika kalkulasi berhasil
  if (totalCardWidth > 0) {
    updateScroll();
  } else {
    console.error("Scroll loop error: Tidak bisa menghitung lebar kartu.");
  }

  scrollTrack.addEventListener("mouseenter", () => (isPaused = true));
  scrollTrack.addEventListener("mouseleave", () => (isPaused = false));
}
