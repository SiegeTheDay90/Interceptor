// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDocs, getFirestore, query } from "firebase/firestore";
import { collection, addDoc, doc } from "firebase/firestore"; 



addEventListener("DOMContentLoaded", () => {
    // TODO: Add SDKs for Firebase products that you want to use
    // https://firebase.google.com/docs/web/setup#available-libraries

    // Your web app's Firebase configuration
    const firebaseConfig = {
        apiKey: "AIzaSyC9IZALLfddiXJzq8A4ozM320XrkF4ypOM",
        authDomain: "interceptor-69b21.firebaseapp.com",
        projectId: "interceptor-69b21",
        storageBucket: "interceptor-69b21.appspot.com",
        messagingSenderId: "104049209361",
        appId: "1:104049209361:web:595773401aaa7933e3c1b0"
    };
    
    // Initialize Firebase
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

    // const highScoreSelectors = document.getElemetsByClassName('high-score-selector');

    // highScoreSelectors.forEach((button) => {
    //     button.addEventListener('click', (event) => {
    //         event.preventDefault();

    //         if(event.target.classList.includes("inactive")){
    //             let self = document.getElementById(event.target.id);
    //             self.classList.toggle('active');
    //             self.classList.toggle('inactive');
                
    //         }
    //     })
    // })

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
                // console.log(game.cursor.pos);
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
