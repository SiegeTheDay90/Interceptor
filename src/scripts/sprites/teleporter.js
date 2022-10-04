const Enemy = require("./enemy.js");
const Missile = require("./missile.js");
const Pop = require("./pop.js")
const Util = require("../util.js");

const Teleporter = function(options){

    this.pos = options.pos;
    this.type = "enemy";
    this.radius = 10;
    this.vel = options.vel || [1, 0];
    this.colors = ["#eeeeff", "#ddecff","#dbdbfb", "#bed9fd", "#b7b7f7"];
    this.game = options.game;
    this.teleporting = false;
    this.canAttack = true;
    this.canTeleport = true;
    this.teleport();
    
    
}

Util.inherits(Teleporter, Enemy);


Teleporter.prototype.destroy = function(){
    if(!this.teleporting){
        if (this.pos[1] < 395 && !this.game.over && this.game.started){this.game.score += 100};
        this.game.explosions.push(new Pop({pos: this.pos, game: this.game}));
        this.game.remove(this);
    }
}

Teleporter.prototype.draw = function (ctx){
    if(!this.teleporting){
        ctx.beginPath();
        ctx.moveTo(this.pos[0], this.pos[1]+this.radius/2);
        ctx.lineTo(this.pos[0]+this.radius*2, this.pos[1]);
        ctx.lineTo(this.pos[0], this.pos[1]-this.radius/2);
        ctx.lineTo(this.pos[0]-this.radius*2, this.pos[1]);
        ctx.closePath();
        ctx.strokeStyle = this.colors[Math.floor(Math.random()*5)];
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.fillStyle = this.colors[Math.floor(Math.random()*5)]
        ctx.fill();
    } else if(this.teleporting){
        this.teleportStep += 2;
        if (this.teleportStep === 100){this.pos = [this.pos[0]+this.telediff[0], this.pos[1]+this.telediff[1]]}
        ctx.strokeStyle = this.colors[Math.floor(Math.random()*2)];
        if (this.teleportStep < 100){
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
    this.telediff = [Math.floor(Math.random()*650 + 50) - this.pos[0], Math.floor(Math.random()*150 + 10) - this.pos[1]];
    this.teleporting = true;
    this.canTeleport = false;
    this.teleportStep = 0;
    if (this.game.started && this.game.soundOn){
        let sound = new Audio('./sounds/teleport-1.wav');
        sound.volume = 0.1;
        sound.play();
    }
    setTimeout(() => {this.canTeleport = true}, 3000/(40/this.game.speed))
}

Teleporter.prototype.move = function(){

    let makeTeleport = Math.random();
    let makeAttack = Math.random();

    if (!this.teleporting && this.canTeleport && makeTeleport > 0.99){
        this.teleport();
    }

    if(!this.teleporting && this.canAttack && makeAttack > 0.97){
        this.attack();
    }
}

Teleporter.prototype.attack = function(){
    this.canAttack = false;
    let targetPos = Util.chooseTarget(this.game);
    let vel = Util.angleTo(this, targetPos, 1.3);
    this.game.enemies.push(new Missile({game: this.game, pos: this.pos, vel: vel}))
    setTimeout(()=>{this.canAttack = true}, 4000/(40/this.game.speed));
}




module.exports = Teleporter;