const MovingObject = require("./moving_object.js");
const Util = require("./util.js");

const Missile = function(options){

    this.pos = options.pos;
    this.radius = 5;
    this.vel = Util.randomVec(Math.random()*1.2+0.5);
    this.color = "#e0e0e0";
    this.game = options.game;
    
    
}
Util.inherits(Missile, MovingObject);




Missile.prototype.collideWith = function (otherObject){
    if (otherObject === this.game.ship){
        this.game.ship.relocate();
    } else if (this.game.bullets.includes(otherObject)){
        this.game.remove(otherObject);
        this.game.remove(this);

        if (this.size > 2){
            this.game.addAsteroid({pos: this.pos, game: this.game, size: this.size-1});
            this.game.addAsteroid({pos: this.pos, game: this.game, size: this.size-1});
        }
    }
};

Missile.prototype.move = function (){
    this.pos = [this.pos[0] + this.vel[0], this.pos[1] + this.vel[1]];
}


module.exports = Missile;