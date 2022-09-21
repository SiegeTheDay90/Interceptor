const Bullet = require("./bullet.js");


const Cursor = function(options){
    this.pos = [100, 100];
    this.game = options.game;
    this.canFire = true;
}

Cursor.prototype.draw = function(ctx){
    ctx.beginPath();
    ctx.arc(this.pos[0], this.pos[1], 1, 0, 2*Math.PI);
    ctx.strokeStyle = "red";
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(this.pos[0], this.pos[1], 7, 0, 2*Math.PI);
    ctx.strokeStyle = "#09ff00";
    ctx.lineWidth = 1;
    ctx.stroke();
}

Cursor.prototype.fire = function(){
    if(this.game.started && this.canFire && this.pos[1] < 400){
        this.canFire = false;
        this.game.bullets.push(new Bullet({game: this.game, terminus: this.pos}));
        setTimeout(() => {this.canFire = true}, 28000/this.game.speed);
    }
    if(!this.game.started){
        this.game.setupGame();
    }
    if(this.game.over && this.game.started){
        this.game.welcome();
    }
}

module.exports = Cursor;