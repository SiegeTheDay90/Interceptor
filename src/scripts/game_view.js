// const KeyMaster = require("../dist/keymaster.js");


const GameView = function (game, ctx){
    this.game = game;
    this.ctx = ctx;
    this.lastTime = 0;
    this.speed = 20;
}

GameView.prototype.start = function() {
    // this.bindKeyHandlers();
    this.lastTime = 0;
    requestAnimationFrame(this.animate.bind(this));
  };
  
  GameView.prototype.animate = function(time) {
    const timeDelta = time - this.lastTime;
    this.game.step(timeDelta/this.speed);
    this.lastTime = time;
    if (!this.game.over){
      requestAnimationFrame(this.animate.bind(this));
    }
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
