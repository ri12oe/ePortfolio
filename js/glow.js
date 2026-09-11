const glowElements = document.querySelectorAll('.glow-hover');

// skip pointer tracking entirely on touch-only devices where hover has no meaning
if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
  glowElements.forEach((el) => {
    let rect;
    let frame = null;
    let pendingX = 0;
    let pendingY = 0;

    const applyPosition = () => {
      frame = null;
      el.style.setProperty('--x', `${pendingX}px`);
      el.style.setProperty('--y', `${pendingY}px`);
    };

    el.addEventListener('mouseenter', (event) => {
      rect = el.getBoundingClientRect();
      // set position immediately so the glow doesn't flash from the last cached spot
      pendingX = event.clientX - rect.left;
      pendingY = event.clientY - rect.top;
      applyPosition();
    });

    el.addEventListener('mousemove', (event) => {
      pendingX = event.clientX - rect.left;
      pendingY = event.clientY - rect.top;
      if (frame === null) {
        frame = requestAnimationFrame(applyPosition);
      }
    });

    el.addEventListener('mouseleave', () => {
      if (frame !== null) {
        cancelAnimationFrame(frame);
        frame = null;
      }
    });
  });
}


