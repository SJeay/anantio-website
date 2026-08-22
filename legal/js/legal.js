document.documentElement.classList.add("js");

const themeButton = document.querySelector("[data-theme-toggle]");
const savedTheme = localStorage.getItem("anantio-legal-theme");
const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

if (savedTheme === "dark" || (!savedTheme && systemDark)) {
  document.documentElement.dataset.theme = "dark";
}

function updateThemeLabel() {
  if (!themeButton) return;
  const dark = document.documentElement.dataset.theme === "dark";
  themeButton.textContent = dark ? "☼" : "☾";
  themeButton.setAttribute("aria-label", dark ? "Switch to light mode" : "Switch to dark mode");
  themeButton.setAttribute("title", dark ? "Switch to light mode" : "Switch to dark mode");
}

updateThemeLabel();
themeButton?.addEventListener("click", () => {
  const dark = document.documentElement.dataset.theme === "dark";
  document.documentElement.dataset.theme = dark ? "light" : "dark";
  localStorage.setItem("anantio-legal-theme", dark ? "light" : "dark");
  updateThemeLabel();
});

const sections = [...document.querySelectorAll(".legal-section[id]")];
const links = [...document.querySelectorAll(".legal-toc a")];
const linkById = new Map(links.map((link) => [link.hash.slice(1), link]));

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        links.forEach((link) => link.classList.remove("active"));
        linkById.get(entry.target.id)?.classList.add("active");
      }
    });
  }, { rootMargin: "-18% 0px -65%", threshold: 0 });
  sections.forEach((section) => observer.observe(section));
}

links.forEach((link) => link.addEventListener("click", () => {
  const toc = link.closest("details");
  if (toc) toc.removeAttribute("open");
}));
