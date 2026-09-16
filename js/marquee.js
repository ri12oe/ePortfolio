document.addEventListener("DOMContentLoaded", () => {
  const PHRASE = "Full Stack Developer • ";
  const REPEATS = 10;

  const track1 = document.getElementById("marqueeTrack1");
  const track2 = document.getElementById("marqueeTrack2");
  if (!track1 || !track2) return; // only run on pages that have the markup

  function fillTrack(el) {
    let html = "";
    for (let i = 0; i < REPEATS; i++) html += `<span>${PHRASE}</span>`;
    el.innerHTML = html + html;
  }
  fillTrack(track1);
  fillTrack(track2);

  const rows = [
    { el: track1, x: 0, baseSpeed: 0.6, dir: -1 },
    { el: track2, x: -track2.scrollWidth / 4, baseSpeed: 0.6, dir: 1 },
  ];

  let lastScrollY = window.scrollY;
  let scrollBoost = 0;

  window.addEventListener("scroll", () => {
    const currentY = window.scrollY;
    scrollBoost = Math.min(scrollBoost + Math.abs(currentY - lastScrollY) * 0.15, 40);
    lastScrollY = currentY;
  }, { passive: true });

  function tick() {
    scrollBoost *= 0.92;
    rows.forEach(row => {
      const speed = row.baseSpeed + scrollBoost;
      row.x += row.dir * speed;
      const halfWidth = row.el.scrollWidth / 2;
      if (row.x <= -halfWidth) row.x += halfWidth;
      if (row.x >= 0) row.x -= halfWidth;
      row.el.style.transform = `translateX(${row.x}px)`;
    });
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
});