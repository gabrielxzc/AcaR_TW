

function adaugare_carte(){

    var titlu = document.getElementById("Titlul");
    var autor = document.getElementById("Autor");
    var anul = document.getElementById("Anul");
    var link = document.getElementById("Link");
    var imagine = document.getElementById("Img");
    var materie = document.getElementById("Materie");

    var colectare = {
        "titlu": titlu.value,
        "autor": autor.value,
        "anul_publicarii": anul.value,
        "link": link.value,
        "imagine": imagine.value,
        "materie": materie.value
    }

    let xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:8079/book");

    xhr.addEventListener("load", function loadCallback() {
        let response = JSON.parse(xhr.response);

        if (response.status == "error") {
            alert('A aparut o eroare');
        } else {
           alert('Adaugarea s-a realizat cu succes!');
        }
    });

    xhr.send(JSON.stringify(colectare));
}