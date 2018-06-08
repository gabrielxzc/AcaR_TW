//$('document').ready(function(){

    var questions=[
    "On a scale from 1 to 5 how do you rate the universe?", 
    "On a scale from 1 to 5 how dumb do you think you are?",
    "On a scale from 1 to 5 what's your opinion about this site?",
    "On a scale from 1 to 5 what do you think of books?",
    "On a scale from 1 to 5 how much do you hate government?",
    "On a scale from 1 to 5 how smart do you think you are?",
    "On a scale from 1 to 5 how much do you know about Pluto?",
    "On a scale from 1 to 5 how is life for you?"
    ];
    var textNodeAux;
    var noOfQuestionsAsked=7;
    var newLine=document.createElement("br");
    var formContainer=document.createElement("div");  formContainer.setAttribute("align","center"); formContainer.id="form-container";
    var line;
    function createForm(formContainer){        
        for(var i=1;i<=noOfQuestionsAsked;++i){
            textNodeAux=document.createTextNode(questions[i-1]);
            line=document.createElement("label"); line.className="form-line";
            line.appendChild(textNodeAux);
            newLine=document.createElement("br");
            line.appendChild(newLine);
            for(var j=1;j<=5;++j){
                var label=document.createElement("label"); label.className="line-label";
                var btn=document.createElement("input");
                btn.setAttribute("type","radio");
                btn.setAttribute("value","option"+j);
                btn.setAttribute("name","group"+i);
                btn.className="radio-button";
                var textNodeAux=document.createTextNode(j); var span=document.createElement("span"); span.className="label-span";
                span.appendChild(textNodeAux);
                label.appendChild(btn);
                label.appendChild(span);
                line.appendChild(label);
            }
            formContainer.appendChild(line);
            newLine=document.createElement("br");
            formContainer.appendChild(newLine);
        }
        newLine=document.createElement("br");
        formContainer.appendChild(newLine);
        var submitButton=document.createElement("input");
        submitButton.setAttribute("type","submit");
        submitButton.setAttribute("value","Submit");
        submitButton.className="submit-button";
        formContainer.appendChild(submitButton);

    }

    createForm(formContainer);
    document.getElementById("my-form").appendChild(formContainer);

//});