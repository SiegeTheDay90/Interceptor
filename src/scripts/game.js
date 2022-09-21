const Enemy = require("./sprites/enemy.js");
const ZigZag = require("./sprites/zigzag.js");
const Teleporter = require("./sprites/teleporter.js");
const City = require("./sprites/city.js");
const Tower = require("./sprites/tower.js");
const Cursor = require("./sprites/cursor.js");
const Util = require("./util.js");

const DIM_X = 700;
const DIM_Y = 500;

const Game = function(ctx){
    this.ctx = ctx;
    this.darkMode = true;
    this.started = false;
    this.over = true;
    this.score = 0;
    this.speed = 40;
    this.bullets = [];
    this.cities = [];
    this.towers = [];
    this.explosions = [];
    this.enemies = [];
    this.logo = new Image();
    this.logo.src = 'images/logo.png';
    this.mc = new Image();
    this.mc.src = 'images/mousecontrols.png';
    this.kc = new Image();
    this.kc.src = 'images/keyboardcontrols.png';
    this.cursor = new Cursor({game: this});
    this.canSpawn = true;
    this.welcome();
}

Game.prototype.welcome = function(){
    this.canSpawn = true;
    this.cities = [
        new City({game: this, pos: [175, 440]}), 
        new City({game: this, pos: [475, 450]}), 
        new City({game: this, pos: [325, 460]}), 
        new City({game: this, pos: [625, 445]})
    ];       
    this.over = false;
    this.started = false;
    if (this.score > 0){
        let highscores = JSON.parse(window.localStorage['highscores']);

        highscores.push(this.score);
        highscores.sort((f, s) => s - f);
        highscores = highscores.slice(0, 5);

        window.localStorage['highscores'] = JSON.stringify(highscores);

        const highScoresList = document.getElementById('high-scores-list');      
        highScoresList.innerHTML = "";     
            
        highscores.forEach((score) => {
            let newLi = document.createElement("li");
            newLi.innerText = `${score}`;
            highScoresList.appendChild(newLi);
        })
    }
    this.bullets = [];
    this.towers = [];
    this.explosions = [];
    this.enemies = [];
    this.enemySpawn = setInterval(this.addEnemy.bind(this), 1500);
}

Game.prototype.setupGame = function(){
    this.over = false;
    this.startTime = new Date();
    document.getElementById('hud-score').innerHTML = "Score: 0";
    clearInterval(this.enemySpawn);
    this.started = true;
    this.score = 0;
    this.bullets = [];
    this.cities = [];
    this.towers = [];
    this.explosions = [];
    this.enemies = [];
    this.enemySpawn = setInterval(this.addEnemy.bind(this), 1500);
    this.towers = [new Tower({game: this})];
    this.cities = [
        new City({game: this, pos: [75, 450]}), 
        new City({game: this, pos: [175, 450]}), 
        new City({game: this, pos: [275, 450]}), 
        new City({game: this, pos: [425, 450]}), 
        new City({game: this, pos: [525, 450]}), 
        new City({game: this, pos: [625, 450]})
    ];
    this.overCheck = setInterval(this.isOver.bind(this), 250);
      
}

Game.prototype.addEnemy = function(){
    let friendlies = this.friendlyObjects();
    let targetPos;
    try{
        targetPos = friendlies[Math.floor(Math.random()*friendlies.length)].pos;
    } catch {
        targetPos = [375, 400];
    }
    let spawnPos = Util.spawn("enemy");

    //Calculate angle from spawn to target # # # # # # # # # # # # # # # #
    let diffs = [targetPos[0] - spawnPos[0], targetPos[1] - spawnPos[1]];
    let angle = [Math.atan(diffs[1]/diffs[0])];
    let movefix = diffs[0] < 0 ? -2 : 2;
    let vel = [movefix*Math.cos(angle), movefix*Math.sin(angle)];

    let enemyType = Math.random();

    if (this.canSpawn){
        this.canSpawn = false;
        if (enemyType > 0.85){
            this.enemies.push(new Teleporter({game: this, vel: [0, 0], pos: [Math.floor(Math.random()*600+100), Math.floor(Math.random()*200+30)]}));
            setTimeout(()=>{this.canSpawn = true}, 5000);
        }
        else if (enemyType > 0.60){
            this.enemies.push(new ZigZag({game: this, vel: vel, pos: spawnPos}));
            setTimeout(()=>{this.canSpawn = true}, 3000);

        } else if(enemyType) {
            this.enemies.push(new Enemy({game: this, vel: vel, pos: spawnPos}));
            setTimeout(()=>{this.canSpawn = true}, 2000)
        }
    }
}

