$('document').ready(function () {

    function sleep(milliseconds) {
        var start = new Date().getTime();
        for (var i = 0; i < 1e7; i++) {
          if ((new Date().getTime() - start) > milliseconds) {
            break;
          }
        }
      }

    let xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost:8079/questions");

    xhr.addEventListener("load", function loadCallback() {
        let data = JSON.parse(xhr.response);
        let questions = JSON.parse(data);

        var textNodeAux;
        var noOfQuestionsAsked = questions.questions.length;
        var newLine = document.createElement("br");
        var formContainer = document.createElement("div");
        formContainer.setAttribute("align", "center");
        formContainer.id = "form-container";
        var line;

        function createForm(formContainer) {
            for (var i = 1; i <= noOfQuestionsAsked; ++i) {
                textNodeAux = document.createTextNode(questions.questions[i - 1]);
                line = document.createElement("label");
                line.className = "form-line";
                line.appendChild(textNodeAux);
                newLine = document.createElement("br");
                line.appendChild(newLine);
                for (var j = 1; j <= 5; ++j) {
                    var label = document.createElement("label");
                    label.className = "line-label";
                    var btn = document.createElement("input");
                    btn.setAttribute("type", "radio");
                    btn.setAttribute("value", j);
                    btn.setAttribute("name", i);
                    btn.className = "radio-button";
                    var textNodeAux = document.createTextNode(j);
                    var span = document.createElement("span");
                    span.className = "label-span";
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

            errMessage = document.createElement("div");
            errMessage.id = "err1";
            formContainer.appendChild(errMessage);
        }

        createForm(formContainer);
        document.getElementById("my-form").appendChild(formContainer);

        var submitBtn = document.getElementById("submit-button");

        submitBtn.onclick = function () {
            document.getElementById("err1").innerHTML = "";
            var checkedButtons = document.querySelectorAll("input[type=radio]:checked");
            var noOfCheckedButtons = checkedButtons.length;
            //console.log(document.querySelectorAll("input[type=radio]:checked"));
            if (noOfCheckedButtons == noOfQuestionsAsked) {
                let collectedData = [];
                for (var i = 0; i < noOfCheckedButtons; ++i) {
                    var str = checkedButtons[i].value;
                    collectedData[i] = str;
                }

                let xhr = new XMLHttpRequest();
                xhr.open("POST", "http://localhost:8079/answers");

                xhr.addEventListener("load", function loadCallback() {
                    let response = JSON.parse(xhr.response);

                    if (response.status == 'error') {
                        document.getElementById("err1").innerHTML = response.message;
                        document.getElementById("err1").style.color = "red";
                    } else {
                        document.getElementById("err1").innerHTML = "Felicitari, ai completat cu succes! Vei fi in continuare redirectionat pe pagina recomandarilor!";
                        document.getElementById("err1").style.color = "green";
                        sleep(3000);
                        window.location.replace("http://localhost:8079/");
                    }
                });

                xhr.addEventListener("error", function errorCallback() {
                    console.log("Network error");
                });

                let payload = {
                    "array": collectedData
                };

                xhr.send(JSON.stringify(payload));
            } else {
                document.getElementById("err1").innerHTML = "Formular incomplet! Selecteaza o optiune pentru fiecare intrebare!";
                document.getElementById("err1").style.color = "Red";
            }
        }
    });

    xhr.addEventListener("error", function errorCallback() {
        console.log("Network error");
    });

    xhr.send();
});