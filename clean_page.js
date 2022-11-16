// Create a temporary element to store all the SVG files
var temporary_el = document.createElement("DIV");

// Search and find SVG files (each an individual page)
var sheets = document.getElementsByClassName("Hn_kk");
for (i = 0; i < sheets.length; i++) {
  sheets[i].alt = "";
  console.log(sheets[i]);
  temporary_el.appendChild(sheets[i].cloneNode(true));
};

// Remove all Musescore elements (sidebars/headers/footers) from the page
var html = document.getElementsByTagName("html")[0];
html.innerHTML = '';
document.getElementsByTagName("body")[0].remove();

// Display only clean sheets
html.appendChild(temporary_el);
window.print();
