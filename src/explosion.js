const Explosion = function (options){
    this.pos = options.pos;
    this.type = "explosion";
    this.radius = 2;
    this.colors = ["#aaaa00", "#aa3333", "#aa0011"];
    this.game = options.game;
}

Explosion.prototype.draw = function (ctx){
    ctx.beginPath();
    ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2*Math.PI);
    ctx.lineWidth = 2;
    ctx.stokeStyle = this.colors[Math.floor(Math.random()*3)];
    ctx.fillStyle = this.colors[Math.floor(Math.random()*3)];
    ctx.fill();
}


Explosion.prototype.expand = function (){
    if (this.radius === 26){
        this.destroy();
    }
    
    this.radius += .75;
}

Explosion.prototype.move = Explosion.prototype.expand; //allows the rest of the game to call 'move' as an alias for 'expand'

Explosion.prototype.destroy = function(){this.game.remove(this);}

Explosion.prototype.draw = function (ctx){
    ctx.beginPath();
    ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2*Math.PI);
    
    //Random color each frame to give clicker effect
    ctx.stokeStyle = this.colors[Math.floor(Math.random()*3)];
    ctx.fillStyle = this.colors[Math.floor(Math.random()*3)];
    ctx.fill();
}

Explosion.prototype.distanceFrom = function (pos){
    dx = pos[0] - this.pos[0];
    dy = pos[1] - this.pos[1];

    return Math.sqrt(dx*dx + dy*dy);
}

Explosion.prototype.isCollidedWith = function (otherObject){
    minDistance = this.radius + otherObject.radius;

    return (minDistance > this.distanceFrom(otherObject.pos))
}

Explosion.prototype.collideWith = function (){};

module.exports = Explosion;