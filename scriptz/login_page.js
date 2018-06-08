function validateLoginBoxes() {
    document.getElementById("parola").innerHTML="";
    document.getElementById("spnName").innerHTML="";
    var numeCont = document.getElementById("name");
    var parolaCont = document.getElementById("pass");
    var regex = /^[a-zA-Z]+[0-9]*[a-zA-Z]*$/;
    if (regex.test(numeCont.value) == false) {
        document.getElementById("spnName").innerHTML = "Numele contului este format numai din caractere alfanumerice!";
        return false;
    }
    if (numeCont.value.length < 4) {
        document.getElementById("spnName").innerHTML = "Numele contului trebuie sa contina cel putin patru caractere!";
        return false;
    }
    if (parolaCont.value.length < 6) {
        document.getElementById("parola").innerHTML = "Parola introdusa este prea scurta, trebuie sa contina cel putin 6 litere!";
        return false;
    }
    var regexpass = /^[a-z0-9]*[A-Z]+[a-zA-Z0-9]*$/;
    if (regexpass.test(parolaCont.value) == false) {
        document.getElementById("parola").innerHTML = "Parola trebuie sa contina numai caractere alfanumerice si cel putin o litera mare!";
        return false;
    }
    let xhr = new XMLHttpRequest();

    xhr.open("POST", "localhost:8081");

    xhr.addEventListener("load", function loadCallback() {
        switch (xhr.status) {
            case 200:
                console.log("Success" + xhr.response);
                break;
            case 404:
                console.log("Oups! Not found");
                break;
        }
    });

    xhr.addEventListener("error", function errorCallback() {
        console.log("Network error");
    });

    let payload = {
        username: "iampava",
        pass: "1234"
    }
    xhr.send(JSON.stringify(payload));


}

function validateRegisterBox() {

    var numarmatricol = document.getElementById("numar_matricol");
    var regex = /^[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][A-Z][A-Z][0-9][0-9][0-9][0-9][0-9][0-9]$/;
    if (regex.test(numarmatricol.value) == false) {
        document.getElementById("numarulmat").innerHTML = "Numarul matricol introdus nu respecta formatul!";
        return false;
    }
    if (numarmatricol.value == "") {
        alert("Ce numar e asta oconasule?");
        return false;
    }

}
