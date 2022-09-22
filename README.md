# Interceptor
## [URL](https://siegetheday90.github.io/Interceptor/): https://siegetheday90.github.io/Interceptor/

![logo](https://raw.githubusercontent.com/SiegeTheDay90/Interceptor/main/images/logo.png)

## Description
Interceptor is a point and click shooter where you attempt to stop enemies and projectiles before they collide with buildings on the ground. Beginners often aim directly at their target, but you will realize that you must shoot ***in front*** of enemies to destroy them.

## Controls
Interceptor can be played with mouse or keyboard controls as shown here.

|Mouse| |Keyboard|
|-|-|-|
|<img src="https://raw.githubusercontent.com/SiegeTheDay90/Interceptor/main/images/mousecontrols.png" height="200">| |<img src="https://raw.githubusercontent.com/SiegeTheDay90/Interceptor/main/images/keyboardcontrols.png" height ="200">|

## Technical Details
Interceptor is coded completely in vanilla Javascript. The game is drawn onto a canvas element and updated using the browser's requestAnimationFrame function. Additional functionality is added to buttons and other elements outside of the canvas by manipulating DOM objects with javascript.

## Feature Implementation
### The highscore list is updated and stored using the `localStorage` property.
```javascript     
let highscores = JSON.parse(window.localStorage['highscores']);
if((highscores.some((score) => this.score > score) || highscores.length<5) && this.score > 0){
   this.ctx.fillStyle = ["#e5f800", "#eeff00", "#00ff00", "#ff4400", "#e39600"][Math.floor(Math.random()*5)];
   this.ctx.fillText("New High Score!", 230, 260);
}
```
### The game speed can be changed to suit the player using buttons on the left of the play area.
```javascript
button.addEventListener('click', function(event){
   let speeds = [80, 40, 20, 10];
   let speedometer = document.getElementById('speedometer');
   if (event.target.value==="Slower" && speed > 0){
         speed -= 1;
         speedButtons[1].disabled = false;
         if (speed <= 0){event.target.disabled = true};
   };
   if (event.target.value==="Faster" && speed < 3){
         speed += 1;
         speedButtons[0].disabled = false;
         if (speed  >= 3){event.target.disabled = true};
   };
   canvasEl.gameView.speed = speeds[speed];
   speedometer.innerText = ["►","►►","►►►","►►►►"][speed];
});
```

### Game speed is changed by manipulating the value `timeDelta`, the time since the last animation frame.
```javascript
GameView.prototype.animate = function(currentTime) {
  const timeDelta = currentTime - this.lastTime;
  this.game.step(timeDelta/this.speed);
  this.lastTime = currentTime;
  requestAnimationFrame(this.animate.bind(this));
};
```

## Features in Development
* ### Global Scoreboard
  * allows players to compete from anywhere
* ### New Enemy Types
  * with clever and challenging behaviors
* ### Variable Scroll Speed
  * improve the feel of keyboard controls