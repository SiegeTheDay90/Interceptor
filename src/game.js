const Asteroid = require("./missile.js");
const Ship = require("./ship.js");
const Util = require("./util.js");

const DIM_X = 700;
const DIM_Y = 500;

const Game = function(ctx){
    this.friendlies = [];
    this.enemies = [];
    this.setupGame(ctx);
}

Game.prototype.setupGame = function(){
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, 750, 400);
    ctx.fillStyle = 'green';
    ctx.fillRect(0, 400, 750, 100);
}

Game.prototype.allObjects = function(){
return
}

Game.prototype.randomPosition = function(){
    let randPos = [350, 250];

    while((220 < randPos[0] && randPos[0] < 280) || (220 < randPos[1] && randPos[1] < 280)){
        randPos = [Math.floor(Math.random()*501), Math.floor(Math.random()*501)]
    }
    return randPos
}


Game.prototype.addEnemy = function(options){
    this.asteroids.push(new Asteroid(options));
}

Game.prototype.draw = function(ctx){
    ctx.clearRect(0,0, 500, 500);
    this.allObjects().forEach((obj) => {
        obj.draw(ctx);
    })
}

Game.prototype.remove = function(object){
    if (this.asteroids.includes(object)){
        this.asteroids = this.asteroids.filter(item => item !== object);
    } else if (this.ship === object) {
        //kill ship?
    } else {
        this.bullets = this.bullets.filter(item => item !== object);
    }
}

Game.prototype.moveObjects = function(ctx){
    this.allObjects().forEach((obj) => {
        obj.move();
    });
    this.draw(ctx);
}

Game.prototype.checkCollisions = function(){
    this.allObjects().forEach((object) => {
        this.allObjects().forEach((otherObject) => {
            if (object.isCollidedWith(otherObject) && object !== otherObject){
                object.collideWith(otherObject);
            }
        })
    })
}

Game.prototype.step = function(ctx){
    this.moveObjects(ctx);
    this.checkCollisions();
}

module.exports = Game;