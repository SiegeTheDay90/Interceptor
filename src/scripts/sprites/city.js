const StationaryObject = require("./stationary_object.js");
const Util = require("../util.js");

const City = function (options){
    this.pos = options.pos;
    this.type = "city";
    this.radius = 5;
    this.colors = ["#FFFFFF", "#aa3333", "#aa0011"];
    this.game = options.game;
    this.destroyed = options.destroyed || false;
    this.sprite = new Image();
    this.sprite.src = 'images/building.png';
    this.destroyedSprite = new Image();
    this.destroyedSprite.src = 'images/destroyed_building.png';
}

Util.inherits(City, StationaryObject);

City.prototype.draw = function (ctx){
    if(this.destroyed === false){
        ctx.drawImage(this.sprite, this.pos[0]-35, 500, 96, -90);
    } else {
        ctx.drawImage(this.destroyedSprite, this.pos[0]-35, 500, 96, -90);
    }
}


module.exports = City;