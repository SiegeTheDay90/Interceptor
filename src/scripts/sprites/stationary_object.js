const StationaryObject = function (options){
    this.pos = options.pos || [250, 250];
    this.radius = 2;
    this.colors = "#FFFFFF";
    this.game = options.game;
}

StationaryObject.prototype.draw = function (ctx){
    ctx.beginPath();
    ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2*Math.PI);
    ctx.lineWidth = 2;
    ctx.strokeStyle = this.color;
    ctx.fillStyle = this.color;
    ctx.fill();
}

StationaryObject.prototype.distanceFrom = function (pos){
    dx = pos[0] - this.pos[0];
    dy = pos[1] - this.pos[1];
    return Math.sqrt(dx*dx + dy*dy);
}

StationaryObject.prototype.move = function(){}

StationaryObject.prototype.destroy = function(){this.game.remove(this);}


StationaryObject.prototype.isCollidedWith = function (otherObject){
    minDistance = this.radius + otherObject.radius;
    return (minDistance > this.distanceFrom(otherObject.pos))
}


module.exports = StationaryObject;