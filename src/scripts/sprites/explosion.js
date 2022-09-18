const StationaryObject = require("./stationary_object.js");
const Util = require("../util.js");

const Explosion = function (options){
    this.pos = options.pos;
    this.type = "explosion";
    this.radius = 2;
    this.colors = ["#aaaa00", "#aa3333", "#aa0011"];
    this.game = options.game;
}

Util.inherits(Explosion, StationaryObject);

Explosion.prototype.draw = function (ctx){
    ctx.beginPath();
    ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2*Math.PI);
    ctx.lineWidth = 2;
    ctx.strokeStyle = this.colors[Math.floor(Math.random()*3)];
    ctx.fillStyle = this.colors[Math.floor(Math.random()*3)];
    ctx.fill();
}


Explosion.prototype.expand = function (delta){
    if (this.radius >= 30) {this.destroy()}
    this.radius += 0.75*delta;
}

Explosion.prototype.move = Explosion.prototype.expand; //allows the rest of the game to call 'move' as an alias for 'expand'



module.exports = Explosion;