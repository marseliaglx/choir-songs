const recordings = [
    { title: "Angels Alto", shareUrl: "https://drive.google.com/file/d/1DgLcvsOehNV3NxfKYT8eat42xJVWesvu/view?usp=sharing" },
    { title: "Angels Full Recording", shareUrl: "https://drive.google.com/file/d/1pz2_VKu4laSfzlfeE2YyFYxIAyMG0Cpc/view?usp=sharing" },
    { title: "Angels Mezzo", shareUrl: "https://drive.google.com/file/d/1ovQFa46Nnfd82JqyOt15EAu_l7Fvo5fk/view?usp=sharing" },
    { title: "Angels Soprano", shareUrl: "https://drive.google.com/file/d/1HCU8BALNhu0wmm-o9UX9poDbgng0hxf6/view?usp=sharing" },
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

function getEmbedUrl(recording) {
    const fileId = recording.googleDriveFileId || getGoogleDriveFileId(recording.shareUrl || recording.url || '');
    if (fileId) {
        return `https://drive.google.com/file/d/${encodeURIComponent(fileId)}/preview`;
    }
    return '';
}

function renderRecordings() {
    const recordingsList = document.getElementById('recordingsList');
    if (!recordingsList) return;

    recordingsList.innerHTML = recordings.map((recording, index) => {
        const embedUrl = getEmbedUrl(recording);
        const recordingNumber = String(index + 1).padStart(2, '0');

        const shareUrl = escapeHtml(recording.shareUrl || recording.url || '');
        return `
            <article class="recording-item">
                <div class="recording-title">${escapeHtml(recording.title)}</div>
                <div class="recording-meta">Google Drive audio</div>
                ${embedUrl
                    ? `<iframe src="${escapeHtml(embedUrl)}" class="drive-player" allow="autoplay" loading="lazy" title="Play ${escapeHtml(recording.title)}"></iframe>`
                    : `<p class="recording-error">Audio unavailable.</p>`
                }
                ${shareUrl ? `<a class="drive-link" href="${shareUrl}" target="_blank" rel="noopener noreferrer">Open in Google Drive ↗</a>` : ''}
            </article>
        `;
    }).join('');
}

renderRecordings();
