// Step 4: Open / Close Lightbox

(function () {
  // Picsum IDs and captions in gallery order (indices 0–8)
  const images = [
    [10, 'Pine forest overlooking a mountain lake'],
    [20, "Designer's desk flat lay with laptop and sketchbook"],
    [30, 'Close-up of a vintage Cuban postage stamp mug'],
    [40, "Macro shot of a cat's nose and whiskers"],
    [50, 'Cormorant spreading wings on a sailboat mooring'],
    [60, 'Top-down flat lay of tech devices and accessories'],
    [70, 'Misty tree-lined road disappearing into fog'],
    [80, 'Pine cones in black and white macro'],
    [90, 'Colourful glass bottles on a wooden fence'],
  ];

  const lightbox    = document.getElementById('lightbox');
  const lightboxImg = lightbox.querySelector('.lightbox__img');
  const lightboxCap = lightbox.querySelector('.lightbox__caption');
  const closeBtn    = lightbox.querySelector('.lightbox__close');

  function openLightbox(index) {
    const [id, caption] = images[index];
    lightboxImg.src         = `https://picsum.photos/id/${id}/1600/1200`;
    lightboxImg.alt         = caption;
    lightboxCap.textContent = caption;
    lightbox.style.display  = 'flex';
  }

  function closeLightbox() {
    lightbox.style.display = 'none';
    lightboxImg.src        = '';
  }

  // Open when any thumbnail button is clicked
  document.querySelectorAll('.gallery button').forEach((btn) => {
    btn.addEventListener('click', () => openLightbox(Number(btn.dataset.index)));
  });

  // Close on × button
  closeBtn.addEventListener('click', closeLightbox);

  // Close when clicking the dark backdrop (not the figure / image)
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
}());
