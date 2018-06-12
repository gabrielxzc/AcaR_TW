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
    document.getElementById("MesajConfirmare").innerHTML= "";

    var numeCont = document.getElementById("name");
    var parolaCont = document.getElementById("pass");
    var regex = /^[a-zA-Z]+[0-9]*[a-zA-Z]*$/;

    if (regex.test(numeCont.value) == false) {
        document.getElementById("spnName").innerHTML = "<p>Numele de utilizator poate contine doar caractere alfanumerice!</p>";
        return false;
    }

    if (numeCont.value.length < 5) {
        document.getElementById("spnName").innerHTML = "<p>Numele de utilizator trebuie sa aiba o lungime de cel putin 5!</p>";
        return false;
    }

    if (parolaCont.value.length < 9) {
        document.getElementById("parola").innerHTML = "<p>Parola trebuie sa contina cel putin 9 caractere!</p>";
        return false;
    }

    var regexpass = /^[a-z0-9]*[a-zA-Z0-9]*$/;
    if (regexpass.test(parolaCont.value) == false) {
        document.getElementById("parola").innerHTML = "<p>Parola poate contine doar caractere alfanumerice!</p>";
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
            document.getElementById("MesajConfirmare").style.color = "red";
            document.getElementById("MesajConfirmare").innerHTML = response.message;
            document.getElementById("loginbtn").style.backgroundColor="#293742";
            document.getElementById("loginbtn").innerHTML="Autentifica-te!"
        } else {
            document.getElementById("MesajConfirmare").style.color = "green";
            document.getElementById("MesajConfirmare").innerHTML = "Te-ai autentificat cu succes ...";
            document.getElementById("loginbtn").style.backgroundColor="#293742";
            document.getElementById("loginbtn").innerHTML="Autentifica-te";    
            document.cookie = 'user' + "=" + response.sessionId + "; path=/";
            window.setTimeout(function() {
                window.location.replace("http://localhost:8079/");  
            },1500);    
        }
    });

    xhr.addEventListener("error", function errorCallback() {
        document.getElementById("MesajConfirmare").style.color = "red";
        document.getElementById("MesajConfirmare").innerHTML = "A aparut o eroare de comunicare in retea!";
    });
    document.getElementById("loginbtn").style.backgroundColor="#293742";
    document.getElementById("loginbtn").innerHTML="Se proceseaza..";
    xhr.send(JSON.stringify(colectare));
}

function validateRegisterBox() {
    document.getElementById("numarulmat").innerHTML = "";
    document.getElementById("confirmareNrMatricol").innerHTML="";
    var numarmatricol = document.getElementById("numar_matricol");

    var regex = /^[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][A-Z][A-Z][0-9][0-9][0-9][0-9][0-9][0-9]$/;
    if (regex.test(numarmatricol.value) == false) {
        document.getElementById("numarulmat").innerHTML = "Numarul matricol introdus nu respecta formatul standard!";
        return false;
    }

    if (numarmatricol.value == "") {
        document.getElementById("numarulmat").innerHTML = "Campul pentru numarul matricol nu poate fi lasat gol!";
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
            document.getElementById("confirmareNrMatricol").style.color = "red";
            document.getElementById("confirmareNrMatricol").innerHTML = response.message;
            document.getElementById("registerbtn").style.backgroundColor="#293742";
            document.getElementById("registerbtn").innerHTML="Inregistreaza-te";
        } else {
            document.getElementById("confirmareNrMatricol").style.color = "green";
            document.getElementById("confirmareNrMatricol").innerHTML = response.message;
            document.getElementById("registerbtn").style.backgroundColor="#293742";
            document.getElementById("registerbtn").innerHTML="Inregistreaza-te";
        }
    });

    xhr.addEventListener("error", function errorCallback() {
        document.getElementById("confirmareNrMatricol").style.color = "red";
        document.getElementById("confirmareNrMatricol").innerHTML = "A aparut o eroare de comunicare in retea!";
    });
    document.getElementById("registerbtn").style.backgroundColor="#293742";
    document.getElementById("registerbtn").innerHTML="Se proceseaza..";
    xhr.send(JSON.stringify(colectare));
}