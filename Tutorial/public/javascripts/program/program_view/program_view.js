function createEditor(name) {
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

    //如果有傳值,則寫入default value
    if (document.getElementById("temporarily")) {
        editor.setValue(document.getElementById("temporarily").innerHTML);
        editor.clearSelection();
    }
}
createEditor("code");
