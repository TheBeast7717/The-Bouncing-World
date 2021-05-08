var bBall;
var pad1,pad2,pad3,pad4,pad5;
var gameState = "preplay";

var resetButton,resetButtonImage;
var startButton,startButtonImage;

var randomPoints = 0;
var gift1,gift1Image,gift2Image,gift1Group;

var everything = "fine";

var cameraOnButton,cameraOnButtonImage,cameraOffButton,cameraOffButtonImage;
var cameraMode = "noFocus";




var clearButton,clearButtonImage;
var bgSound;


bBallVelX = [-14,-13,-12,-11,-10,-9,-8,-7,-6,-5,-4,4,5,6,7,8,9,10,11,12,13,14];
bBallVelY = [-14,-13,-12,-11,-10,-9,-8,-7,-6,-5,-4,4,5,6,7,8,9,10,11,12,13,14];
var actualVelX = 0;
var actualVelY = 0;

var padBounceSound;
var edgeBounceSound;
var collectSound,clickSound;




function preload(){

 

  resetButtonImage = loadImage("Reset Image.png");
  startButtonImage = loadImage("Start Image.png");

  clearButtonImage = loadImage("Clear all image.png");

  gift1Image = loadImage("Gold_1-removebg-preview.png");
  gift2Image = loadImage("Silver_1-removebg-preview.png");

  cameraOnButtonImage = loadImage("Camera On Image.png");
  cameraOffButtonImage = loadImage("Camera Off Image.png");


  bgSound = loadSound("music_zapsplat_game_music_arcade_electro_repeating_retro_arp_electro_drums_serious_012.mp3");
  padBounceSound = loadSound("Bounce pad.mp3");
  edgeBounceSound = loadSound("d1 Edge bounce sound1.mp3");
  collectSound = loadSound("Coin collect sound.mp3");
  clickSound = loadSound("Click sound.mp3");




}




function setup() {
  createCanvas(1280,578);

  bBall = createSprite(windowWidth/2,windowHeight/4,20,20);
  bBall.shapeColor = "white";

  pad1 = createSprite(windowWidth/9.7,windowHeight/1.1,245,15);
  pad1.shapeColor = "red";

  pad2 = createSprite(windowWidth/3.32,windowHeight/1.1,250,15);
  pad2.shapeColor = "teal";

  pad3 = createSprite(windowWidth/2,windowHeight/1.1,245,15);
  pad3.shapeColor = "yellow"

  pad4 = createSprite(windowWidth/1.435,windowHeight/1.1,245,15);
  pad4.shapeColor = "blue";

  pad5 = createSprite(windowWidth/1.12,windowHeight/1.1,245,15);
  pad5.shapeColor = "violet";


  resetButton = createSprite(windowWidth/1.08,windowHeight/12,40,40);
  resetButton.addImage(resetButtonImage);
  resetButton.scale = 0.22;


  startButton = createSprite(windowWidth/12,windowHeight/11,40,40);
  startButton.addImage(startButtonImage);
  startButton.scale = 0.2;


  cameraOnButton = createSprite(windowWidth/2,100,50,50);
  cameraOnButton.shapeColor = "red";
  cameraOnButton.addImage(cameraOffButtonImage);
  cameraOnButton.scale = 0.3;


  cameraOffButton = createSprite(windowWidth/2,100,50,50);
  cameraOffButton .shapeColor = "blue";
  cameraOffButton.addImage(cameraOnButtonImage);
  cameraOffButton.scale = 0.3;
  

  clearButton  = createSprite(windowWidth/1.08,windowHeight/5,40,40);
  clearButton.addImage(clearButtonImage);
  clearButton.scale = 0.24;





  gift1Group = new Group();

}

