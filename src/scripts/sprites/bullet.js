const MovingObject = require("./moving_object.js");
const Explosion = require("./explosion.js");
const Util = require("../util.js");

const Bullet = function(options){

    //Position matches parent tower, must be dynamic to support multiple towers
    this.pos = [375, 400];
    this.radius = 1.5;
    

    //Provides access to other elements of the game
    this.game = options.game;
    
    //Calculate angle from tower to cursor # # # # # # # # # # # # # # # #
    let cursorPos = this.game.cursor.pos;
    let diffs = [cursorPos[0] - this.pos[0], cursorPos[1] - this.pos[1]];
    this.angle = [Math.atan(diffs[1]/diffs[0])];
    this.terminus = options.terminus;

    //Used for moving and drawing
    let movefix = diffs[0] < 0 ? -8 : 8;
    this.vel = [movefix * Math.cos(this.angle), movefix * Math.sin(this.angle)];
    this.colors = ["#ff8800", "#ff0000","#ff0000", "#ff0000"];
    this.type = "bullet";

}

Util.inherits(Bullet, MovingObject);

Bullet.prototype.draw = function (ctx){
    ctx.beginPath();
    ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2*Math.PI);
    
    //Random color each frame to give clicker effect
    ctx.strokeStyle = this.colors[Math.floor(Math.random()*3)];
    ctx.fillStyle = this.colors[Math.floor(Math.random()*3)];
    ctx.fill();
}

Bullet.prototype.move = function (delta){
    console.log(this.terminus);
    this.pos = [this.pos[0] + this.vel[0]*delta, this.pos[1] + this.vel[1]*delta];

    // if(this.pos[0] < 0 || this.pos[1] < 0){
    //     debugger;
    // }

    // if (Math.abs(this.pos[0] - this.terminus[0]) < 5 && Math.abs(this.pos[1] - this.terminus[1] < 5)){
    if (this.distanceFrom(this.terminus) < 10){
        console.log(this.distanceFrom(this.terminus));
        this.destroy();
        this.game.explosions.push(new Explosion({pos: this.pos, game: this.game}));
    }
}

module.exports = Bullet;