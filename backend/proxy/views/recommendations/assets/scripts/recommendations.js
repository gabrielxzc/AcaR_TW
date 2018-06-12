//$('document').ready(function () {

var resourcePageNumber = [1, 0, 0, 0, 0, 0];
let maxPageAccessed = [1, 0, 0, 0, 0, 0];
var resourcePages = [];
for (let i = 0; i < 6; ++i) {
    resourcePages[i] = [];
}
main();

function main() {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", window.location.href + "/info");

    xhr.addEventListener("load", function loadCallback() {
        let data = JSON.parse(xhr.response);
        let jsonMaterie = JSON.parse(data);
        //title
        var titleContent = document.getElementById("titlu");
        titleContent.innerHTML = jsonMaterie.subject.titlu;
        var introductionInfo = document.getElementById("introducere");
        var list = document.createElement("ol");
        list.id = "listam";
        var listItem = document.createElement("li");
        var listItemHref = document.createElement("a");
        listItemHref.target = "_blank";
        listItemHref.href = jsonMaterie.subject.paginaCursului;
        listItemHref.innerHTML = "Pagina cursului ";
        listItem.appendChild(listItemHref);
        list.appendChild(listItem);
        var listItem = document.createElement("li");
        listItem.innerHTML = "&nbsp;|&nbsp;";
        list.appendChild(listItem);
        var listItem = document.createElement("li");
        var listItemHref = document.createElement("a");
        listItemHref.target = "_blank";
        listItemHref.href = jsonMaterie.subject.paginaTitular;
        listItemHref.innerHTML = jsonMaterie.subject.titular;
        listItem.appendChild(listItemHref);
        list.appendChild(listItem);
        var listItem = document.createElement("li");
        listItem.innerHTML = "&nbsp;| Anul&nbsp;" + jsonMaterie.subject.an + " ";
        list.appendChild(listItem);
        var listItem = document.createElement("li");
        listItem.innerHTML = "&nbsp;| Semestrul&nbsp;" + jsonMaterie.subject.semestru;
        list.appendChild(listItem);
        introductionInfo.appendChild(list);
        //book recommendation
        let jsonBooks, jsonArticles; //...
        resourceRequest("carti", "/books/1");


        //onClickResource(,);

    });
    xhr.addEventListener("error", function errorCallback() {
        console.log("Network error");
    });
    xhr.send();
}

function resourceRequest(resourceId, url) {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", window.location.href + url);
    xhr.addEventListener("load", function loadCallback() {
        let data = JSON.parse(xhr.response);
        let json = JSON.parse(data);
        //console.log(json);
        var recommendationsContent = document.getElementById("recommendations");
        createTimeline(resourceId, json);
    });
    xhr.addEventListener("error", function errorCallback() {
        console.log("Network error");
    });
    xhr.send();
}

