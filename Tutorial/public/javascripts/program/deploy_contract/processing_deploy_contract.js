'use strict';
/*5秒自動轉址*/
/*
setTimeout(function () {
    // after 5 seconds
    window.location = "/currency_exchange";
}, 5000)
*/

//禁止右鍵選單
document.addEventListener('contextmenu', function (e) {
    e.preventDefault();
})

//禁止上一頁
history.pushState(null, null, location.href);
window.onpopstate = function () {
    history.go(1);
};

//5秒後自動提交給下一頁,順便轉跳
setTimeout("document.test.submit()", 90000);