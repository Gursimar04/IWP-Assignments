var index= 3;
var indexF=0;
var scroller=document.getElementsByClassName("card");
var right = document.getElementsByClassName("moveRight")[0];
var left = document.getElementsByClassName("moveLeft")[0];



right.addEventListener("click", goRight);
left.addEventListener("click", goLeft);
function goRight(){
        index += 1;
        indexF += 1;
    if (index != 11) {
        scroller[index].scrollIntoView({
            block: 'nearest',
        });
    }
}

function goLeft() {
        index -= 1;
        indexF -= 1;
    if (index != -1) {
        scroller[indexF].scrollIntoView({
            block: 'nearest',
        });
    }
}