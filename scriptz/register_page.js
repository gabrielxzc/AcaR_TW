var btn=document.getElementById('signupbtn');
btn.onclick=function(){
  var code=document.getElementById('code').value;
  var name=document.getElementById('name').value;
  var email=document.getElementById('email').value;
  var password=document.getElementById('password').value;
  var repass=document.getElementById('repass').value;
  if(name=''){
    alert('required!');
    return false;
    console.log('Bai!!!');
  }
  else{
    return true;
    console.log("numele tau!!");
  }
}