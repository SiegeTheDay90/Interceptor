const StationaryObject = require("./stationary_object.js");
const Util = require("../util.js");

const Pop = function (options){
    this.pos = options.pos;
    this.type = "pop";
    this.radius = 2;
    this.colors = ["#00aaaa", "#3333aa", "#1100aa"];
    this.game = options.game;
    if(this.game.started && this.game.soundOn){
        let sound = new Audio('./sounds/explosion-2.wav');
        sound.play();
    }
}

Util.inherits(Pop, StationaryObject);

Pop.prototype.draw = function (ctx){
    ctx.beginPath();
    ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2*Math.PI);
    ctx.fillStyle = this.colors[Math.floor(Math.random()*3)];
    ctx.fill();
}


Pop.prototype.expand = function (delta){
    if (this.radius >= 10) {this.destroy()}
    this.radius += 1*delta;
}

Pop.prototype.move = Pop.prototype.expand; //allows the rest of the game to call 'move' as an alias for 'expand'



module.exports = Pop;