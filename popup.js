const SHRUGGIE = '¯\\_(ツ)_/¯';

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    // Fallback for contexts where the async Clipboard API is blocked.
    try {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand('copy');
      document.body.removeChild(ta);
      return ok;
    } catch (e) {
      return false;
    }
  }
}

document.getElementById('copyBtn').addEventListener('click', async () => {
  const status = document.getElementById('status');
  const ok = await copyText(SHRUGGIE);
  if (ok) {
    status.textContent = 'Copied!';
    chrome.action.setBadgeBackgroundColor({ color: '#2FC21B' });
    chrome.action.setBadgeText({ text: '✓' });
  } else {
    status.textContent = 'Copy failed. Please try again.';
    chrome.action.setBadgeBackgroundColor({ color: '#d9534f' });
    chrome.action.setBadgeText({ text: '!' });
  }
  setTimeout(() => chrome.action.setBadgeText({ text: '' }), 3000);
});
