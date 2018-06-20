//$('document').ready(function () {

var resourcePageNumber = [1, 1, 1, 1, 1, 1];
let maxPageAccessed = [1, 1, 1, 1, 1, 1];
var resourcePages = [];
for (let i = 0; i < 6; ++i) {
    resourcePages[i] = [];
}
main();

function main() {
    document.getElementById("submit-button").onclick=function(){
        console.log(window.location.href);
        window.location.replace(window.location.href+"/recommendations");
    }
    document.getElementById("acces-portofoliu-button").onclick=function(){
        console.log(window.location.href);
        window.location.replace('http://localhost:8079/portfolio');
    }

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
        addAnothers();

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
    var url="";
    if(resourceId=="carti") {resIndex=0;url="/books/"};
    if(resourceId=="articole") {resIndex=1;url="/articles/"};
    if(resourceId=="persoane") {resIndex=2;url="/persons/"};
    if(resourceId=="cod") {resIndex=3;url="/code/"};
    if(resourceId=="instrumente") {resIndex=4;url="/software/"};
    if(resourceId=="barfe") {resIndex=5;url="/gossips/"};
    leftButton.innerHTML = '<img class="arrow" src="/views/recommendations/assets/img/left-arrow.png">';
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
    rightButton.innerHTML = '<img class="arrow" src="/views/recommendations/assets/img/right-arrow.png">';
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


function addAnothers(){
    var recommendationsContent=document.getElementById("recommendations");
    var jsonInstrumente=[
        {
            numeInstrument: "Persoane",
            informatiiInstrument:[
                {img:"https://profs.info.uaic.ro/~adiftene/Img/AdrianIftene.jpg", title:"Adrian Iftene", author:"https://profs.info.uaic.ro/~adiftene/"},
                {img:"https://scontent-otp1-1.xx.fbcdn.net/v/t1.0-9/14955975_1757955031121056_6035902185512446765_n.jpg?_nc_cat=0&oh=20f87eeaf49c2dbc2b47b330a3596b71&oe=5BBED273", title:"Pintilei Serban", author:"https://www.facebook.com/serban.mihai.1650"},
                {img:"https://scontent-otp1-1.xx.fbcdn.net/v/t1.0-9/19396637_1430730983682020_4504403288302334998_n.jpg?_nc_cat=0&oh=d4cf7eb931fb5434ad04a00d8f9cb66a&oe=5BB7A53F", title:"Ninicu Cristian", author:"https://www.facebook.com/cristian.ninicu"},
                {img:"https://scontent-otp1-1.xx.fbcdn.net/v/t1.0-9/15894535_1213946135348553_5658901539756081777_n.jpg?_nc_cat=0&oh=7807e63bc1009536d1fd5328d19c4b15&oe=5BAEB61C", title:"Ioan Marinceac", author:"https://www.facebook.com/marincean.ioan.3"}
            ]
        },
        {
            numeInstrument: "Barfe si ponturi",
            informatiiInstrument:[
                {img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFlO_fQQ9mZuWaQ8h1Yyi_NXPV1xzLwYP-f1wzu_nsMFyGMm35DR6rnw", title:"Examenul este corectat de profesorul de la seminar", author:"asd"},
                {img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFlO_fQQ9mZuWaQ8h1Yyi_NXPV1xzLwYP-f1wzu_nsMFyGMm35DR6rnw", title:"Profesorul x puncteaza mai putin in prima parte a semestrului, dar mai mult la proiect", author:"asdsad"},
                {img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFlO_fQQ9mZuWaQ8h1Yyi_NXPV1xzLwYP-f1wzu_nsMFyGMm35DR6rnw", title:"Se dau la curs informatii care nu sunt in curs si se pot da la examen", author:"asdas"},
                {img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFlO_fQQ9mZuWaQ8h1Yyi_NXPV1xzLwYP-f1wzu_nsMFyGMm35DR6rnw", title:"Profesorul X este interesat mai mult de partea de front-end a proiectului", author:"asd"}
            ]
        }
    ];

    function createTimeline(index){
        var timeline=document.createElement("div"); timeline.className="timeline";
        //Tool title
        var timelineTitle=document.createElement("h2"); timelineTitle.className="titlu-materie";
        var titleText=document.createTextNode(jsonInstrumente[index].numeInstrument);
        timelineTitle.appendChild(titleText);
        timeline.appendChild(timelineTitle);

        //Left button
        var buttonContent=document.createElement("div"); buttonContent.className="left-arrow";
        var leftButton=document.createElement("a"); leftButton.innerHTML='<img class="arrow" src="/views/recommendations/assets/img/left-arrow.png">';
        buttonContent.appendChild(leftButton); timeline.appendChild(buttonContent);

        var listItems=document.createElement("ol"); listItems.className="nav";
        for(var i=0;i<jsonInstrumente[index].informatiiInstrument.length;++i){
            var listItem=document.createElement("li");
            var itemLink=document.createElement("a"); itemLink.href=jsonInstrumente[index].informatiiInstrument[i].author;
            var itemContent=document.createElement("div"); itemContent.className="timeline-item";
            
        //creating content
            var contentImg=document.createElement("img"); contentImg.className="content-img";
            contentImg.src=jsonInstrumente[index].informatiiInstrument[i].img;
            var contentTitle=document.createElement("p"); contentTitle.className="text-content";
            var textNode=document.createTextNode(jsonInstrumente[index].informatiiInstrument[i].title); contentTitle.appendChild(textNode);
            itemContent.appendChild(contentImg);
            itemContent.appendChild(contentTitle);
            

            itemLink.appendChild(itemContent);
            listItem.appendChild(itemLink);
            listItems.appendChild(listItem);
        }
        timeline.appendChild(listItems);

        //Right button
        var buttonContent=document.createElement("div"); buttonContent.className="right-arrow";
        var rightButton=document.createElement("a"); rightButton.innerHTML='<img class="arrow" src="/views/recommendations/assets/img/right-arrow.png">';
        buttonContent.appendChild(rightButton); timeline.appendChild(buttonContent);
        return timeline;
    }
    for(var i=0;i<2;++i){
        recommendationsContent.appendChild(createTimeline(i));
    }
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