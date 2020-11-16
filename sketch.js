var PLAY=1;
var END = 0;
var gameState= PLAY;
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var survivalTime

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
createCanvas(600, 400)
  
monkey = createSprite(60, 315, 20,20)
  monkey.addAnimation("run", monkey_running)
  monkey.scale = 0.1

  ground = createSprite(400, 350, 1300, 20);
  ground.velocityX = -5
  ground.x = ground.width/2
  console.log(ground.x)
  
  

  obstaclesGroup=new Group();
  bananaGroup=new Group();
  
  
  monkey.setCollider("rectangle",0,0,monkey.width,monkey.height)
   //monkey.debug = true;
  
  survivalTime = 0;
}


function draw() {
background("lightBlue")
  
  text("Survival Time: "+ survivalTime, 160,40);
  
  if(gameState === PLAY){   
    if(keyDown("space")&&   monkey.y >= 240) {
        monkey.velocityY = -12;
    }
    
    
    ground.velocityX = -(4 + 3* survivalTime/10)
    
    survivalTime = survivalTime + Math.round(getFrameRate()/60.9);
    
  
    if(ground.x<0){
    ground.x=ground.width/2;
  }

  monkey.velocityY = monkey.velocityY + 0.6;
  
  
    
    spawnObstacles();
    spawnBanana();
    
    if(obstaclesGroup.isTouching(monkey)){
        //monkey.velocityY = -12
        gameState = END;
      
      
      bananaGroup.visible=false;
      bananaGroup.destroyEach();
      
    }
 
  }
  
  if(gameState === END){
    
    ground.velocityX = 0;
    monkey.velocityX = 0;
    
     obstaclesGroup.setLifetimeEach(-1);
     
    
     obstaclesGroup.setVelocityXEach(0);
    
    text('game over', 300, 200);
    
  }
  ground.shapeColor = ("green")
  
  monkey.collide(ground);
  
drawSprites();
  

}

function spawnObstacles(){
 if (frameCount % 300 === 0){
   var obstacle = createSprite(650,307,10,40);
   obstacle.velocityX = -(6 + survivalTime/100);
   obstacle.addImage(obstacleImage)
   obstacle.scale = 0.2
   
   
   obstacle.lifetime = 110;
   obstaclesGroup.add(obstacle);
  
 }
}
   
function spawnBanana() {
  //write code here to spawn the clouds
  if (frameCount % 80 === 0) {
    var banana = createSprite(600,120,40,10);
    banana.y = Math.round(random(120,200));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
  
    banana.lifetime = 200;
    
    //adjust the depth
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    //add each cloud to the group
    bananaGroup.add(banana);
  }
}


