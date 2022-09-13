
// Adds a node to the snake linked-list
function add (e,i) {

    knee[i] = new coordinates(head.value.x,head.value.y)
    knee[i] = new node(knee[i],head)
    knee[i-1].next = knee[i]

}


// Removes a node from the snake linked-list
function remove (node,i) {

    knee[i-1].next = knee[i+1]
    delete knee[i]

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

    constructor(value,next) {

        this.value = value;
        this.next = next;

    }

}



