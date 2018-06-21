//$('document').ready(function () {

var resourcePageNumber = [1, 1, 1, 1, 1, 1];
let maxPageAccessed = [1, 1, 1, 1, 1, 1];
var resourcePages = [];
for (let i = 0; i < 6; ++i) {
    resourcePages[i] = [];
}
main();

function main() {

        resourceRequest("carti", "/extractBook/1");

        //onClickResource(,);
}

function resourceRequest(resourceId, url) {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost:8079/portfolio" + url);
    console.log("http://localhost:8079/portfolio" + url);
    xhr.addEventListener("load", function loadCallback() {
        let data = JSON.parse(xhr.response);
        let json = JSON.parse(data);
        console.log(json);
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
    var url="";
    if(resourceId=="carti") {resIndex=0;url="/books/"};
    if(resourceId=="articole") {resIndex=1;url="/articles/"};
    if(resourceId=="persoane") {resIndex=2;url="/persons/"};
    if(resourceId=="cod") {resIndex=3;url="/code/"};
    if(resourceId=="instrumente") {resIndex=4;url="/software/"};
    if(resourceId=="barfe") {resIndex=5;url="/gossips/"};
    leftButton.innerHTML = '<img class="arrow" src="/views/portfolio/assets/img/left-arrow.png">';
    leftButton.onclick = function () {
        var resurse=document.getElementsByClassName("resurse");
        if (resourcePageNumber[resIndex] == 1) {
            //disable left-button
            leftButton.setAttribute("opacity","0.5");
            return;
        } else {
            //console.log(resourcePageNumber[resIndex]);
            resurse[resIndex].innerHTML="";
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
        itemLink.href = "/materii/" + json.resources[i].materie + "/books/" + json.resources[i].titlu + "/resource";
        console.log(itemLink.href);
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
    rightButton.innerHTML = '<img class="arrow" src="/views/portfolio/assets/img/right-arrow.png">';
    rightButton.onclick = function () {
        var resurse=document.getElementsByClassName("resurse");
        var res=json.resources.length;
        console.log(res);
        if ( (resourcePageNumber[resIndex] == maxPageAccessed[resIndex])  && (res==5))  {
            url += (resourcePageNumber[0] + 1);
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
            return;
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