const fireWhenImagesLoad = (querySelector, callback, expectedNumberOfImages) => {
  const intervalId = setInterval(() => {
    const images = [...document.querySelectorAll(querySelector)]; //arrays are easier to work with
    if (images.length === expectedNumberOfImages && images.every(image => image.src && image.complete)) { //musescore sometimes initializes the image without a src
      clearInterval(intervalId);
      callback(images);
    }
  }, 500);
}

const pages = document.querySelectorAll("#jmuse-scroller-component>.F16e6");

for (const page of pages) {
  page.style.height = "0px"; //so all images are "visible" on the page
}

document.querySelector("section.ASx44").style.height = "999px"; //still need the scrollbar
document.getElementById("jmuse-scroller-component").scrollTo(0, 1); //trigger the image render


fireWhenImagesLoad(".F16e6>img", (images) => {
  const tempEl = document.createElement("div");

  for (const image of images) {
    image.style.height = "250mm"; //A4 height with room for margins
    tempEl.appendChild(image.cloneNode(true));
  }

  document.getElementsByTagName("html")[0].innerHTML = "";
  document.body.appendChild(tempEl);
  fireWhenImagesLoad("img", window.print, pages.length);
}, pages.length);
