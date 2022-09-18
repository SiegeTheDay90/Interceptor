const MovingObject = require("./moving_object.js");
const Explosion = require("./explosion.js");
const Util = require("../util.js");

const ZigZag = function(options){

    this.pos = options.pos;
    this.type = "enemy";
    this.radius = 2;
    this.vel = options.vel;
    this.color = "#e0e0e0";
    this.game = options.game;
    
    
}

Util.inherits(ZigZag, MovingObject);


ZigZag.prototype.destroy = function(){
    this.game.remove(this);
    this.game.explosions.push(new Explosion({game: this.game, pos: this.pos}));
}

// ZigZag.prototype.move = function(){
//     super.move();
// }




module.exports = ZigZag;