document.addEventListener("DOMContentLoaded", () => {
  const section = document.getElementById("logoReveal");
  if (!section) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        section.classList.toggle("is-active", entry.isIntersecting);
      });
    },
    { threshold: 0.5 }
  );

  observer.observe(section);
});