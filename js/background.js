chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  console.log('Background.js received a request for ' + message);
  chrome.downloads.download({'url': message});
});
