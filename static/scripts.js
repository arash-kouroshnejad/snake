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

            // Grabbing canvas reference
            canvas = document.getElementById("canvas")
            rect = canvas.getBoundingClientRect()
            ctx = canvas.getContext("2d")

            // Coordinates
            x = rect.top + canvas.height/2;
            y = rect.left + canvas.width/6;
            s = Math.floor(Math.random()*canvas.width)
            t = Math.floor(Math.random()*canvas.height)

            // Canvas object
            Canvas = new Object()
            Canvas.rigth = 

            // Dimensions
            size = 2;
            length = 40;

            // Delay
            delay = 40

            // Change snake coordinates
            dx = 2
            dy = 0

            // Set interval for looping canvas drawing 
            intervalId = setInterval(play,delay)

            // Key Pad
            document.addEventListener("keydown", function () {

                if (event.key == "Right"||event.key == "ArrowRight") {
                    dx = 2
                    dy = 0
                }
                if (event.key == "Left"||event.key == "ArrowLeft") {
                    dx = -2
                    dy = 0
                }
                if (event.key == "Down"||event.key == "ArrowDown") {
                    dy = 2
                    dx = 0
                }
                if (event.key == "Up"||event.key == "ArrowUp") {
                    dy = -2
                    dx = 0
                }
            })



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


    // Draw apple
    drawApple(s,t)

    // Change corodinates
    x += dx;
    y += dy;

    // Border detection
    if ((x+length >= rect.left + rect.width)||(y+size <= rect.top)) {
        clearInterval(intervalId)

    }

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

function drawApple(s,t) {

    if ((s <= x)&&(x <= s+size)) {
        s = Math.floor(Math.random()*canvas.width)
        t = Math.floor(Math.random()*canvas.height)
    }

    ctx.beginPath();
    ctx.rect(s,t,7,7)
    ctx.fillstyle = "#f00";
    ctx.fill();
    ctx.closePath()

}
