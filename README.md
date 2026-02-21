# 🎵 Carrigtwohill Gospel Choir — Song Repertoire

A mobile-friendly, installable web app listing the choir's full song repertoire with one-tap links to lyrics.

**Live site:** `https://YOUR-USERNAME.github.io/cgc-repertoire/`

## Features

- 🔍 **Search** — Find any song or artist instantly
- 🏷️ **Filter** — Browse by All, Pop, Sacred, or Christmas
- 📱 **PWA** — Install on your phone's home screen for app-like access
- 📶 **Offline** — The song list works without internet (lyrics links need a connection)
- 🎨 **Branded** — Choir's purple & gold colours throughout

## How to Set Up on GitHub Pages

### 1. Create a GitHub account (if you don't have one)
Go to [github.com](https://github.com) and sign up — it's free.

### 2. Create a new repository
- Click the **+** button → **New repository**
- Name it something like `cgc-repertoire`
- Make sure it's set to **Public**
- Click **Create repository**

### 3. Upload the files
- Click **"uploading an existing file"** on the new repo page
- Drag and drop ALL the files from this folder:
  - `index.html`
  - `manifest.json`
  - `sw.js`
  - `icon-192.png`
  - `icon-512.png`
- Click **Commit changes**

### 4. Enable GitHub Pages
- Go to **Settings** → **Pages** (in the sidebar)
- Under "Source", select **Deploy from a branch**
- Branch: **main**, folder: **/ (root)**
- Click **Save**
- Wait 1-2 minutes, then your site will be live at:
  `https://YOUR-USERNAME.github.io/cgc-repertoire/`

### 5. Share the link!
Send the link to the choir WhatsApp group. Members can:
- Open it in their phone browser
- Tap "Add to Home Screen" to install it as an app
- Use it to look up lyrics at rehearsal

## How to Update Songs

Edit `index.html` on GitHub — find the `const songs = [...]` array and add/remove entries. Each song looks like:

```js
{ title: "Song Name", artist: "Artist", url: "https://genius.com/...", cat: "pop" },
```

Categories: `"pop"`, `"sacred"`, `"christmas"`

## Note on Copyright

This app **links to** lyrics on licensed external sites (primarily Genius.com). No copyrighted lyrics are stored in this repository.

---

*"Sing & let your soul be filled with Joy!"*
