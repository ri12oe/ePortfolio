document.addEventListener("DOMContentLoaded", () => {
  const section = document.getElementById("personalStatement");
  if (!section) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          section.classList.remove("is-covering");
          section.classList.add("is-rolling");
        } else {
          section.classList.remove("is-rolling", "is-revealed");
          section.classList.add("is-covering");
        }
      });
    },
    { threshold: 0.35 }
  );

  observer.observe(section);

  section.addEventListener("animationend", (e) => {
    if (e.animationName === "ballAcross" || e.animationName === "wipeReveal") {
      section.classList.remove("is-rolling");
      section.classList.add("is-revealed");
    } else if (e.animationName === "ballBack" || e.animationName === "wipeCover") {
      section.classList.remove("is-covering");
    }
  });
});