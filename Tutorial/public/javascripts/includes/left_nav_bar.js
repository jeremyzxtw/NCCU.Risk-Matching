'use strict';
function openNav() { /*如果已經是開啟sidebar的狀況,按三條線 會關閉,若無開啟,則按三條線 會開啟*/
    if (document.getElementById("mySidenav").style.width == "250px") {
        document.getElementById("mySidenav").style.width = "0";
        document.getElementById("sidebaropen").style.marginLeft = "0";
        //document.body.style.backgroundColor = "#384047";
        //document.getElementById("main_form").style.backgroundColor = "#fff";
    }
    else {
        document.getElementById("mySidenav").style.width = "250px";
        document.getElementById("sidebaropen").style.marginLeft = "250px";
        //document.body.style.backgroundColor = "#1e2226";
        //document.getElementById("main_form").style.backgroundColor = "#A9A9A9";
    }

}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("sidebaropen").style.marginLeft = "0";
    //document.body.style.backgroundColor = "#384047";
    //document.getElementById("main_form").style.backgroundColor = "#fff";
}