function draw() {
  background(0);

  // Calling  functions
  bounceEdges()
  resetGame();
  spawnRandomGifts();
  miscActivity();
  

  

  




  edges = createEdgeSprites();

 

 if(keyWentDown("space")&&gameState==="preplay"){
   actualVelX = Math.round(random(bBallVelX));
   actualVelY = Math.round(random(bBallVelY));
  

   gameState = "play";
   clickSound.play();
   bgSound.play();
   bgSound.setVolume(0.55);
 }

  // Velocity of the bBall;
  bBall.x = bBall.x + actualVelX;
  bBall.y = bBall.y + actualVelY;




  // bBall bouncing off pad1
  if(bounceOff(bBall,pad1)){
    actualVelX = actualVelX *(1);
    actualVelY = actualVelY *(-1);
    padBounceSound.play();
    background("red");

  }else{
    actualVelX = actualVelX *(1);
    actualVelY = actualVelY *(1);

  }

  // bBall bouncing off pad2
  if(bounceOff(bBall,pad2)){
    actualVelX = actualVelX *(1);
    actualVelY = actualVelY *(-1);
    padBounceSound.play();
    background("teal");

  }else{
    actualVelX = actualVelX *(1);
    actualVelY = actualVelY *(1);

  }

  // bBall bouncing off pad3
  if(bounceOff(bBall,pad3)){
    actualVelX = actualVelX *(1);
    actualVelY = actualVelY *(-1);
    padBounceSound.play();
    background("yellow");

  }else{
    actualVelX = actualVelX *(1);
    actualVelY = actualVelY *(1);

  }

  // bBall bouncing off pad4
  if(bounceOff(bBall,pad4)){
    actualVelX = actualVelX *(1);
    actualVelY = actualVelY *(-1);
    padBounceSound.play();
    background("blue");

  }else{
    actualVelX = actualVelX *(1);
    actualVelY = actualVelY *(1);

  }

  // bBall bouncing off pad5
  if(bounceOff(bBall,pad5)){
    actualVelX = actualVelX *(1);
    actualVelY = actualVelY *(-1);
    padBounceSound.play();
    background("violet");

  }else{
    actualVelX = actualVelX *(1);
    actualVelY = actualVelY *(1);

  }


  


  // 

  colorSwap();


  
  
  drawSprites();

}

function mouseReleased(){

  // Reset
  if(mouseIsOver(resetButton)&&gameState==="play"){
    gameState = "preplay";
    clickSound.play();
    bgSound.stop();
    gift1Group.destroyEach();
  }

  
  // Starting the game
  if(mouseIsOver(startButton)&&gameState==="preplay"){
    actualVelX = Math.round(random(bBallVelX));
    actualVelY = Math.round(random(bBallVelY));
   
 
    gameState = "play";
    clickSound.play();
    bgSound.play();
    bgSound.setVolume(0.55);
  }


  // Selecting clear all button
  if(mouseIsOver(clearButton)&&gameState==="play"){

    randomPoints = 0;
    gift1Group.destroyEach();
    clickSound.play();
  
   }

  

  // Selecting on focus off
  if(mouseIsOver(cameraOnButton)&&gameState==="play"&&cameraMode==="noFocus"){
    
    cameraMode = "focus";
    clickSound.play();
  }



}



function resetGame(){
  

  //text("GameState = "+gameState,200,200);


  if(gameState==="preplay"){
    bBall.x = windowWidth/2;
    bBall.y = windowHeight/4;

    bBall.shapeColor = "white";
    
    pad1.shapeColor = "red";
    pad2.shapeColor = "teal";
    pad3.shapeColor = "yellow";
    pad4.shapeColor = "blue";
    pad5.shapeColor = "violet";
  
    

    bBall.velocityX = 0;
    bBall.velocityY = 0;
  }









 
}


function bounceEdges(){

  // console.log("bBall.velocityX: "+bBall.velocityX);

  // text("WindowWidth:"+windowWidth,200,200);
  // text("WindowHeight:"+windowHeight,200,220);


  // text("bBall.x = "+bBall.x,200,300);
  // text("bBall.y = "+bBall.y,200,320);
  // text("bBall.velocityX= "+bBall.velocityX,600,200);


  
  if(bBall.x>=1270){
    actualVelX = actualVelX *(-1);
    edgeBounceSound.play();
  }

   
    if(bBall.x<= 10){
    actualVelX = actualVelX *(-1);
    edgeBounceSound.play();
  }
    

    if(bBall.y<=10){
    actualVelY = actualVelY *(-1);
    edgeBounceSound.play();
  }
   
  
    if(bBall.y >=568){
    //actualVelY = actualVelY *(-1);
    bBall.x = windowWidth/2;
    bBall.y = windowHeight/4;
    edgeBounceSound.play();

  }
    
  if(bBall.y>=pad1.y){
    bBall.x = windowWidth/2;
    bBall.y = windowHeight/4;

    actualVelX = actualVelX +1;
    actualVelY = actualVelY +1;

  }

 




  // bounceEdges() end
}


