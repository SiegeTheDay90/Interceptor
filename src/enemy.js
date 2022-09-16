const MovingObject = require("./moving_object.js");
const Explosion = require("./explosion.js");

const Util = require("./util.js");

const Enemy = function(options){

    this.pos = options.pos;
    this.type = "enemy";
    this.radius = 5;
    this.vel = Util.randomFallingVec(Math.random()*1.2+0.5);
    this.color = "#e0e0e0";
    this.game = options.game;
    
    
}
Util.inherits(Enemy, MovingObject);

Enemy.prototype.collideWith = function (object){
    if(object.type === "explosion"){
        this.destroy();
    }
};

Enemy.prototype.destroy = function(){
    this.game.remove(this);
    this.game.explosions.push(new Explosion({game: this.game, pos: this.pos}));
}




module.exports = Enemy;