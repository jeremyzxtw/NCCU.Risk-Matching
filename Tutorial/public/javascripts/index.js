'use strict';
window.onload = check();
function check() {
    if ($("#alert").val() != "") {
        alert($("#alert").val());
    }
}