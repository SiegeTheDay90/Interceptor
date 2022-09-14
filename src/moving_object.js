const MovingObject = function (options){
    this.pos = options.pos;
    this.vel = options.vel;
    this.radius = options.radius;
    this.color = options.color;
    this.game = options.game;
}

MovingObject.prototype.draw = function (ctx){
    // this.ctx = ctx;
    ctx.beginPath();
    ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2*Math.PI);
    ctx.stokeStyle = "white";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.fillStyle = this.color;
    ctx.fill();
    // ctx.endPath();
}

MovingObject.prototype.move = function (){
    this.pos = [this.pos[0] + this.vel[0], this.pos[1] + this.vel[1]];
    this.pos = this.game.wrap(this.pos);
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

MovingObject.prototype.collideWith = function (){};





module.exports = MovingObject;