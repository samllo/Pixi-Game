

let ticker = PIXI.Ticker.shared;
let text;
let stop;
const WIDTH = 900;
const HEIGHT = 520;
 
const app = new PIXI.Application({ 
    width: WIDTH,
    height: HEIGHT,
    backgroundColor: 0x000000 
});
document.getElementById("screen").appendChild(app.view);

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
  refreshIntervalId = setInterval(setTime, 1000);

}

app.view.addEventListener('click', startGame);

text2 = new PIXI.Text("GAME OVER");
text2.x = app.view.width/2;
text2.y = app.view.height/2;
text2.anchor.set(0.5);
text2.style = new PIXI.TextStyle({
  fill: 0x000000,
  fontSize: 100,
  fontFamily: "Arcade"
})

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
      app.view.removeEventListener('click', startGame);
      app.stage.addChild(text2)
      stop = 0;
      clearInterval(refreshIntervalId);
    }
});


//player 1 sprite

let player1 = PIXI.Sprite.from("images/Player1.png");

player1.width = 100; // sets sprite character image size
player1.height = 100;

//positioning of player1 sprite
player1.anchor.set(0.9 ); //sets where in sprite anchor point is
player1.x = app.view.width /3.5; // centers sprite in VP 
player1.y = app.view.height /1;

app.stage.addChild(player1);

//Set jumping Animation
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


// COLISION DETECTION

function colision (a,b){
  let aBox = a.getBounds();
  let bBox = b.getBounds()

  return  aBox.x + aBox.width > bBox.x && 
          aBox.x < bBox.x + bBox.width &&
          aBox.y + aBox.height > bBox.y &&
          aBox.y < bBox.y + bBox.height ;
        
}

// count up timer

let minutesLabel = document.getElementById("minutes");
let secondsLabel = document.getElementById("seconds");
let totalSeconds = 0;
let refreshIntervalId;

function setTime() {
  ++totalSeconds;
  secondsLabel.innerHTML = pad(totalSeconds % 60);
  minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));   
}

function pad(val) {
  var valString = val + "";
  if (valString.length < 2) {
    return "0" + valString;
  } else {
    return valString;
  } 
}

