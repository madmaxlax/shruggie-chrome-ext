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

function showCopied() {
  document.getElementById('status').textContent = 'Copied!';
  document.getElementById('copyBtn').style.display = 'none';
  chrome.action.setBadgeBackgroundColor({ color: '#2FC21B' });
  chrome.action.setBadgeText({ text: '✓' });
  setTimeout(() => chrome.action.setBadgeText({ text: '' }), 3000);
}

function showCopyButton() {
  document.getElementById('status').textContent = 'Auto-copy failed. Click Copy:';
  const btn = document.getElementById('copyBtn');
  btn.style.display = 'inline-block';
  btn.addEventListener('click', async () => {
    const ok = await copyText(SHRUGGIE);
    if (ok) {
      showCopied();
    } else {
      document.getElementById('status').textContent = 'Copy failed. Please try again.';
      chrome.action.setBadgeBackgroundColor({ color: '#d9534f' });
      chrome.action.setBadgeText({ text: '!' });
      setTimeout(() => chrome.action.setBadgeText({ text: '' }), 3000);
    }
  });
}

document.addEventListener('DOMContentLoaded', async () => {
  const ok = await copyText(SHRUGGIE);
  if (ok) {
    showCopied();
  } else {
    showCopyButton();
  }
});
