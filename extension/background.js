chrome.runtime.onInstalled.addListener(function () {
    console.log("Cool!");
});
chrome.runtime.onMessage.addListener(
    function (message, sender, sendResponse) {
        console.log(sender.tab ? "from a content script:" + sender.tab.url : "from the extension");
        console.log(message);
        let requests = Object.keys(message);
        if (Object.keys(message).length == 1) {
            let request = requests[0];
            let response = { 'request': request };
            if (request === 'chrome.downloads.download') {
                chrome.downloads.download(
                    message[request][0],
                    function (downloadId) {
                        if (downloadId === undefined) {
                            console.log('chrome.runtime.lastError.message', chrome.runtime.lastError.message);
                            response['chrome.runtime.lastError.message'] = chrome.runtime.lastError.message;
                            sendResponse(response);
                        } else {
                            console.log('downloadId', downloadId);
                            response['downloadId'] = downloadId;
                            sendResponse(response);
                        }
                    }
                );
            } else if (request === 'chrome.downloads.search') {
                chrome.downloads.search(message[request][0], function (results) {
                    response['results'] = results;
                    console.log(results);
                    sendResponse(response);
                });
            } else if (request === 'chrome.downloads.pause') {
                chrome.downloads.pause(
                    message[request][0],
                    function () {
                        if ('lastError' in chrome.runtime) {
                            response['chrome.runtime.lastError.message'] = chrome.runtime.lastError.message;
                            console.log('chrome.runtime.lastError.message', chrome.runtime.lastError.message);
                        }
                        sendResponse(response);
                    }
                );
            } else if (request === 'chrome.downloads.resume') {
                chrome.downloads.resume(
                    message[request][0],
                    function () {
                        if ('lastError' in chrome.runtime) {
                            response['chrome.runtime.lastError.message'] = chrome.runtime.lastError.message;
                            console.log('chrome.runtime.lastError.message', chrome.runtime.lastError.message);
                        }
                        sendResponse(response);
                    }
                );
            } else if (request === 'chrome.downloads.cancel') {
                chrome.downloads.cancel(
                    message[request][0],
                    function () {
                        if ('lastError' in chrome.runtime) {
                            response['chrome.runtime.lastError.message'] = chrome.runtime.lastError.message;
                            console.log('chrome.runtime.lastError.message', chrome.runtime.lastError.message);
                        }
                        sendResponse(response);
                    }
                );
            } else if (request === 'chrome.downloads.getFileIcon') {
                chrome.downloads.getFileIcon(
                    ...message[request].slice(0, 2),
                    function (iconURL) {
                        response['iconURL'] = iconURL;
                        if ('lastError' in chrome.runtime) {
                            response['chrome.runtime.lastError.message'] = chrome.runtime.lastError.message;
                            console.log('chrome.runtime.lastError.message', chrome.runtime.lastError.message);
                        }
                        sendResponse(response);
                    }
                );
            } else if (request === 'chrome.downloads.show') {
                chrome.downloads.show(message[request][0]);
                sendResponse(response);
            } else if (request === 'chrome.downloads.showDefaultFolder') {
                chrome.downloads.showDefaultFolder();
                sendResponse(response);
            }
        } else {
            // chrome.tabs.sendMessage(integer tabId, any message, object options, function responseCallback)
        }
        return true;
    }
);