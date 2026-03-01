// Steps 4–5: Open / Close Lightbox + Keyboard & Accessibility

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
  const prevBtn       = lightbox.querySelector('.lightbox__prev');
  const nextBtn       = lightbox.querySelector('.lightbox__next');

  // Regions to hide from AT while the lightbox dialog is open
  const bgRegions = [document.querySelector('header'), document.querySelector('main')];

  let lastFocus    = null;  // element to return focus to when the lightbox closes
  let isOpen       = false; // tracks open/closed state independently of CSS
  let currentIndex = 0;     // index into images[] of the currently displayed image

  function openLightbox(index) {
    const [id, title, desc] = images[index];
    lightboxImg.src           = `https://picsum.photos/id/${id}/1600/1200`;
    lightboxImg.alt           = desc;
    lightboxTitle.textContent = title;
    lightboxDesc.textContent  = desc;
    currentIndex              = index;

    if (!isOpen) {                                         // first open only — skip during navigation
      lastFocus = document.activeElement;
      isOpen    = true;
      bgRegions.filter(Boolean).forEach((el) => el.setAttribute('aria-hidden', 'true'));
      lightbox.style.display = 'flex';
      closeBtn.focus();
    }
  }

  function closeLightbox() {
    isOpen                 = false;
    lightbox.style.display = 'none';
    lightboxImg.removeAttribute('src'); // src='' triggers a request to the current page URL
    bgRegions.filter(Boolean).forEach((el) => el.removeAttribute('aria-hidden')); // fix #1
    if (lastFocus) lastFocus.focus();   // return focus to the thumbnail that opened it
  }

  // Step 6: advance by +1 or -1 with wrap-around
  function navigate(dir) {
    openLightbox((currentIndex + dir + images.length) % images.length);
  }

  // Step 5: Escape closes; Tab is trapped within the open lightbox.
  // Focusable elements are queried live so Step 6 nav buttons are caught automatically.
  document.addEventListener('keydown', (e) => {
    if (!isOpen) return; // fix #3: state flag instead of CSS implementation detail

    if (e.key === 'Escape')     { closeLightbox(); return; }
    if (e.target.matches('input, textarea, select')) return; // let arrow keys work natively in inputs
    if (e.key === 'ArrowLeft')  { navigate(-1);    return; }
    if (e.key === 'ArrowRight') { navigate(1);     return; }

    if (e.key === 'Tab') {
      const focusable = [
        ...lightbox.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        ),
      ];
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last  = focusable[focusable.length - 1];

      // fix #4: if focus escaped the lightbox entirely, pull it back in
      if (!lightbox.contains(document.activeElement)) {
        e.preventDefault();
        (e.shiftKey ? last : first).focus();
        return;
      }

      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last.focus(); }
      } else {
        if (document.activeElement === last)  { e.preventDefault(); first.focus(); }
      }
    }
  });

  // Open when any thumbnail button is clicked
  document.querySelectorAll('.gallery__item button').forEach((btn) => {
    btn.addEventListener('click', () => openLightbox(Number(btn.dataset.index)));
  });

  // Step 6: navigate with arrow buttons
  prevBtn.addEventListener('click', () => navigate(-1));
  nextBtn.addEventListener('click', () => navigate(1));

  // Close on × button
  closeBtn.addEventListener('click', closeLightbox);

  // Close when clicking the dark backdrop (not the figure / image)
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
}());
