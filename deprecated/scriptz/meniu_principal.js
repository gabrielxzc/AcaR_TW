function anul1() {
    x = document.getElementsByClassName("an1-row");
    y = document.getElementsByClassName("an2-row");
    z = document.getElementsByClassName("an3-row");
    sem1 = document.getElementById("sem1");
    sem2 = document.getElementById("sem2");
    if (x[0].style.display == 'table-row') {
        x[0].style.display = 'none';
        sem1.style.display = 'none';
        sem2.style.display = 'none';
    } else if (y[0].style.display == 'table-row' || z[0].style.display == 'table-row') {
        y[0].style.display = 'none';
        z[0].style.display = 'none';
        x[0].style.display = "table-row";
        sem1.style.display = 'inline-block';
        sem2.style.display = 'inline-block';
    } else {
        x[0].style.display = "table-row";
        sem1.style.display = 'inline-block';
        sem2.style.display = 'inline-block';
    }
}


function anul2() {
    y = document.getElementsByClassName("an1-row");
    x = document.getElementsByClassName("an2-row");
    z = document.getElementsByClassName("an3-row");
    sem1 = document.getElementById("sem1");
    sem2 = document.getElementById("sem2");
    if (x[0].style.display == 'table-row') {
        x[0].style.display = 'none';
        sem1.style.display = 'none';
        sem2.style.display = 'none';
    } else if (y[0].style.display == 'table-row' || z[0].style.display == 'table-row') {
        y[0].style.display = 'none';
        z[0].style.display = 'none';
        x[0].style.display = "table-row";
        sem1.style.display = 'inline-block';
        sem2.style.display = 'inline-block';
    } else {
        x[0].style.display = "table-row";
        sem1.style.display = 'inline-block';
        sem2.style.display = 'inline-block';
    }


}

function anul3() {
    x = document.getElementsByClassName("an3-row");
    y = document.getElementsByClassName("an2-row");
    z = document.getElementsByClassName("an1-row");
    sem1 = document.getElementById("sem1");
    sem2 = document.getElementById("sem2");
    if (x[0].style.display == 'table-row') {
        x[0].style.display = 'none';
        sem1.style.display = 'none';
        sem2.style.display = 'none';
    } else if (y[0].style.display == 'table-row' || z[0].style.display == 'table-row') {
        y[0].style.display = 'none';
        z[0].style.display = 'none';
        x[0].style.display = "table-row";
        sem1.style.display = 'inline-block';
        sem2.style.display = 'inline-block';
    } else {
        x[0].style.display = "table-row";
        sem1.style.display = 'inline-block';
        sem2.style.display = 'inline-block';
    }
}
