//$('document').ready(function () {

var booksPageNumber=0;
main();

function main() {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", window.location.href + "/info");

    xhr.addEventListener("load", function loadCallback() {
        let data = JSON.parse(xhr.response);
        let jsonMaterie = JSON.parse(data);
        //title
        var titleContent = document.getElementById("titlu"); titleContent.innerHTML = jsonMaterie.subject.titlu;
        var introductionInfo = document.getElementById("introducere");
        var list = document.createElement("ol"); list.id = "listam";
        var listItem = document.createElement("li");
        var listItemHref = document.createElement("a"); listItemHref.target = "_blank"; listItemHref.href = jsonMaterie.subject.paginaCursului; listItemHref.innerHTML = "Pagina cursului ";
        listItem.appendChild(listItemHref); list.appendChild(listItem);
        var listItem = document.createElement("li"); listItem.innerHTML = "&nbsp;|&nbsp;"; list.appendChild(listItem);
        var listItem = document.createElement("li");
        var listItemHref = document.createElement("a"); listItemHref.target = "_blank"; listItemHref.href = jsonMaterie.subject.paginaTitular; listItemHref.innerHTML = jsonMaterie.subject.titular;
        listItem.appendChild(listItemHref); list.appendChild(listItem);
        var listItem = document.createElement("li"); listItem.innerHTML = "&nbsp;| Anul&nbsp;" + jsonMaterie.subject.an + " "; list.appendChild(listItem);
        var listItem = document.createElement("li"); listItem.innerHTML = "&nbsp;| Semestrul&nbsp;" + jsonMaterie.subject.semestru; list.appendChild(listItem);
        introductionInfo.appendChild(list);
        //book recommendation
        let jsonBooks, jsonArticles; //...
        booksRequest(jsonCarti);

        /*document.getElementsByClassName("left-arrow")[0].onclick()=function(){
            if(booksPageNumber==0){
                document.getElementsByClassName("left-arrow")[0].className="left-arrow left-arrow-first";
                return;
            }
            
            return;
        }*/

    });
    xhr.addEventListener("error", function errorCallback() {
        console.log("Network error");
    });
    xhr.send();
}

function booksRequest(json) {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", window.location.href + "/books/1");
    xhr.addEventListener("load", function loadCallback() {
        let data = JSON.parse(xhr.response);
        let json = JSON.parse(data);
        var recommendationsContent = document.getElementById("recommendations");
        createTimeline(recommendationsContent, json);
    });
    xhr.addEventListener("error", function errorCallback() {
        console.log("Network error");
    });
    xhr.send();
}

function createTimeline(recommendationsContent, json) {
    var timeline = document.createElement("div"); timeline.className = "timeline";
    //Tool title
    var timelineTitle = document.createElement("h2"); timelineTitle.className = "titlu-materie";
    var titleText = document.createTextNode(windows.href.split('/'));
    timelineTitle.appendChild(titleText);
    timeline.appendChild(timelineTitle);

    //Left button
    var buttonContent = document.createElement("div"); buttonContent.className = "left-arrow";
    var leftButton = document.createElement("a"); leftButton.innerHTML = '<img class="arrow" src="/views/recommendations/assets/img/left-arrow.png">';
    buttonContent.appendChild(leftButton); timeline.appendChild(buttonContent);

    var listItems = document.createElement("ol"); listItems.className = "nav";
    for (var i = 0; i < 5; ++i) {
        var listItem = document.createElement("li");
        var itemLink = document.createElement("a"); itemLink.href = "#";
        var itemContent = document.createElement("div"); itemContent.className = "timeline-item";

        //creating content
        var contentImg = document.createElement("img"); contentImg.className = "content-img";
        contentImg.src = json.books[i].img;
        var contentTitle = document.createElement("p"); contentTitle.className = "text-content";
        var textNode = document.createTextNode(json.books[i].title); contentTitle.appendChild(textNode);
        var contentAuthor = document.createElement("p"); contentAuthor.className = "author-content";
        textNode = document.createTextNode(json.books[i].author); contentAuthor.appendChild(textNode);
        itemContent.appendChild(contentImg);
        itemContent.appendChild(contentTitle);
        itemContent.appendChild(contentAuthor);

        itemLink.appendChild(itemContent);
        listItem.appendChild(itemLink);
        listItems.appendChild(listItem);
    }
    timeline.appendChild(listItems);

    //Right button
    var buttonContent = document.createElement("div"); buttonContent.className = "right-arrow";
    var rightButton = document.createElement("a"); rightButton.innerHTML = '<img class="arrow" src="/views/recommendations/assets/img/right-arrow.png">';
    buttonContent.appendChild(rightButton); timeline.appendChild(buttonContent);

    //append timeline to whole content
    recommendationsContent.appendChild(timeline);
}