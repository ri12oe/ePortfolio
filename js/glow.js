const glowElements = document.querySelectorAll('.glow-hover');
glowElements.forEach((el) => {
  let rect;
  el.addEventListener('mouseenter', () => {rect = el.getBoundingClientRect();})
  el.addEventListener('mousemove', (event) => {
    const x = event.clientX - rect.left;
    const y  = event.clientY - rect.top;
    el.style.setProperty('--x', `${x}px`);
    el.style.setProperty('--y', `${y}px`);
  });
});


