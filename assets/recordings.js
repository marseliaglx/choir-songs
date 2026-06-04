const recordings = [
    { title: "Practice Recording 01", googleDriveFileId: "1DgLcvsOehNV3NxfKYT8eat42xJVWesvu" },
    { title: "Practice Recording 02", googleDriveFileId: "1pz2_VKu4laSfzlfeE2YyFYxIAyMG0Cpc" },
    { title: "Practice Recording 03", googleDriveFileId: "1ovQFa46Nnfd82JqyOt15EAu_l7Fvo5fk" },
    { title: "Practice Recording 04", googleDriveFileId: "1HCU8BALNhu0wmm-o9UX9poDbgng0hxf6" },
    { title: "Practice Recording 05", googleDriveFileId: "19abbLHNzk2cN6yrTuidwWlIkdAGn3e9i" },
    { title: "Practice Recording 06", googleDriveFileId: "1YW410TNo__BPUAIrP0ld_i7dDlEKojsG" },
    { title: "Practice Recording 07", googleDriveFileId: "1HhXjhugZg0-8rGqdpXYeLp_IU83alkUZ" },
    { title: "Practice Recording 08", googleDriveFileId: "1hMpe0OrRc51lGqxGQDElu7YjDFQC-fKP" },
    { title: "Practice Recording 09", googleDriveFileId: "1qcSLmXuVwvenMkEQbntbZ9m8EU2gaWNS" },
    { title: "Practice Recording 10", googleDriveFileId: "1kpStW20A9R71GLPsXaDpFwYsOdA8VRi8" },
    { title: "Practice Recording 11", googleDriveFileId: "1ljOuXZcsG6NSzN7oSz60IzpbnbMq-1w5" },
    { title: "Practice Recording 12", googleDriveFileId: "1KTM7fbPO8sovUiZU8Ey9BWyBPXd35ZHh" },
    { title: "Practice Recording 13", googleDriveFileId: "1Bfz_B_PQ1_v5ZgJ_Njq4OnvoC3ORDnTW" },
    { title: "Practice Recording 14", googleDriveFileId: "12ttOgvAHDqUCMWsNUTESP9wuBWJs42qt" },
    { title: "Practice Recording 15", googleDriveFileId: "1BHjyLL9f0MTa_7ZcQGQiyZL2kRzYQomO" },
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
    const text = String(value).trim();
    const filePathMatch = text.match(/\/file\/d\/([^/]+)/);
    if (filePathMatch) return filePathMatch[1];

    try {
        const url = new URL(text);
        return url.searchParams.get('id') || '';
    } catch {
        return text;
    }
}

function getGoogleDriveShareUrl(fileId) {
    return `https://drive.google.com/file/d/${encodeURIComponent(fileId)}/view?usp=sharing`;
}

function getPlayableAudioUrl(recording) {
    const googleDriveFileId = getGoogleDriveFileId(recording.googleDriveFileId || recording.shareUrl || recording.url);
    if (googleDriveFileId) {
        return `https://drive.google.com/uc?export=download&id=${encodeURIComponent(googleDriveFileId)}`;
    }

    return recording.url || '';
}

function renderRecordings() {
    const recordingsList = document.getElementById('recordingsList');
    if (!recordingsList) return;

    recordingsList.innerHTML = recordings.map((recording, index) => {
        const googleDriveFileId = getGoogleDriveFileId(recording.googleDriveFileId || recording.shareUrl || recording.url);
        const audioUrl = getPlayableAudioUrl(recording);
        const shareUrl = recording.shareUrl || (googleDriveFileId ? getGoogleDriveShareUrl(googleDriveFileId) : audioUrl);
        const typeAttr = recording.type ? ` type="${escapeHtml(recording.type)}"` : '';
        const recordingNumber = String(index + 1).padStart(2, '0');

        if (!audioUrl) {
            return `
                <article class="recording-item recording-unavailable">
                    <div class="recording-title">${escapeHtml(recording.title)}</div>
                    <div class="recording-meta">Recording ${recordingNumber}</div>
                    <p class="recording-message">Recording unavailable.</p>
                </article>
            `;
        }

        return `
            <article class="recording-item">
                <div class="recording-title">${escapeHtml(recording.title)}</div>
                <div class="recording-meta">Recording ${recordingNumber} · Google Drive file ${escapeHtml(googleDriveFileId)}</div>
                <audio controls preload="metadata" aria-label="Play ${escapeHtml(recording.title)}">
                    <source src="${escapeHtml(audioUrl)}"${typeAttr}>
                    Your browser does not support the HTML5 audio player.
                </audio>
                <a class="recording-drive-link" href="${escapeHtml(shareUrl)}" target="_blank" rel="noopener">Open this file in Google Drive</a>
            </article>
        `;
    }).join('');
}

renderRecordings();
