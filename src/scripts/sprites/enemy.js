const MovingObject = require("./moving_object.js");
const Explosion = require("./explosion.js");
const Util = require("../util.js");

const Enemy = function(options){

    this.pos = options.pos;
    this.type = "enemy";
    this.radius = 3;
    this.vel = options.vel;
    this.color = "#e0e0e0";
    this.game = options.game;
    this.scoreValue = 10;
    
    
}

Util.inherits(Enemy, MovingObject);


Enemy.prototype.destroy = function(){
    if (this.pos[1] < 395 && !this.game.over && this.game.started){
        this.game.score += 50;
        document.getElementById('hud-score').innerHTML = `Score: ${this.game.score}`;
    }
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