function bounceOff(bObject1,padObject1){

  if(bObject1.y - padObject1.y < bObject1.height/2+padObject1.height/2 &&
    padObject1.y-bObject1.y<bObject1.height/2+padObject1.height/2&&
    bObject1.x-padObject1.x<bObject1.width/2+padObject1.width/2 &&
    padObject1.x-bObject1.x<bObject1.width/2+padObject1.width/2 ){
    return true;
  }else{
    return false;
  }


 





  // bounceOff() end
}

function colorSwap(){

  if(bounceOff(bBall,pad1)){
    bBall.shapeColor = "red";
    pad1.shapeColor = "white";

    pad2.shapeColor = "teal";
    pad3.shapeColor = "yellow";
    pad4.shapeColor = "blue";
    pad5.shapeColor = "violet";
  
  }

  if(bounceOff(bBall,pad2)){
    bBall.shapeColor = "teal";
    pad2.shapeColor = "white";

    pad1.shapeColor = "red";
    pad3.shapeColor = "yellow";
    pad4.shapeColor = "blue";
    pad5.shapeColor = "violet";


  }

  if(bounceOff(bBall,pad3)){
    bBall.shapeColor = "yellow";
    pad3.shapeColor = "white";

    pad1.shapeColor = "red";
    pad2.shapeColor = "teal";
    pad4.shapeColor = "blue";
    pad5.shapeColor = "violet";


  }


  if(bounceOff(bBall,pad4)){
    bBall.shapeColor = "blue";
    pad4.shapeColor = "white";

    pad1.shapeColor = "red";
    pad2.shapeColor = "teal";
    pad3.shapeColor = "yellow";
    pad5.shapeColor = "violet";


  }


  if(bounceOff(bBall,pad5)){
    bBall.shapeColor = "violet";
    pad5.shapeColor = "white";

    pad1.shapeColor = "red";
    pad2.shapeColor = "teal";
    pad3.shapeColor = "yellow";
    pad4.shapeColor = "blue";
  


  }





  





}


function spawnRandomGifts(){

  if((frameCount%100===0)&&gameState==="play"){
    gift1 = createSprite(200,200,20,20);
    gift1.x = Math.round(random(20,1260));
    gift1.y = Math.round(random(140,pad1.y-30));

    gift1.lifetime = 400;
    gift1Group.add(gift1);
    gift1.scale = 0.14;

    

    rand = Math.round(random(1,2))

    switch(rand){
     case 1:
       gift1.addImage("1",gift1Image);
       break;
       case 2:
         gift1.addImage("2",gift2Image);
 
    }
 


  }

  









  textSize(22);
  fill(224, 224, 224);
  text("Random Points: "+randomPoints,200,60);


  // Touching gift1
  if(bBall.isTouching(gift1Group)){
    randomPoints = randomPoints + Math.round(random(5,15));
    gift1Group[0].destroy();
    collectSound.play();
  }else{
    everything = "fine";
  }
  

  






}


function miscActivity(){

  

  //text("CameraMode: "+cameraMode,600,200);

  //  Selecting on focus on 
  if(mousePressedOver(cameraOffButton)&&cameraMode==="focus"){
    cameraMode = "noFocus";
    clickSound.play();
  }

  if(cameraMode==="focus"){
    camera.on();
    camera.x=bBall.x;
    camera.y=bBall.y;    

    cameraOnButton.x =  -windowWidth/2;
    cameraOnButton.visible = false;

    cameraOffButton.x =  windowWidth/2;
    cameraOffButton.visible = true;


    

  }

  

  if(cameraMode==="noFocus"){
    camera.off();
    camera.x = windowWidth/2;
    camera.y = windowHeight/2;


    cameraOnButton.x =  windowWidth/2;
    cameraOnButton.visible = true;

    cameraOffButton.x =  -windowWidth/2;
    cameraOffButton.visible = false;
  }

 

  // if(mousePressedOver(cameraButton)&&gameState==="play"&&cameraMode==="focus"){
   
  //   cameraMode = "noFocus";
  // }





}

