var form = document.getElementById("register-form");
var submitBtn = document.getElementById("signupbtn");
function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

submitBtn.onclick = function (form) {
  var code = document.getElementById("code").value;
  var name = document.getElementById("name").value;
  var password = document.getElementById("password").value;
  var repass = document.getElementById("repass").value;
  var patcheck = new RegExp("^[a-zA-Z0-9]+([_ -]?[a-zA-Z0-9])*$");
  document.getElementById("div1").innerHTML = "";
  document.getElementById("div2").innerHTML = "";
  document.getElementById("div3").innerHTML = "";
  document.getElementById("div4").innerHTML = "";
  document.getElementById("div5").innerHTML = "";

  if (code == null || code == "") {
    document.getElementById("div1").innerHTML = "Codul de Inregistrare trebuie introdus";
    document.getElementById("div1").style.color = "Red";
    return;
  }
  else {
    document.getElementById("div1").innerHTML = "";
  }

  if (name == null || name == "") {
    document.getElementById("div2").innerHTML = "Numele de utilizator trebuie introdus";
    document.getElementById("div2").style.color = "Red";
    return ;
  }
  else if (!patcheck.test(name))
  {
      document.getElementById("div2").innerHTML="Numele de utilizator trebuie sa contina doar caractere Alfa-Numerice";
      document.getElementById("div2").style.color="Red";
      return ;
  }
  else if (name.length <=5)
  {
    document.getElementById("div2").innerHTML="Numele de utilizator trebuie sa aiba macar 6 caractere"
    document.getElementById("div2").style.color="Red";
    return ;
  }
  else
  {
      document.getElementById("div2").innerHTML="";
  }

  if (password.length <= 6) {
    document.getElementById("div3").innerHTML = "Parola introdusa trebuie sa aiba macar 7 caractere";
    document.getElementById("div3").style.color = "Red";
    return ;
  }
  else {
    document.getElementById("div3").innerHTML = "";
  }

  if (password!=repass) {
  document.getElementById("div4").innerHTML = "Parolele introduse difera";
    document.getElementById("div4").style.color = "Red";
    return ;
  }
  else {
    document.getElementById("div4").innerHTML = "";
  }


  //console.log(password);
  var collectedData = {
    "registerToken": code,
    "username": name,
    "password": password
  };

  //sending data to server
  let xhr = new XMLHttpRequest();

  xhr.open("POST", "http://localhost:8081/register");

  xhr.addEventListener("load", function loadCallback() {
    let response=JSON.parse(xhr.response);
    if (response.status=="error") 
    {
      document.getElementById("div5").innerHTML=response.message;
      document.getElementById("div5").style.color = "Red";
    }
    else 
    {
      document.getElementById("div5").innerHTML="Te-ai inregistrat cu succes, vei fi redirectionat imediat spre pagina principala!";
      document.getElementById("div5").style.color = "Green";
      document.getElementById("signupbtn").style.backgroundColor="#293742";
      document.getElementById("signupbtn").innerHTML="Se proceseaza.."
      sleep(1000);
      window.location.replace("http://localhost:8079/");
    }
});
  
  xhr.addEventListener("error", function errorCallback() {
    console.log("Network error");
  });

  xhr.send(JSON.stringify(collectedData));
  return ;
}
