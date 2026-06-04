# 🎵 Carrigtwohill Gospel Choir — Song Repertoire

A mobile-friendly, installable web app listing the choir's full song repertoire with one-tap links to lyrics and a separate recordings page for practice audio.

**Live site:** `https://YOUR-USERNAME.github.io/cgc-repertoire/`

## Features

- 🔍 **Search** — Find any song or artist instantly
- 🏷️ **Filter** — Browse by All, Pop, Sacred, or Christmas
- 🎧 **Recordings** — A separate recordings page keeps practice audio away from lyric pages
- 📱 **PWA** — Install on your phone's home screen for app-like access
- 📶 **Offline** — The song list and local lyric pages work offline; Google Drive recordings need an internet connection
- 🎨 **Branded** — Choir's purple & gold colours throughout

## Recordings Page

Recordings live on their own page: `recordings.html`. The home page only shows a **Recordings** link, so choir members click through to a page that contains audio players and no lyrics.

To add or rename a recording, edit the `recordings` array in `assets/recordings.js`:

```js
{
  title: "Song Title — Part or rehearsal note",
  shareUrl: "https://drive.google.com/file/d/GOOGLE_DRIVE_FILE_ID/view?usp=sharing"
}
```

The site extracts the Google Drive file ID and converts the sharing link into a playable URL automatically. Keep `title` clear and singer-friendly because this is the label shown above the mobile audio player. The generated page uses HTML5 `<audio controls preload="metadata">` players, so recordings do **not** autoplay.

## How the Song Pages Work

Local song pages in `lyrics/` are for lyrics only and use a reusable template:

- `assets/song-page.css` keeps the existing purple/gold design responsive.
- `assets/song-page.js` renders the song title, artist, lyrics, and permission note.
- Each `lyrics/*.html` page contains:
  - a `song-data` JSON block for the song title, artist, and permission note
  - a `lyrics-template` block for the lyrics markup

Recordings should not be added to lyric pages. Add them to `assets/recordings.js` so they stay on the separate `recordings.html` page.

## Adding a New Local Song Page

1. Create a new file in `lyrics/`, for example `lyrics/new-song.html`.
2. Copy one of the existing local song pages.
3. Update the `song-data` JSON block.
4. Replace the contents of the `lyrics-template` block with the new lyrics.
5. Add the new song to the `songs` array in `index.html`:

```js
{ title: "New Song", artist: "Composer", url: "lyrics/new-song.html", cat: "sacred", status: "local" },
```

Categories: `"pop"`, `"sacred"`, `"christmas"`.

6. Add the page to the service worker cache list in `sw.js` if you want it available offline.

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
  - `assets/song-page.css`
  - `assets/song-page.js`
  - `assets/recordings.css`
  - `assets/recordings.js`
  - `recordings.html`
  - `lyrics/` folder
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
- Use it to look up lyrics, or open the separate Recordings page to play practice audio at rehearsal

## How to Update Songs

Edit `index.html` on GitHub — find the `const songs = [...]` array and add/remove entries. Each song looks like:

```js
{ title: "Song Name", artist: "Artist", url: "https://genius.com/...", cat: "pop", status: "link" },
```

For local choir lyric pages, use `status: "local"` and a `lyrics/...html` URL. Add practice audio separately in `assets/recordings.js`.

## Note on Copyright

Only add lyrics and recordings that you have permission to host. External lyric links remain available for songs where lyrics are not stored in this repository.

---

*"Sing & let your soul be filled with Joy!"*
