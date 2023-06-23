# Musescore Printer

Print and download sheet music from Musescore. No downloads, just run a 1-line console command on your browser.

## Usage

1. Navigate to a Musescore song (i.e. https://musescore.com/user/8877016/scores/1974706). 
2. Open Inspect Element (CTRL+Shift+I on Chrome). **Important:** Make sure your screen is large enough so that the sheet music scrolls vertically (rather than horizontally)
3. Copy and paste the following code into the console (second tab on Chrome) (see ./originalCode.js for the un-minified version)
  ```js
  !function(){const e=(e,n,t)=>{const o=setInterval((()=>{const m=[...document.querySelectorAll(e)];m.length===t&&m.every((e=>e.src&&e.complete))&&(clearInterval(o),n(m))}),500)},n="#jmuse-scroller-component",t=`${n}>.F16e6`,o=`${t}>img`,m=document.querySelector(n),l=document.querySelectorAll(t);m.style.scrollSnapType="none",m.style.overflow="visible";for(const e of l)e.style.height="0px",e.style.width="0px",e.style.margin="0px";e(o,(n=>{document.getElementsByTagName("html")[0].innerHTML="";const t=document.createElement("style");t.textContent="\n body{\n margin:0;\n }\n img{\n height:296mm; /* sometimes it overflows to the next page if it's 297mm */\n }\n @page {\n size: A4;\n margin: 0;\n }\n @media print {\n html, body {\n width: 210mm;\n height: 297mm;\n }\n }\n ",document.head.appendChild(t);for(const e of n){const n=document.createElement("img");n.src=e.src,document.body.appendChild(n)}e("img",window.print,l.length)}),l.length)}();
  ```
4. Print your music!

Please note that you can print as PDF if you want to just download and save your music. There are options in the print dialog to remove the unsightly URL and date headers/footers as well.

## Purpose

Musescore houses a lot of the sheet music on the internet. They recently went the paid subscription route so lots and lots of public domain and user generated sheet music suddenly went behind a paywall. You can still view it on your computer, but you can't print or download.

There seem to be some solutions with Greasemonkey but for anyone who wants to just print one song without downloading a bunch of plugins, this is the way to go. **Just paste it into your browser and you can print right off the page (or print as PDF). No fuss, no downloads, and you can get straight back into playing some music.**

## Troubleshooting

Chances are, Musescore will not use the class name I search for indefinitely. For anyone who knows anything about HTML DOM, this will be a 10 second fix. There is little they can do as long as they continue to display sheet music on their page. Feel free to send me a message and I'm more than happy to update this project if it breaks.
