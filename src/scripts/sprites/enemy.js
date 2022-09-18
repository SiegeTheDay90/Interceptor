const MovingObject = require("./moving_object.js");
const Explosion = require("./explosion.js");
const Util = require("../util.js");

const Enemy = function(options){

    this.pos = options.pos;
    this.type = "enemy";
    this.radius = 2;
    this.vel = options.vel;
    this.color = "#e0e0e0";
    this.game = options.game;
    
    
}

Util.inherits(Enemy, MovingObject);


Enemy.prototype.destroy = function(){
    this.game.remove(this);
    this.game.explosions.push(new Explosion({game: this.game, pos: this.pos}));
}

Enemy.prototype.move = function(delta){
    MovingObject.prototype.move.call(this, delta);
    if(this.pos[1] > 465){
        this.destroy();
    }
}




module.exports = Enemy;