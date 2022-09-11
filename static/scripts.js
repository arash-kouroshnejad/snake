snake1 = document.getElementById("snake1")
snake2 = document.getElementById("snake2")
snake3 = document.getElementById("snake3")

function range(start,end) {

    let range = []

   let i = start;

   while (i<= end) {
       range.push([i])
       i += 0.1
   }

   return range;

}

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
            length = 70;


            // Delay
            delay = 200

            // Change snake coordinates
            dx = gridX
            dy = 0

            //Head & Tail
            head = new coordinates(x,y) 
            head = new node(head,null)
            a = head.value.x - length;
            b = head.value.y - size/2;
            tail = new coordinates(a,b)
            tail = new node(tail,head)



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
    console.log(head.value.x,head.value.y)
    // Clear canvas
    ctx.clearRect(rect.left,rect.top,canvas.width,canvas.height)

    // Draw snake
    drawHead();
    drawBody();


    // Draw apple
    drawApple()

    // Change corodinates
    head.value.x += dx;
    head.value.y += dy;


    // Border detection
    if ((head.value.x == 0)||(head.value.x == canvas.width)||(head.value.y == 0)||(head.value.y == canvas.height)) {
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
    ctx.rect(head.value.x,head.value.y,-10,-size);
    ctx.fillStyle = "#f00";
    ctx.fill();
    ctx.closePath();

}

// Draw body
function drawBody() {
    ctx.lineWidth = size;
    ctx.beginPath();
    ctx.moveTo(tail.value.x,tail.value.y);
    ctx.lineTo(head.value.x - 10,head.value.y - size/2);
    console.log(head.value.x,head.value.y,tail.value.x,tail.value.y)
    ctx.strokeStyle = "#fff"
    ctx.stroke()
    tail.value.x += dx
    tail.value.y += dy
    ctx.closePath()
}

function drawApple() {

    if ((head.value.x in range(s,s+size))&&(head.value.y in range(t,t+size))) {
        console.log("T is :"+t,"S is :"+s)
        s = (Math.floor(Math.random()*20))*gridX+rect.left
        t = (Math.floor(Math.random()*10))*gridY+rect.top
        length = length * 1.5
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


// Draw raw line
function drawLine(a,b) {

    ctx.beginPath()
    ctx.moveTo(a.x,a.y)
    ctx.lineTo(b.x,b.y)
    ctx.lineWidth = size
    ctx.fillStyle = "#fff"
    ctx.stroke()
    ctx.closPath()

}


