//$('document').ready(function () {
let xhr = new XMLHttpRequest();
xhr.open("GET", window.location.href+"/info");

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
    //recommendations
    var recommendationsContent = document.getElementById("recommendations");

    var jsonInstrumente = [
        {
            numeInstrument: "Carti",
            informatiiInstrument: [
                { img: "./assets/img/witch.jpg", title: "Veteranul pulii", author: "Mihai Viteazu & Agatha Christie" },
                { img: "./assets/img/witch.jpg", title: "Veteranul pulii", author: "Mihai Viteazu & Agatha Christie" },
                { img: "./assets/img/witch.jpg", title: "Veteranul pulii", author: "Mihai Viteazu & Agatha Christie" },
                { img: "./assets/img/witch.jpg", title: "Veteranul pulii", author: "Mihai Viteazu & Agatha Christie" },
                { img: "./assets/img/witch.jpg", title: "Veteranul pulii", author: "Mihai Viteazu & Agatha Christie" }
            ]
        }
    ];

    /*<div class="left-arrow"><button>Press button</button></div>*/
    function createTimeline(index) {


        var timeline = document.createElement("div"); timeline.className = "timeline";
        //Tool title
        var timelineTitle = document.createElement("h2"); timelineTitle.className = "titlu-materie";
        var titleText = document.createTextNode(jsonInstrumente[index].numeInstrument);
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
            contentImg.src = jsonInstrumente[index].informatiiInstrument[i].img;
            var contentTitle = document.createElement("p"); contentTitle.className = "text-content";
            var textNode = document.createTextNode(jsonInstrumente[index].informatiiInstrument[i].title); contentTitle.appendChild(textNode);
            var contentAuthor = document.createElement("p"); contentAuthor.className = "author-content";
            textNode = document.createTextNode(jsonInstrumente[index].informatiiInstrument[i].author); contentAuthor.appendChild(textNode);
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
        return timeline;
    }
    for (var i = 0; i < 5; ++i) {
        recommendationsContent.appendChild(createTimeline(0));
    }
});
xhr.addEventListener("error", function errorCallback() {
    console.log("Network error");
});
xhr.send();