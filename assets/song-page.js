function escapeHtml(value) {
    return String(value ?? '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
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
