addEventListener("DOMContentLoaded", () => {
    const Game = require("./game.js");
    // const GameView = require("./game_view.js");


    
    const canvasEl = document.getElementById('game-canvas');
    canvasEl.width = 750;
    canvasEl.height = 500;
    let ctx = canvasEl.getContext('2d');

    window.game = new Game(ctx);

    setInterval(window.game.step.bind(game), 25);

    // gameView = new GameView(game, ctx);
    // gameView.start();

})
