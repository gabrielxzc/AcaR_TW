

function Logout() {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:8079/logout");

    xhr.addEventListener("load", function loadCallback() {
        let response = JSON.parse(xhr.response);

        if (response.status == "error") {
            document.getElementById("myBtn2").style.backgroundColor = "#293742";
            document.getElementById("myBtn2").innerHTML = "Logout!";
        } else {
            document.getElementById("myBtn").style.backgroundColor="#293742";
            document.getElementById("myBtn").innerHTML="Logout!"; 
            window.location.replace("http://localhost:8079/");
        }
    });
    xhr.addEventListener("error", function errorCallback() {
        console.log("Network error");
    });
    document.getElementById("myBtn").style.backgroundColor="#293742";
    document.getElementById("myBtn").innerHTML="Se proceseaza..."; 
    xhr.send();

}

