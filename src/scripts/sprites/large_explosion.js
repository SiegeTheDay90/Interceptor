const StationaryObject = require("./stationary_object.js");
const Util = require("../util.js");

const LargeExplosion = function (options){
    this.pos = options.pos;
    this.type = "explosion";
    this.radius = 2;
    this.colors = ["#470104", "#f17b0c", "#d23508", "#e49417", "#903434"];
    this.game = options.game;
    this.lifeTime = 8;
    this.city = options.city;
    this.contract = false;
}
Util.inherits(LargeExplosion, StationaryObject);

LargeExplosion.prototype.draw = function (ctx){
    if(!this.contract){  
        ctx.beginPath();
        ctx.arc(this.pos[0], this.pos[1], Math.max(0, this.radius), Math.PI, 0, false);
        ctx.fillStyle = this.colors[Math.floor(Math.random()*5)];
        ctx.fill();
    } else {
        ctx.beginPath();
        ctx.arc(this.pos[0],this.pos[1],Math.max(0, this.radius), Math.PI, 0, false);
        ctx.arc(this.pos[0],this.pos[1],(8/this.radius)*6+1, 0, Math.PI, true);
        ctx.fillStyle = this.colors[Math.floor(Math.random()*5)];
        ctx.fill();
    }
}

LargeExplosion.prototype.expand = function (){
    this.lifeTime += (this.game.height/500)/(this.game.speed/40);
    if (!this.contract){
        this.radius = -1/(1.04**(this.lifeTime - 115)) + 109*this.game.height/500;
        if (this.radius >= 100.5*this.game.height/500) {
            this.contract = true;
            this.city.destroyed = true;
        }
    } else {
        this.radius *= 0.95;
        if (this.radius <= 6.46*this.game.height/500){
            this.destroy();
        }
    }
}

LargeExplosion.prototype.move = LargeExplosion.prototype.expand;



module.exports = LargeExplosion;