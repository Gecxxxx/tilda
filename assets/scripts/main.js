document.documentElement.classList.add('js');

document.querySelectorAll('#wingstory img[loading="lazy"]').forEach((image) => {
  const markLoaded = () => image.classList.add('is-loaded');

  if (image.complete) {
    markLoaded();
  } else {
    image.addEventListener('load', markLoaded, { once: true });
  }
});
