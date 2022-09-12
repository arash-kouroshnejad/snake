function add (e,i) {

    knee[i] = new coordinates(head.value.x,head.value.y)
    knee[i] = new node(knee,head)
    knee[i-1].next = knee[i]

}

function remove (node,i) {

    knee[i-1].next = knee[i+1]
    delete knee[i]

}