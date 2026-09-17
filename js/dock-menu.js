document.addEventListener("DOMContentLoaded", () => {
  const dockMenu = document.getElementById("dockMenu");
  const dockToggle = document.getElementById("dockToggle");
  if (!dockMenu || !dockToggle) return;

  let state = "idle"; // idle -> opening -> open -> closing -> idle

  dockToggle.addEventListener("click", () => {
    if (state === "idle") {
      state = "opening";
      dockMenu.classList.remove("is-open", "is-closing");
      dockMenu.classList.add("is-opening");
    } else if (state === "open") {
      state = "closing";
      dockMenu.classList.remove("is-open");
      dockMenu.classList.add("is-closing");
    }
  });

  dockMenu.addEventListener("animationend", (e) => {
    if (e.animationName === "dockOpen") {
      dockMenu.classList.remove("is-opening");
      dockMenu.classList.add("is-open");
      state = "open";
    } else if (e.animationName === "dockClose") {
      dockMenu.classList.remove("is-closing");
      state = "idle";
    }
  });
});