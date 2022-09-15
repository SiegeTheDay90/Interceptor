const MovingObject = require("./moving_object.js");
const Explosion = require("./explosion.js");

const Util = require("./util.js");

const Missile = function(options){

    this.pos = options.pos;
    this.type = "enemy";
    this.radius = 5;
    this.vel = Util.randomFallingVec(Math.random()*1.2+0.5);
    this.color = "#e0e0e0";
    this.game = options.game;
    
    
}
Util.inherits(Missile, MovingObject);

Missile.prototype.move = function (){
    this.pos = [this.pos[0] + this.vel[0], this.pos[1] + this.vel[1]];
}

Missile.prototype.collideWith = function (object){
    if(object.type === "explosion"){
        this.destroy();
    }
};

Missile.prototype.destroy = function(){
    this.game.remove(this);
    this.game.explosions.push(new Explosion({game: this.game, pos: this.pos}));
}




module.exports = Missile;