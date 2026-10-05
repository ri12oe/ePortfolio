const expandables = document.querySelectorAll('.expandable');

expandables.forEach((el, index) => {
  const body = el.querySelector('.expandable__body');
  const toggle = el.querySelector('.expandable__toggle');
  const collapsedHeight = body.clientHeight;

  body.id = body.id || `expandable-${index}`;
  toggle.setAttribute('aria-controls', body.id);

  // short content fits without clipping, so it doesn't need a button
  if (body.scrollHeight <= collapsedHeight + 1) {
    el.classList.add('is-open', 'is-short');
    return;
  }

  toggle.addEventListener('click', () => {
    const isOpen = el.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', isOpen);
    toggle.textContent = isOpen ? 'Show less' : 'Read more';

    if (isOpen) {
      body.style.maxHeight = `${body.scrollHeight}px`;
    } else {
      // start from the real height so the collapse animates instead of jumping
      body.style.maxHeight = `${body.scrollHeight}px`;
      body.offsetHeight;
      body.style.maxHeight = '';
      if (el.getBoundingClientRect().top < 0) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  });

  // once fully open, drop the fixed height so text can reflow on resize
  body.addEventListener('transitionend', () => {
    if (el.classList.contains('is-open')) body.style.maxHeight = 'none';
  });
});
