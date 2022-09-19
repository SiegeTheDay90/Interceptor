const Enemy = require("./enemy.js");
const Explosion = require("./explosion.js");
const Util = require("../util.js");

const ZigZag = function(options){

    this.pos = options.pos;
    this.type = "enemy";
    this.radius = 2;
    this.vel = options.vel;
    this.colors = ["#FFa0a0", "#FF3030"];
    this.game = options.game;
    
    
}

Util.inherits(ZigZag, Enemy);


ZigZag.prototype.destroy = function(){
    if (this.pos[1] < 395){
        this.game.score += 75;
        document.getElementById('hud-score').innerHTML = `Score: ${this.game.score}`;
    }
    this.game.remove(this);
    this.game.explosions.push(new Explosion({game: this.game, pos: this.pos}));
}

ZigZag.prototype.draw = function (ctx){
    ctx.beginPath();
    ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2*Math.PI);
    ctx.strokeStyle = "white";
    ctx.lineWidth = 2;
    // ctx.stroke();
    ctx.fillStyle = this.colors[Math.floor(Math.random()*2)];
    ctx.fill();
}

ZigZag.prototype.move = function(delta){
    let changeDir = Math.random();

    if (changeDir > 0.99){
        let friendlies = this.game.friendlyObjects();
        let targetPos;
        try{
            targetPos = friendlies[Math.floor(Math.random()*friendlies.length)].pos;
        } catch {
            targetPos = [375, 400];
        }
            
        //Calculate angle from spawn to target # # # # # # # # # # # # # # # #
        let diffs = [targetPos[0] - this.pos[0], targetPos[1] - this.pos[1]];
        let angle = [Math.atan(diffs[1]/diffs[0])];
        let movefix = diffs[0] < 0 ? -1 : 1;
        this.vel = [movefix*Math.cos(angle), movefix*Math.sin(angle)];
    }

    Enemy.prototype.move.call(this, delta/2);
}




module.exports = ZigZag;