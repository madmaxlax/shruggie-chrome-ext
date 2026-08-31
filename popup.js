document.addEventListener('DOMContentLoaded', async function () {
  try {
    await navigator.clipboard.writeText('¯\\_(ツ)_/¯');
    chrome.action.setBadgeBackgroundColor({ color: '#2FC21B' });
    chrome.action.setBadgeText({ text: '✓' });
    document.getElementById('status').innerHTML = '¯\\_(ツ)_/¯<br>Copied!';
    setTimeout(function () {
      chrome.action.setBadgeText({ text: '' });
      window.close();
    }, 1000);
  } catch (err) {
    chrome.action.setBadgeBackgroundColor({ color: '#d9534f' });
    chrome.action.setBadgeText({ text: 'Fail' });
    document.getElementById('status').innerText = 'Copy failed';
    setTimeout(function () {
      chrome.action.setBadgeText({ text: '' });
      window.close();
    }, 1000);
  }
});
