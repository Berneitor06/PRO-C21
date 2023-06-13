var nave, naveImg;

//Bordes
var borde1,borde2,borde3,borde4;

var fondo,fondoImg;

var choqueSonido;

var restart, restartIm;
var gameOver, gameOverIm;

var puntaje=0;

var puntaje=0; 
var play = 1;
var end = 0;
var gameState = play;

var me1,me2,me3,me4;

var obstaculoGrupo;

function preload(){
    //Jugador
    naveImg=loadImage("jugador.png");
    //Fondo
    fondoImg=loadImage("fondo.png");

    choqueSonido=loadSound("die.mp3");

    me1=loadImage("me1.png");
    me2=loadImage("me2.png");
    me3=loadImage("me3.png");
    me4=loadImage("me4.png");


    restartIm=loadImage("restart.png");
    gameOverIm=loadImage("gameOver.png");

}

function setup() {
 createCanvas(400,500);
 background("white");

 restart=createSprite(200,225);
 gameOver=createSprite(200,190);

 //Juego terminado
 restart.addImage("restart",restartIm);
  restart.scale=0.5;
  gameOver.addImage("gameOver",gameOverIm);
  gameOver.scale=0.5;

 

 //Bordes
borde1=createSprite(11,225,20,550);
borde1.shapeColor="green";

borde2=createSprite(389,225,20,550);
borde2.shapeColor="green";

borde3=createSprite(200,11,400,20);
borde3.shapeColor="green";

borde4=createSprite(200,489,400,20);
borde4.shapeColor="green";


 //Fondo
 fondo=createSprite(200,250,400,500);
 fondo.addImage(fondoImg);
 fondo.scale=4;
 

 //Jugador
 nave=createSprite(200,440);
 nave.addImage(naveImg);
 nave.scale=0.8;

 obstaculoGrupo= new Group();

    nave.setCollider("circle",0,0,40);
    nave.debug=false;

  borde1.visible=false;
    borde2.visible=false;
    borde3.visible=false;
    borde4.visible=false;
 //Colisiones
 createEdgeSprites();

}

function draw() {

    if(gameState===play){

        //Puntuación
    text("Puntaje: "+puntaje,200,100);
    stroke("white");
    puntaje=puntaje+ Math.round(frameCount/500);

    restart.visible=false;
    gameOver.visible=false;
  
    
    
    
    nave.bounceOff(borde1);
    nave.bounceOff(borde2);
    nave.bounceOff(borde3);
    nave.bounceOff(borde4);

    //Movimiento nave
    if(keyDown("right")){
        nave.x=nave.x+20;
    }

    if(keyDown("left")){
        nave.x=nave.x-20;
    }

    
    crearObstaculos();

    if(obstaculoGrupo.isTouching(nave)){
        gameState=end;
        choqueSonido.play();
      }
}
    
if(gameState===end){
    
    obstaculoGrupo.setVelocityYEach(0);
    obstaculoGrupo.setLifetimeEach(-1);

    restart.visible=true;
    gameOver.visible=true;

    fondo.visible=false;
    

    if(mousePressedOver(restart)){
    reiniciar();
  }
    
  }




 drawSprites();
}

function crearObstaculos(){
    //Creación de obstáculos cada 60 cuadros
  if(frameCount%60===0){
    var obstaculo;
    
    obstaculo = createSprite(200, 50,10,40);
    obstaculo.scale=0.5;
  
    obstaculo.x=Math.round(random(20,380));
    obstaculo.velocityY=(6+2*puntaje/500);;
    var rand = Math.round(random(1,4));
    //Creación de obstáculos aleatorios
    switch(rand){
      case 1: obstaculo.addImage(me1);
      break;
      case 2: obstaculo.addImage(me2);
      break;
      case 3: obstaculo.addImage(me3);
      break;
      case 4: obstaculo.addImage(me4);
      break;
      default:break;
    }
  
    
    obstaculoGrupo.add(obstaculo);
  }
}

function reiniciar(){
    gameState=play;
    obstaculoGrupo.destroyEach(); 
    puntaje=0;
    fondo.visible=true;
   }