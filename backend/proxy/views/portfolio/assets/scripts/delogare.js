

function Logout() {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:8079/logout");

    xhr.addEventListener("load", function loadCallback() {
        let response = JSON.parse(xhr.response);

        if (response.status == "error") {
            alert('A aparut o eroare');
        } else {
           alert('cerea a fost trimisa!');
           window.location.replace("http://localhost:8079/");
        }
    });
    xhr.addEventListener("error", function errorCallback() {
        console.log("Network error");
    });
    xhr.send();

}

