'use strict';
/*5��۰���}*/
/*
setTimeout(function () {
    // after 5 seconds
    window.location = "/currency_exchange";
}, 5000)
*/

//�T��k����
document.addEventListener('contextmenu', function (e) {
    e.preventDefault();
})

//�T��W�@��
history.pushState(null, null, location.href);
window.onpopstate = function () {
    history.go(1);
};

//5���۰ʴ��浹�U�@��,���K���
setTimeout("document.test.submit()", 8000);