Game.prototype.step = function(delta){
    this.moveObjects(delta);
    this.checkCollisions();
    this.draw();
}

Game.prototype.isOver = function(){
    if(this.cities.length === 0 && this.started){
        clearInterval(this.overCheck);
        setTimeout(() => {
            this.over = true; 
            clearInterval(this.enemySpawn)}, 1000);
    }
}

Game.prototype.moveObjects = function(delta){
    this.allObjects().forEach((obj) => {
        obj.move(delta);
    });
}

Game.prototype.checkCollisions = function(){
    this.enemies.forEach((enemy) => {
        this.explosions.forEach((explosion) => {
            if (enemy.isCollidedWith(explosion) && explosion.type === "explosion"){
                enemy.destroy();
            }
        })

        this.cities.forEach((city) => {
                if (enemy.isCollidedWith(city)){
                        enemy.destroy();
                        city.destroy();
                    }
        })
    })
}

Game.prototype.draw = function(){
    this.ctx.clearRect(0,0, 750, 500);
    this.ctx.fillStyle = this.darkMode ? '#001019' : '#AAAAAA';
    this.ctx.fillRect(0, 0, 750, 425);
    this.ctx.fillStyle = this.darkMode ? 'darkgreen' : 'lightgreen';
    this.ctx.fillRect(0, 425, 750, 75);

    this.allObjects().forEach((obj) => {
        obj.draw(this.ctx);
    });

    if(!this.started){
        this.ctx.drawImage(this.logo, 170, -15, 393, 212);
        this.ctx.font = "24px serif";
        this.ctx.fillStyle = ["#f58800", "#f58800", "#f58800", "#ff4400", "#e37600"][Math.floor(Math.random()*5)];
        this.ctx.fillText("Press Fire to Begin", 280, 240);

        this.ctx.drawImage(this.mc, 100, 260, 198, 135);
        this.ctx.drawImage(this.kc, 400, 260, 198, 135);
    };

    if(this.over && this.started){
        this.ctx.font = "24px serif";
        this.ctx.fillStyle = ["#f58800", "#ff4400", "#ff4400", "#ff4400", "#e37600"][Math.floor(Math.random()*5)];
        this.ctx.fillText("Game Over! Press Fire to try again.", 220, 220);
        let highscores = JSON.parse(window.localStorage['highscores']);
        if((highscores.some((score) => this.score > score) || highscores.length<5) && this.score > 0){
            this.ctx.fillStyle = ["#e5f800", "#eeff00", "#00ff00", "#ff4400", "#e39600"][Math.floor(Math.random()*5)];
            this.ctx.fillText("New High Score!", 230, 260);
        }

    };

    this.cursor.draw(this.ctx);
    
}
Game.prototype.allObjects = function(){
    return this.enemies.concat(this.bullets.concat(this.explosions.concat(this.cities.concat(this.towers))));
}

Game.prototype.friendlyObjects = function(){
    return this.cities
}
             
Game.prototype.remove = function(object){
    if (object.type === "enemy"){
        this.enemies = this.enemies.filter(item => item !== object);
    } else if (object.type === "bullet") {
        this.bullets = this.bullets.filter(item => item !== object);
    } else if (object.type === "explosion" || object.type === "pop"){
        this.explosions = this.explosions.filter(item => item !== object);
    } else if (object.type === "city"){
        this.cities = this.cities.filter(item => item != object);
    }
}

module.exports = Game;