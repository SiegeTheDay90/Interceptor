const Asteroid = require("./asteroid.js");
const Missile = require("./missile.js");
const Pop = require("./pop.js")
const Util = require("../util.js");

const Boss = function(options){

    this.pos = options.pos;
    this.type = "enemy";
    this.hitPoints = 5;
    this.game = options.game;
    this.radius = 30*this.game.height/500;
    this.vel = [0.4, 0.1];
    this.colors = ["#00905e","#00705e", "#00705e", "#00705e"];
    this.hitColors = ["#b0205e","#b0105e", "#c0305e", "#f0305e"];
    this.colorIdx = 0;
    this.teleporting = false;
    this.canAttack = false;
    setTimeout(() => {
        this.canAttack = true
    }, 3000)
    this.canTeleport = true;
    this.invincible = false;
    this.moveDirs = [[0.4,0.1], [0.4,-0.1], [-0.4,-0.1], [-0.4,0.1]];
    setInterval(() => {
        this.moveDirIdx = (this.moveDirIdx+1)%4
        this.vel = this.moveDirs[this.moveDirIdx]
    }, 1500)
    this.moveDirIdx = 0;
    this.spriteSheet = [];
    for(let i =0; i < 6; i++){
        this.spriteSheet.push(new Image());
        this.spriteSheet[i].src = `images/boss/boss${i}.png`;
    }
    this.spriteStep = 0;
    setInterval(() => {
        this.spriteStep = (this.spriteStep+1)%6;
    }, 75);
    this.teleport();
    
    
}

Util.inherits(Boss, Asteroid);


Boss.prototype.destroy = function(){
    if(!this.teleporting && this.hitPoints === 1 && !this.invincible){

        if (!this.game.over && this.game.started){this.game.score += 500};
        this.game.explosions.push(new Pop({pos: this.pos, game: this.game, radius: 10, max_radius: 40}));
        this.game.remove(this);

    } else if(!this.teleporting && !this.invincible){
        if (!this.game.over && this.game.started){
            this.game.score += 25;
            this.hitPoints -= 1;
            this.invincible = true;
            setTimeout(() => {this.invincible = false}, 2250);
            if (this.game.started && this.game.soundOn){
                let sound = new Audio('./sounds/hit-1.wav');
                sound.volume = 0.5;
                sound.play();
            }
        }
    }
}

