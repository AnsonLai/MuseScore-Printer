(async function () {
    try {
      const fetchLoadedImages = (querySelector, expectedNumberOfImages) => {
        console.log("Waiting for images to load...");
        return new Promise((resolve, reject) => {
          const observer = new MutationObserver((mutationsList) => {
            for (let mutation of mutationsList) {
              if (mutation.type === "childList") {
                const images = [...document.querySelectorAll(querySelector)];
                if (images.length === expectedNumberOfImages && images.every(image => image.src && image.complete)) {
                  observer.disconnect();
                  resolve(images);
                }
              }
            }
          });
          observer.observe(document.body, { childList: true, subtree: true });
  
          setTimeout(() => {
            observer.disconnect();
            reject(new Error("Timeout: Images did not load within expected time."));
          }, 30000);
        });
      };
  
      const scrollViewSelector = "#jmuse-scroller-component";
      const pageElementSelector = `${scrollViewSelector} > .F16e6`;
      const imageElementSelector = `${pageElementSelector} > img`;
  
      const pageContainer = document.querySelector(scrollViewSelector);
      const allChildren = [...document.querySelectorAll(scrollViewSelector + " > *")];
  
      allChildren.forEach((el) => {
        el.style.display = "none";
      });
  
      const SCROLL_HEIGHT_PX = 10000;
      const VIEWPORT_HEIGHT_PX = 9999;
      pageContainer.insertAdjacentHTML("beforeend", `<div style="height:${SCROLL_HEIGHT_PX}px"></div>`);
      pageContainer.style.height = VIEWPORT_HEIGHT_PX + "px";
      pageContainer.scrollTo(0, 0);
      pageContainer.scrollTo(0, 1);
  
      const pages = document.querySelectorAll(pageElementSelector);
      const images = await fetchLoadedImages(imageElementSelector, pages.length);
  
      document.body.innerHTML = "";
      const style = document.createElement("style");
      style.textContent = `
        body {
          margin: 0;
        }
        img {
          height: 296mm;
        }
        @page {
          size: A4;
          margin: 0;
        }
        @media print {
          html, body {
            width: 210mm;
            height: 297mm;
          }
        }
      `;
      document.head.appendChild(style);
  
      for (const image of images) {
        const imageClone = document.createElement("img");
        imageClone.src = image.src;
        document.body.appendChild(imageClone);
      }
  
      await fetchLoadedImages("img", pages.length);
      window.print();
    } catch (error) {
      console.error("An error occurred:", error.message);
    }
  })();  
