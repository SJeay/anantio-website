document.documentElement.classList.add("js");

const setupMobileNavigation = () => {
  const toggle = document.querySelector(".abiz-menu-toggle");
  const navLinks = document.querySelector(".abiz-nav-links");

  if (!toggle || !navLinks) return;

  toggle.addEventListener("click", () => {
    const isExpanded = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!isExpanded));
    navLinks.classList.toggle("open");
  });
};

const setupProgressAnimation = () => {
  const progressBar = document.querySelector(".progress-value");
  if (!progressBar) return;

  requestAnimationFrame(() => {
    progressBar.style.width = "76%";
  });
};

const setupRevealAnimations = () => {
  const revealItems = document.querySelectorAll(
    ".feature-card, .workflow-step, .stat-card, .pricing-card, .abiz-dashboard-card"
  );

  if (!revealItems.length) return;

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reducedMotion || !("IntersectionObserver" in window)) {
    revealItems.forEach((item) => {
      item.style.opacity = "1";
      item.style.transform = "none";
    });
    return;
  }

  revealItems.forEach((item) => {
    item.style.opacity = "0";
    item.style.transform = "translateY(14px)";
    item.style.transition = "opacity .65s ease, transform .65s ease";
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "none";
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealItems.forEach((item) => observer.observe(item));
};

const setupFooterYear = () => {
  const year = new Date().getFullYear();
  const footerCopy = document.querySelector(".footer-copy p:first-child");
  if (!footerCopy) return;

  footerCopy.textContent = `© ${year} Anantio Private Limited. All Rights Reserved.`;
};

setupMobileNavigation();
setupProgressAnimation();
setupRevealAnimations();
setupFooterYear();
