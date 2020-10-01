let options_div = document.getElementById('options');
let options = [
    {
        'name': 'filename',
        'description': "<p>A file path relative to the Downloads directory to contain the downloaded file, possibly containing subdirectories. Absolute paths, empty paths, and paths containing back-references \"..\" will cause an error.<br>Any character among \"<code>\"*/:<>?\|</code>\" will be replaced with a \"<code>_</code>\".<br><a href=\"https://docs.microsoft.com/en-us/windows/win32/fileio/naming-a-file\">Naming Files, Paths, and Namespaces - Win32 apps | Microsoft Docs</a></p><h3>variables</h3><dd><dl><dt>${t}</dt><dd>Title, i.e. \"<code>document.querySelector(\"body > div:nth-child(3) > div > div > h3\").textContent</code>\".</dd><dt>${q}</dt><dd>Quality, i.e. \"<code>document.querySelector(\"#vjs_video_3 > div.vjs-control-bar > div:nth-child(8) > div > ul > li.vjs-menu-item.vjs-selected > span.vjs-menu-item-text\").textContent</code>\".</dd></dl></dd>",
        'default': '${t}-${q}',
    },
    {
        'name': 'conflictAction',
        'description': "<p>The action to take if <code>filename</code> already exists.</p><dd><dl><dt>uniquify</dt><dd>To avoid duplication, the <code>filename</code> is changed to include a counter before the filename extension.</dd><dt>overwrite</dt><dd>The existing file will be overwritten with the new file.</dd><dt>prompt</dt><dd>The user will be prompted with a file chooser dialog.</dd></dl></dd>",
        'input': { 'name': undefined, 'value': ["uniquify", "overwrite", "prompt"] },
        'default': 'unset',
    },
    {
        'name': 'saveAs',
        'description': "<p>Use a file-chooser to allow the user to select a filename regardless of whether <code>filename</code> is set or already exists.</p>",
        'input': { 'name': undefined, 'value': [true, false] },
        'default': 'unset',
    },
    {
        'name': 'autoDownload',
        'description': "<p>Automatically download videos when visiting a website that contains downloadable videos. The filename setting may become invalid.</p>",
        'input': { 'name': undefined, 'value': [true, false] },
        'default': false,
    }
]
let key = 'coolOptions';
document.addEventListener('DOMContentLoaded', function () {
    for (let property of options) {
        let div = document.createElement('div');
        div.id = `options-${property['name']}`;
        div.style.fontSize = '14px';
        div.style.color = '#333';
        div.style.lineHeight = '1.5em';
        let h2 = document.createElement('h2');
        h2.textContent = property['name'];
        h2.style.marginTop = '1em';
        div.appendChild(h2);
        let description = document.createElement('div');
        description.innerHTML = property['description'];
        for (let element of description.querySelectorAll('*')) {
            element.style.margin = '0';
            element.style.boxSizing = 'border-box';
            element.style.padding = '0';
        }
        for (let code of description.querySelectorAll('code')) {
            code.style.color = '#080';
            code.style.fontFamily = '"Source Code Pro", sans-serif';
        }
        for (let dd of description.querySelectorAll('dd')) {
            dd.style.margin = '0 0 0 40px';
        }
        for (let dl of description.querySelectorAll('dl')) {
            dl.style.margin = '.8em 0';
        }
        for (let p of description.querySelectorAll('p')) {
            p.style.marginBottom = '1em';
        }
        description.style.marginBottom = '1em';
        description.style.color = '#555';
        div.appendChild(description);
        if (property['name'] === 'filename') {
            let textarea = document.createElement('textarea');
            textarea.style.width = '100%';
            textarea.style.resize = 'none';
            textarea.spellcheck = false;
            let observer = new MutationObserver(function (mutationsList, observer) {
                mutationsList.forEach(function (mutation) {
                    for (let node of mutation.addedNodes.values()) {
                        if (textarea === node) {
                            textarea.rows = 2;
                            let scrollHeightUnit = textarea.scrollHeight;
                            textarea.rows = 1;
                            let scrollHeight = textarea.scrollHeight;
                            scrollHeightUnit = scrollHeightUnit - scrollHeight;
                            textarea.addEventListener('input', function () {
                                textarea.rows = 1;
                                textarea.rows = textarea.rows + (textarea.scrollHeight - scrollHeight) / scrollHeightUnit;
                            });
                            window.addEventListener('resize', function () {
                                textarea.rows = 1;
                                textarea.rows = textarea.rows + (textarea.scrollHeight - scrollHeight) / scrollHeightUnit;
                            });
                            observer.disconnect();
                            break;
                        }
                    }
                });
            });
            observer.observe(div, { 'childList': true });
            div.appendChild(textarea);
        } else if (property['name'] === 'conflictAction' || property['name'] === 'saveAs') {
            if (property['input']['name'] === undefined) {
                property['input']['name'] = property['name'];
            }
            let i = 0;
            for (; i < property['input']['value'].length; i++) {
                let input = document.createElement('input');
                input.type = 'radio';
                input.id = `${property['input']['name']}radio${i}`;
                input.name = property['input']['name'];
                input.value = property['input']['value'][i];
                input.style.verticalAlign = 'middle';
                input.style.marginTop = '0';
                div.appendChild(input);
                let label = document.createElement('label');
                label.htmlFor = input.id;
                label.textContent = property['input']['value'][i];
                label.style.verticalAlign = 'middle';
                label.style.marginRight = '1em';
                div.appendChild(label);
            }
            let input = document.createElement('input');
            input.type = 'radio';
            input.id = `${property['input']['name']}radio${i}`
            input.name = property['input']['name'];
            input.value = 'unset';
            input.style.verticalAlign = 'middle';
            input.style.marginTop = '0';
            div.appendChild(input);
            let label = document.createElement('label');
            label.htmlFor = input.id;
            label.textContent = 'unset';
            label.style.verticalAlign = 'middle';
            label.style.marginRight = '1em';
            div.appendChild(label);
        } else if (property['name'] === 'autoDownload') {
            if (property['input']['name'] === undefined) {
                property['input']['name'] = property['name'];
            }
            let input = document.createElement('input');
            input.type = 'checkbox';
            input.id = `${property['input']['name']}checkbox0`;
            input.name = property['input']['name'];
            input.style.verticalAlign = 'middle';
            input.style.marginTop = '0';
            div.appendChild(input);
            let label = document.createElement('label');
            label.htmlFor = input.id;
            label.textContent = 'true';
            label.style.verticalAlign = 'middle';
            label.style.marginRight = '1em';
            div.appendChild(label);
        }
        div.style.marginBottom = '1em';
        options_div.appendChild(div);
    }
    let div = document.createElement('div');
    let button, i, span;
    button = document.createElement('button');
    button.className = 'btn btn-primary';
    button.style.fontFamily = 'inherit';
    i = document.createElement('i');
    i.className = 'material-icons';
    i.innerHTML = '&#xe161;';
    i.style.verticalAlign = 'middle';
    button.appendChild(i);
    span = document.createElement('span');
    span.textContent = 'Save';
    span.style.verticalAlign = 'middle';
    button.appendChild(span);
    button.addEventListener('click', save_options);
    div.appendChild(button);
    button = document.createElement('button');
    button.className = 'btn btn-danger';
    button.style.fontFamily = 'inherit';
    i = document.createElement('i');
    i.className = 'material-icons';
    i.innerHTML = '&#xe14c;';
    i.style.verticalAlign = 'middle';
    button.appendChild(i);
    span = document.createElement('span');
    span.textContent = 'Reset';
    span.style.verticalAlign = 'middle';
    button.appendChild(span);
    button.addEventListener('click', function () {
        set_options(default_option_obj());
    });
    div.appendChild(button);
    options_div.appendChild(div);
    restore_options();
});
function restore_options() {
    chrome.storage.sync.get(key, function (items) {
        if (key in items) {
            set_options(items[key]);
        } else {
            set_options(default_option_obj());
        }
    });
}
function default_option_obj() {
    let obj = {};
    options.forEach(function (value) {
        obj[value['name']] = value['default'];
    });
    return obj;
}
function set_options(obj) {
    for (let property of options) {
        let div = document.getElementById(`options-${property['name']}`);
        if (property['name'] === 'filename') {
            div.querySelector('textarea').value = obj[property['name']];
        } else if (property['name'] === 'conflictAction' || property['name'] === 'saveAs') {
            if (obj[property['name']] === null) {
                let inputChecked = div.querySelector('input:checked');
                if (inputChecked !== null) {
                    inputChecked.checked = false;
                }
            } else {
                div.querySelector(`input[value=${obj[property['name']]}]`).checked = true;
            }
        } else if (property['name'] === 'autoDownload') {
            div.querySelector('input').checked = obj[property['name']];
        }
    }
}
function save_options() {
    let items = {};
    items[key] = {};
    for (let property of options) {
        let div = document.getElementById(`options-${property['name']}`);
        let value;
        if (property['name'] === 'filename') {
            value = div.querySelector('textarea').value;
        } else if (property['name'] === 'conflictAction' || property['name'] === 'saveAs') {
            let inputChecked = div.querySelector('input:checked');
            if (inputChecked === null) {
                value = null;
            } else {
                value = inputChecked.value;
            }
            if (property['name'] === 'saveAs') {
                if (value === 'true' || value === 'false') {
                    value = JSON.parse(value);
                }
            }
        } else if (property['name'] === 'autoDownload') {
            value = div.querySelector('input').checked;
        }
        items[key][property['name']] = value;
    }
    chrome.storage.sync.set(items, function () {
        if ('lastError' in chrome.runtime) {
            console.log('chrome.runtime.lastError.message', chrome.runtime.lastError.message);
        } else {

        }
    });
}