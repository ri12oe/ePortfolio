const viewer = document.createElement('dialog');
viewer.className = 'image-viewer';
viewer.setAttribute('aria-label', 'Full size image');
viewer.innerHTML = `
  <button type="button" class="image-viewer__close" aria-label="Close full size image">&times;</button>
  <img class="image-viewer__img" alt="" />
  <p class="image-viewer__caption"></p>
`;
document.body.appendChild(viewer);

const viewerImg = viewer.querySelector('.image-viewer__img');
const viewerCaption = viewer.querySelector('.image-viewer__caption');
let lastTrigger = null;

// delegated so images rendered later (e.g. the blog feed) work too
document.addEventListener('click', (event) => {
  const trigger = event.target.closest('.expand-btn');
  const media = trigger && trigger.closest('.card-media, .post-media');
  const img = media && media.querySelector('.card-img');
  if (!img) return;
  lastTrigger = trigger;
  viewerImg.src = img.currentSrc || img.src;
  viewerImg.alt = img.alt;
  viewerCaption.textContent = img.alt;
  viewer.showModal();
});
viewer.querySelector('.image-viewer__close').addEventListener('click', () => viewer.close());

// clicking the dark backdrop (the dialog itself) closes the viewer
viewer.addEventListener('click', (event) => {
  if (event.target === viewer) viewer.close();
});

viewer.addEventListener('close', () => {
  viewerImg.removeAttribute('src');
  if (lastTrigger && lastTrigger.isConnected) lastTrigger.focus();
});
