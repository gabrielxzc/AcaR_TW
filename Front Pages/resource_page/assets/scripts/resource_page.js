var title = "morometiizzzzzzzzzzzzzzzzzzzzz";
var name = "marin preda nebunu de cursa lunga";
var link = "https://iampava.com/";
var linkrec = "";
var value1 = "";
var value2 = "";
var value3 = "";
var value4 = "";
var errorkey = "";

var details = {
    "title": title,
    "author": name,
    "link": link,
    "key1": value1,
    "key2": value2,
    "key3": value3,
    "key4": value4,
    "errorkey": errorkey
};

for (var key in details) {
    var value = details[key];
    if (key == "title") {
        var newH2=document.createElement("h3");
        var nodet=document.createTextNode(value);
        newH2.appendChild(nodet);
        document.getElementById("titlu").appendChild(newH2);
    }
    else
    {
        var newP = document.createElement("p");
        var node = document.createTextNode(key + ":" + value);
        newP.appendChild(node);
        document.getElementById("details").appendChild(newP);
    }
}


let xhr = new XMLHttpRequest();
xhr.open("GET", "http://localhost:8085/resource");
xhr.addEventListener("load", function loadCallback() {
    let response = JSON.parse(xhr.response);
    if (response.status == "error") {
        document.getElementById("div5").innerHTML = response.message;
        document.getElementById("div5").style.color = "Red";
    }
    for (var key in response) {
        var value = response[key];
        {
            var newP = document.createElement("p");
            var node = document.createTextNode(key + ":" + value);
            newP.appendChild(node);
            document.getElementById("details").appendChild(newP);
        }
    }

});

xhr.addEventListener("error", function errorCallback() {
    console.log("Network error");
});
xhr.send();
