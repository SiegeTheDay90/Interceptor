const StationaryObject = require("./stationary_object.js");
const Util = require("../util.js");

const Explosion = function (options){
    this.pos = options.pos;
    this.type = "explosion";
    this.game = options.game;
    this.radius = 2*this.game.height/500;
    this.colors = ["#aaaa00", "#aa3333", "#aa0011"];
    this.lifeTime = 8;
    this.contract = false;
    if(this.game.started && this.game.soundOn){
        let sound = new Audio('./sounds/explosion-1.wav');
        sound.play();
    }
}

Util.inherits(Explosion, StationaryObject);

Explosion.prototype.draw = function (ctx){
    if(!this.contract){  
        ctx.beginPath();
        ctx.arc(this.pos[0], this.pos[1], Math.max(0, this.radius), 0, 2*Math.PI, false);
        ctx.fillStyle = this.colors[Math.floor(Math.random()*3)];
        ctx.fill();
    } else {
        ctx.beginPath();
        ctx.arc(this.pos[0],this.pos[1],Math.max(0, this.radius),0,Math.PI*2, false);
        ctx.arc(this.pos[0],this.pos[1],(8*(this.game.width/750)/this.radius)*6+1,0,Math.PI*2, true);
        ctx.fillStyle = this.colors[Math.floor(Math.random()*3)];
        ctx.fill();
    }
}


Explosion.prototype.expand = function (){
    this.lifeTime += (this.game.width/750)/(this.game.speed/40);
    if (!this.contract){
        this.radius = -1/(1.07**(this.lifeTime - 50)) + 30*this.game.width/750;
        if (this.radius >= 29.74*this.game.width/750) {this.contract = true}
    } else {
        this.radius *= 0.95;
        if (this.radius <= 6.46*this.game.width/750){this.destroy()}
    }
}

Explosion.prototype.move = Explosion.prototype.expand; //allows the rest of the game to call 'move' as an alias for 'expand'



module.exports = Explosion;