function createTimeline(resourceId, json) {
    var timeline = document.createElement("div");
    timeline.className = "timeline";
    //Tool title
    var timelineTitle = document.createElement("h2");
    timelineTitle.className = "titlu-materie";
    var titleText = document.createTextNode('Carti');
    timelineTitle.appendChild(titleText);
    timeline.appendChild(timelineTitle);

    //Left button
    var buttonContent = document.createElement("div");
    buttonContent.className = "left-arrow";
    var leftButton = document.createElement("a");
    leftButton.innerHTML = '<img class="arrow" src="/views/recommendations/assets/img/left-arrow.png">';
    leftButton.onclick = function () {
        var resurse=document.getElementsByClassName("resurse"); var resIndex=0;
        if (resourcePageNumber[resIndex] == 1) {
            //disable left-button
            leftButton.setAttribute("opacity","0.5");
            return;
        } else {
            //console.log(resourcePageNumber[resIndex]);
            resurse[0].innerHTML="";
            /*while (document.getElementsByClassName("resurse").firstChild) {
                resurse[0].removeChild(document.getElementsByClassName("resurse").firstChild);
            }*/
            document.getElementsByClassName("resurse")[0].appendChild(resourcePages[resIndex][resourcePageNumber[resIndex] - 2]);
            resourcePageNumber[resIndex]--;
        }
    };
    buttonContent.appendChild(leftButton);
    timeline.appendChild(buttonContent);

    var listItems = document.createElement("ol");
    listItems.className = "nav";
    for (var i = 0; i < json.resources.length; ++i) {
        var listItem = document.createElement("li");
        var itemLink = document.createElement("a");
        itemLink.href = "#";
        var itemContent = document.createElement("div");
        itemContent.className = "timeline-item";

        //creating content
        var contentImg = document.createElement("img");
        contentImg.className = "content-img";
        contentImg.src = json.resources[i].imagine;
        var contentTitle = document.createElement("p");
        contentTitle.className = "text-content";
        var textNode = document.createTextNode(json.resources[i].titlu);
        contentTitle.appendChild(textNode);
        var contentAuthor = document.createElement("p");
        contentAuthor.className = "author-content";
        itemContent.appendChild(contentImg);
        itemContent.appendChild(contentTitle);

        itemLink.appendChild(itemContent);
        listItem.appendChild(itemLink);
        listItems.appendChild(listItem);
    }
    timeline.appendChild(listItems);

    //Right button
    var buttonContent = document.createElement("div");
    buttonContent.className = "right-arrow";
    var rightButton = document.createElement("a");
    rightButton.innerHTML = '<img class="arrow" src="/views/recommendations/assets/img/right-arrow.png">';
    rightButton.onclick = function () {
        var resurse=document.getElementsByClassName("resurse"); var resIndex=0;
        var res=document.getElementsByClassName("timeline-item").length;
        console.log(res);
        if ( (resourcePageNumber[resIndex] == maxPageAccessed[resIndex])  && (res==5))  {
            //console.log(resourcePageNumber[0])
            url = "/books" +"/"+ (resourcePageNumber[0] + 1);
            //console.log(url);
            while (resurse[0].firstChild) {
                resurse[0].removeChild(resurse[0].firstChild);
            }
            resourceRequest(resurse[0].id, url);
            resourcePageNumber[resIndex] += 1;
            maxPageAccessed[resIndex] += 1;
            //make a new request
            return;
        } else  if ( (resourcePageNumber[resIndex] == maxPageAccessed[resIndex])  && (res==5)){
            return;
        }
        else if (resourcePageNumber[resIndex] < maxPageAccessed[resIndex]) {
            while (resurse[0].firstChild) {
                resurse[0].removeChild(resurse[0].firstChild);
            }
            //console.log(resourcePageNumber[resIndex]);
            resurse[0].appendChild(resourcePages[resIndex][resourcePageNumber[resIndex] + 0]);
            resourcePageNumber[resIndex]++;
        }
    };
    buttonContent.appendChild(rightButton);
    timeline.appendChild(buttonContent);

    //display info on webpage
    var resourceContent = document.getElementById(resourceId);
    resourceContent.appendChild(timeline);
    var resIndex = resourceContent.getAttribute('value');
    resourcePages[resIndex].push(timeline);
    //console.log(resourcePages);
}
/*
function onClickResource() {
    var resources = document.querySelectorAll(".resource");
    for (var i = 0; i < resources.length; ++i) {
        var resIndex = resources[i].getAttribute('value');
        resources[i].getElementsByClassName("left-arrow").onclick = function (resIndex) {
            if (resourcePageNumber[resIndex] == 0) {
                //disable left-button
                return;
            } else {
                while (resource[i].firstChild) {
                    removeChild(resource[i].firstChild);
                }
                resource[i].appendChild(resourcePages[resIndex][resourcePageNumber[resIndex] - 1]);
                resourcePageNumber[resIndex]--;
            }
        }

        resources[i].getElementsByClassName("right-arrow").onclick = function (resIndex) {
            if (resourcePageNumber[resIndex] == maxPageAccessed[resIndex] && noOfElements == 5) {
                var url = "";
                if (resIndex == 1) {
                    url += "books";
                }
                if (resIndex == 1) {
                    url += "books";
                }
                if (resIndex == 1) {
                    url += "books";
                }
                if (resIndex == 1) {
                    url += "books";
                }
                if (resIndex == 1) {
                    url += "books";
                }
                if (resIndex == 1) {
                    url += "books";
                }
                url += resourcePageNumber + 1;
                while (resource[i].firstChild) {
                    removeChild(resource[i].firstChild);
                }
                resourceRequest(resources[i].id, url);
                resourcePageNumber[resIndex] += 1;
                maxPageAccessed[resIndex] += 1;
                //make a new request
                return;
            } else if (resourcePageNumber[resIndex] < maxPageAccessed[resIndex]) {
                while (resource[i].firstChild) {
                    removeChild(resource[i].firstChild);
                }
                resource[i].appendChild(resourcePages[resIndex][resourcePageNumber[resIndex] + 1]);
                resourcePageNumber[resIndex]++;
            }
        }
    }
}*/