const MovingObject = require("./moving_object.js");
const Explosion = require("./explosion.js");
const Util = require("../util.js");

const Missile = function(options){
    this.pos = options.pos;
    this.type = "enemy";
    this.radius = 2;
    this.vel = options.vel;
    this.color = "#e04040";
    this.game = options.game;
    this.scoreValue = options.scoreValue || 10;
}
Util.inherits(Missile, MovingObject);

Missile.prototype.destroy = function(){
    if (this.pos[1] < 395 && !this.game.over && this.game.started){this.game.score += this.scoreValue};
    this.game.remove(this);
    this.game.explosions.push(new Explosion({game: this.game, pos: this.pos}));
}

Missile.prototype.move = function(delta){
    MovingObject.prototype.move.call(this, delta*2.8);
    if(this.pos[1] > 495){
        this.destroy();
    }
}




module.exports = Missile;