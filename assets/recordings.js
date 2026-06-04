const recordingGroups = [
    {
        song: "Angels",
        parts: [
            { part: "Alto",           shareUrl: "https://drive.google.com/file/d/1DgLcvsOehNV3NxfKYT8eat42xJVWesvu/view?usp=sharing" },
            { part: "Full Recording", shareUrl: "https://drive.google.com/file/d/1pz2_VKu4laSfzlfeE2YyFYxIAyMG0Cpc/view?usp=sharing" },
            { part: "Mezzo",          shareUrl: "https://drive.google.com/file/d/1ovQFa46Nnfd82JqyOt15EAu_l7Fvo5fk/view?usp=sharing" },
            { part: "Soprano",        shareUrl: "https://drive.google.com/file/d/1HCU8BALNhu0wmm-o9UX9poDbgng0hxf6/view?usp=sharing" },
        ]
    },
    {
        song: "Iris",
        parts: [
            { part: "Altos",      shareUrl: "https://drive.google.com/file/d/19abbLHNzk2cN6yrTuidwWlIkdAGn3e9i/view?usp=sharing" },
            { part: "Mezzo Mids", shareUrl: "https://drive.google.com/file/d/1YW410TNo__BPUAIrP0ld_i7dDlEKojsG/view?usp=sharing" },
            { part: "Soprano",    shareUrl: "https://drive.google.com/file/d/1HhXjhugZg0-8rGqdpXYeLp_IU83alkUZ/view?usp=sharing" },
        ]
    },
    {
        song: "Little Town",
        parts: [
            { part: "Alto",           shareUrl: "https://drive.google.com/file/d/1hMpe0OrRc51lGqxGQDElu7YjDFQC-fKP/view?usp=sharing" },
            { part: "Full Recording", shareUrl: "https://drive.google.com/file/d/1qcSLmXuVwvenMkEQbntbZ9m8EU2gaWNS/view?usp=sharing" },
            { part: "Mids",           shareUrl: "https://drive.google.com/file/d/1kpStW20A9R71GLPsXaDpFwYsOdA8VRi8/view?usp=sharing" },
            { part: "Soprano",        shareUrl: "https://drive.google.com/file/d/1ljOuXZcsG6NSzN7oSz60IzpbnbMq-1w5/view?usp=sharing" },
        ]
    },
    {
        song: "Under the Olive Tree",
        parts: [
            { part: "Alto",           shareUrl: "https://drive.google.com/file/d/1KTM7fbPO8sovUiZU8Ey9BWyBPXd35ZHh/view?usp=sharing" },
            { part: "Mezzo",          shareUrl: "https://drive.google.com/file/d/1Bfz_B_PQ1_v5ZgJ_Njq4OnvoC3ORDnTW/view?usp=sharing" },
            { part: "Soprano",        shareUrl: "https://drive.google.com/file/d/12ttOgvAHDqUCMWsNUTESP9wuBWJs42qt/view?usp=sharing" },
            { part: "Full Recording", shareUrl: "https://drive.google.com/file/d/1BHjyLL9f0MTa_7ZcQGQiyZL2kRzYQomO/view?usp=sharing" },
        ]
    },
];

function escapeHtml(value) {
    return String(value ?? '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function getGoogleDriveFileId(url) {
    if (!url) return '';
    const match = String(url).match(/\/file\/d\/([^/]+)/);
    if (match) return match[1];
    try { return new URL(url).searchParams.get('id') || ''; } catch { return ''; }
}

let activePlayer = null;

function openPlayer(btn, embedUrl) {
    const container = btn.closest('.recording-item').querySelector('.player-container');

    // Close if already open
    if (activePlayer && activePlayer !== container) {
        activePlayer.innerHTML = '';
        activePlayer.classList.remove('open');
        activePlayer.closest('.recording-item').querySelector('.play-btn').textContent = '▶ Play';
    }

    if (container.classList.contains('open')) {
        container.innerHTML = '';
        container.classList.remove('open');
        btn.textContent = '▶ Play';
        activePlayer = null;
    } else {
        container.innerHTML = `<iframe src="${embedUrl}" allow="autoplay" loading="lazy"></iframe>`;
        container.classList.add('open');
        btn.textContent = '■ Close';
        activePlayer = container;
        container.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}

function renderRecordings() {
    const list = document.getElementById('recordingsList');
    if (!list) return;

    list.innerHTML = recordingGroups.map(group => {
        const partsHtml = group.parts.map(rec => {
            const fileId = getGoogleDriveFileId(rec.shareUrl);
            const embedUrl = fileId ? `https://drive.google.com/file/d/${encodeURIComponent(fileId)}/preview` : '';
            const shareUrl = escapeHtml(rec.shareUrl || '');

            return `
                <div class="recording-item">
                    <div class="recording-part-row">
                        <span class="part-badge">${escapeHtml(rec.part)}</span>
                        <div class="recording-actions">
                            ${embedUrl ? `<button class="play-btn" onclick="openPlayer(this, '${escapeHtml(embedUrl)}')">▶ Play</button>` : ''}
                            ${shareUrl ? `<a class="drive-btn" href="${shareUrl}" target="_blank" rel="noopener noreferrer">Open in Drive ↗</a>` : ''}
                        </div>
                    </div>
                    <div class="player-container"></div>
                </div>
            `;
        }).join('');

        return `
            <section class="song-group">
                <h3 class="song-title">${escapeHtml(group.song)}</h3>
                <div class="song-parts">${partsHtml}</div>
            </section>
        `;
    }).join('');
}

renderRecordings();
