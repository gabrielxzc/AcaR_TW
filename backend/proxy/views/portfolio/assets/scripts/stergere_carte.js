

function stergere_carte(){

    var titlu = document.getElementById("Titlul1");

    var colectare = {
        "titlu": titlu.value
    }
    console.log(colectare.titlu);
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:8079/portfolio/removeBook");

    xhr.addEventListener("load", function loadCallback() {
        let response = JSON.parse(xhr.response);

        if (response.status == "error") {
            alert('A aparut o eroare');
        } else {
           alert('Stergerea s-a realizat cu succes!');
        }
    });

    xhr.send(JSON.stringify(colectare));
}