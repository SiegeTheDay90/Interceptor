const MovingObject = require("./moving_object.js");
const Explosion = require("./explosion.js");
const Util = require("../util.js");

const Bullet = function(options){
    this.pos = [375, 395];
    this.radius = 1.5;
    this.game = options.game;
    let cursorPos = this.game.cursor.pos;
    let diffs = [cursorPos[0] - this.pos[0], cursorPos[1] - this.pos[1]];
    this.angle = [Math.atan(diffs[1]/diffs[0])];
    this.terminus = options.terminus;
    let movefix = diffs[0] < 0 ? -1 : 1;
    this.vel = [movefix * Math.cos(this.angle), movefix * Math.sin(this.angle)];
    this.colors = ["#ff8800", "#ff0000","#ff0000", "#ff0000"];
    this.type = "bullet";

}

Util.inherits(Bullet, MovingObject);

Bullet.prototype.draw = function (ctx){
    ctx.beginPath();
    ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2*Math.PI);
    ctx.strokeStyle = this.colors[Math.floor(Math.random()*3)];
    ctx.fillStyle = this.colors[Math.floor(Math.random()*3)];
    ctx.fill();
}

Bullet.prototype.move = function (delta){
    this.pos = [this.pos[0] + this.vel[0]*12*delta, this.pos[1] + this.vel[1]*12*delta];

    if (this.distanceFrom(this.terminus) < 10){
        this.destroy();
        this.game.explosions.push(new Explosion({pos: this.pos, game: this.game}));
    }
}

module.exports = Bullet;