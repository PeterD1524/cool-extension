chrome.runtime.onInstalled.addListener(function () {
  console.log("Cool!");
});
chrome.runtime.onMessage.addListener(
  function (message, sender, sendResponse) {
    console.log(sender.tab ? "from a content script:" + sender.tab.url : "from the extension");
    console.log(message);
    for (let request in message) {
      if (request === 'chrome.downloads.download') {
        chrome.downloads.download(message[request][0], function (downloadId) {
          if (downloadId === undefined) {
            console.log(chrome.runtime.lastError.message);
            sendResponse(chrome.runtime.lastError.message);
          } else {
            console.log('downloadId', downloadId);
            sendResponse({ 'downloadId': downloadId });
          }
        });
      }
    }
    return true;
  });