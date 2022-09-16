const Enemy = require("./enemy.js");
const Util = require("./util.js");
const Cursor = require("./cursor.js");

const DIM_X = 700;
const DIM_Y = 500;

const Game = function(ctx, enemySet){
    this.bullets = [];
    this.explosions = [];
    this.enemies = [];
    this.setupGame(ctx);
    this.enemySet ||= [
        this.addEnemy({game: this, pos: [250, 10]}),
        this.addEnemy({game: this, pos: [350, 20]}),
        this.addEnemy({game: this, pos: [150, 10]}),
        this.addEnemy({game: this, pos: [250, 30]}),
        this.addEnemy({game: this, pos: [150, 20]}),
        this.addEnemy({game: this, pos: [350, 0]})
    ]

    this.ctx = ctx;

    this.cursor = new Cursor({game: this});
}

Game.prototype.setupGame = function(ctx){
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, 750, 400);
    ctx.fillStyle = 'green';
    ctx.fillRect(0, 400, 750, 100);
}


Game.prototype.draw = function(){
    this.ctx.clearRect(0,0, 750, 500);
    this.ctx.fillStyle = 'black';
    this.ctx.fillRect(0, 0, 750, 400);
    this.ctx.fillStyle = 'green';
    this.ctx.fillRect(0, 400, 750, 100);
    this.cursor.draw(this.ctx);
    this.allObjects().forEach((obj) => {
        obj.draw(this.ctx);
    })
}


Game.prototype.step = function(delta){
    this.moveObjects(delta);
    this.checkCollisions();
}
Game.prototype.moveObjects = function(delta){
    this.allObjects().forEach((obj) => {
        obj.move(delta);
    });
    
    this.draw();
}

Game.prototype.allObjects = function(){
    return this.enemies.concat(this.bullets.concat(this.explosions));
}



Game.prototype.checkCollisions = function(){
    this.enemies.forEach((enemy) => {
        this.explosions.forEach((explosion) => {
            // debugger;
            if (enemy.isCollidedWith(explosion)){
                enemy.destroy();
            }
        })
        //Uncomment this code when cities are implemented
        // this.cities().forEach((city) => {
            //     if (enemy.isCollidedWith(city)){
                //         enemy.destroy();
                //         city.destroy();
                //     }
                // })
            })
        }
        
        
        Game.prototype.remove = function(object){
            if (object.type === "enemy"){
                this.enemies = this.enemies.filter(item => item !== object);
            } else if (object.type === "bullet") {
                this.bullets = this.bullets.filter(item => item !== object);
            } else if (object.type === "explosion"){
                this.explosions = this.explosions.filter(item => item !== object);
            }
        }

        Game.prototype.addEnemy = function(options){
            this.enemies.push(new Enemy(options));
        }

        module.exports = Game;