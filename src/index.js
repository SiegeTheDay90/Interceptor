addEventListener("DOMContentLoaded", () => {
    const Game = require("./scripts/game.js");
    const GameView = require("./scripts/game_view.js");


    const canvasEl = document.getElementById('game-canvas');
    canvasEl.width = 750;
    canvasEl.height = 500;
    let ctx = canvasEl.getContext('2d');
    const gameContainer = document.getElementById('game-container');
    const speedButtons = document.getElementsByClassName('speed-button');
    const displayButtons = document.getElementsByClassName('display-button');


    Array.from(displayButtons).forEach((button) => {
        button.addEventListener('click', function(event){
            if(event.target.value === "Dark"){
                canvasEl.gameView.game.darkMode = true;
                displayButtons[1].disabled = false;
                displayButtons[0].disabled = true;
            }
            if(event.target.value === "Light"){
                canvasEl.gameView.game.darkMode = false;
                displayButtons[1].disabled = true;
                displayButtons[0].disabled = false;
            }
        })
    })
    let speed = 2;
    Array.from(speedButtons).forEach((button) => {
        button.addEventListener('click', function(event){
            let speeds = [5, 10, 20, 40, 80];
            let speedometer = document.getElementById('speedometer');
            
            if (event.target.value==="Slower" && speed < 4){
                speed += 1;
                speedButtons[1].disabled = false;

                if (speed >= 4){
                    event.target.disabled = true;
                }
            } 
            
            if (event.target.value==="Faster" && speed > 0){
                speed -= 1;
                speedButtons[0].disabled = false;

                if (speed <= 0){
                    event.target.disabled = true;
                }
            }

            speedometer.innerText = ["►►►►►","►►►►","►►►","►►","►" ][speed];
            canvasEl.gameView.speed = speeds[speed];
        })
    })

    const game = new Game(ctx);

    canvasEl.gameView = new GameView(game, ctx);

    canvasEl.addEventListener('mousedown', (event) => {
        if(event.detail > 1){
            event.preventDefault();
        }
    })

    gameContainer.addEventListener('mousemove', (event) => {
        game.cursor.pos = [event.clientX - canvasEl.getBoundingClientRect().left, event.clientY - canvasEl.getBoundingClientRect().top]
    });

    gameContainer.addEventListener('click', (event) => {
        if (event.target.value){
            return
        }
        game.cursor.fire();
    });

    canvasEl.gameView.start();


})
