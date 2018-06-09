$('document').ready(function () {

    //get the questions from server
    /*let xhr = new XMLHttpRequest();
            
    xhr.open("GET", "http://localhost:8081/questions");

    xhr.addEventListener("load", function loadCallback() {
        let response = JSON.parse(xhr.response);
        console.log(response);
    });

    xhr.addEventListener("error", function errorCallback() {
        console.log("Network error");
    });
    document.cookie='user=4WUiHnqWXBmP2Q64L49fvMiTAJMMtS2LkRgF0wrFVzGe0sJSkG9yPxitT3mBtGwB; path=/';
    alert(document.cookie);
    xhr.setDisableHeaderCheck(true);
    xhr.send();*/
    var questions = {
    "status": "valid",
    "message": "Intrebarile au fost preluate cu succes din baza de date!",
    "questions": [
        "Cat de mult iti place sa te documentezi folosind cartile?",
        "Cat de des citesti articole online?",
        "Cat de mult iti manifesti interesul in legatura cu instrumentele software?",
        "Cat de usor iti este sa intelegi problemele uitandu-te pe codul sursa scris de alte persoane?",
        "Cat de sociabil, deschis te consideri?",
        "Cat de mult obisnuiesti sa te increzi in zvonurile lansate de colegii tai?"
    ]};


    var textNodeAux;
    var noOfQuestionsAsked = questions.questions.length;
    console.log(noOfQuestionsAsked);
    var newLine = document.createElement("br");
    var formContainer = document.createElement("div"); formContainer.setAttribute("align", "center"); formContainer.id = "form-container";
    var line;
    function createForm(formContainer) {
        for (var i = 1; i <= noOfQuestionsAsked; ++i) {
            textNodeAux = document.createTextNode(questions.questions[i - 1]);
            line = document.createElement("label"); line.className = "form-line";
            line.appendChild(textNodeAux);
            newLine = document.createElement("br");
            line.appendChild(newLine);
            for (var j = 1; j <= 5; ++j) {
                var label = document.createElement("label"); label.className = "line-label";
                var btn = document.createElement("input");
                btn.setAttribute("type", "radio");
                btn.setAttribute("value", j);
                btn.setAttribute("name", i);
                btn.className = "radio-button";
                var textNodeAux = document.createTextNode(j); var span = document.createElement("span"); span.className = "label-span";
                span.appendChild(textNodeAux);
                label.appendChild(btn);
                label.appendChild(span);
                line.appendChild(label);
            }
            formContainer.appendChild(line);
            newLine = document.createElement("br");
            formContainer.appendChild(newLine);
        }
        newLine = document.createElement("br");
        formContainer.appendChild(newLine);
        var submitButton = document.createElement("input");
        submitButton.setAttribute("type", "button");
        submitButton.setAttribute("value", "Submit");
        submitButton.id = "submit-button";
        formContainer.appendChild(submitButton);

        errMessage = document.createElement("div"); errMessage.id = "err1";
        formContainer.appendChild(errMessage);
    }

    createForm(formContainer);
    document.getElementById("my-form").appendChild(formContainer);

    //check if all is selected

    var submitBtn = document.getElementById("submit-button");
    submitBtn.onclick = function () {
        document.getElementById("err1").innerHTML = "";
        var checkedButtons=document.querySelectorAll("input[type=radio]:checked");
        var noOfCheckedButtons = checkedButtons.length;
        //console.log(document.querySelectorAll("input[type=radio]:checked"));
        if (noOfCheckedButtons == noOfQuestionsAsked) {
            document.getElementById("err1").innerHTML = "Felicitari, ai completat cu succes! Vei fi in continuare redirectionat pe pagina recomandarilor!";
            document.getElementById("err1").style.color = "Green";
            window.location.replace("http://localhost:8079/");
        let collectedData=[];
            for(var i=0;i<noOfCheckedButtons;++i){
                var str=checkedButtons[i].value;
                collectedData[i]=str;
            }
            console.log(collectedData);
            let xhr = new XMLHttpRequest();
            
            xhr.open("POST", "http://localhost:8081/form");

            xhr.addEventListener("load", function loadCallback() {
                let response = JSON.parse(xhr.response);
            });

            xhr.addEventListener("error", function errorCallback() {
                console.log("Network error");
            });

            xhr.send(JSON.stringify(collectedData));

            return false;
        }
        else {
            document.getElementById("err1").innerHTML = "Formular incomplet! Selectati o optiune pentru fiecare intrebare!";
            document.getElementById("err1").style.color = "Red";
            return;
        }
    }
});