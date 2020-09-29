let vjs_video_3_html5_api = document.querySelector("#vjs_video_3_html5_api");
if (vjs_video_3_html5_api === null) {
    let timeout = 1000;
    console.log(timeout);
    setTimeout(hQrni7JRwQWAvnMvZ5dJ4zxeQlYEC2w39opZfqGSSxQ, timeout);
    function hQrni7JRwQWAvnMvZ5dJ4zxeQlYEC2w39opZfqGSSxQ() {
        vjs_video_3_html5_api = document.querySelector("#vjs_video_3_html5_api");
        if (vjs_video_3_html5_api === null) {
            timeout = timeout * 2;
            console.log(timeout);
            if (timeout <= 64000) {
                setTimeout(hQrni7JRwQWAvnMvZ5dJ4zxeQlYEC2w39opZfqGSSxQ, timeout);
            }
        } else {
            oyrgy06xEwMPnQhwz_pHiZlItMV05DZcljWs2JMschc();
        }
    }
} else {
    oyrgy06xEwMPnQhwz_pHiZlItMV05DZcljWs2JMschc();
}
function oyrgy06xEwMPnQhwz_pHiZlItMV05DZcljWs2JMschc() {
    console.log(vjs_video_3_html5_api.src);
    let button = document.createElement('button');
    button.className = 'vjs-download-button vjs-control vjs-button';
    button.type = 'button';
    button.title = 'Download';
    button.setAttribute('aria-disabled', false);
    button.addEventListener('click', function () {
        chrome.runtime.sendMessage(
            {
                'chrome.downloads.download': [
                    {
                        'url': vjs_video_3_html5_api.src,
                        'filename': document.querySelector("body > div:nth-child(3) > div > div > h3").textContent.replace(/[\/:]/g, '_'),
                    }
                ]
            },
            function (response) {
                if (response === undefined) {
                    console.log(chrome.runtime.lastError.message);
                } else {
                    console.log('response', response);
                }
            }
        );
    })
    let span;
    span = document.createElement('span');
    span.setAttribute('aria-hidden', true);
    span.className = 'vjs-icon-placeholder';
    button.appendChild(span);
    span = document.createElement('span');
    span.className = 'vjs-control-text';
    span.setAttribute('aria-live', 'polite');
    span.textContent = 'Download';
    button.appendChild(span);
    document.querySelector("#vjs_video_3 > div.vjs-control-bar").insertBefore(button, document.querySelector("#vjs_video_3 > div.vjs-control-bar > button.vjs-fullscreen-control.vjs-control.vjs-button").nextSibling);
}