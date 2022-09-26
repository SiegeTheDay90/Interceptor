const GameView = function (game, ctx){
  this.game = game;
  this.ctx = ctx;
  this.lastTime = 0;
  this.speed = 40;
}



GameView.prototype.start = function() {
  this.lastTime = 0;
  requestAnimationFrame(this.animate.bind(this));
};

GameView.prototype.animate = function(time) {

  const timeDelta = time - this.lastTime;
  this.game.step(timeDelta/this.speed);
  this.lastTime = time;
  requestAnimationFrame(this.animate.bind(this));
};


module.exports = GameView;
