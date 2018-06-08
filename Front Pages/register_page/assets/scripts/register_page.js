var form = document.getElementById("register-form");
var submitBtn = document.getElementById("signupbtn");

submitBtn.onclick = function (form) {
  var code = document.getElementById("code").value;
  var name = document.getElementById("name").value;
  var password = document.getElementById("password").value;
  var repass = document.getElementById("repass").value;

  if (code === '') {
    alert('Code required asshole!');
    // console.log('Put your code please!');
    return false;
  }
  else if (name === '') {
    alert('Name required asshole!');
    // console.log('Put your name please!');
    return false;
  }
  else if (password === '') {
    alert('Password required asshole!');
    // console.log('Put your password please!');
    return false;
  }
  else if (repass === '') {
    alert('Same password again required asshole!');
    //console.log('Put your password again please!');
    return false;
  }
  else if (repass != password) {
    alert('Passwords are not the same!');
    return false;
  }
  else {
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
        console.log(xhr.response);
        });
    
    xhr.addEventListener("error", function errorCallback() {
        console.log("Network error");
    });
    
    xhr.send(JSON.stringify(collectedData));
    return false;
  }

}