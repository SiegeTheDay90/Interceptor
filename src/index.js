import { initializeApp } from "firebase/app";
import { getDocs, getFirestore } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore"; 



addEventListener("DOMContentLoaded", () => {

    const firebaseConfig = {
        apiKey: "AIzaSyC9IZALLfddiXJzq8A4ozM320XrkF4ypOM",
        authDomain: "interceptor-69b21.firebaseapp.com",
        projectId: "interceptor-69b21",
        storageBucket: "interceptor-69b21.appspot.com",
        messagingSenderId: "104049209361",
        appId: "1:104049209361:web:595773401aaa7933e3c1b0"
    };
    
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
 
    
    
    const sendScore = async function(name, highscore) {
        
        await addDoc(collection(db, "scores"),{
            name: name,
            score: highscore
        })
    }
        
    const getScores = async function(){
        let ref = collection(db,"scores");
        const querySnapshot = await getDocs(ref);
        let arr = [];
        querySnapshot.forEach( (ele) => {
            arr.push(ele.data());
        })
        return arr;
    }

    window.addEventListener('resize', () => {
        canvasEl.width = Math.min(750, (window.innerWidth/2));
        canvasEl.height = Math.min(500, (window.innerHeight/1.492));
        game.resize([game.width, game.height], [canvasEl.width, canvasEl.height]); 
    });

    const Game = require("./scripts/game.js");
    const GameView = require("./scripts/game_view.js");


    const canvasEl = document.getElementById('game-canvas');
    canvasEl.width = Math.min(750, (window.innerWidth/2));
    canvasEl.height = Math.min(500, (window.innerHeight/1.492));
    let ctx = canvasEl.getContext('2d');
    const gameContainer = document.getElementById('game-container');
    const speedButtons = document.getElementsByClassName('speed-button');
    const controlButtons = document.getElementsByClassName('control-button');
    const soundButtons = document.getElementsByClassName('sound-button');
    const expandButton = document.getElementById('expand-instructions');
    const game = new Game(ctx, canvasEl.width, canvasEl.height);
    canvasEl.gameView = new GameView(game, ctx);

    expandButton.addEventListener('click', (e) => {
        e.preventDefault();
        const instructions = document.getElementById('instructions');
        if (e.target.className === 'expand-button') {
            instructions.style.height = "195px";
            e.target.innerText = "See Less";
            e.target.classList.replace("expand-button", "contract-button");
        } else {
            instructions.style.height = "40px";
            e.target.innerText = "See More";
            e.target.classList.replace("contract-button", "expand-button");
        }        
    });
    
    if(!window.localStorage['highscores'] || JSON.parse(window.localStorage['highscores']).length === 0){
        window.localStorage['highscores'] = JSON.stringify([{name: 'Good', score: 100}, {name: 'Luck!', score: 90}, {name: 'Your', score: 80}, {name: 'Name', score: 70}, {name: 'Here', score: 60}]);
    };

    const buildHighScoreList = async function(type){
        type = type || 'local';
        const highScoresList = document.getElementById('high-scores-list');
        highScoresList.innerHTML = '';
        let highScores;

        if (type === 'local'){
            highScores = JSON.parse(window.localStorage['highscores']);
        } else {
            highScores = (await getScores())
                .sort((f, s) => s.score - f.score);
        }
        
        highScores.slice(0,5).forEach((ele) => {
            let newLi = document.createElement("li");
            newLi.innerText = `${ele.name}: ${ele.score}`;
            highScoresList.appendChild(newLi);
        });
    }

    buildHighScoreList();

    const highScoreSelector = document.getElementById('high-score-selector');

    highScoreSelector.addEventListener('click', (event) => {
        event.preventDefault();
        if(event.target.className === 'local'){
            event.target.innerHTML = 'Show Local';
            document.getElementById('high-scores-title').innerHTML = 'Global Leaderboard';
        } else {
            event.target.innerHTML = 'Show Global';
            document.getElementById('high-scores-title').innerHTML = 'Local Leaderboard';
        }
        event.target.classList.toggle('local');
        event.target.classList.toggle('global');
        buildHighScoreList(event.target.className);
    })

    const clearScoresButton = document.getElementById('clear-high-scores');


    let clearAlert;
    const clearScores = ((event) => {
        if (event.target.value === "clear"){
            clearTimeout(clearAlert);
            clearAlert = setTimeout(() => {
                event.target.value = "clear"; 
                event.target.innerText = "Clear Local Scores";
                event.target.classList.remove('confirm-button');
                event.target.classList.add('clear-button');
            }, 5000);
            event.target.value = "confirm";
            event.target.classList.remove('clear-button');
            event.target.classList.add('confirm-button');
            event.target.innerText = "Click Again to Confirm";
        } else {
            clearTimeout(clearAlert);
            event.target.classList.remove('confirm-button');
            event.target.classList.add('clear-button');
            event.target.value = "clear";
            event.target.innerText = "Clear Local Scores";
            window.localStorage['highscores'] = '[]';
            document.getElementById('high-scores-list').innerHTML = "";
        }
    }).bind(this);

    clearScoresButton.addEventListener('click', clearScores);

    const cancelHighScore = document.getElementById('cancel-high-score');
    cancelHighScore.addEventListener('click', function(){
        const highScoreDialog = document.getElementById('high-score-dialog');
        highScoreDialog.close();
    })

    const controlClick = function(event){
        event.preventDefault();
        if(event.currentTarget.value === "mouse"){
            controlButtons[1].disabled = false;
            controlButtons[0].disabled = true;
            mouseControl = true;
            keyboardControl = false;
        }
        if(event.currentTarget.value === "keyboard"){
            game.cursor.pos = [canvasEl.width/2, canvasEl.height/2]
            controlButtons[1].disabled = true;
            controlButtons[0].disabled = false;
            mouseControl = false;
            keyboardControl = true;
        }
    }

    const soundClick = function(event){
        event.preventDefault();
        if(event.currentTarget.value === "soundOn"){
            soundButtons[1].disabled = false;
            soundButtons[0].disabled = true;
            canvasEl.gameView.game.soundOn = true;

        }
        if(event.currentTarget.value === "soundOff"){
            soundButtons[1].disabled = true;
            soundButtons[0].disabled = false;
            canvasEl.gameView.game.soundOn = false;
        }
    }

    Array.from(soundButtons).forEach((button) => {button.addEventListener('click', soundClick)});


    let mouseControl = true;
    let keyboardControl = false;
    Array.from(controlButtons).forEach((button) => { button.addEventListener('click', controlClick) });
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
            canvasEl.gameView.speed = speeds[speed];
            speedometer.innerText = ["►","►►","►►►","►►►►"][speed];
            canvasEl.gameView.game.speed = speeds[speed];
        })
    });


    function setMouseListeners(){
        gameContainer.addEventListener('mousemove', (event) => {
            if(mouseControl){
                game.cursor.pos = [event.clientX - canvasEl.getBoundingClientRect().left, Math.floor(event.clientY - canvasEl.getBoundingClientRect().top)]
            }
        });

        canvasEl.addEventListener('touchmove', (event) => {event.preventDefault()})
    
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
        let leftDown = false;
        let rightDown = false;
        let upDown = false;
        let downDown = false;
        window.addEventListener('keydown', (event) => {
            if (keyboardControl && ["d", "ArrowRight"].includes(event.key) && rightDown === false){
                event.preventDefault();
                rightDown = true;
                right = setInterval(() => {game.cursor.pos = [game.cursor.pos[0] + 8, game.cursor.pos[1]]}, 30);
            }
            if (keyboardControl && ["a", "ArrowLeft"].includes(event.key) && leftDown === false){
                event.preventDefault();
                leftDown = true;
                left = setInterval(() => {game.cursor.pos = [game.cursor.pos[0] - 8, game.cursor.pos[1]]}, 30);
            }
            if (keyboardControl && ["w", "ArrowUp"].includes(event.key) && upDown === false){
                event.preventDefault();
                upDown = true;
                up = setInterval(() => {game.cursor.pos = [game.cursor.pos[0], game.cursor.pos[1] - 8]}, 30);
            }
            if (keyboardControl && ["s", "ArrowDown"].includes(event.key) && downDown === false){
                event.preventDefault();
                downDown = true;
                down = setInterval(() => {game.cursor.pos = [game.cursor.pos[0], game.cursor.pos[1] + 8]}, 30);
            }
            if (keyboardControl && event.key == " "){
                event.preventDefault();
                game.cursor.fire();
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
        });
    };

    setMouseListeners();
    setKeyboardListeners();

    game.sendScore = sendScore;
    game.getScores = getScores;
    canvasEl.gameView.start();
});
