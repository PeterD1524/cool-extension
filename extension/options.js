let options_div = document.getElementById('options');
let options = [
    {
        'name': 'filename',
        'description': "A file path relative to the Downloads directory to contain the downloaded file, possibly containing subdirectories. Absolute paths, empty paths, and paths containing back-references \"..\" will cause an error. onDeterminingFilename allows suggesting a filename after the file's MIME type and a tentative filename have been determined."
    },
    {
        'name': 'conflictAction',
        'description': "The action to take if filename already exists."
    },
    {
        'name': 'saveAs',
        'description': "Use a file-chooser to allow the user to select a filename regardless of whether filename is set or already exists."
    }
]

for (let property of options) {
    let div = document.createElement('div');
    let h2 = document.createElement('h2');
    h2.textContent = property['name'];
    div.appendChild(h2);
    let p = document.createElement('p');
    p.textContent = property['description'];
    div.appendChild(p);
    options_div.appendChild(div);
}