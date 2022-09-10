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
            gridX = canvas.width/20;
            gridY = canvas.height/10;
            x = rect.top + canvas.width/2;
            y = rect.left + canvas.height/2;
            s = (Math.floor(Math.random()*20))*gridX+rect.left
            t = (Math.floor(Math.random()*10))*gridY+rect.top


            // Dimensions
            size = 10
            length = 40;
            a = x - length
            b = y - size/2;

            // Delay
            delay = 200

            // Change snake coordinates
            dx = gridX
            dy = 0

            // Looping canvas drawing 
            timeout()

            // Key Pad
            document.addEventListener("keydown", function () {

                if (event.key == "Right"||event.key == "ArrowRight") {
                    dx = gridX
                    dy = 0
                }
                if (event.key == "Left"||event.key == "ArrowLeft") {
                    dx = -gridX
                    dy = 0
                }
                if (event.key == "Down"||event.key == "ArrowDown") {
                    dy = gridY
                    dx = 0
                }
                if (event.key == "Up"||event.key == "ArrowUp") {
                    dy = -gridY
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
    console.log(y,canvas.height/7)
    // Clear canvas
    ctx.clearRect(rect.left,rect.top,canvas.width,canvas.height)

    // Draw snake
    drawHead();
    drawBody();


    // Draw apple
    drawApple()

    // Change corodinates
    x += dx;
    y += dy;


    // Border detection
    if ((x == 0)||(x == canvas.width)||(y == 0)||(y == canvas.height)) {
        clearTimeout(timeoutId)
    }

    timeout()
} 




// remove modal 
function modal() {
    document.getElementById("snake-selector").style.display = "none";
    document.getElementsByTagName("img")[0].style.display = "none";
}

// Draw head
function drawHead() {

    ctx.beginPath();
    ctx.rect(x,y,-length/6,-size);
    ctx.fillStyle = "#f00";
    ctx.fill();
    ctx.closePath();

}

// Draw body
function drawBody() {
    ctx.beginPath();
    ctx.moveTo(a,b);
    ctx.lineTo(x,y-size/2)
    ctx.lineWidth = size;
    ctx.strokeStyle = "#fff"
    ctx.stroke()
    a += dx
    b += dy
    ctx.closePath()
}

function drawApple() {

    if ((s <= x)&&(t <= y)&&(x <= s + size)&&(y <= t + size)) {
        console.log("T is :"+t,"S is :"+s)
        s = (Math.floor(Math.random()*20))*gridX+rect.left
        t = (Math.floor(Math.random()*10))*gridY+rect.top
        console.log("T is :"+t,"S is :"+s)
    }

    ctx.beginPath();
    ctx.rect(rect.left+s,rect.top+t,size,size)
    ctx.fillStyle = "#f00";
    ctx.fill();
    ctx.closePath()

}

function timeout() {

    timeoutId = setTimeout(play,delay)

}
