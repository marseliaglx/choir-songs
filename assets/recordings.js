const recordings = [
    { title: "Choir Recording 01", shareUrl: "https://drive.google.com/file/d/1DgLcvsOehNV3NxfKYT8eat42xJVWesvu/view?usp=sharing" },
    { title: "Choir Recording 02", shareUrl: "https://drive.google.com/file/d/1pz2_VKu4laSfzlfeE2YyFYxIAyMG0Cpc/view?usp=sharing" },
    { title: "Choir Recording 03", shareUrl: "https://drive.google.com/file/d/1ovQFa46Nnfd82JqyOt15EAu_l7Fvo5fk/view?usp=sharing" },
    { title: "Choir Recording 04", shareUrl: "https://drive.google.com/file/d/1HCU8BALNhu0wmm-o9UX9poDbgng0hxf6/view?usp=sharing" },
    { title: "Choir Recording 05", shareUrl: "https://drive.google.com/file/d/19abbLHNzk2cN6yrTuidwWlIkdAGn3e9i/view?usp=sharing" },
    { title: "Choir Recording 06", shareUrl: "https://drive.google.com/file/d/1YW410TNo__BPUAIrP0ld_i7dDlEKojsG/view?usp=sharing" },
    { title: "Choir Recording 07", shareUrl: "https://drive.google.com/file/d/1HhXjhugZg0-8rGqdpXYeLp_IU83alkUZ/view?usp=sharing" },
    { title: "Choir Recording 08", shareUrl: "https://drive.google.com/file/d/1hMpe0OrRc51lGqxGQDElu7YjDFQC-fKP/view?usp=sharing" },
    { title: "Choir Recording 09", shareUrl: "https://drive.google.com/file/d/1qcSLmXuVwvenMkEQbntbZ9m8EU2gaWNS/view?usp=sharing" },
    { title: "Choir Recording 10", shareUrl: "https://drive.google.com/file/d/1kpStW20A9R71GLPsXaDpFwYsOdA8VRi8/view?usp=sharing" },
    { title: "Choir Recording 11", shareUrl: "https://drive.google.com/file/d/1ljOuXZcsG6NSzN7oSz60IzpbnbMq-1w5/view?usp=sharing" },
    { title: "Choir Recording 12", shareUrl: "https://drive.google.com/file/d/1KTM7fbPO8sovUiZU8Ey9BWyBPXd35ZHh/view?usp=sharing" },
    { title: "Choir Recording 13", shareUrl: "https://drive.google.com/file/d/1Bfz_B_PQ1_v5ZgJ_Njq4OnvoC3ORDnTW/view?usp=sharing" },
    { title: "Choir Recording 14", shareUrl: "https://drive.google.com/file/d/12ttOgvAHDqUCMWsNUTESP9wuBWJs42qt/view?usp=sharing" },
    { title: "Choir Recording 15", shareUrl: "https://drive.google.com/file/d/1BHjyLL9f0MTa_7ZcQGQiyZL2kRzYQomO/view?usp=sharing" },
];

function escapeHtml(value) {
    return String(value ?? '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function getGoogleDriveFileId(value) {
    if (!value) return '';
    const text = String(value);
    const filePathMatch = text.match(/\/file\/d\/([^/]+)/);
    if (filePathMatch) return filePathMatch[1];

    try {
        const url = new URL(text);
        return url.searchParams.get('id') || '';
    } catch {
        return '';
    }
}

function getPlayableAudioUrl(recording) {
    const googleDriveFileId = recording.googleDriveFileId || getGoogleDriveFileId(recording.shareUrl || recording.url);
    if (googleDriveFileId) {
        return `https://drive.google.com/uc?export=download&id=${encodeURIComponent(googleDriveFileId)}`;
    }

    return recording.url || '';
}

function renderRecordings() {
    const recordingsList = document.getElementById('recordingsList');
    if (!recordingsList) return;

    recordingsList.innerHTML = recordings.map((recording, index) => {
        const audioUrl = getPlayableAudioUrl(recording);
        const typeAttr = recording.type ? ` type="${escapeHtml(recording.type)}"` : '';
        const recordingNumber = String(index + 1).padStart(2, '0');

        return `
            <article class="recording-item">
                <div class="recording-title">${escapeHtml(recording.title)}</div>
                <div class="recording-meta">Recording ${recordingNumber} · Google Drive audio</div>
                <audio controls preload="metadata" aria-label="Play ${escapeHtml(recording.title)}">
                    <source src="${escapeHtml(audioUrl)}"${typeAttr}>
                    Your browser does not support the HTML5 audio player.
                </audio>
            </article>
        `;
    }).join('');
}

renderRecordings();
