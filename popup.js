// all about the ¯\_(ツ)_/¯ Shruggie 

document.addEventListener('DOMContentLoaded', function () {
  document.getElementById("shruggieinput").select();

  var text;
  var success = document.execCommand("Copy");
  if (success) {
    chrome.browserAction.setBadgeBackgroundColor({ color: '#2FC21B' });
    chrome.browserAction.setBadgeText({ text: "✔️️" });
    document.getElementById("status").innerHTML = "¯\\_(ツ)_/¯<br>Copied!!!!!";
    setTimeout(function () {
      chrome.browserAction.setBadgeText({ text: '' });
      window.close();      
    }, 1000);
  }
  else {
    chrome.browserAction.setBadgeBackgroundColor({ color: "#d9534f" });
    chrome.browserAction.setBadgeText("Fail");
    document.getElementById("status").innerText = "Copy Failed";
    setTimeout(function () {
      chrome.browserAction.setBadgeText({ text: '' });
      window.close();      
    }, 1000);
    
  }

});

