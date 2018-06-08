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
      "email_code": code,
      "name": name,
      "password": password
    };

    //sending data to server
    xhr = new XMLHttpRequest();
    var url = "localhost:8081";
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4 && xhr.status == 200) {
        var json = JSON.parse(xhr.responseText);
        console.log(json.email_code + ", " + json.name + ", " + json.password);
      }
    }
    var data = JSON.stringify(collectedData);
    xhr.send(data);
    console.log(data);
    return true;
  }

}