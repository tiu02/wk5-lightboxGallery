// Step 4: Open / Close Lightbox

(function () {
  // Picsum IDs, short thumbnail title, and full lightbox description
  const images = [
    [10, 'Pine Forest Lake',      'Pine forest overlooking a mountain lake'],
    [20, "Designer's Desk",       "Designer's desk flat lay with laptop and sketchbook"],
    [30, 'Cuban Stamp Mug',       'Close-up of a vintage Cuban postage stamp mug'],
    [40, 'Cat Nose Macro',        "Macro shot of a cat's nose and whiskers"],
    [50, 'Cormorant at Mooring',  'Cormorant spreading wings on a sailboat mooring'],
    [60, 'Tech Devices Flat Lay', 'Top-down flat lay of tech devices and accessories'],
    [70, 'Misty Tree Road',       'Misty tree-lined road disappearing into fog'],
    [80, 'Pine Cones B&W',        'Pine cones in black and white macro'],
    [90, 'Glass Bottles Fence',   'Colourful glass bottles on a wooden fence'],
  ];

  const lightbox      = document.getElementById('lightbox');
  const lightboxImg   = lightbox.querySelector('.lightbox__img');
  const lightboxTitle = lightbox.querySelector('.lightbox__title');
  const lightboxDesc  = lightbox.querySelector('.lightbox__desc');
  const closeBtn      = lightbox.querySelector('.lightbox__close');

  function openLightbox(index) {
    const [id, title, desc] = images[index];
    lightboxImg.src           = `https://picsum.photos/id/${id}/1600/1200`;
    lightboxImg.alt           = desc;
    lightboxTitle.textContent = title;
    lightboxDesc.textContent  = desc;
    lightbox.style.display    = 'flex';
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
