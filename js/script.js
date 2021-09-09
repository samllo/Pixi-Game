



/*


let app = new PIXI.Application({ width: 840, height: 560 });
document.body.appendChild(app.view);

let player1 = PIXI.Sprite.from("images/Player1.png");

player1.width = 120; // sets sprite character image size
player1.height = 120;

//positioning of player1 sprite
player1.anchor.set(0.5); //sets where in sprite anchor point is
player1.x = app.view.width /2; // centers sprite in VP 
player1.y = app.view.height /2;


app.stage.addChild(player1);


//

var square = new PIXI.Graphics();
square.beginFill(0xff0000);
square.drawRect(0, 0, 50, 50);
square.endFill();
square.x = 100;
square.y = 100;
app.stage.addChild(square);

requestAnimationFrame(update);


function update() {
  square.position.x += 1;

  app.render(app.stage);
  
  requestAnimationFrame(update);
}

 
///
square.forEach(function(square) {

  //Move the square
  square.y += square.vy;

  //Check the square's screen boundaries
  let squareHitsWall = contain(square, {x: 28, y: 10, width: 488, height: 480});

  //If the square hits the top or bottom of the stage, reverse
  //its direction
  if (squareHitsWall === "top" || squareHitsWall === "bottom") {
    square.vy *= -1;
  }

  //Test for a collision. If any of the enemies are touching
  //the explorer, set `explorerHit` to `true`
  if(hitTestRectangle(explorer, square)) {
    explorerHit = true;
  }
});

*/


let ticker = PIXI.Ticker.shared;
let text;
const WIDTH = 1000;
const HEIGHT = 560;
 
const app = new PIXI.Application({ 
    width: WIDTH,
    height: HEIGHT,
    backgroundColor: 0x000000 
});
document.body.appendChild(app.view);

/// background mountain image sprite
var mountains = PIXI.Sprite.from('images/layers/parallax-mountain-bg.png');
mountains.width = WIDTH ;
mountains.height = HEIGHT;
mountains.position.x = 0 ;
mountains.position.y = 0;
app.stage.addChild(mountains);


text = new PIXI.Text("Jump the Dragon");
text.x = app.view.width/2;
text.y = app.view.height/2;
text.anchor.set(0.5);
text.style = new PIXI.TextStyle({
  fill: 0x000000,
  fontSize: 100,
  fontFamily: "Arcade"
})

app.stage.addChild(text)

const startGame = () => {
  app.stage.removeChild(text);
  speed = 6;
}

app.view.addEventListener('click', startGame);


/*
// paralax background 
let bgBack
let bgMid 
let bgSpeed = 1;
let bgX = 0;

app.loader.baseUrl="images/layers";
app.loader
.add("bgBack", "parallax-mountain-mountains.png")
.add("bgMid", "parallax-mountain-foreground-trees.png")
app.loader.onComplete.add(initLevel);
app.loader.load()

function createBg (texture){
  let tiling = new PIXI.TilingSprite(texture, WIDTH, HEIGHT);
  tiling.position.set(0,400);
  app.stage.addChild(tiling);
  return tiling;
}

function initLevel(){
  bgBack = createBg(app.loader.resources["bgBack"].texture);
}

*/
 
// monster sprite
const sprite = PIXI.Sprite.from('images/dragon.png');
const spriteReverse = PIXI.Sprite.from('images/dragon.png');



sprite.width = 150;
sprite.height = 150;

spriteReverse.width = 150;
spriteReverse.height = 150;

// Center
sprite.anchor.set(0.9);
sprite.x = app.screen.width / 1;
sprite.y = app.screen.height / 1;

spriteReverse.anchor.set(0.9);
spriteReverse.x = app.screen.width / 1;
spriteReverse.y = app.screen.height / 1;

app.stage.addChild(sprite);
app.stage.addChild(spriteReverse);

let x = 0;

let speed = 0 ;

// Euqlidian modulo
const modAbs = (value, modulo) => (value % modulo + modulo) % modulo;


app.ticker.add(function(delta) {
  speed = speed * 1.001;
  power = power * 0.9997;
});

// Listen for animate update
app.ticker.add((delta) => {

    // Move from topto bottom
    x -= delta * speed;
    if (x > WIDTH + sprite.width * 2) {
        x = sprite.width * 2;
    }

    // use modulo to warp
    x = modAbs(x, WIDTH);

    // check if sprite overlaps the screen edge
    spriteReverse.visible = false;
    if (x + sprite.width > WIDTH) {   // is crossing then
       spriteReverse.visible = true;
       spriteReverse.position.x =  (x + WIDTH); // ...   draw a copy at opposite edge.
    }

    sprite.position.x = x

    if (colision(player1,sprite)){
      speed=0;
    }
});


////

let player1 = PIXI.Sprite.from("images/Player1.png");

player1.width = 100; // sets sprite character image size
player1.height = 100;

//positioning of player1 sprite
player1.anchor.set(0.9 ); //sets where in sprite anchor point is
player1.x = app.view.width /3.5; // centers sprite in VP 
player1.y = app.view.height /1;


app.stage.addChild(player1);



//Set Animation
let jumping = false;

let power = 20 ;
const
axis = 'y',
direction = -1, //to Top
gravity = 1,
jumpAt = player1[axis];

const jump = () => {
  if (jumping) return;
  jumping = true;

  let time = 0;

  const tick = deltaMs => {
    const jumpHeight = (-gravity / 4) * Math.pow(time, 2) + power * time;

    if (jumpHeight < 0) {
      jumping = false;
      ticker.remove(tick);
      player1[axis] = jumpAt;
      return;
    }

    player1[axis] = jumpAt + (jumpHeight * direction);
    time += deltaMs;
  }

  ticker.add(tick);
}

document.addEventListener('keydown', jump);

app.view.addEventListener('touchend', jump);


function colision (a,b){
  let aBox = a.getBounds();
  let bBox = b.getBounds()

  return  aBox.x + aBox.width > bBox.x && 
          aBox.x < bBox.x + bBox.width &&
          aBox.y + aBox.height > bBox.y &&
          aBox.y < bBox.y + bBox.height ;
        
}



// paralax scrolling bakcgorund

