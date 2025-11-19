const urlInput = document.getElementById('urlInput');
const resultArea = document.getElementById('resultArea');
const emptyState = document.getElementById('emptyState');
const dateDisplay = document.getElementById('dateDisplay');
const linksList = document.getElementById('linksList');
const errorToast = document.getElementById('errorToast');
const errorText = document.getElementById('errorText');

// Load from LocalStorage
let urls = JSON.parse(localStorage.getItem('whmcs_links')) || [];

// Initialize Date
const now = new Date();
const formattedDate = now.toLocaleDateString('en-GB'); // DD/MM/YYYY format
dateDisplay.textContent = formattedDate;

// Initial Render
if (urls.length > 0) {
    renderList();
    updateUIState();
}

urlInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        const url = this.value.trim();

        if (url) {
            addUrl(url);
        }
    }
});

function isValidUrl(string) {
    try {
        new URL(string);
        return true;
    } catch (_) {
        return false;
    }
}

function addUrl(url) {
    // Validate URL
    if (!isValidUrl(url)) {
        showError('Invalid URL! Must start with http:// or https://');
        urlInput.value = '';
        return;
    }

    // Check for duplicates
    if (urls.includes(url)) {
        showError('Link already exists!');
        urlInput.value = '';
        return;
    }

    urls.push(url);
    saveToStorage();
    renderList();
    updateUIState();
    urlInput.value = ''; // Clear input only on success
}

function showError(message) {
    // Update error text
    errorText.textContent = message;

    // Shake animation
    urlInput.classList.add('shake');
    errorToast.classList.remove('hidden');

    setTimeout(() => {
        urlInput.classList.remove('shake');
        errorToast.classList.add('hidden');
    }, 2000);
}

function saveToStorage() {
    localStorage.setItem('whmcs_links', JSON.stringify(urls));
}

function updateUIState() {
    if (urls.length > 0) {
        resultArea.classList.remove('hidden');
        emptyState.classList.add('hidden');
    } else {
        resultArea.classList.add('hidden');
        emptyState.classList.remove('hidden');
    }
}

function renderList() {
    linksList.innerHTML = '';
    urls.forEach((url, index) => {
        let displayUrl = url;
        try {
            // Regex to find specific WHMCS files and everything after them
            const match = url.match(/(supporttickets\.php|viewticket\.php|clientarea\.php|cart\.php|index\.php).*/);
            if (match) {
                displayUrl = match[0];
            } else {
                // Fallback for other URLs
                const urlObj = new URL(url);
                displayUrl = urlObj.pathname + urlObj.search + urlObj.hash;
                if (displayUrl === '/' || displayUrl === '') {
                    displayUrl = urlObj.hostname;
                }
            }
        } catch (e) {
            // Invalid URL, keep original
        }

        const li = document.createElement('li');
        li.className = 'list-item-enter group relative flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 transition-all duration-200';
        li.style.animationDelay = `${index * 50}ms`; // Stagger animation if re-rendering all

        li.innerHTML = `
                    <span class="flex-none flex items-center justify-center w-6 h-6 rounded-full bg-white/10 text-xs font-mono text-gray-400 group-hover:bg-blue-500/20 group-hover:text-blue-300 transition-colors">
                        ${index + 1}
                    </span>
                    <div class="flex-1 min-w-0">
                        <a href="${url}" target="_blank" class="font-mono text-sm text-blue-300/90 hover:text-blue-300 truncate block transition-colors hover:underline decoration-blue-500/30 underline-offset-4" title="${url}">
                            ${displayUrl}
                        </a>
                    </div>
                    <button onclick="removeUrl(${index})" class="flex-none opacity-0 group-hover:opacity-100 p-1.5 rounded-lg hover:bg-red-500/20 text-gray-500 hover:text-red-400 transition-all transform scale-90 group-hover:scale-100" title="Remove">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                `;
        linksList.appendChild(li);
    });

    // Auto scroll to bottom
    const outputContent = document.getElementById('outputContent');
    outputContent.scrollTop = outputContent.scrollHeight;
}

function removeUrl(index) {
    urls.splice(index, 1);
    saveToStorage();
    renderList();
    updateUIState();
}

function clearAll() {
    if (confirm('Are you sure you want to clear all links?')) {
        urls = [];
        saveToStorage();
        renderList();
        updateUIState();
    }
}

function copyToClipboard() {
    const dateText = dateDisplay.textContent;

    let copyText = dateText + '\n';
    urls.forEach((url, index) => {
        copyText += `${index + 1}. ${url}\n`;
    });

    navigator.clipboard.writeText(copyText).then(() => {
        const btn = document.querySelector('button[onclick="copyToClipboard()"]');
        const originalContent = btn.innerHTML;

        btn.classList.add('text-green-400', 'bg-green-400/10');
        btn.innerHTML = `
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Copied!
                `;

        setTimeout(() => {
            btn.classList.remove('text-green-400', 'bg-green-400/10');
            btn.innerHTML = originalContent;
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy: ', err);
        alert('Failed to copy to clipboard');
    });
}
