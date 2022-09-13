snake1 = document.getElementById("snake1")
snake2 = document.getElementById("snake2")
snake3 = document.getElementById("snake3")
knee = []
knee[1] = undefined;


function selectSnake(el) {
    i = 1;
    knee = [];
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
            ctx = canvas.getContext("2d")

            // Coordinates
            gridX = canvas.width/20;
            gridY = canvas.height/10;
            


            // Dimensions
            size = 10
            length = 70;


            // Delay
            delay = 200

            // Change snake coordinates
            dx = gridX
            dy = 0


            // Looping canvas drawing 
            timeout()

            // Key Pad
            document.addEventListener("keydown",function () {

                if (event.key == "Right"||event.key == "ArrowRight") {
                    dx = gridX
                    dy = 0
                    add(event,i)
                    i++
                }
                if (event.key == "Left"||event.key == "ArrowLeft") {
                    dx = -gridX
                    dy = 0
                    add(event,i)
                    i++
                }
                if (event.key == "Down"||event.key == "ArrowDown") {
                    dy = gridY
                    dx = 0
                    add(event,i)
                    i++
                }
                if (event.key == "Up"||event.key == "ArrowUp") {
                    dy = -gridY
                    dx = 0
                    add(event,i)
                    i++
                }
            });



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
    rect = canvas.getBoundingClientRect()
    if (typeof x == 'undefined') {
        x = rect.top + canvas.width/2;
        y = rect.left + canvas.height/2;
        s = (Math.floor(Math.random()*20))*gridX
        t = (Math.floor(Math.random()*10))*gridY
        //Head & Tail
        head = new coordinates(x,y) 
        head = new node(head,null)
        a = head.value.x - length;
        b = head.value.y - size/2;
        tail = new coordinates(a,b)
        tail = new node(tail,head)
    }

    knee[0] = tail

    // Clear canvas
    ctx.clearRect(0,0,canvas.width,canvas.height)

    // Draw snake
    drawHead();
    drawBody();


    // Draw apple
    drawApple()

    // Change corodinates
    head.value.x += dx;
    head.value.y += dy;
    tail.value.x += dx;
    tail.value.y += dy;



    // Border detection
    if ((x == 0)||(x == canvas.width)||(y == 0)||(y == canvas.height)) {
        clearTimeout(timeoutId)
    }

    timeout()
} 






// Draw head
function drawHead() {

    ctx.beginPath();
    ctx.rect(head.value.x,head.value.y,-10,-size);
    ctx.fillStyle = "#f00";
    ctx.fill();
    ctx.closePath();

}

// Draw body
function drawBody() {
    ctx.lineWidth = size;
   if (!(typeof knee[1] == 'undefined')) {
    debugger;
        drawLine(tail,knee[1])
        for(n=1;n<i-1;n++) {

                drawLine(knee[n],knee[n+1])

        }
        drawLine(knee[i-1],head)
   }
   drawLine(tail,head)
}

function drawApple() {

    if ((s <= head.value.x)&&(t <= head.value.y)&&(head.value.x <= s + size)&&(head.value.y <= t + size)) {
        console.log("T is :"+t,"S is :"+s)
        s = (Math.floor(Math.random()*20))*gridX
        t = (Math.floor(Math.random()*10))*gridY
        length = length * 1.5
        console.log("T is :"+t,"S is :"+s)
    }

    ctx.beginPath();
    ctx.rect(s,t,size,size)
    ctx.fillStyle = "#f00";
    ctx.fill();
    ctx.closePath()

}

function timeout() {

    timeoutId = setTimeout(play,delay)

}


// Draw raw line
function drawLine(a,b) {

    if ((a.value.x==b.value.x)&&(a.value.y==b.value.y)) {

        remove(b,n)

    }
    ctx.beginPath()
    ctx.moveTo(a.value.x,a.value.y)
    ctx.lineTo(b.value.x-size,b.value.y-size/2)
    ctx.lineWidth = size;
    ctx.strokeStyle = "#fff"
    ctx.stroke();
    ctx.closePath()

}


