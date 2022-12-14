const Asteroid = require("./asteroid.js");
const Missile = require("./missile.js");
const Pop = require("./pop.js")
const Util = require("../util.js");

const Teleporter = function(options){

    this.pos = options.pos;
    this.type = "enemy";
    this.game = options.game;
    this.radius = 15*this.game.height/500;
    this.vel = options.vel || [1, 0];
    this.colors = ["#eeeeff", "#ddecff","#dbdbfb", "#bed9fd", "#b7b7f7"];
    this.teleporting = false;
    this.canAttack = true;
    this.canTeleport = true;
    this.spriteSheet = [];
    for(let i =0; i < 6; i++){
        this.spriteSheet.push(new Image());
        this.spriteSheet[i].src = `images/saucer/saucer${i}.png`;
    }
    this.spriteStep = 0;
    setInterval(() => {
        this.spriteStep = (this.spriteStep+1)%6;
    }, 75)
    this.teleport();
}

Util.inherits(Teleporter, Asteroid);


Teleporter.prototype.destroy = function(){
    if(!this.teleporting){
        if (this.pos[1] < 395 && !this.game.over && this.game.started){this.game.score += 100};
        this.game.explosions.push(new Pop({pos: this.pos, game: this.game}));
        this.game.remove(this);
    }
}

Teleporter.prototype.draw = function (ctx){
    if(!this.teleporting){
        ctx.drawImage(this.spriteSheet[this.spriteStep], this.pos[0]-22, this.pos[1]-7, this.radius*4, this.radius*2);
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
    this.telediff = [Math.floor(Math.random()*this.game.width) - this.pos[0], Math.floor(Math.random()*125 + 10) - this.pos[1]];
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