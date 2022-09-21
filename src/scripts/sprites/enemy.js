const MovingObject = require("./moving_object.js");
const Explosion = require("./explosion.js");
const Util = require("../util.js");

const Enemy = function(options){

    this.pos = options.pos;
    this.type = "enemy";
    this.radius = 4;
    this.vertexLengths = [Math.random()*0.2+0.8, Math.random()*0.2+0.9, Math.random()*0.2+0.7, Math.random()*0.2+0.9, Math.random()*0.2+1.1, Math.random()*0.2+0.9, Math.random()*0.2+1.1, Math.random()*0.2+0.9]
    this.vel = options.vel;
    this.color = "#673311";
    this.game = options.game;
    this.scoreValue = 10;
    this.angle = Math.random()*Math.PI
    this.angularMomentum = (Math.random()-0.5)*0.2
    
    
}

Util.inherits(Enemy, MovingObject);


Enemy.prototype.destroy = function(){
    if (this.pos[1] < 395 && !this.game.over && this.game.started){
        this.game.score += 10;
        document.getElementById('hud-score').innerHTML = `Score: ${this.game.score}`;
    }
    this.game.remove(this);
    this.game.explosions.push(new Explosion({game: this.game, pos: this.pos}));
}

Enemy.prototype.draw = function (ctx){
    ctx.beginPath();
    //vertex 1
    ctx.moveTo(
        this.pos[0] + Math.cos(this.angle) * this.radius * this.vertexLengths[0], 
        this.pos[1] + Math.sin(this.angle) * this.radius * this.vertexLengths[0]
    );
    //2
    ctx.lineTo(
        this.pos[0] + Math.cos(this.angle + Math.PI*1/3) * this.radius * this.vertexLengths[1], 
        this.pos[1] + Math.sin(this.angle + Math.PI*1/3) * this.radius * this.vertexLengths[1]
    );
    //3
    ctx.lineTo(
        this.pos[0] + Math.cos(this.angle + Math.PI*2/3) * this.radius * this.vertexLengths[2], 
        this.pos[1] + Math.sin(this.angle + Math.PI*2/3) * this.radius * this.vertexLengths[2]
    );
    //4
    ctx.lineTo(
        this.pos[0] + Math.cos(this.angle + Math.PI*3/3) * this.radius * this.vertexLengths[3], 
        this.pos[1] + Math.sin(this.angle + Math.PI*3/3) * this.radius * this.vertexLengths[3]
    );
    //5
    ctx.lineTo(
        this.pos[0] + Math.cos(this.angle + Math.PI*4/3) * this.radius * this.vertexLengths[4], 
        this.pos[1] + Math.sin(this.angle + Math.PI*4/3) * this.radius * this.vertexLengths[4]
    );
    //6
    ctx.lineTo(
        this.pos[0] + Math.cos(this.angle + Math.PI*5/3) * this.radius * this.vertexLengths[5], 
        this.pos[1] + Math.sin(this.angle + Math.PI*5/3) * this.radius * this.vertexLengths[5]
    );
    //7
    // ctx.lineTo(
    //     this.pos[0] + Math.cos(this.angle + Math.PI*6/4) * this.radius * this.vertexLengths[6], 
    //     this.pos[1] + Math.sin(this.angle + Math.PI*6/4) * this.radius * this.vertexLengths[6]
    // );
    //8
    // ctx.lineTo(
    //     this.pos[0] + Math.cos(this.angle + Math.PI*7/4) * this.radius * this.vertexLengths[7], 
    //     this.pos[1] + Math.sin(this.angle + Math.PI*7/4) * this.radius * this.vertexLengths[7]
    // );
    
    ctx.closePath();
    ctx.strokeStyle = "#370300";
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.fillStyle = this.color;
    ctx.fill();

    
}

Enemy.prototype.move = function(delta){
    MovingObject.prototype.move.call(this, delta);
    this.angle = (this.angle + this.angularMomentum)%(Math.PI*2)
    if(this.pos[1] > 465){
        this.destroy();
    }
}




module.exports = Enemy;