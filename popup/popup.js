function open_settings() {
    chrome.tabs.create({url: chrome.extension.getURL('options.html')});
}

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('settings').addEventListener('click', open_settings);
});