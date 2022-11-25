const Asteroid = require("./asteroid.js");
const Explosion = require("./explosion.js");
const Util = require("../util.js");

const ZigZag = function(options){

    this.pos = options.pos;
    this.type = "enemy";
    this.radius = 2;
    this.vel = options.vel;
    this.colors = ["#FFa0a0", "#FF3030", "#FFFFFF"];
    this.game = options.game;
    this.canChangeDir = true;
    
    
}

Util.inherits(ZigZag, Asteroid);


ZigZag.prototype.destroy = function(){
    if (this.pos[1] < 395 && !this.game.over && this.game.started){this.game.score += 50};
    this.game.remove(this);
    this.game.explosions.push(new Explosion({game: this.game, pos: this.pos}));
}

ZigZag.prototype.draw = function (ctx){
    ctx.beginPath();
    ctx.moveTo(this.pos[0], this.pos[1]+this.radius);
    ctx.lineTo(this.pos[0]+this.radius*1.5, this.pos[1]);
    ctx.lineTo(this.pos[0], this.pos[1]-this.radius);
    ctx.lineTo(this.pos[0]-this.radius*1.5, this.pos[1]);
    ctx.closePath();
    ctx.strokeStyle = this.colors[Math.floor(Math.random()*2)];
    ctx.lineWidth = 2;
    ctx.stroke();
}

ZigZag.prototype.move = function(delta){
    let changeDir = Math.random();

    if (changeDir > 0.8 && this.canChangeDir && this.pos[1] < 200){
        this.canChangeDir = false;
        setTimeout(()=>{this.canChangeDir = true}, 1500/(40/this.game.speed))
        let targetPos = Util.chooseTarget(this.game);
        this.vel = Util.angleTo(this, targetPos);
    }

    Asteroid.prototype.move.call(this, delta/0.95);
}

module.exports = ZigZag;