# 🎵 Carrigtwohill Gospel Choir — Song Repertoire

A mobile-friendly, installable web app listing the choir's full song repertoire with one-tap links to lyrics and reusable song pages that can include Google Drive recordings.

**Live site:** `https://YOUR-USERNAME.github.io/cgc-repertoire/`

## Features

- 🔍 **Search** — Find any song or artist instantly
- 🏷️ **Filter** — Browse by All, Pop, Sacred, or Christmas
- 🎧 **Recordings** — The home page has a mobile-friendly recordings section, and local choir song pages can include their own recording section
- 📱 **PWA** — Install on your phone's home screen for app-like access
- 📶 **Offline** — The song list and local lyric pages work offline; Google Drive recordings need an internet connection
- 🎨 **Branded** — Choir's purple & gold colours throughout

## Home Page Recordings

The home page has a **Recordings** section above the song list. Edit the `recordings` array in `index.html` to add or rename a playable recording card:

```js
{
  title: "Song Title — Part or rehearsal note",
  shareUrl: "https://drive.google.com/file/d/GOOGLE_DRIVE_FILE_ID/view?usp=sharing",
  // type is optional; omit it if you are not sure of the audio format
  type: "audio/mpeg"
}
```

The site extracts the Google Drive file ID and converts the sharing link into a playable URL automatically. Keep `title` clear and singer-friendly because this is the label shown above the mobile audio player.

## How the Song Pages Work

Local song pages in `lyrics/` use a reusable template:

- `assets/song-page.css` keeps the existing purple/gold design responsive.
- `assets/song-page.js` renders the song title, artist, recording section, lyrics, and permission note.
- Each `lyrics/*.html` page contains:
  - a `song-data` JSON block for the song title, artist, permission note, and recording details
  - a `lyrics-template` block for the lyrics markup

If a song does not have a recording yet, set `"recording": null`. The page will show: **Recording unavailable for this song.**

## Adding a Recording from Google Drive

1. Upload the audio file to Google Drive.
2. Right-click the file → **Share**.
3. Set access to **Anyone with the link can view**.
4. Copy the sharing URL. You can paste the full Google Drive link into `shareUrl`; the site extracts the file ID automatically.

A Google Drive sharing URL looks like this:

```text
https://drive.google.com/file/d/GOOGLE_DRIVE_FILE_ID/view?usp=sharing
```

Use the full sharing link in the song's JSON block:

```json
{
  "title": "Carry Me",
  "artist": "Aoibheann Carey-Philpott",
  "permission": "Lyrics by Aoibheann Carey-Philpott · Used with permission",
  "recording": {
    "shareUrl": "https://drive.google.com/file/d/GOOGLE_DRIVE_FILE_ID/view?usp=sharing",
    "type": "audio/mpeg",
    "note": "Practice recording hosted on Google Drive."
  }
}
```

The generated page uses an HTML5 `<audio controls preload="metadata">` player, so recordings do **not** autoplay.

You can also use a direct external audio URL instead of a Google Drive sharing link:

```json
"recording": {
  "url": "https://example.com/path/to/song.mp3",
  "type": "audio/mpeg"
}
```

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
- Use it to look up lyrics and play available practice recordings at rehearsal

## How to Update Songs

Edit `index.html` on GitHub — find the `const songs = [...]` array and add/remove entries. Each song looks like:

```js
{ title: "Song Name", artist: "Artist", url: "https://genius.com/...", cat: "pop", status: "link" },
```

For local choir pages with lyrics and recordings, use `status: "local"` and a `lyrics/...html` URL.

## Note on Copyright

Only add lyrics and recordings that you have permission to host. External lyric links remain available for songs where lyrics are not stored in this repository.

---

*"Sing & let your soul be filled with Joy!"*
