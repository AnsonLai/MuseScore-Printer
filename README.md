# Musescore Printer

Print and download sheet music from Musescore. No downloads, no extensions—just a single command in your browser.

## Using a Bookmarklet

1. **Create a bookmark** with the text `javascript:(async()=>{eval(await(await fetch("https://raw.githubusercontent.com/AnsonLai/MuseScore-Printer/master/originalCode.js")).text())})()`
2. **Click bookmark** and enjoy your printed sheet music.

## Quick Start (Chrome)

1. **Open a Musescore song** (e.g., `https://musescore.com/user/8877016/scores/1974706`).
2. **Open the Developer Console** by pressing `Ctrl` + `Shift` + `J` (Windows/Linux) or `Cmd` + `Option` + `J` (Mac).
3. **Paste the following code** into the console and hit **Enter**:

```javascript
eval(
  await (
    await fetch(
      "https://raw.githubusercontent.com/AnsonLai/MuseScore-Printer/master/originalCode.js",
    )
  ).text(),
);
```

4. **Print and enjoy!** (Note: Long scores may take a few seconds to process).

> **Tip:** To save the file locally, change the destination to **Save as PDF** in your print dialog. You can also uncheck "Headers and Footers" in your print settings to remove the unsightly URL and dates from your final document.

## Other Browsers

- **Firefox:** Press `Ctrl` + `Shift` + `K` (Windows/Linux) or `Cmd` + `Option` + `K` (Mac).
- **Edge:** Press `Ctrl` + `Shift` + `J` (Windows/Linux) or `Cmd` + `Option` + `J` (Mac).
- **Safari:** Press `Cmd` + `Option` + `C` _(Note: You must first enable the Develop menu in Safari's Advanced Preferences)._

## Purpose

Musescore houses a lot of the sheet music on the internet. They recently went the paid subscription route so lots and lots of public domain and user generated sheet music suddenly went behind a paywall. You can still view it on your computer, but you can't print or download.

There seem to be some solutions with Greasemonkey but for anyone who wants to just print one song without downloading a bunch of plugins, this is the way to go. **Just paste it into your browser and you can print right off the page (or print as PDF). No fuss, no downloads, and you can get straight back into playing some music.**

## Troubleshooting

Chances are, Musescore will not use the class name I search for indefinitely. For anyone who knows anything about HTML DOM, this will be a 10 second fix. There is little they can do as long as they continue to display sheet music on their page. Feel free to send me a message and I'm more than happy to update this project if it breaks.

## Testing

Try it on these examples!

- https://musescore.com/user/27114623/scores/4835917
- LONG: https://musescore.com/user/5488236/scores/4842695
