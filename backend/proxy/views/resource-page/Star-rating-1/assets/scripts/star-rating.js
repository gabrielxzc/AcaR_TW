/*function highlight(stars,index){
    stars.forEach((star, i)=>{
        star.classList.toggle('full',i<=index);
    });
}

let starRating=document.getElementById("stelute");

function createStarRating(starRating){

    

    stars=[];
    for(i=0;i<5;++i){
        var stea=document.createElement("div"); stea.className="star";
        starRating.appendChild(stea);
        stars.push(stea);
    }
    //highlight(stars,3);
    starRating.addEventListener('mousemove', e => {
        var box=starRating.getBoundClientRect(),
        starIndex=Math.floor((e.pageX - box.left)/box.width * stars.length);

        console.log(starIndex);
    });
}
createStarRating(starRating);*/

class StarRating extends HTMLElement {

    get value() {
        return this.getAttribute('value');
    }

    set value(val) {
        this.setAttribute('value', val);
        this.highlight(this.value-1);
    }

    get number() {
        return this.getAttribute('number') || 5;
    }

    set number(val) {
        this.stars = [];

        while(this.firstChild){
            this.removeChild(this.firstChild);
        }

        for (var i = 0; i < this.number; ++i) {
            var stea = document.createElement("div"); stea.className = "star";
            this.appendChild(stea);
            this.stars.push(stea);
        }
        this.value = this.value;
    }

    highlight(index) {
        this.stars.forEach((star, i) => {
            star.classList.toggle('full', i <= index);
        });
    }

    constructor() {
        super();
        this.number=this.number;
        //highlight(stars,3);
        this.addEventListener('mousemove', e => {
            var box = this.getBoundingClientRect(),
                starIndex = Math.floor((e.pageX - box.left) / box.width * this.stars.length);
            this.highlight(starIndex);
        });

        this.addEventListener('mouseout', () => {
            this.value = this.value;
        });

        this.addEventListener('click', e => {
            var box = this.getBoundingClientRect(),
            starIndex = Math.floor((e.pageX - box.left) / box.width * this.stars.length);
            this.value = starIndex+1;
        });
    }
}

window.customElements.define("x-stelute", StarRating);

document.getElementById('rate-button').onclick=function(){
    var stelute=document.getElementsByTagName("x-stelute");
    console.log(stelute[0].value);
};