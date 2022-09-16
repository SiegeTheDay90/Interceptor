// const KeyMaster = require("../dist/keymaster.js");


const GameView = function (game, ctx){
    this.game = game;
    this.ctx = ctx;
    this.lastTime = 0;
}

GameView.prototype.start = function start() {
    // this.bindKeyHandlers();
    this.lastTime = 0;
    requestAnimationFrame(this.animate.bind(this));
  };
  
  GameView.prototype.animate = function animate(time) {
    const timeDelta = time - this.lastTime;
    this.game.step(timeDelta/20);
    this.lastTime = time;
  
    // every call to animate requests causes another call to animate
    requestAnimationFrame(this.animate.bind(this));
  };

GameView.prototype.bindKeyHandlers = function(){
    key('a', () => {this.game.ship.angle -= Math.PI/14});
    key('s', () => {this.game.ship.power(-1)});
    key('d', () => {this.game.ship.angle += Math.PI/14});
    key('w', () => {this.game.ship.power(1)});
    key('left', () => {this.game.ship.angle -= Math.PI/14});
    key('down', () => {this.game.ship.power(-1)});
    key('right', () => {this.game.ship.angle += Math.PI/14});
    key('up', () => {this.game.ship.power(1)});
    key('space', this.game.ship.fireBullet.bind(this.game.ship));
}

module.exports = GameView;
