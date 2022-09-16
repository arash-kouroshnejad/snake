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
            kneeColor = tailColor = lineColor = headColor = "#494cf5"
            appleColor = "#f00"

            if (el == snake1) {

                canvas.style.background = "#87e650"
                kneeColor = tailColor = lineColor = headColor = "#000"

            }
            if (el == snake2) {

                canvas.style.background = "#e3da30"
                kneeColor = tailColor = lineColor = headColor = "#579c25"

            }
            if (el == snake3) {

                canvas.style.background = "#9dd93d"

            }


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
    

    // Draw apple
    drawApple()


    // Border detection
    if ((head.value.x < -20)||(head.value.x > canvas.width + 20)||(head.value.y < -20)||(head.value.y > canvas.height + 20)) {
        canvas.style.display = "none"
        alert("you loooooost!")
        location.reload()
    }

    timeout()
} 




// Sets a timeout loop
function timeout() {

    timeoutId = setTimeout(play,delay)

}

