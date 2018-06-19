function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
let xhr = new XMLHttpRequest();
xhr.open("GET", window.location.href + "/info");
console.log(window.location.href + "/info");
xhr.addEventListener("load", function loadCallback() {
        let response = JSON.parse(xhr.response);
        object=JSON.parse(response);
        if (object.status == "error") {
            document.getElementById("div5").innerHTML = response.message;
            document.getElementById("div5").style.color = "Red";
        }   
        for (var key in object.resources) {
            var value = object.resources[key];      
            if (key=="titlu")
             {
               var title=document.createElement("h2");
               var node=document.createTextNode(object.resources[key]);
               title.appendChild(node);
               document.getElementById("titlu").appendChild(title);
             }   
             else if (key=="imagine") 
             {
                 document.getElementById("imagine-carte").src=object.resources[key];
             }
             else if (key=="link")
             {
                var itemLink = document.createElement("a");
                var newP = document.createElement("p");
                var node = document.createTextNode("Link spre resursa");
                itemLink.href=object.resources[key];    
                newP.appendChild(node);
                itemLink.appendChild(newP);
                document.getElementById("infos").appendChild(itemLink);    
             }
             else {    
                var newP = document.createElement("p");
                var node = document.createTextNode(capitalizeFirstLetter(key) + " : " + value);
                newP.appendChild(node);
                document.getElementById("infos").appendChild(newP);
        }
    }

    });

    xhr.addEventListener("error", function errorCallback() {
        console.log("Network error");
    });
    xhr.send();

