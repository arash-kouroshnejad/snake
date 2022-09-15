
// Adds a node to the snake linked-list
function add (direction) {

    knee[i] = new coordinates(head.value.x,head.value.y)
    knee[i] = new node(knee[i],head,direction)
    knee[i-1].next = knee[i]

}


// Removes a node from the snake linked-list
function remove (z) {

    tail.next = (z == i-1) ? head : knee[z+1]
    delete knee[z]

}

// Removes modal 
function modal() {
    document.getElementById("snake-selector").style.display = "none";
    document.getElementsByTagName("img")[0].style.display = "none";
}


// Initialises a data struct named coordinates
class coordinates {

    constructor(x,y) {

        this.x = x;
        this.y = y;

    }

}


// Initialises a data struct named node 
class node {

    constructor(value,next,direction) {

        this.value = value;
        this.next = next;
        this.direction = direction

    }

}



// Creates a doubly linked list for tail direction memory
class direction {

    constructor(x,y) {

        this.x = x
        this.y = y

    }

}


// Draw head
function drawHead() {

    ctx.beginPath();
    ctx.arc(head.value.x,head.value.y,size/2,0,2*Math.PI)
    ctx.fillStyle = headColor;
    ctx.fill();
    ctx.closePath();

}


// Draws tail
function drawTail() {

    ctx.beginPath()
    ctx.arc(tail.value.x,tail.value.y,size/2,0,2*Math.PI)
    ctx.fillStyle = tailColor
    ctx.fill()
    ctx.closePath()

}

// Draws knee bend
function drawKnee(i) {

    ctx.beginPath()
    ctx.arc(knee[i].value.x,knee[i].value.y,size/2,0,2*Math.PI)
    ctx.fillStyle = kneeColor
    ctx.fill()
    ctx.closePath()

}

base = 1

// Draw body
function drawBody() {
    ctx.lineWidth = size;
   if (i !== 1) {

        if(i == base) {

            directions[1] = directions[i-1]
            i = 1
            base = 1
            q = 1
            drawBody()
            return

        }

        drawTail()
        drawLine(tail,knee[base],false)


        // Draws every knee and knee connecting lines
        for (n=base;n<i;n++) {

            if (knee[n] == undefined) {

                n++

            }
            else {

                drawKnee(n)
                if (n == i-1) {
                    continue;
                }
                drawLine(knee[n],knee[n+1])

            }

        }
        if (knee[i-1] == undefined) {

            drawLine(tail,head,true)

        }
        else {

            drawLine(knee[i-1],head,true)

        }
   }
   else {
        drawTail()
        drawLine(tail,head,true)
   }
}




// Draws an apple 
function drawApple() {

    if ((s <= head.value.x)&&(t <= head.value.y)&&(head.value.x <= s + size)&&(head.value.y <= t + size)) {
        sound("crunch")
        s = (Math.floor(Math.random()*20))*gridX
        t = (Math.floor(Math.random()*10))*gridY
        console.log("T is :"+t,"S is :"+s)
    }

    ctx.beginPath();
    ctx.rect(s,t,size,size)
    ctx.fillStyle = appleColor;
    ctx.fill();
    ctx.closePath()

}


// Draw raw line
function drawLine(a,b,bool) {

    if ((a.value.x==b.value.x)&&(a.value.y==b.value.y)) {

        if (b.next !== head) {

            drawLine(tail,b.next,false)

        }
        remove(knee.indexOf(b))
        tx = directions[q].x
        ty = directions[q].y
        q++;
        base++
        return 

    }
    ctx.beginPath()
    ctx.moveTo(a.value.x,a.value.y)
    if (bool) {
        ctx.lineTo(b.value.x-dx,b.value.y-dy)
    }
    else {
        ctx.lineTo(b.value.x,b.value.y)
    }
    ctx.lineWidth = size;
    ctx.strokeStyle = lineColor
    ctx.stroke();
    ctx.closePath()

}

// Turns the snake
function turn(direction) {

    add(direction)

}

function range(a,x) {

    arr = Array.from(new Array(x), (x,i) => i+a)

    return arr

}


// Playes in-game audio
function sound(type) {

    if (type == "crash") {

        var sound = new Audio("./static/SoundEffects/Heavy-Impact(1).mp3")
        sound.play()
        sound.addEventListener("ended",function () {

            sound.currentTime = 0 
            sound.pause()
            delete(sound)

        })

    }
    if (type == "crunch") {

        var sound = new Audio("./static/SoundEffects/Crunch.mp3")
        sound.play()
        sound.addEventListener("ended",function () {

            sound.currentTime = 0
            sound.pause()

        })

    }

}