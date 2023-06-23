# Musescore Printer

Print and download sheet music from Musescore. No downloads, just run a 10-line console command on your browser.

## Usage

1. Navigate to a Musescore song (i.e. https://musescore.com/user/8877016/scores/1974706).
2. Open Inspect Element (CTRL+Shift+I on Chrome).
3. Copy and paste the project code into the console (second tab on Chrome) (see ./originalCode.js for the un-minified version)
   ```js
const fireWhenImagesLoad=(e,t,o)=>{const n=setInterval(()=>{const l=[...document.querySelectorAll(e)];l.length===o&&l.every(e=>e.src&&e.complete)&&(clearInterval(n),t(l))},500)},pages=document.querySelectorAll("#jmuse-scroller-component>.F16e6");for(const e of pages)e.style.height="0px";document.querySelector("section.ASx44").style.height="999px",document.getElementById("jmuse-scroller-component").scrollTo(0,1),fireWhenImagesLoad(".F16e6>img",e=>{const t=document.createElement("div");for(const o of e)o.style.height="250mm",t.appendChild(o.cloneNode(!0));document.getElementsByTagName("html")[0].innerHTML="",document.body.appendChild(t),fireWhenImagesLoad("img",window.print,pages.length)},pages.length);
   ```
4. Print your music.

Please note that you can print as PDF if you want to just download and save your music. There are options in the print dialog to remove the unsightly URL and date headers/footers as well.

## Purpose

Musescore houses a lot of the sheet music on the internet. They recently went the paid subscription route so lots and lots of public domain and user generated sheet music suddenly went behind a paywall. You can still view it on your computer, but you can't print or download.

There seem to be some solutions with Greasemonkey but for anyone who wants to just print one song without downloading a bunch of plugins, this is the way to go. **Just paste it into your browser and you can print right off the page (or print as PDF). No fuss, no downloads, and you can get straight back into playing some music.**

## Troubleshooting

Chances are, Musescore will not use the class name I search for indefinitely. For anyone who knows anything about HTML DOM, this will be a 10 second fix. There is little they can do as long as they continue to display sheet music on their page. Feel free to send me a message and I'm more than happy to update this project if it breaks.
