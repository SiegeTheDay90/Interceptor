const MovingObject = function (options){
    this.pos = options.pos;
    this.vel = options.vel;
    this.radius = 2;
    this.color = "#FFFFFF"
    this.game = options.game;
}

MovingObject.prototype.draw = function (ctx){
    ctx.beginPath();
    ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2*Math.PI);
    ctx.fillStyle = this.color;
    ctx.fill();
}

MovingObject.prototype.move = function (timeDelta){
    this.pos = [this.pos[0] + this.vel[0]*timeDelta, this.pos[1] + this.vel[1]*timeDelta];
}

MovingObject.prototype.distanceFrom = function (pos){
    dx = pos[0] - this.pos[0];
    dy = pos[1] - this.pos[1];
    return Math.sqrt(dx*dx + dy*dy);
}

MovingObject.prototype.isCollidedWith = function (otherObject){
    minDistance = this.radius + otherObject.radius;
    return (minDistance > this.distanceFrom(otherObject.pos))
}

MovingObject.prototype.destroy = function (){this.game.remove(this)};


module.exports = MovingObject;