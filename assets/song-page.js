function escapeHtml(value) {
    return String(value ?? '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function getGoogleDriveAudioUrl(recording) {
    if (!recording) return '';
    if (recording.url) return recording.url;
    if (recording.googleDriveFileId) {
        return `https://drive.google.com/uc?export=download&id=${encodeURIComponent(recording.googleDriveFileId)}`;
    }
    return '';
}

function renderRecording(recording) {
    const audioUrl = getGoogleDriveAudioUrl(recording);

    if (!audioUrl) {
        return `
            <section class="recording" aria-labelledby="recording-heading">
                <h2 id="recording-heading">Recording</h2>
                <div class="recording-unavailable">Recording unavailable for this song.</div>
            </section>
        `;
    }

    const typeAttr = recording.type ? ` type="${escapeHtml(recording.type)}"` : '';
    const note = recording.note ? `<p class="recording-note">${escapeHtml(recording.note)}</p>` : '';

    return `
        <section class="recording" aria-labelledby="recording-heading">
            <h2 id="recording-heading">Recording</h2>
            <audio controls preload="metadata">
                <source src="${escapeHtml(audioUrl)}"${typeAttr}>
                Your browser does not support the HTML5 audio player.
            </audio>
            ${note}
        </section>
    `;
}

function renderSongPage(song, lyricsHtml) {
    const app = document.getElementById('songPage');
    if (!app) return;

    document.title = `${song.title} — Carrigtwohill Gospel Choir`;

    app.innerHTML = `
        <div class="header">
            <h1>${escapeHtml(song.title)}</h1>
            <div class="artist">${escapeHtml(song.artist)}</div>
        </div>
        <div class="gold-bar"></div>
        <a class="back" href="../">‹ Back to Repertoire</a>
        <main class="song-page">
            ${renderRecording(song.recording)}
            <section class="lyrics" aria-labelledby="lyrics-heading">
                <h2 id="lyrics-heading">Lyrics</h2>
                ${lyricsHtml}
            </section>
        </main>
        <div class="permission">${escapeHtml(song.permission)}</div>
    `;
}

const songDataElement = document.getElementById('song-data');
const lyricsTemplate = document.getElementById('lyrics-template');

if (songDataElement && lyricsTemplate) {
    const song = JSON.parse(songDataElement.textContent);
    renderSongPage(song, lyricsTemplate.innerHTML);
}
