var database, position;


var ball;



function setup(){
    createCanvas(400,400);
    ball = createSprite(10,10,10,10);
    ball.shapeColor = "red";
    // .ref() ======== location in database
    //.on() ========== read from the dB
    //.set() ========= write into dB

    database = firebase.database(); 
    position = database.ref("ball/position");
    position.on("value", readPosition, showError);
}

function readPosition(data){
    ballPosition = data.val();
    ball.x = ballPosition.x;
    ball.y =ballPosition.y; 

}

function showError(){
    console.log("sorry, some error !!")
}

function writePosition(x,y){
  database.ref ("ball/position").set({
      x:ball.x+x,
      y:ball.y+y
  })

}

function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        writePosition(0,+1);
    }
    drawSprites();
}

function changePosition(x,y){
    ball.x = ball.x + x;
    ball.y = ball.y + y;
}
