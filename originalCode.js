//self invoked function (so it doesn't pollute the global scope)
(function () {
  const fireWhenImagesLoad = (querySelector, callback, expectedNumberOfImages) => {
    const intervalId = setInterval(() => {
      const images = [...document.querySelectorAll(querySelector)]; //arrays are easier to work with
      if (images.length === expectedNumberOfImages && images.every(image => image.src && image.complete)) { //Musescore sometimes initializes the image without a src
        clearInterval(intervalId);
        callback(images);
      }
    }, 500);
  }

  const scrollViewSelector = "#jmuse-scroller-component";
  const pageElementSelector = `${scrollViewSelector}>.F16e6`;
  const imageElementSelector = `${pageElementSelector}>img`;

  const pageContainer = document.querySelector(scrollViewSelector);
  const pages = document.querySelectorAll(pageElementSelector);

  pageContainer.style.scrollSnapType = "none";
  pageContainer.style.overflow = "visible";

  //so all images are "visible" on the page
  for (const page of pages) {
    page.style.height = "0px";
    page.style.width = "0px";
    page.style.margin = "0px";
  }


  fireWhenImagesLoad(imageElementSelector, (images) => {
    document.getElementsByTagName("html")[0].innerHTML = "";

    const style = document.createElement("style");
    style.textContent = `
    body{
      margin:0;
    }
    img{
      height:296mm; /* sometimes it overflows to the next page if it's 297mm */
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

    fireWhenImagesLoad("img", window.print, pages.length);
  }, pages.length);
})();
