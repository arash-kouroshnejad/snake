snake1 = document.getElementById("snake1")
snake2 = document.getElementById("snake2")
snake3 = document.getElementById("snake3")

function selectSnake(el) {
    let data = {"snake" : el.id }
    data = JSON.stringify(data)
    let ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function () {
        // preparing snake preference
        if ((ajax.readyState==4)&&(ajax.status==200)) {
            // snake preference saved
            // remove modal
            modal();


            // load resources
            gameScreen.innerHTML = ajax.responseText;
            canvas = document.getElementById("canvas")
            rect = canvas.getBoundingClientRect()
            ctx = canvas.getContext("2d")
            x = rect.top + canvas.height/2;
            y = rect.left + canvas.width/6;
            s = Math.floor(Math.random()*canvas.width)
            t = Math.floor(Math.random()*canvas.height)
            width = canvas.width;
            height = canvas.height
            size = "30px";  


            // play 
            play();
        }
    }
    ajax.open("post","/engine",true);
    ajax.send(data);
}
snake1.addEventListener("click",function () {
    selectSnake(event.srcElement);
});
snake2.addEventListener("click",function () {
    selectSnake(event.srcElement);
});
snake3.addEventListener("click",function () {
    selectSnake(event.srcElement);
});

// play
function play() {
    // Clear canvas
    ctx.clearRect(rect.left,rect.top,canvas.width,canvas.height)

    // Draw snake
    drawSnake(x,y,length,size);
    debugger;


    // Draw apple
    drawApple(s,t,size)

    // 

} 




// remove modal 
function modal() {
    document.getElementById("snake-selector").style.display = "none";
    document.getElementsByTagName("img")[0].style.display = "none";
}

function drawSnake(x,y,width,height) {

    ctx.beginPath();
    ctx.rect(x,y,width,height);
    ctx.fillStyle = "#34deeb";
    ctx.fill();
    ctx.closePath();

}

function drawApple(s,t,size) {

    if ((x==s)&&(y==t)) {
        s = Math.floor(MAth.random()*canvas.width)
        y = Math.floor(Math.random()*canvas.height)
    }

    img = new Image();
    img.onload = () => {

        ctx.drawImage(img,s,t,size,size)

    }
    img.src = "../static/images/Apple.jpg"

}
