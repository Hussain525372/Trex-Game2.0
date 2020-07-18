var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloudsGroup , obstaclesGroup;
var CloudImage;
var Obstacle1, Obstacle2, Obstacle3, Obstacle4, Obstacle5, Obstacle6;
var score = 0;

//initiate Game STATEs
var PLAY = 1;
var END = 0;
var gameState = PLAY;

var gameOver, restart, gameOverImage, restartImage;

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  CloudImage = loadImage("cloud.png");
  Obstacle1 = loadImage("obstacle1.png");
  Obstacle2 = loadImage("obstacle2.png");
  Obstacle3 = loadImage("obstacle3.png");
  Obstacle4 = loadImage("obstacle4.png");
  Obstacle5 = loadImage("obstacle5.png");
  Obstacle6 = loadImage("obstacle6.png");
  gameOverImage = loadImage("gameOver.png");
  restartImage = loadImage("restart.png");
}

function setup() {
  createCanvas(600, 200);
  
  //place gameOver and restart icon on the screen
  gameOver = createSprite(300,100);
  restart = createSprite(300,140);
  gameOver.addImage(gameOverImage);
  gameOver.scale = 0.5;
  restart.addImage(restartImage);
  restart.scale = 0.5;

  gameOver.visible = false;
  restart.visible = false;
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -2;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  obstaclesGroup = new Group();
  cloudsGroup = new Group();
}

function draw() {
  background(180);
  
  trex.collide(invisibleGround);
  
  text("Score = " + Math.round(score), 500, 50);
  
  if(gameState === PLAY)
  {
      score = score + 0.1;
  
  if(keyDown("space") && trex.y > 160) {
    trex.velocityY = -12;
  }
  
  trex.velocityY = trex.velocityY + 0.8
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  
  
  spawnObstacles();
  spawnClouds();
    
  //End the game when trex is touching the obstacle
    if(obstaclesGroup.isTouching(trex)){
      gameState = END;
    }
  }
  
  else if(gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    trex.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    
    //change the trex animation
    trex.addAnimation("collided", trex_collided);
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    
    
  }
  
  if(mousePressedOver(restart)) {
    reset();
  }
    
  drawSprites();
}


function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);
    obstacle.velocityX = -6;
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    
    switch(rand){
      case 1: obstacle.addImage(Obstacle1);
              break;
      case 2: obstacle.addImage(Obstacle2);
              break;
      case 3: obstacle.addImage(Obstacle3);
              break;
      case 4: obstacle.addImage(Obstacle4);
              break;
      case 5: obstacle.addImage(Obstacle5);
              break;
      case 6: obstacle.addImage(Obstacle6);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 100;
    obstaclesGroup.add(obstacle);
  }
}

function reset(){
  gameState = PLAY;
  
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  
  trex.changeAnimation("running", trex_running);
  
  score = 0;
  
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(CloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    cloudsGroup.add(cloud);
  }
  
}