document.documentElement.classList.add('js');

const sections = [...document.querySelectorAll('#wingstory [data-chapter]')];
const railLinks = [...document.querySelectorAll('.chapter-rail a[data-section]')];
const progressLabel = document.querySelector('.read-progress span');
const progressBar = document.querySelector('.read-progress i');

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', () => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) target.setAttribute('tabindex', '-1');
  });
});

const updateReadingState = () => {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollable > 0 ? Math.min(100, Math.max(0, window.scrollY / scrollable * 100)) : 0;
  if (progressLabel) progressLabel.textContent = `${Math.round(progress)}%`;
  if (progressBar) progressBar.style.height = `${progress * .24}px`;
  let active = sections[0]?.id;
  sections.forEach((section) => {
    if (section.getBoundingClientRect().top <= window.innerHeight * .38) active = section.id;
  });
  railLinks.forEach((link) => link.classList.toggle('is-active', link.dataset.section === active));
};

let ticking = false;
window.addEventListener('scroll', () => {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => {
    updateReadingState();
    ticking = false;
  });
}, { passive: true });

updateReadingState();
