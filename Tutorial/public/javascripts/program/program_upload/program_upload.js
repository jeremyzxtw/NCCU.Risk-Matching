﻿function createEditor(name) {
    // find the textarea
    var textarea = document.querySelector("form textarea[name=" + name + "]");

    // create ace editor 
    var editor = ace.edit();
    editor.container.style.height = "500px";
    editor.container.style.width = "650px";
    editor.session.setValue(textarea.value);
    // replace textarea with ace
    textarea.parentNode.insertBefore(editor.container, textarea);
    textarea.style.display = "none";
    // find the parent form and add submit event listener
    var form = textarea;
    while (form && form.localName != "form") form = form.parentNode;
    form.addEventListener("submit", function () {
        // update value of textarea to match value in ace
        textarea.value = editor.getValue();
    }, true)
}
createEditor("code");
