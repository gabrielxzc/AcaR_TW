let xhr = new XMLHttpRequest();
xhr.open("GET", window.location.href+"/statistici");
xhr.addEventListener("load", function loadCallback() {
    let object = JSON.parse(xhr.response);
    object = JSON.parse(object);
    if (object.status == "error") {
        document.getElementById("div5").innerHTML = response.message;
        document.getElementById("div5").style.color = "Red";
    }
    var titlu1 = document.createElement("h3");
    var nod = document.createTextNode("Nota");
    titlu1.appendChild(nod);
    document.getElementById("nota").appendChild(titlu1);
    var titlu2 = document.createElement("h3");
    var nod2 = document.createTextNode("Numar de studenti");
    titlu2.appendChild(nod2);
    document.getElementById("numberOfStudents").appendChild(titlu2);
    var suma=0;
    for (var key in object.resources) {
        console.log(object.resources[key].nota);
        console.log(object.resources[key].numberOfStudents);
        /*var value = object.resources[key];
        if (key=="nota")
             {
               var nota=document.createElement("h2");
               var node=document.createTextNode(object.resources[key]);
               title.appendChild(node);
               document.getElementById("nota").appendChild(title);
             }*/
            var nota = document.createElement("h2");
            var numberOfStudents = document.createElement("h2");
            var node1 = document.createTextNode(object.resources[key].nota);
            var node2 = document.createTextNode(object.resources[key].numberOfStudents);
            nota.appendChild(node1);
            numberOfStudents.appendChild(node2);
            document.getElementById("nota").appendChild(nota);
            document.getElementById("numberOfStudents").appendChild(numberOfStudents);
            suma=object.resources[key].numberOfStudents+suma;
            console.log(suma);
        }
        var suma=document.createElement("h4");
        var nod = document.createTextNode(suma);
        suma.appendChild(nod);
        document.getElementById("suma").appendChild(mesajAtentionare);
    
});
xhr.send();
