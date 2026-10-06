const fieldNotes = document.getElementById('fieldNotes');

if (fieldNotes) {
  // tabs
  const tabs = [...fieldNotes.querySelectorAll('.field-notes__tab')];

  function selectTab(tab) {
    tabs.forEach(t => {
      const isActive = t === tab;
      t.classList.toggle('is-active', isActive);
      t.setAttribute('aria-selected', isActive);
      t.tabIndex = isActive ? 0 : -1;
      document.getElementById(t.getAttribute('aria-controls')).hidden = !isActive;
    });
  }

  tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => selectTab(tab));
    // arrow keys move between tabs
    tab.addEventListener('keydown', e => {
      const step = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
      if (!step) return;
      const next = tabs[(i + step + tabs.length) % tabs.length];
      selectTab(next);
      next.focus();
    });
  });

  // career path timeline
  const stops = fieldNotes.querySelectorAll('.field-notes__stop');
  const detail = fieldNotes.querySelector('.field-notes__detail');

  stops.forEach(stop => {
    stop.addEventListener('click', () => {
      stops.forEach(s => s.classList.toggle('is-active', s === stop));
      detail.textContent = stop.dataset.note;
    });
  });

  // fundamentals checklist
  const boxes = fieldNotes.querySelectorAll('.field-notes__checklist input');
  const count = document.getElementById('fnCount');
  const bar = document.getElementById('fnBar');

  boxes.forEach(box => {
    box.addEventListener('change', () => {
      const checked = [...boxes].filter(b => b.checked).length;
      count.textContent = checked;
      bar.style.width = `${(checked / boxes.length) * 100}%`;
    });
  });
}
