let app = new PIXI.Application({ width: 640, height: 360 });
document.body.appendChild(app.view);

let player1 = PIXI.Sprite.from("images/Player1.png");

player1.width = 120; // sets sprite character image size
player1.height = 120;

/*positioning of player1 sprite*/
player1.anchor.set(0.5); //sets where in sprite anchor point is
player1.x = app.view.width /2; // centers sprite in VP 
player1.y = app.view.height /2;


app.stage.addChild(player1);