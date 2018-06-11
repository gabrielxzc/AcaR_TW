function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds) {
            break;
        }
    }
}

function validateLoginBoxes() {
    document.getElementById("parola").innerHTML = "";
    document.getElementById("spnName").innerHTML = "";
    var numeCont = document.getElementById("name");
    var parolaCont = document.getElementById("pass");
    var regex = /^[a-zA-Z]+[0-9]*[a-zA-Z]*$/;
    if (regex.test(numeCont.value) == false) {
        document.getElementById("spnName").innerHTML = "<p>Numele contului este format numai din caractere alfanumerice!</p>";
        return false;
    }
    if (numeCont.value.length < 5) {
        document.getElementById("spnName").innerHTML = "<p>Numele contului trebuie sa contina cel putin patru caractere!</p>";
        return false;
    }
    if (parolaCont.value.length < 9) {
        document.getElementById("parola").innerHTML = "<p>Parola introdusa este prea scurta, trebuie sa contina cel putin 6 litere!</p>";
        return false;
    }
    var regexpass = /^[a-z0-9]*[a-zA-Z0-9]*$/;
    if (regexpass.test(parolaCont.value) == false) {
        document.getElementById("parola").innerHTML = "<p>Parola trebuie sa contina numai caractere alfanumerice!</p>";
        return false;
    }

    var colectare = {
        "username": numeCont.value,
        "password": parolaCont.value
    }

    let xhr = new XMLHttpRequest();



    xhr.open("POST", "http://localhost:8081/login");

    xhr.addEventListener("load", function loadCallback() {
        let response = JSON.parse(xhr.response);
        if (response.status == "error") {
            document.getElementById("MesajConfirmare").innerHTML = response.message;
        } else {
            document.getElementById("MesajConfirmare").innerHTML = "Te-ai logat cu succes";

            var expires = "";
            var date = new Date();
            date.setTime(date.getTime() + (100 * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
            document.cookie = 'user' + "=" + (response.sessionId || "") + expires + "; path=/";

            sleep(1000);
            window.location.replace("http://localhost:8079");
        }
    });

    xhr.addEventListener("error", function errorCallback() {
        console.log("Network error");
    });

    xhr.send(JSON.stringify(colectare));
}

function validateRegisterBox() {

    var numarmatricol = document.getElementById("numar_matricol");
    var regex = /^[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][A-Z][A-Z][0-9][0-9][0-9][0-9][0-9][0-9]$/;
    if (regex.test(numarmatricol.value) == false) {
        document.getElementById("numarulmat").innerHTML = "Numarul matricol introdus nu respecta formatul!";
        return false;
    }
    if (numarmatricol.value == "") {
        document.getElementById("numarulmat").innerHTML = "Numarul matricol nu poate fi null";
        return false;
    }

    var colectare = {
        "nrMatricol": numarmatricol.value
    }

    let xhr = new XMLHttpRequest();



    xhr.open("POST", "http://localhost:8081/register-matricol");

    xhr.addEventListener("load", function loadCallback() {
        let response = JSON.parse(xhr.response);
        if (response.status == "error") {
            document.getElementById("confirmareNrMatricol").innerHTML = response.message;
        } else {
            document.getElementById("confirmareNrMatricol").innerHTML = response.message;
        }
    });

    xhr.addEventListener("error", function errorCallback() {
        console.log("Network error");
    });

    xhr.send(JSON.stringify(colectare));

}