/* ── CURSOR (mouse-only) ── */
const cursor = document.getElementById("cursor");
const ring = document.getElementById("cursorRing");
if (window.matchMedia("(pointer: fine)").matches) {
  let rx = 0,
    ry = 0,
    mx = 0,
    my = 0;
  document.addEventListener("mousemove", (e) => {
    mx = e.clientX;
    my = e.clientY;
    cursor.style.left = mx + "px";
    cursor.style.top = my + "px";
  });
  (function animRing() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.left = rx + "px";
    ring.style.top = ry + "px";
    requestAnimationFrame(animRing);
  })();
}

/* ── THEME TOGGLE ── */
const html = document.documentElement;
const themeBtn = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");
const saved = localStorage.getItem("theme") || "light";
html.setAttribute("data-theme", saved);
themeIcon.innerHTML =
  saved === "dark"
    ? `<i class="fa-solid fa-moon"></i>`
    : `<i class="fa-solid fa-sun"></i>`;

themeBtn.addEventListener("click", () => {
  const next = html.getAttribute("data-theme") === "light" ? "dark" : "light";
  html.setAttribute("data-theme", next);
  themeIcon.innerHTML =
    next === "dark"
      ? `<i class="fa-solid fa-moon"></i>`
      : `<i class="fa-solid fa-sun"></i>`;
  localStorage.setItem("theme", next);
});

/* ── NAV SCROLL ── */
const nav = document.getElementById("nav");
window.addEventListener("scroll", () =>
  nav.classList.toggle("solid", scrollY > 60),
);

/* ── HAMBURGER ── */
document
  .getElementById("hamburger")
  .addEventListener("click", () =>
    document.getElementById("navLinks").classList.toggle("open"),
  );
document
  .querySelectorAll("#navLinks a")
  .forEach((a) =>
    a.addEventListener("click", () =>
      document.getElementById("navLinks").classList.remove("open"),
    ),
  );

/* ── REVEAL ── */
const obs = new IntersectionObserver(
  (entries) =>
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("in");
        obs.unobserve(e.target);
      }
    }),
  { threshold: 0.12 },
);
document.querySelectorAll(".reveal").forEach((el) => obs.observe(el));

/* ── ACCORDION ── */
function toggleProj(header) {
  const item = header.parentElement;
  const wasOpen = item.classList.contains("open");
  document
    .querySelectorAll(".proj-item.open")
    .forEach((i) => i.classList.remove("open"));
  if (!wasOpen) item.classList.add("open");
}
