const Asteroid = require("./sprites/asteroid.js");
const ZigZag = require("./sprites/zigzag.js");
const Teleporter = require("./sprites/teleporter.js");
const Boss = require("./sprites/big_boss.js");
const City = require("./sprites/city.js");
const Tower = require("./sprites/tower.js");
const Cursor = require("./sprites/cursor.js");
const Util = require("./util.js");
const LargeExplosion = require("./sprites/large_explosion.js");

const Game = function(ctx, width, height){
    this.ctx = ctx;
    this.width = width;
    this.height = height;
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
    this.intensityColors = ["#00FF00", "#22FF00", "#44FF00", "#AAFF00", "#FFFF00", "#FFDD00", "#FFAA00", "#FF7700", "#FF4400", "#FF0000"]
    this.bossSpawn = true;
    this.cursor = new Cursor({game: this});
    this.logo = new Image();
    this.logo.src = './images/logo.png';
    this.mc = new Image();
    this.mc.src = './images/mousecontrols.png';
    this.kc = new Image();
    this.kc.src = './images/keyboardcontrols.png';
    this.cityscape = new Image();
    this.cityscape.src = './images/cityscape.png';
    this.nightsky = new Image();
    this.nightsky.src = './images/nightsky.png';
    this.welcome();
}

Game.prototype.resize = function(previous_dimensions, new_dimensions){
    [this.width, this.height] = new_dimensions;

    this.allObjects().forEach((object) => {
        const [x, y] = object.pos;
        object.pos = [x*new_dimensions[0]/previous_dimensions[0], y*new_dimensions[1]/previous_dimensions[1]];
        if (object.vel) object.vel = [object.vel[0]*new_dimensions[0]/previous_dimensions[0], object.vel[1]*new_dimensions[1]/previous_dimensions[1]];
        if (object.detonateAt) object.detonateAt = this.height/1.01;
        if (object.radius) object.radius *= new_dimensions[1]/previous_dimensions[1];
    });
};

Game.prototype.welcome = function(){
    this.canSpawn = true;
    this.intensity = 7;
    this.cities = [
        new City({game: this, pos: [Math.ceil(this.width/10), Math.ceil(this.height/0.99)], destroyed: true}), 
        new City({game: this, pos: [Math.ceil(this.width/1.44), Math.ceil(this.height/0.99)], destroyed: true}), 
        new City({game: this, pos: [Math.ceil(this.width/2.88), Math.ceil(this.height/0.99)]}), 
        new City({game: this, pos: [Math.ceil(this.width/1.12), Math.ceil(this.height/0.99)]})
    ];       
    this.over = false;
    this.started = false;
    this.bullets = [];
    this.towers = [];
    this.explosions = [];
    this.enemies = [];
    this.enemySpawn = setInterval(() => {this.addEnemy()}, 1500);
}

Game.prototype.setupGame = function(){
    this.over = false;
    this.bossSpawn = true;
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
    this.newHighScore = false;



    this.enemySpawnInterval = function(speed, intensity){
        setTimeout(() => {
            this.addEnemy();
            if(!this.over){
                this.enemySpawnInterval(this.speed, this.intensity);
            }
        }, (2000/(40/speed))/(intensity/4))
    }
    this.enemySpawnInterval(this.speed, this.intensity);

    this.towers = [new Tower({game: this, pos: [375*this.width/750, this.height]})];
    this.cities = [
        new City({game: this, pos: [Math.ceil(this.width/10), Math.ceil(this.height/0.99)]}), 
        new City({game: this, pos: [Math.ceil(this.width/3.41), Math.ceil(this.height/0.99)]}), 
        new City({game: this, pos: [Math.ceil(this.width/1.53), Math.ceil(this.height/0.99)]}), 
        new City({game: this, pos: [Math.ceil(this.width/1.18), Math.ceil(this.height/0.99)]}) 
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
    let spawnPos = Util.spawn("enemy", this.width, this.height);
    let vel = Util.angleTo(spawnPos, targetPos);

    enemyType = enemyType || Math.random() + this.intensity*0.03;

    if (this.intensity > 7 && this.bossSpawn){
        this.bossSpawn = false;
        this.enemies.push(new Boss({game: this, vel: [0, 0], pos: [Math.floor((Math.random() + this.width/7)*this.width),-100]}));
        setTimeout(()=>{this.bossSpawn = true}, 60000/(40/this.speed));
    }

    if (this.canSpawn){
        this.canSpawn = false;
        if (enemyType > 0.85 && this.intensity > 6){
            this.enemies.push(new Teleporter({game: this, vel: [0, 0], pos: [Math.floor((Math.random() + this.width/7)*this.width),-100]}));
            setTimeout(()=>{this.canSpawn = true}, 8000/(40/this.speed)/(this.intensity/7));
        }
        else if (enemyType > 0.60 && this.intensity > 2){
            this.enemies.push(new ZigZag({game: this, vel: vel, pos: spawnPos, detonateAt: this.height/1.01}));
            if(this.intensity > 4){
                let spawnPos = Util.spawn("enemy", this.width, this.height);
                let targetPos = Util.chooseTarget(this);
                let vel = Util.angleTo(spawnPos, targetPos);
                this.enemies.push(new Asteroid({game: this, vel: vel, pos: spawnPos, detonateAt: this.height/1.01}));
            }
            setTimeout(()=>{this.canSpawn = true}, 4000/(40/this.speed)/(this.intensity/3));

        } else {
            this.enemies.push(new Asteroid({game: this, vel: vel, pos: spawnPos, detonateAt: this.height/1.01}));
            setTimeout(()=>{this.canSpawn = true}, 700/(40/this.speed));
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
        this.checkHighScore();
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
                        this.explosions.push(new LargeExplosion({city, pos: [city.pos[0]+10, this.height], game: this}))
                    }
        })
    })
}

