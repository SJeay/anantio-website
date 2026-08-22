document.documentElement.classList.add("js");

const cards = document.querySelectorAll(".card");
const serviceCards = document.querySelectorAll(".services .service");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

if (!reduceMotion && "IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  cards.forEach((card) => observer.observe(card));
  serviceCards.forEach((service) => observer.observe(service));
}

if (canHover && !reduceMotion) {
  cards.forEach((card) => {
    card.addEventListener("pointermove", (event) => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${((event.clientX - rect.left) / rect.width) * 100}%`);
      card.style.setProperty("--my", `${((event.clientY - rect.top) / rect.height) * 100}%`);
    });
  });

  document.querySelectorAll(".primary-button").forEach((button) => {
    button.addEventListener("pointermove", (event) => {
      const rect = button.getBoundingClientRect();
      button.style.setProperty("--button-x", `${event.clientX - rect.left}px`);
      button.style.setProperty("--button-y", `${event.clientY - rect.top}px`);
    });
  });
}

