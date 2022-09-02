snake1 = document.getElementById("snake1")
snake2 = document.getElementById("snake2")
snake3 = document.getElementById("snake3")
gameScreen = document.getElementById("gameScreen")
function selectSnake(el) {
    let ajax = new XMLHttpRequest;
    ajax.onreadystatechange = function () {
        // preparing snake preference
        let data = {"snake":el.id}
        data = JSON.stringify(data)
        if ((ajax.readyState==4)&&(ajax.status==200)) {
            // snake preference saved
            // remove modal
            modal();

            // load resources
            gameScreen.innerHTML = ajax.responseText;

            // play 
            play();
        }
    }
}
snake1.addEventListener("click",selectSnake(event.srcElement));
snake2.addEventListener("click",selectSnake(event.srcElement));
snake3.addEventListener("click",selectSnake(event.srcElement));

// play
function play() {



} 




// remove modal 
function modal() {

}

