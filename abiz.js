const progressBar = document.querySelector('.progress-value');

requestAnimationFrame(() => {
  if (progressBar) progressBar.style.width = '76%';
});

const revealItems = document.querySelectorAll('.feature-card, .abiz-cta');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!reducedMotion && 'IntersectionObserver' in window) {
  revealItems.forEach((item) => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(14px)';
    item.style.transition = 'opacity .65s ease, transform .65s ease';
  });
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'none';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach((item) => observer.observe(item));
}
