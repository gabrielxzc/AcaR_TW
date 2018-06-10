$('document').ready(function () {
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
            informatiiInstrument: "Habarnuamce"
        },
        {
            numeInstrument: "Instrumente software",
            informatiiInstrument: "Habarnuamce"
        },
        {
            numeInstrument: "Statistici anonime",
            informatiiInstrument: "Habarnuamce"
        },
        {
            numeInstrument: "Persoane de contact",
            informatiiInstrument: "Habarnuamce"
        },
        {
            numeInstrument: "Barfe",
            informatiiInstrument: "Habarnuamce"
        },
        {
            numeInstrument: "Chestionare",
            informatiiInstrument: "Habarnuamce"
        }
    ]

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
        var leftButton=document.createElement("button"); leftButton.innerHTML='<img src="./assets/img/left-arrow.png">';
        buttonContent.appendChild(leftButton); timeline.appendChild(buttonContent);

        var listItems=document.createElement("ol"); listItems.className="nav";
        for(var i=1;i<=5;++i){
            var listItem=document.createElement("li");
            var itemLink=document.createElement("a"); itemLink.href="/home";
            var itemContent=document.createElement("div"); itemContent.className="timeline-item";
            itemLink.appendChild(itemContent);
            listItem.appendChild(itemLink);
            listItems.appendChild(listItem);
        }
        timeline.appendChild(listItems);

        //Right button
        var buttonContent=document.createElement("div"); buttonContent.className="right-arrow";
        var rightButton=document.createElement("button"); rightButton.innerHTML='<img src="./assets/img/right-arrow.png">';
        buttonContent.appendChild(rightButton); timeline.appendChild(buttonContent);
        return timeline;
    }
    for(var i=0;i<6;++i){
        recommendationsContent.appendChild(createTimeline(i));
    }
});