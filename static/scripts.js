snake1 = document.getElementById("snake1")
snake2 = document.getElementById("snake2")
snake3 = document.getElementById("snake3")
knee = []
knee[1] = undefined;


function selectSnake(el) {
    i = 1;
    q = 1;
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
            length = 75;


            // Delay
            delay = 300

            // Change snake coordinates
            dx = gridX
            dy = 0
            tx = gridX
            ty = 0


            // Colors 
            lineColor = "#fff#494cf5"
            headColor = "#f00#494cf5"
            tailColor = "##494cf5"
            kneeColor = "##494cf5"
            appleColor = "#f00"


            // Looping canvas drawing 
            timeout()

            // Key Pad
            document.addEventListener("keydown",function () {

                if (event.key == "Right"||event.key == "ArrowRight") {
                    dx = gridX
                    dy = 0
                    directions[i] = new direction(dx,dy)
                    turn(event.key)
                    i++
                }
                if (event.key == "Left"||event.key == "ArrowLeft") {
                    dx = -gridX
                    dy = 0
                    directions[i] = new direction(dx,dy)
                    turn(event.key)
                    i++
                }
                if (event.key == "Down"||event.key == "ArrowDown") {
                    dy = gridY
                    dx = 0
                    directions[i] = new direction(dx,dy)
                    turn(event.key)
                    i++
                }
                if (event.key == "Up"||event.key == "ArrowUp") {
                    dy = -gridY
                    dx = 0
                    directions[i] = new direction(dx,dy)
                    turn(event.key)
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
        head = new node(head,null,null)
        a = head.value.x - length;
        b = head.value.y;
        tail = new coordinates(a,b)
        tail = new node(tail,head,null)
        directions = []
        directions[0] = new direction(dx,dy)
    }

    knee[0] = tail

    // Clear canvas
    ctx.clearRect(0,0,canvas.width,canvas.height)

    // Draw snake
    drawHead();


    // Change head corodinates
    head.value.x += dx;
    head.value.y += dy;


    drawBody();

    // Change tail coordinates
    tail.value.x += tx;
    tail.value.y += ty;
    
    /**
     * tail direction :
     * 0 => right 
     * 1 => up
     * 2 => left
     * 3 => down
     */


    // Draw apple
    drawApple()


    // Border detection
    if ((x == 0)||(x == canvas.width)||(y == 0)||(y == canvas.height)) {
        clearTimeout(timeoutId)
    }

    timeout()
} 




// Sets a timeout loop
function timeout() {

    timeoutId = setTimeout(play,delay)

}