Boss.prototype.draw = function (ctx){
    if(!this.teleporting){
        ctx.drawImage(this.spriteSheet[this.spriteStep], this.pos[0]-60, this.pos[1]-30, this.radius*4, this.radius*2);
    } else if(this.teleporting){
        this.teleportStep += 3;
        if (this.teleportStep === 99){this.pos = [this.pos[0]+this.telediff[0], this.pos[1]+this.telediff[1]]}
        ctx.strokeStyle = this.colors[Math.floor(Math.random()*2)];
        if (this.teleportStep < 100){
            ctx.beginPath();
            ctx.moveTo(this.pos[0], this.pos[1]);
            ctx.lineTo(
                this.pos[0]+this.telediff[0]*this.teleportStep/100, 
                this.pos[1]+this.telediff[1]*this.teleportStep/100
                )
        } else if (this.teleportStep <= 1000){
            this.teleportStep += 35;
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

Boss.prototype.teleport = function(){
    this.telediff = [Math.floor(Math.random()*this.game.width) - this.pos[0], Math.floor(Math.random()*this.game.height/7 + 10) - this.pos[1]];
    this.teleporting = true;
    this.canTeleport = false;
    this.teleportStep = 0;
    if (this.game.started && this.game.soundOn){
        let sound = new Audio('./sounds/teleport-1.wav');
        sound.volume = 0.1;
        sound.play();
    }
    setTimeout(() => {this.canTeleport = true}, 7000/(40/this.game.speed))
}

Boss.prototype.move = function(delta){

    let makeTeleport = Math.random();
    let makeAttack = Math.random();

    if(!this.teleporting && !this.canAttack){
        Asteroid.prototype.move.call(this, delta)
    }

    if (!this.teleporting && this.canTeleport && makeTeleport > 0.995){
        this.teleport();
    }

    if(!this.teleporting && this.canAttack && makeAttack > 0.9){
        this.attack();
    }
}

Boss.prototype.attack = function(){
    if(this.canAttack){
        this.canAttack = false;
        let targetPos = Util.chooseTarget(this.game);
        const types = ['line', 'spray', 'multi', 'line', 'line']
        let type = types[Math.floor(Math.random()*5)]
        switch(type){
            case 'line':
                let vel = Util.angleTo(this, targetPos, 1.3);
                this.game.enemies.push(new Missile({game: this.game, pos: this.pos, vel: vel}));
                setTimeout(() => {this.game.enemies.push(new Missile({game: this.game, pos: this.pos, vel: vel, scoreValue: 2}))}, 500/(40/this.game.speed));
                setTimeout(() => {this.game.enemies.push(new Missile({game: this.game, pos: this.pos, vel: vel, scoreValue: 2}))}, 1000/(40/this.game.speed));
                setTimeout(() => {this.game.enemies.push(new Missile({game: this.game, pos: this.pos, vel: vel, scoreValue: 2}))}, 1500/(40/this.game.speed));
                setTimeout(() => {this.game.enemies.push(new Missile({game: this.game, pos: this.pos, vel: vel, scoreValue: 2}))}, 3000/(40/this.game.speed));
            break;

            case 'spray':
                let vel1 = Util.angleTo(this, [targetPos[0]-10, targetPos[1]], 1.1);
                setTimeout(() => {this.game.enemies.push(new Missile({game: this.game, pos: this.pos, vel: vel1, scoreValue: 1}))}, 450/(40/this.game.speed));
                let vel2 = Util.angleTo(this, [targetPos[0]-15, targetPos[1]], 1.3);
                setTimeout(() => {this.game.enemies.push(new Missile({game: this.game, pos: this.pos, vel: vel2, scoreValue: 1}))}, 1200/(40/this.game.speed));
                let vel3 = Util.angleTo(this, targetPos, 1.1);
                this.game.enemies.push(new Missile({game: this.game, pos: this.pos, vel: vel3, scoreValue: 1}));
                let vel4 = Util.angleTo(this, [targetPos[0]+25, targetPos[1]], 1.1);
                setTimeout(() => {this.game.enemies.push(new Missile({game: this.game, pos: this.pos, vel: vel4, scoreValue: 1}))}, 225/(40/this.game.speed));
                let vel5 = Util.angleTo(this, [targetPos[0]+50, targetPos[1]], 1.2);
                setTimeout(() => {this.game.enemies.push(new Missile({game: this.game, pos: this.pos, vel: vel5, scoreValue: 1}))}, 850/(40/this.game.speed));
                let vel6 = Util.angleTo(this, [targetPos[0]-17, targetPos[1]], 1.1);
                setTimeout(() => {this.game.enemies.push(new Missile({game: this.game, pos: this.pos, vel: vel6, scoreValue: 1}))}, 550/(40/this.game.speed));
                let vel7 = Util.angleTo(this, [targetPos[0]-35, targetPos[1]], 1.0);
                setTimeout(() => {this.game.enemies.push(new Missile({game: this.game, pos: this.pos, vel: vel7, scoreValue: 1}))}, 750/(40/this.game.speed));
                let vel9 = Util.angleTo(this, [targetPos[0]-25, targetPos[1]], 1.0);
                setTimeout(() => {this.game.enemies.push(new Missile({game: this.game, pos: this.pos, vel: vel9, scoreValue: 1}))}, 1750/(40/this.game.speed));
            break;

            case 'multi':
                let delay = 0;
                this.game.friendlyObjects().forEach((friendly) => {
                    let targetPos = friendly.pos;
                    let vel = Util.angleTo(this, [targetPos[0], targetPos[1]], 1.2);
                    setTimeout(() => {this.game.enemies.push(new Missile({game: this.game, pos: this.pos, vel: vel, scoreValue: 2}))}, delay/(40/this.game.speed));
                    delay += 500;
                })
            break;
        }
        setTimeout(()=>{this.canAttack = true}, 15000/(40/this.game.speed));
    }
}




module.exports = Boss;