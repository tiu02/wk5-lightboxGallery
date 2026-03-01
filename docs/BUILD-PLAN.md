# Responsive Image Gallery — Build Plan

## Overview
Build a responsive image gallery with a modal/lightbox viewer that works on both desktop and mobile.

---

## Step 1: Project Scaffold & Static Layout
Create `index.html` with a basic HTML skeleton, link a `style.css` and `script.js`. Add a hardcoded grid of 6–9 thumbnail `<img>` tags with placeholder images.

**Test:** Open `index.html` in a browser — images display in a row.

---

## Step 2: CSS Grid Gallery Layout
Style the gallery with CSS Grid so thumbnails display in multiple columns on desktop and collapse to fewer columns on mobile using `auto-fill` / `minmax`. Add hover effect on thumbnails.

**Test:** Resize the browser window — columns reflow correctly. Hover shows a visual cue.

---

## Step 3: Lightbox HTML & Base CSS
Add lightbox markup to `index.html` (overlay `div`, full-size `<img>`, close `×` button). Style it as a fixed full-screen dark overlay, hidden by default (`display: none`).

**Test:** Temporarily force `display: flex` in CSS — lightbox overlay and image appear centered over the page.

---

## Step 4: Open / Close Lightbox with JavaScript
Write JS to open the lightbox when a thumbnail is clicked (swap `src`, show overlay) and close it when the `×` button or overlay background is clicked.

**Test:** Click a thumbnail — lightbox opens with that image. Click `×` or outside the image — it closes.

---

## Step 5: Keyboard & Accessibility Support
Add keyboard support: `Escape` closes the lightbox. Add `aria-label`, `role="dialog"`, and `aria-modal` attributes. Trap focus inside the open lightbox.

**Test:** Open lightbox, press `Escape` — it closes. Tab key cycles only within the lightbox controls.

---

## Step 6: Previous / Next Navigation
Add left/right arrow buttons inside the lightbox. JS tracks the current image index and updates the `src` on arrow click. Wrap around at ends.

**Test:** Open any image, click arrows — cycles through all gallery images in order, wraps from last back to first.

---

## Step 7: Touch / Swipe Support for Mobile
Detect `touchstart` / `touchend` events in JS. A left swipe advances to next image; right swipe goes to previous.

**Test:** Open on a mobile device or DevTools mobile emulator — swiping left/right navigates images.

---

## Step 8: Polish & Final Commit
Add CSS transitions (fade-in for overlay, scale-in for image). Verify layout on common breakpoints (375 px, 768 px, 1280 px). Clean up code and push.

**Test:** Full walkthrough on desktop and mobile — smooth animations, no layout breaks, all interactions work.
