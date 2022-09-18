const StationaryObject = require("./stationary_object.js");
const Util = require("../util.js");

const Tower = function (options){
    this.pos = options.pos || [375, 400];
    this.type = "tower";
    this.radius = 10;
    this.colors = ["#888888", "#666666", "#aa0011"];
    this.game = options.game;
}

Util.inherits(Tower, StationaryObject);

Tower.prototype.draw = function (ctx){
    let cursorPos = this.game.cursor.pos;
    let diffs = [cursorPos[0] - this.pos[0], cursorPos[1] - this.pos[1]- 5];
    this.angle = [Math.atan(diffs[1]/diffs[0])];
    let movefix = diffs[0] < 0 ? -1 : 1;

    //Barrel
    ctx.beginPath();
    ctx.strokeStyle = this.colors[1];
    ctx.moveTo(this.pos[0], this.pos[1]);
    ctx.lineTo(this.pos[0] + movefix*20*Math.cos(this.angle), this.pos[1] + movefix*20*Math.sin(this.angle));
    // ctx.lineTo(this.pos[0], this.pos[1] - 20);
    ctx.lineWidth = 5;
    ctx.stroke();

    //Base
    ctx.fillStyle = this.colors[0];
    ctx.fillRect(this.pos[0] - 10, this.pos[1], 20, 35);

    //Dome
    ctx.beginPath();
    ctx.arc(this.pos[0], this.pos[1], 8, 0, Math.PI, true)
    ctx.fill();
}


module.exports = Tower;