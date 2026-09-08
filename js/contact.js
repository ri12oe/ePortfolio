const contactTriggers = document.querySelectorAll(".contact-trigger");
const backdrop = document.getElementById("contactBackdrop");
const sheet = document.getElementById("contactSheet");
const cancelBtn = document.getElementById("contactCancelBtn");
const contactForm = document.getElementById("contactForm");
const contactHandle = document.getElementById("contactHandle");
let handleStartY = 0;
let handleDragging = false;

function openSheet(e) {
  if (e) e.preventDefault();
  backdrop.classList.add("open");
  sheet.classList.add("open");
  sheet.style.transform = "";
  document.body.style.overflow = "hidden";
}

function closeSheet() {
  backdrop.classList.remove("open");
  sheet.classList.remove("open");
  sheet.style.transform = "";
  document.body.style.overflow = "";
}

contactTriggers.forEach((trigger) => {
  trigger.addEventListener("click", openSheet);
});

backdrop.addEventListener("click", closeSheet);
cancelBtn.addEventListener("click", closeSheet);
contactHandle.addEventListener("pointerdown", (e) => {
  handleStartY = e.clientY;
  handleDragging = true;
  contactHandle.setPointerCapture(e.pointerId);
});

contactHandle.addEventListener("pointermove", (e) => {
  if (!handleDragging) return;
  const distance = Math.max(0, e.clientY - handleStartY);
  sheet.style.transform = `translate(-50%, ${distance}px)`;
});

contactHandle.addEventListener("pointerup", (e) => {
  if (!handleDragging) return;
  handleDragging = false;
  contactHandle.releasePointerCapture(e.pointerId);
  closeSheet();
});

contactHandle.addEventListener("pointercancel", (e) => {
  if (!handleDragging) return;
  handleDragging = false;
  contactHandle.releasePointerCapture(e.pointerId);
  sheet.style.transform = "";
});

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();
  // TODO: hook this up to your mail-sending endpoint (e.g. Formspree,
  // EmailJS, or your own backend) — plain HTML/JS can't send email on its own.
  console.log("submitted", {
    email: document.getElementById("email").value,
    subject: document.getElementById("subject").value,
    message: document.getElementById("message").value,
  });
  contactForm.reset();
  closeSheet();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeSheet();
});
