const Enemy = require("./sprites/enemy.js");
const City = require("./sprites/city.js");
const Tower = require("./sprites/tower.js");
const Cursor = require("./sprites/cursor.js");
const Util = require("./util.js");

const DIM_X = 700;
const DIM_Y = 500;

const Game = function(ctx){
    this.ctx = ctx;
    this.darkMode = true;
    this.over = false;
    this.bullets = [];
    this.cities = [
        new City({game: this, pos: [75, 450]}), 
        new City({game: this, pos: [175, 450]}), 
        new City({game: this, pos: [275, 450]}), 
        new City({game: this, pos: [425, 450]}), 
        new City({game: this, pos: [525, 450]}), 
        new City({game: this, pos: [625, 450]})
    ];
    this.towers = [new Tower({game: this})];
    this.explosions = [];
    this.enemies = [];
    this.speed = 20;
    this.setupGame(ctx);

    this.cursor = new Cursor({game: this});
}

Game.prototype.setupGame = function(ctx){
    setInterval(this.addEnemy.bind(this), 1500)   
}

Game.prototype.addEnemy = function(){
    // debugger;
    let friendlies = this.friendlyObjects();
    let targetPos;
    try{
        targetPos = friendlies[Math.floor(Math.random()*friendlies.length)].pos;
    } catch {
        targetPos = [375, 400];
    }
    let spawnPos = Util.spawn("enemy")

    //Calculate angle from spawn to target # # # # # # # # # # # # # # # #
    let diffs = [targetPos[0] - spawnPos[0], targetPos[1] - spawnPos[1]];
    let angle = [Math.atan(diffs[1]/diffs[0])];
    let movefix = diffs[0] < 0 ? -1 : 1;
    let vel = [movefix*Math.cos(angle), movefix*Math.sin(angle)];
    this.enemies.push(new Enemy({game: this, vel: vel, pos: spawnPos}));
}

Game.prototype.step = function(delta){
    this.moveObjects(delta);
    this.checkCollisions();
    this.draw();
}

Game.prototype.isOver = function(){
    if(this.cities.length === 0){
        setTimeout(() => {this.over = true}, 2000)
    }
}

Game.prototype.moveObjects = function(delta){
    this.allObjects().forEach((obj) => {
        obj.move(delta);
    });
}

Game.prototype.checkCollisions = function(){
    this.enemies.forEach((enemy) => {
        this.explosions.forEach((explosion) => {
            if (enemy.isCollidedWith(explosion)){
                enemy.destroy();
            }
        })

        this.cities.forEach((city) => {
                if (enemy.isCollidedWith(city)){
                        enemy.destroy();
                        city.destroy();
                    }
        })
    })
}

Game.prototype.draw = function(){
    this.ctx.clearRect(0,0, 750, 500);
    this.ctx.fillStyle = this.darkMode ? '#001019' : '#AAAAAA';
    this.ctx.fillRect(0, 0, 750, 425);
    this.ctx.fillStyle = this.darkMode ? 'darkgreen' : 'green';
    this.ctx.fillRect(0, 425, 750, 75);
    this.cursor.draw(this.ctx);
    this.allObjects().forEach((obj) => {
        obj.draw(this.ctx);
    })
}
Game.prototype.allObjects = function(){
    return this.enemies.concat(this.bullets.concat(this.explosions.concat(this.cities.concat(this.towers))));
}

Game.prototype.friendlyObjects = function(){ //will concat additional objects when implemented
    return this.cities
}
             
Game.prototype.remove = function(object){
    if (object.type === "enemy"){
        this.enemies = this.enemies.filter(item => item !== object);
    } else if (object.type === "bullet") {
        this.bullets = this.bullets.filter(item => item !== object);
    } else if (object.type === "explosion"){
        this.explosions = this.explosions.filter(item => item !== object);
    } else if (object.type === "city"){
        this.cities = this.cities.filter(item => item != object);
    }
}

module.exports = Game;