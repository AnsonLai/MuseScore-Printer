/**
 * MuseScore Printer
 *
 * Replaces the current MuseScore page with a print-friendly document that
 * contains only the score pages, sized for clean A4 printing.
 *
 * Why this works:
 * - MuseScore lazy-loads and virtualizes score pages inside the internal
 *   scroller, so not all page images exist in the DOM at the same time.
 * - Instead of waiting for every page image to be present at once, this script
 *   scrolls through the viewer, captures each page image URL as it appears,
 *   then rebuilds the page using only those captured images.
 */
(async function () {
  const SCORE_SCROLLER_SELECTOR = "#jmuse-scroller-component";
  const PRINT_PAGE_WIDTH_MM = 210;
  const PRINT_PAGE_HEIGHT_MM = 296; // slightly under A4 height to avoid overflow

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  function getScoreScroller() {
    const scroller = document.querySelector(SCORE_SCROLLER_SELECTOR);

    if (!scroller) {
      throw new Error("Could not find the MuseScore score scroller.");
    }

    return scroller;
  }

  function getScorePageWrappers(scroller) {
    // Score pages are direct DIV children with inline width/height.
    // This excludes the paywall / upsell section that follows the score.
    return [...scroller.children].filter((element) => {
      if (element.tagName !== "DIV") return false;

      const width = parseFloat(element.style.width || "0");
      const height = parseFloat(element.style.height || "0");

      return width > 0 && height > 0;
    });
  }

  function triggerScrollEvents(scroller) {
    // MuseScore relies on scroll activity inside the score viewer
    // to mount and unmount page images.
    scroller.dispatchEvent(new Event("scroll", { bubbles: true }));
    window.dispatchEvent(new Event("scroll"));
  }

  async function scrollScoreViewer(scroller, top) {
    scroller.scrollTop = top;
    scroller.scrollTo(0, top);
    triggerScrollEvents(scroller);
    await sleep(250);
  }

  async function capturePageImageUrls(scroller, pageWrappers, maxPasses = 6) {
    // MuseScore virtualizes the score viewer, so page images come and go as the
    // user scrolls. We store each page URL as soon as it appears.
    const pageImageUrls = new Array(pageWrappers.length).fill(null);
    const viewportHeight = scroller.clientHeight || 800;

    for (let pass = 0; pass < maxPasses; pass += 1) {
      // Visit each page directly
      for (let pageIndex = 0; pageIndex < pageWrappers.length; pageIndex += 1) {
        const page = pageWrappers[pageIndex];
        const targetTop = Math.max(
          0,
          page.offsetTop - Math.floor(viewportHeight * 0.2)
        );

        await scrollScoreViewer(scroller, targetTop);
        await scrollScoreViewer(scroller, targetTop + 1);
        await sleep(400);

        const image = page.querySelector("img");
        const imageUrl = image?.src || null;

        if (imageUrl && !pageImageUrls[pageIndex]) {
          pageImageUrls[pageIndex] = imageUrl;
        }
      }

      // Sweep through the viewer in case some images only load during
      // more continuous scrolling.
      const lastPage = pageWrappers[pageWrappers.length - 1];
      const maxScrollTop = Math.max(
        0,
        lastPage.offsetTop + lastPage.offsetHeight - viewportHeight
      );
      const stepSize = Math.max(150, Math.floor(viewportHeight * 0.6));

      for (let top = 0; top <= maxScrollTop; top += stepSize) {
        await scrollScoreViewer(scroller, top);

        for (let pageIndex = 0; pageIndex < pageWrappers.length; pageIndex += 1) {
          if (pageImageUrls[pageIndex]) continue;

          const image = pageWrappers[pageIndex].querySelector("img");
          const imageUrl = image?.src || null;

          if (imageUrl) {
            pageImageUrls[pageIndex] = imageUrl;
          }
        }
      }

      if (pageImageUrls.every(Boolean)) {
        return pageImageUrls;
      }
    }

    return pageImageUrls;
  }

  async function preloadImages(imageUrls, timeoutMs = 20000) {
    // Preload image URLs before replacing the document so printing is more reliable.
    const preloadImage = (url) =>
      new Promise((resolve) => {
        const image = new Image();
        let settled = false;

        const finish = (success) => {
          if (settled) return;
          settled = true;
          resolve({ url, success });
        };

        image.onload = () => finish(true);
        image.onerror = () => finish(false);
        image.src = url;

        setTimeout(() => finish(false), timeoutMs);
      });

    return Promise.all(imageUrls.map(preloadImage));
  }

  function renderPrintDocument(imageUrls) {
    // Replace the current page with a minimal print-only document
    // that contains one score page per printed page.
    document.head.innerHTML = "";
    document.body.innerHTML = "";

    const style = document.createElement("style");
    style.textContent = `
      html, body {
        margin: 0;
        padding: 0;
        background: white;
      }

      body {
        margin: 0;
        padding: 0;
      }

      img {
        display: block;
        width: ${PRINT_PAGE_WIDTH_MM}mm;
        height: ${PRINT_PAGE_HEIGHT_MM}mm;
        object-fit: contain;
        margin: 0;
        padding: 0;
        page-break-after: always;
        break-after: page;
      }

      img:last-child {
        page-break-after: auto;
        break-after: auto;
      }

      @page {
        size: A4;
        margin: 0;
      }

      @media print {
        html, body {
          width: ${PRINT_PAGE_WIDTH_MM}mm;
        }
      }
    `;
    document.head.appendChild(style);

    for (const imageUrl of imageUrls) {
      const image = document.createElement("img");
      image.src = imageUrl;
      document.body.appendChild(image);
    }
  }

  const scoreScroller = getScoreScroller();
  const scorePageWrappers = getScorePageWrappers(scoreScroller);

  if (!scorePageWrappers.length) {
    throw new Error("Could not find any MuseScore page wrappers.");
  }

  const capturedPageImageUrls = await capturePageImageUrls(
    scoreScroller,
    scorePageWrappers
  );

  const printableImageUrls = capturedPageImageUrls.filter(Boolean);

  if (!printableImageUrls.length) {
    throw new Error("Failed to capture any MuseScore page images.");
  }

  await preloadImages(printableImageUrls);
  renderPrintDocument(printableImageUrls);

  await sleep(1000);
  window.print();
})();
