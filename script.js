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
      lightbox.classList.add('lightbox--open'); // triggers CSS fade-in + scale-in
      closeBtn.focus();
    }
  }

  function closeLightbox() {
    isOpen = false;
    lightbox.classList.remove('lightbox--open'); // triggers CSS fade-out
    bgRegions.filter(Boolean).forEach((el) => el.removeAttribute('aria-hidden'));
    if (lastFocus) lastFocus.focus(); // return focus immediately — don't wait for animation
    // Remove src after the overlay fades out. Filtered to the opacity transition on the
    // lightbox element itself — ignores visibility, and ignores bubbled events from child
    // elements (e.g. .lightbox__figure's transform). The !isOpen guard means a quick
    // reopen before the fade completes won't blank the freshly loaded image.
    lightbox.addEventListener('transitionend', function srcCleanup(e) {
      if (e.target !== lightbox || e.propertyName !== 'opacity') return;
      lightbox.removeEventListener('transitionend', srcCleanup);
      if (!isOpen) lightboxImg.removeAttribute('src');
    });
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

  // Step 7: swipe left → next image; swipe right → previous image
  let swipeStartX = null; // null = no gesture tracked (0 is a valid coordinate — fix #2)
  let swipeStartY = null;

  function resetSwipe() { swipeStartX = null; swipeStartY = null; }

  lightbox.addEventListener('touchstart', (e) => {
    if (!isOpen) return;
    if (e.touches.length > 1) { resetSwipe(); return; } // fix #1: second finger joined — cancel tracking
    swipeStartX = e.touches[0].clientX;
    swipeStartY = e.touches[0].clientY;
  }, { passive: true }); // passive: we never call preventDefault — keeps scroll smooth

  lightbox.addEventListener('touchend', (e) => {
    if (!isOpen || swipeStartX === null || e.touches.length !== 0) return; // fix #1: bail if fingers still down
    const dx = e.changedTouches[0].clientX - swipeStartX;
    const dy = e.changedTouches[0].clientY - swipeStartY;
    resetSwipe();
    if (Math.abs(dx) < 50 || Math.abs(dx) < Math.abs(dy)) return; // too short or too vertical
    navigate(dx < 0 ? 1 : -1); // left swipe → next, right swipe → previous
  }, { passive: true });

  lightbox.addEventListener('touchcancel', resetSwipe); // fix #3: OS interrupts gesture (notification, etc.)
}());
