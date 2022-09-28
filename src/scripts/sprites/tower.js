const StationaryObject = require("./stationary_object.js");
const Util = require("../util.js");

const Tower = function (options){
    this.pos = options.pos || [375, 500];
    this.type = "tower";
    this.radius = 10;
    this.colors = ["#888888", "#666666", "#aa0011"];
    this.game = options.game;
    this.sprite = new Image();
    this.sprite.src = 'images/tower.png';
}

Util.inherits(Tower, StationaryObject);

Tower.prototype.draw = function (ctx){
    let cursorPos = this.game.cursor.pos;
    let diffs = [cursorPos[0] - this.pos[0], cursorPos[1] - this.pos[1]+105];
    if(diffs[1] > 0){
        diffs[1] = 0;
    }
    this.angle = [Math.atan(diffs[1]/diffs[0])];
    let movefix = diffs[0] < 0 ? -1 : 1;
    ctx.beginPath();
    ctx.strokeStyle = "#a55f35";
    ctx.moveTo(this.pos[0]-1, this.pos[1]-105);
    ctx.lineTo(this.pos[0] + movefix*20*Math.cos(this.angle), this.pos[1]-105 + movefix*20*Math.sin(this.angle));
    ctx.lineWidth = 5;
    ctx.stroke();
    ctx.drawImage(this.sprite, this.pos[0]-37, this.pos[1], 75, -125);
}


module.exports = Tower;