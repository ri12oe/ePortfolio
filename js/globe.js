import createGlobe from "https://esm.sh/cobe@0.6.3";

const canvas = document.getElementById("globe");

if (canvas) {
  const MARKER = [39.7684, -86.1581]; // Indianapolis, IN

  let phi = 0;
  let theta = 0.3;
  let width = 0;
  let pointerDown = false;
  let pointerStartX = 0;
  let pointerStartPhi = 0;

  const isDark = () => document.documentElement.classList.contains("dark-mode");

  const getColors = () =>
    isDark()
      ? {
          dark: 1,
          baseColor: [1, 1, 1],       // white dots on the black sphere
          markerColor: [0.48, 0.25, 1], // site purple
          glowColor: [0.15, 0.15, 0.18],
        }
      : {
          dark: 1,
          baseColor: [1, 1, 1],
          markerColor: [0.48, 0.25, 1],
          glowColor: [0.35, 0.35, 0.38],
        };

  let globe;

  function buildGlobe() {
    const colors = getColors();
    width = canvas.offsetWidth;

    if (globe) globe.destroy();

    globe = createGlobe(canvas, {
      devicePixelRatio: 2,
      width: width * 2,
      height: width * 2,
      phi,
      theta,
      dark: colors.dark,
      diffuse: 1.1,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: colors.baseColor,
      markerColor: colors.markerColor,
      glowColor: colors.glowColor,
      markers: [{ location: MARKER, size: 0.09 }],
      onRender: (state) => {
        if (!pointerDown) {
          phi += 0.0025; // gentle auto-rotate
        }
        state.phi = phi;
        state.theta = theta;
        state.width = width * 2;
        state.height = width * 2;
      },
    });
  }

  buildGlobe();

  // Drag to rotate
  canvas.style.cursor = "grab";

  canvas.addEventListener("pointerdown", (e) => {
    pointerDown = true;
    pointerStartX = e.clientX;
    pointerStartPhi = phi;
    canvas.style.cursor = "grabbing";
  });

  window.addEventListener("pointerup", () => {
    pointerDown = false;
    canvas.style.cursor = "grab";
  });

  window.addEventListener("pointermove", (e) => {
    if (!pointerDown) return;
    const delta = e.clientX - pointerStartX;
    phi = pointerStartPhi + delta / 100;
  });

  // Rebuild with new colors whenever dark/light mode toggles
  const themeToggle = document.getElementById("theme-toggle");
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      setTimeout(buildGlobe, 0);
    });
  }

  // Keep it responsive on resize
  window.addEventListener("resize", () => {
    buildGlobe();
  });
}