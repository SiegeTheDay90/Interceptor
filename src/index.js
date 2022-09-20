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
    const controlButtons = document.getElementsByClassName('control-button');
    const game = new Game(ctx);
    canvasEl.gameView = new GameView(game, ctx);
    
    if(!window.localStorage['highscores']){
        window.localStorage['highscores'] = JSON.stringify([]);
    };

    

    const highScoresList = document.getElementById('high-scores-list');
    let highscores = JSON.parse(window.localStorage['highscores']);
    
    highscores.forEach((score) => {
        let newLi = document.createElement("li");
        newLi.innerText = `${score}`;
        highScoresList.appendChild(newLi);
    });

    const clearScoresButton = document.getElementById('clear-high-scores');

    clearScoresButton.addEventListener('click', (event) => {
        if (event.target.value === "clear"){
            event.target.value = "confirm";
            event.target.classList.remove('clear-button');
            event.target.classList.add('confirm-button');
            event.target.innerText = "Click Again to Confirm";
            this.clearAlert = setTimeout(() => {
                event.target.value = "clear"; 
                event.target.innerText = "Clear Local Scores";
                event.target.classList.remove('confirm-button');
                event.target.classList.add('clear-button');
            }, 5000);
        } else {
            clearTimeout(this.clearAlert);
            event.target.classList.remove('confirm-button');
            event.target.classList.add('clear-button');
            event.target.value = "clear";
            event.target.innerText = "Clear Local Scores";
            window.localStorage['highscores'] = '[]';
            document.getElementById('high-scores-list').innerHTML = "";
        }
    });



    let mouseControl = true;
    let keyboardControl = false;
    Array.from(controlButtons).forEach((button) => {
        button.addEventListener('click', function(event){
            if(event.target.value === "Mouse"){
                controlButtons[1].disabled = false;
                controlButtons[0].disabled = true;
                mouseControl = true;
                keyboardControl = false;
            }
            if(event.target.value === "Keyboard"){
                game.cursor.pos = [canvasEl.width/2, canvasEl.height/2]
                controlButtons[1].disabled = true;
                controlButtons[0].disabled = false;
                mouseControl = false;
                keyboardControl = true;
            }
        })
    });
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
    });
    let speed = 1;
    Array.from(speedButtons).forEach((button) => {
        button.addEventListener('click', function(event){
            let speeds = [80, 40, 20, 10];
            let speedometer = document.getElementById('speedometer');
            
            if (event.target.value==="Slower" && speed > 0){
                speed -= 1;
                speedButtons[1].disabled = false;

                if (speed <= 0){
                    event.target.disabled = true;
                }
            } 
            
            if (event.target.value==="Faster" && speed < 3){
                speed += 1;
                speedButtons[0].disabled = false;

                if (speed  >= 3){
                    event.target.disabled = true;
                }
            }

            speedometer.innerText = ["►","►►","►►►","►►►►"][speed];
            canvasEl.gameView.speed = speeds[speed];
        })
    });


    function setMouseListeners(){
        gameContainer.addEventListener('mousemove', (event) => {
            if(mouseControl){
                game.cursor.pos = [event.clientX - canvasEl.getBoundingClientRect().left, event.clientY - canvasEl.getBoundingClientRect().top]
            }
        });
    
        canvasEl.addEventListener('click', (event) => {
            if(mouseControl){
                game.cursor.fire();
            }
        });
    };

    function setKeyboardListeners(){
        let left;
        let right;
        let up;
        let down;
        let fire;
        let leftDown = false;
        let rightDown = false;
        let upDown = false;
        let downDown = false;
        let fireDown = false;
        window.addEventListener('keydown', (event) => {
            if (keyboardControl && ["d", "ArrowRight"].includes(event.key) && rightDown === false){
                event.preventDefault();
                rightDown = true;
                right = setInterval(() => {game.cursor.pos[0] += 6}, 30);
            }
            if (keyboardControl && ["a", "ArrowLeft"].includes(event.key) && leftDown === false){
                event.preventDefault();
                leftDown = true;
                left = setInterval(() => {game.cursor.pos[0] -= 6}, 30);
            }
            if (keyboardControl && ["w", "ArrowUp"].includes(event.key) && upDown === false){
                event.preventDefault();
                upDown = true;
                up = setInterval(() => {game.cursor.pos[1] -= 6}, 30);
            }
            if (keyboardControl && ["s", "ArrowDown"].includes(event.key) && downDown === false){
                event.preventDefault();
                downDown = true;
                down = setInterval(() => {game.cursor.pos[1] += 6}, 30);
            }
        });
        window.addEventListener('keyup', (event) => {
            if (keyboardControl && ["d", "ArrowRight"].includes(event.key)){
                rightDown = false;
                clearInterval(right);
            }
            if (keyboardControl && ["a", "ArrowLeft"].includes(event.key)){
                leftDown = false;
                clearInterval(left);
            }
            if (keyboardControl && ["w", "ArrowUp"].includes(event.key)){
                upDown = false;
                clearInterval(up);
            }
            if (keyboardControl && ["s", "ArrowDown"].includes(event.key)){
                downDown = false;
                clearInterval(down);
            }
            window.addEventListener('keypress', (event) => {
                if (keyboardControl && event.key == " "){
                    game.cursor.fire();
                }
            });
        });
    };

    setMouseListeners();
    setKeyboardListeners();

    canvasEl.gameView.start();
});
