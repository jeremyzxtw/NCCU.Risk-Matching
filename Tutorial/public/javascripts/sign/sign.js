function show_hide() {
    var login = document.getElementById("container1");
    var signup = document.getElementById("container2");
    var copyright = document.getElementById("copyright");

    if (login.style.display === "none") {
        login.style.display = "block";  //lonin�X�{
        document.getElementById("username").value = "";
        document.getElementById("password").value = "";
        signup.style.display = "none";  //signup����
        copyright.style.margin = "200px 0px 0px 0px";
    } else {
        login.style.display = "none";   //login����
        signup.style.display = "block"; //signup�X�{
        signup.style.visibility = "visible";
        copyright.style.margin = "200px 0px 0px 0px";

        document.getElementById("fullname").value = "";
        document.getElementById("username2").value = "";
        document.getElementById("password2").value = "";
        document.getElementById("comfirm_password").value = "";
    }
}