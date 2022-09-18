const StationaryObject = require("./stationary_object.js");
const Util = require("../util.js");

const City = function (options){
    this.pos = options.pos;
    this.type = "city";
    this.radius = 5;
    this.colors = ["#FFFFFF", "#aa3333", "#aa0011"];
    this.game = options.game;
}

Util.inherits(City, StationaryObject);

City.prototype.draw = function (ctx){
    ctx.fillStyle = this.colors[0];
    ctx.fillRect(this.pos[0] - this.radius, this.pos[1] - this.radius, this.radius*4, this.radius*2);
}


module.exports = City;