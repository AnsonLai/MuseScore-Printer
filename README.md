# Musescore Printer

Print and download sheet music from Musescore.  No downloads, just run a 10-line console command on your browser.

## Usage

1. Navigate to a Musescore song (i.e. https://musescore.com/user/8877016/scores/1974706).
2. Scroll through the sheet music to load all the pages.
3. Enter the developer tools (CTRL+Shift+I on Chrome).
4. Copy and paste the project code into console (second tab on Chrome):
   ```
    var temporary_el = document.createElement("DIV");
    var sheets = document.getElementsByClassName("GqiX6");
    for (i = 0; i < sheets.length; i++) {
      sheets[i].alt = "";
      console.log(sheets[i]);
      temporary_el.appendChild(sheets[i].cloneNode(true));
    };
    var html = document.getElementsByTagName("html")[0];
    html.innerHTML = '';
    document.getElementsByTagName("body")[0].remove();
    html.appendChild(temporary_el);
    window.print();
   ```
5. Print your music.

Please note that you can print as PDF if you want to just download and save your music.  There are options in the print dialog to remove the unsightly URL and date headers/footers as well.

## Purpose

Musescore houses a lot of the sheet music on the internet.  They recently went the paid subscription route so lots and lots of public domain and user generated sheet music suddenly went behind a paywall.  You can still view it on your computer, but you can't print or download.

There seem to be some solutions with Greasemonkey but for anyone who wants to just print one song without downloading a bunch of plugins, this is the way to go.  **Just paste it into your browser and you can print right off the page (or print as PDF).  No fuss, no downloads, and you can get straight back into playing some music.**

## Troubleshooting

Chances are, Musescore will not use the class name I search for indefinitely.  For anyone who knows anything about HTML DOM, this will be a 10 second fix.  There is little they can do as long as they continue to display sheet music on their page.  Feel free to send me a message and I'm more than happy to update this project if it breaks.