Game.prototype.draw = function(){
    this.ctx.clearRect(0,0, this.width, this.height);
    this.ctx.drawImage(this.nightsky, 0, -10, this.width, this.height);
    this.ctx.drawImage(this.cityscape, 0, this.height, this.width, -(this.height/3));

    if(this.started && !this.over){
        // Set Fontsize
        this.ctx.font = this.height < 400 ? "12px serif" : "16px serif"

        // Intensity Bar Right
        this.ctx.fillStyle = 'black';
        Util.roundedRect(this.ctx, this.width-200*this.width/750, 5*this.height/500, 160*this.width/750, 30*this.height/500, 10); // Black Bar
        this.ctx.fillStyle = this.intensityColors[this.intensity-1] // Green to Red
        Util.roundedRect(this.ctx, this.width-190*this.width/750, 10*this.height/500, 14*this.intensity*this.width/750, 20*this.height/500, 5);// Color Bar
        this.ctx.fillText(`Intensity`, this.width-150*this.width/750, 50*this.height/500);// Caption


        // Score Bar Left
        this.ctx.fillStyle = 'black';
        Util.roundedRect(this.ctx, this.width/37.5, 5*this.height/500, 160*this.width/750, 30*this.height/500, 10);    // Black Bar  
        this.ctx.fillStyle = "#f58800";
        this.ctx.fillText(`${this.score}`, 35*this.width/750, 25*this.height/500); // Score
    }
    
    if(!this.started){
        this.ctx.drawImage(this.logo, this.width/4.41, this.height/-33.33, this.width/1.91, this.height/2.36);
        this.ctx.font = this.height < 400 ? "20px serif" : "24px serif";
        this.ctx.fillStyle = ["#f58800", "#f58800", "#f58800", "#ff4400", "#e37600"][Math.floor(Math.random()*5)];
        this.ctx.fillText("Press Fire to Begin", this.width/2.5, this.height/2);
        this.ctx.drawImage(this.mc, this.width*(80/750), this.height*(260/500), this.width*(250/750), this.height*(160/500));
        this.ctx.drawImage(this.kc,this.width*(400/750), this.height*(260/500), this.width*(250/750), this.height*(160/500));
    };

    if(this.over && this.started){
        this.ctx.font = this.width < 600 ? "20px serif" : "24px serif";
        this.ctx.fillStyle = ["#f58800", "#ff4400", "#ff4400", "#ff4400", "#e37600"][Math.floor(Math.random()*5)];
        this.ctx.fillText("Press Fire to try again.", this.width/3.5, this.height/2.25);
        if(this.newHighScore){
            this.ctx.fillStyle = ["#e5f800", "#eeff00", "#00ff00", "#ff4400", "#e39600"][Math.floor(Math.random()*5)];
            this.ctx.fillText(`New High Score! ${this.score}`, this.width/3.5, this.height/1.80);
        }

    };

    this.allObjects().forEach((obj) => {
        obj.draw(this.ctx);
    });

    this.cursor.draw(this.ctx);
}

Game.prototype.checkHighScore = async function(){
    let localhighscores = JSON.parse(window.localStorage['highscores']);
    let globalhighscores = (await this.getScores())
                .map(ele => ({score: ele.score, name: ele.name}))
                .sort((f, s) => s - f);
    let check = {
        local: ((localhighscores.some((score) => this.score > score.score) 
        || localhighscores.length<5) 
        && this.score > 0),
        global: ((globalhighscores.slice(0,5).some((score) => this.score > score.score) 
        || globalhighscores.length<5) 
        && this.score > 0)
    }

    if (Object.values(check).some((value) => (value === true))){
        const highScoreDialog = document.getElementById('high-score-dialog');
        const nameInput = document.getElementById('high-score-name');
        const submitHighScore = document.getElementById('submit-high-score');
        submitHighScore.disabled = true;

        nameInput.addEventListener('change', (e) =>{
            if (e.target.value.length > 2){
                submitHighScore.disabled = false;
            } else {
                submitHighScore.disabled = true;
            }
        })

        highScoreDialog.show();

        submitHighScore.addEventListener('click', () => {
            const name = nameInput.value;
            if(name && check.local){
                localhighscores.push({name: name, score: this.score});
                localhighscores.sort((f, s) => s.score - f.score);
                localhighscores = localhighscores.slice(0, 10);
                window.localStorage['highscores'] = JSON.stringify(localhighscores);
            }
    
            if(name && check.global){
                this.sendScore(name, this.score);
            }
            highScoreDialog.close();
        })

        const highScoreSelector = document.getElementById('high-score-selector');

        let type = highScoreSelector.className

        buildHighScoreList(type);
    }

    this.newHighScore = Object.values(check).some(value => value === true)
    return this.newHighScore
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

module.exports = Game;