/*SLIDESHOW ~~~~~~~~~~~~~~~~~~~~*/
var slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1} 
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none"; 
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block"; 
  dots[slideIndex-1].className += " active";
}


var slideIndex2 = 1;
showSlides2(slideIndex2);

// Next/previous controls
function plusSlides2(n) {
  showSlides2(slideIndex2 += n);
}

// Thumbnail image controls
function currentSlide2(n) {
  showSlides2(slideIndex2 = n);
}

function showSlides2(n) {
  var i;
  var slides2 = document.getElementsByClassName("mySlides2");
  var dots2 = document.getElementsByClassName("dot2");
  if (n > slides2.length) {slideIndex2 = 1} 
  if (n < 1) {slideIndex2 = slides2.length}
  for (i = 0; i < slides2.length; i++) {
      slides2[i].style.display = "none"; 
  }
  for (i = 0; i < dots2.length; i++) {
      dots2[i].className = dots2[i].className.replace(" active", "");
  }
  slides2[slideIndex2-1].style.display = "block"; 
  dots2[slideIndex2-1].className += " active";
}


/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/





var title="morometii";
var name="marin preda";
var link="https://iampava.com/";
var linkrec="";

var details = {
    "title": title,
    "author": name,
    "link": link
  };
var recom = {
    "linkrec" : linkrec
}

var xmlHttp = new XMLHttpRequest();
xmlHttp.onreadystatechange=ProcessRequest;

function ProcessRequest() 
{
    if ( xmlHttp.readyState == 4 && xmlHttp.status == 200 ) 
    {
        let response=JSON.parse(xmlHttp.response);
        if (response.status=="error")
        {
            document.getElementById("title").value = "Cartea nu a fost gasita";
            document.getElementById("author" ).value = "-";
            document.getElementById("link").value="-";
        }
        else
        {        
            title =response.title; 
            author =response.author;
            link=response.link;
            document.getElementById("title").innerHTML="Titlu"+" : "+details.title;
            document.getElementById("author").innerHTML="Autor"+" : "+details.author;
            document.getElementById("link").innerHTML="Link"+" : " +details.link;
        }                    
    }
}
xmlHttp.open( "GET", "http://localhost:8086/details");
xmlHttp.send();

document.getElementById("title").innerHTML="Titlu"+" : "+details.title;
document.getElementById("author").innerHTML="Autor"+" : "+details.author;
document.getElementById("link").innerHTML="Link"+" : " +details.link;
