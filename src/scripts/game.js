const Enemy = require("./sprites/enemy.js");
const ZigZag = require("./sprites/zigzag.js");
const Teleporter = require("./sprites/teleporter.js");
const City = require("./sprites/city.js");
const Tower = require("./sprites/tower.js");
const Cursor = require("./sprites/cursor.js");
const Util = require("./util.js");
const LargeExplosion = require("./sprites/large_explosion.js");

const Game = function(ctx){
    this.ctx = ctx;
    this.soundOn = true;
    this.started = false;
    this.over = true;
    this.canSpawn = true;
    this.score = 0;
    this.speed = 40;
    this.bullets = [];
    this.cities = [];
    this.towers = [];
    this.explosions = [];
    this.enemies = [];
    this.cursor = new Cursor({game: this});
    this.logo = new Image();
    this.logo.src = 'images/logo.png';
    this.mc = new Image();
    this.mc.src = 'images/mousecontrols.png';
    this.kc = new Image();
    this.kc.src = 'images/keyboardcontrols.png';
    this.cityscape = new Image();
    this.cityscape.src = 'images/cityscape.png';
    this.nightsky = new Image();
    this.nightsky.src = 'images/nightsky.png';
    this.welcome();
}

Game.prototype.welcome = function(){
    this.canSpawn = true;
    this.intensity = 7;
    this.cities = [
        new City({game: this, pos: [70, 475], destroyed: true}), 
        new City({game: this, pos: [520, 475], destroyed: true}), 
        new City({game: this, pos: [260, 475]}), 
        new City({game: this, pos: [670, 475]})
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
    this.enemySpawn = setInterval(() => {this.addEnemy()}, 1500);
}

Game.prototype.setupGame = function(){
    this.over = false;
    this.startTime = new Date();
    clearInterval(this.enemySpawn);
    this.started = true;
    this.score = 0;
    this.intensity = 1;
    this.bullets = [];
    this.cities = [];
    this.towers = [];
    this.explosions = [];
    this.enemies = [];



    this.enemySpawnInterval = function(speed, intensity){
        setTimeout(() => {
            this.addEnemy();
            if(!this.over){
                this.enemySpawnInterval(this.speed, this.intensity);
            }
        }, (2000/(40/speed))/(intensity/4))
    }
    this.enemySpawnInterval(this.speed, this.intensity);

    this.towers = [new Tower({game: this})];
    this.cities = [
        new City({game: this, pos: [75, 475]}), 
        new City({game: this, pos: [220, 475]}), 
        new City({game: this, pos: [490, 475]}), 
        new City({game: this, pos: [635, 475]}), 
    ];

    for(i=0; i < 3; i++){
        this.addEnemy(0.1);
        this.canSpawn = true;
    }

    this.overCheck = setInterval(this.isOver.bind(this), 250);

    this.intesityInterval = function (speed){
        setTimeout(() => {
            if(this.intensity < 10 && !this.over){
                this.intensity += 1;
                this.intesityInterval(this.speed);
            }
        }, 12000/(40/speed))
    }
    this.intesityInterval(this.speed);
}

Game.prototype.addEnemy = function(enemyType){
  
    let targetPos = Util.chooseTarget(this);
    let spawnPos = Util.spawn("enemy");
    let vel = Util.angleTo(spawnPos, targetPos);

    enemyType = enemyType || Math.random() + this.intensity*0.03;

    if (this.canSpawn){
        this.canSpawn = false;
        if (enemyType > 0.85 && this.intensity > 6){
            this.enemies.push(new Teleporter({game: this, vel: [0, 0], pos: [Math.floor(Math.random()*600+100),-100]}));
            setTimeout(()=>{this.canSpawn = true}, 5000/(40/this.speed)/(this.intensity/7));
        }
        else if (enemyType > 0.60 && this.intensity > 2){
            this.enemies.push(new ZigZag({game: this, vel: vel, pos: spawnPos}));
            setTimeout(()=>{this.canSpawn = true}, 2500/(40/this.speed)/(this.intensity/3));

        } else {
            this.enemies.push(new Enemy({game: this, vel: vel, pos: spawnPos}));
            setTimeout(()=>{this.canSpawn = true}, 600/(40/this.speed))
        }
    }
}

Game.prototype.step = function(delta){
    this.moveObjects(delta);
    this.checkCollisions();
    this.draw();
}

Game.prototype.isOver = function(){
    if(this.cities.filter(object => object.destroyed === false).length === 0 && this.started){
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
                if (enemy.isCollidedWith(city) && city.destroyed === false){
                        enemy.destroy();
                        this.explosions.push(new LargeExplosion({pos: [city.pos[0]+10, 500], game: this}))
                        setTimeout(() => {city.destroyed = true}, 650);
                    }
        })
    })
}

Game.prototype.draw = function(){
    this.ctx.clearRect(0,0, 750, 500);
    this.ctx.drawImage(this.nightsky, 0, -10);
    this.ctx.drawImage(this.cityscape, 0, 500, 751, -161);

    if(this.started && !this.over){
        this.ctx.fillStyle = 'black';
        Util.roundedRect(this.ctx, 570, 2, 160, 30, 10);
        this.ctx.font = "20px serif";
        if(this.intensity < 10){
            this.ctx.fillStyle = ["#00FF00","#44FF00","#66FF00","#AAFF00","#CCDD00","#DD9900","#DD5500","#EE4400","#EE1100","#FF0000"][this.intensity-1];
        } else {
            this.ctx.fillStyle = ["#f51100", "#f51100", "#f50000", "#ff0000", "#e37600"][Math.floor(Math.random()*5)];
        }
        this.ctx.fillText(`Danger Level: ${this.intensity}`, 585, 23);

        this.ctx.fillStyle = 'black';
        Util.roundedRect(this.ctx, 20, 2, 160, 30, 10);
        this.ctx.font = "20px serif";
        this.ctx.fillStyle = "#f58800";
        this.ctx.fillText(`Score: ${this.score}`, 35, 23);
    }

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
            this.ctx.fillText(`New High Score! ${this.score}`, 230, 260);
        }

    };

    this.allObjects().forEach((obj) => {
        obj.draw(this.ctx);
    });

    this.cursor.draw(this.ctx);
}
Game.prototype.allObjects = function(){
    return this.cities.concat(this.bullets.concat(this.explosions.concat(this.enemies.concat(this.towers))));
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