var ball;
var database, position;

function setup(){
    createCanvas(500,500);
    database = firebase.database();

    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";

    //.ref function is used to create referance to the location of db value
    var ballP = database.ref('Ball/position');
    //.on function is used to create listener which keeps listening to the changes in the db value
    ballP.on("value",readPosition);
}

function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        changePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        changePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        changePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        changePosition(0,+1);
    }
    drawSprites();
}

function changePosition(x,y){
   //writing back to the db
   //.set function is used to set value in db
   database.ref('Ball/position').set({
       x:position.x+x,
       y:position.y+y
   })
}

function readPosition(data){
    //.val function is used to retrive data from database
    position = data.val();
    ball.x = position.x;
    ball.y = position.y;
}