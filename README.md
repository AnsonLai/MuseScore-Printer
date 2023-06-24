# Musescore Printer

Print and download sheet music from Musescore. No downloads - just a single command in your browser.

## Usage

1. Open a Musescore song (i.e. https://musescore.com/user/8877016/scores/1974706).
2. Open Inspect Element (Ctrl+Shift+I on Chrome). **Important:** Make sure your screen is large enough so that the sheet music scrolls vertically (rather than horizontally)
3. Copy and paste the following line of code into the console (second tab on Chrome) (see ./originalCode.js for the actual code)
```js
eval(await (await fetch("https://raw.githubusercontent.com/AnsonLai/MuseScore-Printer/master/originalCode.js")).text())
```
4. Enjoy! (it may take a couple of seconds if the score is very long.)

Please note that you can print as PDF if you want to just download and save your music. There are options in the print dialog to remove the unsightly URL and date headers/footers as well.

## Purpose

Musescore houses a lot of the sheet music on the internet. They recently went the paid subscription route so lots and lots of public domain and user generated sheet music suddenly went behind a paywall. You can still view it on your computer, but you can't print or download.

There seem to be some solutions with Greasemonkey but for anyone who wants to just print one song without downloading a bunch of plugins, this is the way to go. **Just paste it into your browser and you can print right off the page (or print as PDF). No fuss, no downloads, and you can get straight back into playing some music.**

## Troubleshooting

Chances are, Musescore will not use the class name I search for indefinitely. For anyone who knows anything about HTML DOM, this will be a 10 second fix. There is little they can do as long as they continue to display sheet music on their page. Feel free to send me a message and I'm more than happy to update this project if it breaks.
