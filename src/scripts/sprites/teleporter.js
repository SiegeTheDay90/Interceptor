const Enemy = require("./enemy.js");
const Missile = require("./missile.js");
const Pop = require("./pop.js")
const Util = require("../util.js");

const Teleporter = function(options){

    this.pos = options.pos;
    this.type = "enemy";
    this.radius = 5;
    this.vel = options.vel || [1, 0];
    this.colors = ["#969fff", "#a6afbc","#b6bffc", "#e6effc"];
    this.game = options.game;
    this.teleporting = false;
    this.canAttack = true;
    this.canTeleport = true;
    
    
}

Util.inherits(Teleporter, Enemy);


Teleporter.prototype.destroy = function(){
    if (this.pos[1] < 395 && !this.game.over && this.game.started){
        this.game.score += 100;
        document.getElementById('hud-score').innerHTML = `Score: ${this.game.score}`;
    }
    this.game.explosions.push(new Pop({pos: this.pos, game: this.game}));
    this.game.remove(this);
}

Teleporter.prototype.draw = function (ctx){
    if(!this.teleporting){
        ctx.beginPath();
        ctx.moveTo(this.pos[0], this.pos[1]+this.radius/2);
        ctx.lineTo(this.pos[0]+this.radius*2, this.pos[1]);
        ctx.lineTo(this.pos[0], this.pos[1]-this.radius/2);
        ctx.lineTo(this.pos[0]-this.radius*2, this.pos[1]);
        ctx.closePath();
        ctx.strokeStyle = this.colors[Math.floor(Math.random()*2)];
        ctx.lineWidth = 2;
        ctx.stroke();
    } else if(this.teleporting){
        this.teleportStep += 2;
        if (this.teleportStep === 100){this.pos = [this.pos[0]+this.telediff[0], this.pos[1]+this.telediff[1]]}
        ctx.strokeStyle = this.colors[Math.floor(Math.random()*2)];
        if (this.teleportStep <= 100){
            ctx.beginPath();
            ctx.moveTo(this.pos[0], this.pos[1]);
            ctx.lineTo(
                this.pos[0]+this.telediff[0]*this.teleportStep/100, 
                this.pos[1]+this.telediff[1]*this.teleportStep/100
                )
        } else if (this.teleportStep <= 1000){
            this.teleportStep += 40;
            ctx.beginPath();
            ctx.moveTo(this.pos[0], this.pos[1]);
            ctx.lineTo(
                this.pos[0]-this.telediff[0]/(this.teleportStep/100), 
                this.pos[1]-this.telediff[1]/(this.teleportStep/100)
            )
        }
        ctx.stroke();

        if(this.teleportStep > 499){
            this.teleporting = false;
        }

    }

}

Teleporter.prototype.teleport = function(){
    this.telediff = [Math.floor(Math.random()*650 + 50) - this.pos[0], Math.floor(Math.random()*100 + 10) - this.pos[1]];
    this.teleporting = true;
    this.canTeleport = false;
    this.teleportStep = 0;
    setTimeout(() => {this.canTeleport = true}, 3500)
}

Teleporter.prototype.move = function(){

    let makeTeleport = Math.random();
    let makeAttack = Math.random();

    if (!this.teleporting && this.canTeleport && makeTeleport > 0.997){
        this.teleport();
    }

    if(!this.teleporting && this.canAttack && makeAttack > 0.995){
        this.attack();
    }
}

Teleporter.prototype.attack = function(){
    this.canAttack = false;
    let friendlies = this.game.friendlyObjects();
    let targetPos;
    try{
        targetPos = friendlies[Math.floor(Math.random()*friendlies.length)].pos;
    } catch {
        targetPos = [375, 400];
    }

    let diffs = [targetPos[0] - this.pos[0], targetPos[1] - this.pos[1]];
    let angle = [Math.atan(diffs[1]/diffs[0])];
    let movefix = diffs[0] < 0 ? -1 : 1;
    let vel = [movefix*Math.cos(angle), movefix*Math.sin(angle)];

    this.game.enemies.push(new Missile({game: this.game, pos: this.pos, vel: vel}))
    setTimeout(()=>{this.canAttack = true}, 5000);
}




module.exports = Teleporter;