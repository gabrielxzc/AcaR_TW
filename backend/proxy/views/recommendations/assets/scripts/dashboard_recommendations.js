//$('document').ready(function () {
    /*
     <div class="timeline">
        <ol class="nav">
            <li><a href="/"><div class="timeline-item"></div></a></li>
            <li><a href="/about/"><div class="timeline-item"></div></a></li>
            <li><a href="/work/"><div class="timeline-item"></div></a></li>
            <li><a href="/clients/"><div class="timeline-item"></div></a></li>
            <li><a href="/contact/"><div class="timeline-item"></div></a></li>
        </ol>
        <ul class="nav">
            <li><button class="left-arrow">Press button</button></li>
            <li><button class="right-arrow">Press button</button></li>
        </ul>
    </div> */



    var recommendationsContent=document.getElementById("recommendations");
    var jsonInstrumente=[
        {
            numeInstrument: "Carti",
            informatiiInstrument:[
                {img:"./assets/img/witch.jpg", title:"Veteranul pulii", author:"Mihai Viteazu & Agatha Christie"},
                {img:"./assets/img/witch.jpg", title:"Veteranul pulii", author:"Mihai Viteazu & Agatha Christie"},
                {img:"./assets/img/witch.jpg", title:"Veteranul pulii", author:"Mihai Viteazu & Agatha Christie"},
                {img:"./assets/img/witch.jpg", title:"Veteranul pulii", author:"Mihai Viteazu & Agatha Christie"},
                {img:"./assets/img/witch.jpg", title:"Veteranul pulii", author:"Mihai Viteazu & Agatha Christie"}
            ]
        }
    ];

    /*<div class="left-arrow"><button>Press button</button></div>*/
    function createTimeline(index){
        
        
        var timeline=document.createElement("div"); timeline.className="timeline";
        //Tool title
        var timelineTitle=document.createElement("h2"); timelineTitle.className="titlu-materie";
        var titleText=document.createTextNode(jsonInstrumente[index].numeInstrument);
        timelineTitle.appendChild(titleText);
        timeline.appendChild(timelineTitle);

        //Left button
        var buttonContent=document.createElement("div"); buttonContent.className="left-arrow";
        var leftButton=document.createElement("a"); leftButton.innerHTML='<img class="arrow" src="./assets/img/left-arrow.png">';
        buttonContent.appendChild(leftButton); timeline.appendChild(buttonContent);

        var listItems=document.createElement("ol"); listItems.className="nav";
        for(var i=0;i<5;++i){
            var listItem=document.createElement("li");
            var itemLink=document.createElement("a"); itemLink.href="#";
            var itemContent=document.createElement("div"); itemContent.className="timeline-item";

        //creating content
            var contentImg=document.createElement("img"); contentImg.className="content-img";
            contentImg.src=jsonInstrumente[index].informatiiInstrument[i].img;
            var contentTitle=document.createElement("p"); contentTitle.className="text-content";
            var textNode=document.createTextNode(jsonInstrumente[index].informatiiInstrument[i].title); contentTitle.appendChild(textNode);
            var contentAuthor=document.createElement("p"); contentAuthor.className="author-content";
            textNode=document.createTextNode(jsonInstrumente[index].informatiiInstrument[i].author); contentAuthor.appendChild(textNode);
            itemContent.appendChild(contentImg);
            itemContent.appendChild(contentTitle);
            itemContent.appendChild(contentAuthor);

            itemLink.appendChild(itemContent);
            listItem.appendChild(itemLink);
            listItems.appendChild(listItem);
        }
        timeline.appendChild(listItems);

        //Right button
        var buttonContent=document.createElement("div"); buttonContent.className="right-arrow";
        var rightButton=document.createElement("a"); rightButton.innerHTML='<img class="arrow" src="./assets/img/right-arrow.png">';
        buttonContent.appendChild(rightButton); timeline.appendChild(buttonContent);
        return timeline;
    }
    for(var i=0;i<5;++i){
        recommendationsContent.appendChild(createTimeline(0));
    }
//});