/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

eval("addEventListener(\"DOMContentLoaded\", () => {\r\n    const Game = __webpack_require__(/*! ./scripts/game.js */ \"./src/scripts/game.js\");\r\n    const GameView = __webpack_require__(/*! ./scripts/game_view.js */ \"./src/scripts/game_view.js\");\r\n\r\n\r\n    const canvasEl = document.getElementById('game-canvas');\r\n    canvasEl.width = 750;\r\n    canvasEl.height = 500;\r\n    let ctx = canvasEl.getContext('2d');\r\n    const gameContainer = document.getElementById('game-container');\r\n    const speedButtons = document.getElementsByClassName('speed-button');\r\n    const displayButtons = document.getElementsByClassName('display-button');\r\n    const controlButtons = document.getElementsByClassName('control-button');\r\n    const game = new Game(ctx);\r\n    canvasEl.gameView = new GameView(game, ctx);\r\n    \r\n    if(!window.localStorage['highscores']){\r\n        window.localStorage['highscores'] = JSON.stringify([]);\r\n    };\r\n\r\n    \r\n\r\n    const highScoresList = document.getElementById('high-scores-list');\r\n    let highscores = JSON.parse(window.localStorage['highscores']);\r\n    \r\n    highscores.forEach((score) => {\r\n        let newLi = document.createElement(\"li\");\r\n        newLi.innerText = `${score}`;\r\n        highScoresList.appendChild(newLi);\r\n    });\r\n\r\n    const clearScoresButton = document.getElementById('clear-high-scores');\r\n\r\n    clearScoresButton.addEventListener('click', (event) => {\r\n        if (event.target.value === \"clear\"){\r\n            event.target.value = \"confirm\";\r\n            event.target.classList.remove('clear-button');\r\n            event.target.classList.add('confirm-button');\r\n            event.target.innerText = \"Click Again to Confirm\";\r\n            this.clearAlert = setTimeout(() => {\r\n                event.target.value = \"clear\"; \r\n                event.target.innerText = \"Clear Local Scores\";\r\n                event.target.classList.remove('confirm-button');\r\n                event.target.classList.add('clear-button');\r\n            }, 5000);\r\n        } else {\r\n            clearTimeout(this.clearAlert);\r\n            event.target.classList.remove('confirm-button');\r\n            event.target.classList.add('clear-button');\r\n            event.target.value = \"clear\";\r\n            event.target.innerText = \"Clear Local Scores\";\r\n            window.localStorage['highscores'] = '[]';\r\n            document.getElementById('high-scores-list').innerHTML = \"\";\r\n        }\r\n    });\r\n\r\n\r\n\r\n    let mouseControl = true;\r\n    let keyboardControl = false;\r\n    Array.from(controlButtons).forEach((button) => {\r\n        button.addEventListener('click', function(event){\r\n            if(event.target.value === \"Mouse\"){\r\n                controlButtons[1].disabled = false;\r\n                controlButtons[0].disabled = true;\r\n                mouseControl = true;\r\n                keyboardControl = false;\r\n            }\r\n            if(event.target.value === \"Keyboard\"){\r\n                game.cursor.pos = [canvasEl.width/2, canvasEl.height/2]\r\n                controlButtons[1].disabled = true;\r\n                controlButtons[0].disabled = false;\r\n                mouseControl = false;\r\n                keyboardControl = true;\r\n            }\r\n        })\r\n    });\r\n    Array.from(displayButtons).forEach((button) => {\r\n        button.addEventListener('click', function(event){\r\n            if(event.target.value === \"Dark\"){\r\n                canvasEl.gameView.game.darkMode = true;\r\n                displayButtons[1].disabled = false;\r\n                displayButtons[0].disabled = true;\r\n            }\r\n            if(event.target.value === \"Light\"){\r\n                canvasEl.gameView.game.darkMode = false;\r\n                displayButtons[1].disabled = true;\r\n                displayButtons[0].disabled = false;\r\n            }\r\n        })\r\n    });\r\n    let speed = 1;\r\n    Array.from(speedButtons).forEach((button) => {\r\n        button.addEventListener('click', function(event){\r\n            let speeds = [80, 40, 20, 10];\r\n            let speedometer = document.getElementById('speedometer');\r\n            \r\n            if (event.target.value===\"Slower\" && speed > 0){\r\n                speed -= 1;\r\n                speedButtons[1].disabled = false;\r\n\r\n                if (speed <= 0){\r\n                    event.target.disabled = true;\r\n                }\r\n            } \r\n            \r\n            if (event.target.value===\"Faster\" && speed < 3){\r\n                speed += 1;\r\n                speedButtons[0].disabled = false;\r\n\r\n                if (speed  >= 3){\r\n                    event.target.disabled = true;\r\n                }\r\n            }\r\n\r\n            speedometer.innerText = [\"►\",\"►►\",\"►►►\",\"►►►►\"][speed];\r\n            canvasEl.gameView.speed = speeds[speed];\r\n        })\r\n    });\r\n\r\n\r\n    function setMouseListeners(){\r\n        gameContainer.addEventListener('mousemove', (event) => {\r\n            if(mouseControl){\r\n                game.cursor.pos = [event.clientX - canvasEl.getBoundingClientRect().left, event.clientY - canvasEl.getBoundingClientRect().top]\r\n            }\r\n        });\r\n    \r\n        canvasEl.addEventListener('click', (event) => {\r\n            if(mouseControl){\r\n                game.cursor.fire();\r\n            }\r\n        });\r\n    };\r\n\r\n    function setKeyboardListeners(){\r\n        let left;\r\n        let right;\r\n        let up;\r\n        let down;\r\n        let fire;\r\n        let leftDown = false;\r\n        let rightDown = false;\r\n        let upDown = false;\r\n        let downDown = false;\r\n        let fireDown = false;\r\n        window.addEventListener('keydown', (event) => {\r\n            if (keyboardControl && [\"d\", \"ArrowRight\"].includes(event.key) && rightDown === false){\r\n                event.preventDefault();\r\n                rightDown = true;\r\n                right = setInterval(() => {game.cursor.pos[0] += 6}, 30);\r\n            }\r\n            if (keyboardControl && [\"a\", \"ArrowLeft\"].includes(event.key) && leftDown === false){\r\n                event.preventDefault();\r\n                leftDown = true;\r\n                left = setInterval(() => {game.cursor.pos[0] -= 6}, 30);\r\n            }\r\n            if (keyboardControl && [\"w\", \"ArrowUp\"].includes(event.key) && upDown === false){\r\n                event.preventDefault();\r\n                upDown = true;\r\n                up = setInterval(() => {game.cursor.pos[1] -= 6}, 30);\r\n            }\r\n            if (keyboardControl && [\"s\", \"ArrowDown\"].includes(event.key) && downDown === false){\r\n                event.preventDefault();\r\n                downDown = true;\r\n                down = setInterval(() => {game.cursor.pos[1] += 6}, 30);\r\n            }\r\n        });\r\n        window.addEventListener('keyup', (event) => {\r\n            if (keyboardControl && [\"d\", \"ArrowRight\"].includes(event.key)){\r\n                rightDown = false;\r\n                clearInterval(right);\r\n            }\r\n            if (keyboardControl && [\"a\", \"ArrowLeft\"].includes(event.key)){\r\n                leftDown = false;\r\n                clearInterval(left);\r\n            }\r\n            if (keyboardControl && [\"w\", \"ArrowUp\"].includes(event.key)){\r\n                upDown = false;\r\n                clearInterval(up);\r\n            }\r\n            if (keyboardControl && [\"s\", \"ArrowDown\"].includes(event.key)){\r\n                downDown = false;\r\n                clearInterval(down);\r\n            }\r\n            window.addEventListener('keypress', (event) => {\r\n                if (keyboardControl && event.key == \" \"){\r\n                    game.cursor.fire();\r\n                }\r\n            });\r\n        });\r\n    };\r\n\r\n    setMouseListeners();\r\n    setKeyboardListeners();\r\n\r\n    canvasEl.gameView.start();\r\n});\r\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/scripts/game.js":
/*!*****************************!*\
  !*** ./src/scripts/game.js ***!
  \*****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Enemy = __webpack_require__(/*! ./sprites/enemy.js */ \"./src/scripts/sprites/enemy.js\");\r\nconst ZigZag = __webpack_require__(/*! ./sprites/zigzag.js */ \"./src/scripts/sprites/zigzag.js\");\r\nconst City = __webpack_require__(/*! ./sprites/city.js */ \"./src/scripts/sprites/city.js\");\r\nconst Tower = __webpack_require__(/*! ./sprites/tower.js */ \"./src/scripts/sprites/tower.js\");\r\nconst Cursor = __webpack_require__(/*! ./sprites/cursor.js */ \"./src/scripts/sprites/cursor.js\");\r\nconst Util = __webpack_require__(/*! ./util.js */ \"./src/scripts/util.js\");\r\n\r\nconst DIM_X = 700;\r\nconst DIM_Y = 500;\r\n\r\nconst Game = function(ctx){\r\n    this.ctx = ctx;\r\n    this.darkMode = true;\r\n    this.started = false;\r\n    this.over = false;\r\n    this.score = 0;\r\n    this.bullets = [];\r\n    this.cities = [];\r\n    this.towers = [];\r\n    this.explosions = [];\r\n    this.enemies = [];\r\n    this.speed = 20;\r\n    this.logo = new Image();\r\n    this.logo.src = 'logo.png';\r\n    this.cursor = new Cursor({game: this});\r\n    this.welcome();\r\n}\r\n\r\nGame.prototype.welcome = function(){\r\n    if (this.score > 0){\r\n        let highscores = JSON.parse(window.localStorage['highscores']);\r\n\r\n        highscores.push(this.score);\r\n        highscores.sort((f, s) => s - f);\r\n        highscores = highscores.slice(0, 5);\r\n\r\n        window.localStorage['highscores'] = JSON.stringify(highscores);\r\n\r\n        const highScoresList = document.getElementById('high-scores-list');      \r\n        highScoresList.innerHTML = \"\";     \r\n            \r\n        highscores.forEach((score) => {\r\n            let newLi = document.createElement(\"li\");\r\n            newLi.innerText = `${score}`;\r\n            highScoresList.appendChild(newLi);\r\n        })\r\n    }\r\n    this.enemySpawn = setInterval(this.addEnemy.bind(this), 1500);\r\n    this.started = false;\r\n    this.over = false;\r\n    this.cities = [\r\n        new City({game: this, pos: [175, 440]}), \r\n        new City({game: this, pos: [475, 450]}), \r\n        new City({game: this, pos: [325, 460]}), \r\n        new City({game: this, pos: [625, 445]})\r\n    ];       \r\n}\r\n\r\nGame.prototype.setupGame = function(){\r\n    document.getElementById('hud-score').innerHTML = \"Score: 0\";\r\n    clearInterval(this.enemySpawn);\r\n    this.started = true;\r\n    this.score = 0;\r\n    this.bullets = [];\r\n    this.cities = [];\r\n    this.towers = [];\r\n    this.explosions = [];\r\n    this.enemies = [];\r\n    this.enemySpawn = setInterval(this.addEnemy.bind(this), 1500);\r\n    this.towers = [new Tower({game: this})];\r\n    this.cities = [\r\n        new City({game: this, pos: [75, 450]}), \r\n        // new City({game: this, pos: [175, 450]}), \r\n        // new City({game: this, pos: [275, 450]}), \r\n        // new City({game: this, pos: [425, 450]}), \r\n        // new City({game: this, pos: [525, 450]}), \r\n        new City({game: this, pos: [625, 450]})\r\n    ];\r\n    this.overCheck = setInterval(this.isOver.bind(this), 250);\r\n      \r\n}\r\n\r\nGame.prototype.addEnemy = function(){\r\n    let friendlies = this.friendlyObjects();\r\n    let targetPos;\r\n    try{\r\n        targetPos = friendlies[Math.floor(Math.random()*friendlies.length)].pos;\r\n    } catch {\r\n        targetPos = [375, 400];\r\n    }\r\n    let spawnPos = Util.spawn(\"enemy\");\r\n\r\n    //Calculate angle from spawn to target # # # # # # # # # # # # # # # #\r\n    let diffs = [targetPos[0] - spawnPos[0], targetPos[1] - spawnPos[1]];\r\n    let angle = [Math.atan(diffs[1]/diffs[0])];\r\n    let movefix = diffs[0] < 0 ? -1 : 1;\r\n    let vel = [movefix*Math.cos(angle), movefix*Math.sin(angle)];\r\n\r\n    let enemyType = Math.random();\r\n    if (enemyType > 0.85){\r\n        this.enemies.push(new ZigZag({game: this, vel: vel, pos: spawnPos}));\r\n    } else {\r\n        this.enemies.push(new Enemy({game: this, vel: vel, pos: spawnPos}));\r\n    }\r\n}\r\n\r\nGame.prototype.step = function(delta){\r\n    this.moveObjects(delta);\r\n    this.checkCollisions();\r\n    this.draw();\r\n}\r\n\r\nGame.prototype.isOver = function(){\r\n    if(this.cities.length === 0 && this.started){\r\n        setTimeout(() => {\r\n            this.over = true; \r\n            clearInterval(this.overCheck);\r\n            clearInterval(this.enemySpawn)}, 1000);\r\n    }\r\n}\r\n\r\nGame.prototype.moveObjects = function(delta){\r\n    this.allObjects().forEach((obj) => {\r\n        obj.move(delta);\r\n    });\r\n}\r\n\r\nGame.prototype.checkCollisions = function(){\r\n    this.enemies.forEach((enemy) => {\r\n        this.explosions.forEach((explosion) => {\r\n            if (enemy.isCollidedWith(explosion)){\r\n                enemy.destroy();\r\n            }\r\n        })\r\n\r\n        this.cities.forEach((city) => {\r\n                if (enemy.isCollidedWith(city)){\r\n                        enemy.destroy();\r\n                        city.destroy();\r\n                    }\r\n        })\r\n    })\r\n}\r\n\r\nGame.prototype.draw = function(){\r\n    this.ctx.clearRect(0,0, 750, 500);\r\n    this.ctx.fillStyle = this.darkMode ? '#001019' : '#AAAAAA';\r\n    this.ctx.fillRect(0, 0, 750, 425);\r\n    this.ctx.fillStyle = this.darkMode ? 'darkgreen' : 'lightgreen';\r\n    this.ctx.fillRect(0, 425, 750, 75);\r\n\r\n    this.allObjects().forEach((obj) => {\r\n        obj.draw(this.ctx);\r\n    });\r\n\r\n    if(!this.started){\r\n        this.ctx.drawImage(this.logo, 186, 0, 372, 230);\r\n        this.ctx.font = \"24px serif\";\r\n        this.ctx.fillStyle = [\"#f58800\", \"#f58800\", \"#f58800\", \"#ff4400\", \"#e37600\"][Math.floor(Math.random()*5)];\r\n        this.ctx.fillText(\"Click Anywhere to Begin\", 246, 220);\r\n    };\r\n\r\n    if(this.over && this.started){\r\n        this.ctx.font = \"24px serif\";\r\n        this.ctx.fillStyle = [\"#f58800\", \"#ff4400\", \"#ff4400\", \"#ff4400\", \"#e37600\"][Math.floor(Math.random()*5)];\r\n        this.ctx.fillText(\"Game Over! Click to try again.\", 220, 220);\r\n        let highscores = JSON.parse(window.localStorage['highscores']);\r\n        if((highscores.some((score) => this.score > score) || highscores.length===0) && this.score > 0){\r\n            this.ctx.fillStyle = [\"#e5f800\", \"#eeff00\", \"#ff4400\", \"#ff4400\", \"#e39600\"][Math.floor(Math.random()*5)];\r\n            this.ctx.fillText(\"New High Score!\", 230, 260);\r\n        }\r\n\r\n    };\r\n\r\n    this.cursor.draw(this.ctx);\r\n    \r\n}\r\nGame.prototype.allObjects = function(){\r\n    return this.enemies.concat(this.bullets.concat(this.explosions.concat(this.cities.concat(this.towers))));\r\n}\r\n\r\nGame.prototype.friendlyObjects = function(){\r\n    return this.cities\r\n}\r\n             \r\nGame.prototype.remove = function(object){\r\n    if (object.type === \"enemy\"){\r\n        this.enemies = this.enemies.filter(item => item !== object);\r\n    } else if (object.type === \"bullet\") {\r\n        this.bullets = this.bullets.filter(item => item !== object);\r\n    } else if (object.type === \"explosion\"){\r\n        this.explosions = this.explosions.filter(item => item !== object);\r\n    } else if (object.type === \"city\"){\r\n        this.cities = this.cities.filter(item => item != object);\r\n    }\r\n}\r\n\r\nmodule.exports = Game;\n\n//# sourceURL=webpack:///./src/scripts/game.js?");

/***/ }),

/***/ "./src/scripts/game_view.js":
/*!**********************************!*\
  !*** ./src/scripts/game_view.js ***!
  \**********************************/
/***/ ((module) => {

eval("const GameView = function (game, ctx){\r\n  this.game = game;\r\n  this.ctx = ctx;\r\n  this.lastTime = 0;\r\n  this.speed = 20;\r\n  this.hudLives = document.getElementById('hud-lives');\r\n}\r\n\r\n\r\n\r\nGameView.prototype.start = function() {\r\n  this.lastTime = 0;\r\n  requestAnimationFrame(this.animate.bind(this));\r\n};\r\n\r\nGameView.prototype.animate = function(time) {\r\n\r\n  const timeDelta = time - this.lastTime;\r\n  this.game.step(timeDelta/this.speed);\r\n  this.lastTime = time;\r\n  requestAnimationFrame(this.animate.bind(this));\r\n};\r\n\r\n\r\nmodule.exports = GameView;\r\n\n\n//# sourceURL=webpack:///./src/scripts/game_view.js?");

/***/ }),

/***/ "./src/scripts/sprites/bullet.js":
/*!***************************************!*\
  !*** ./src/scripts/sprites/bullet.js ***!
  \***************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const MovingObject = __webpack_require__(/*! ./moving_object.js */ \"./src/scripts/sprites/moving_object.js\");\r\nconst Explosion = __webpack_require__(/*! ./explosion.js */ \"./src/scripts/sprites/explosion.js\");\r\nconst Util = __webpack_require__(/*! ../util.js */ \"./src/scripts/util.js\");\r\n\r\nconst Bullet = function(options){\r\n\r\n    //Position matches parent tower, must be dynamic to support multiple towers\r\n    this.pos = [375, 400];\r\n    this.radius = 1.5;\r\n    \r\n\r\n    //Provides access to other elements of the game\r\n    this.game = options.game;\r\n    \r\n    //Calculate angle from tower to cursor # # # # # # # # # # # # # # # #\r\n    let cursorPos = this.game.cursor.pos;\r\n    let diffs = [cursorPos[0] - this.pos[0], cursorPos[1] - this.pos[1]];\r\n    this.angle = [Math.atan(diffs[1]/diffs[0])];\r\n    this.terminus = cursorPos;\r\n\r\n    //Used for moving and drawing\r\n    let movefix = diffs[0] < 0 ? -8 : 8;\r\n    this.vel = [movefix * Math.cos(this.angle), movefix * Math.sin(this.angle)];\r\n    this.colors = [\"#ff8800\", \"#ff0000\",\"#ff0000\", \"#ff0000\"];\r\n    this.type = \"bullet\";\r\n\r\n}\r\n\r\nUtil.inherits(Bullet, MovingObject);\r\n\r\nBullet.prototype.draw = function (ctx){\r\n    ctx.beginPath();\r\n    ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2*Math.PI);\r\n    \r\n    //Random color each frame to give clicker effect\r\n    ctx.strokeStyle = this.colors[Math.floor(Math.random()*3)];\r\n    ctx.fillStyle = this.colors[Math.floor(Math.random()*3)];\r\n    ctx.fill();\r\n}\r\n\r\nBullet.prototype.move = function (delta){\r\n    this.pos = [this.pos[0] + this.vel[0]*delta, this.pos[1] + this.vel[1]*delta];\r\n\r\n    if (Math.abs(this.pos[0] - this.terminus[0]) < 5 && Math.abs(this.pos[1] - this.terminus[1] < 5)){\r\n        this.destroy();\r\n        this.game.explosions.push(new Explosion({pos: this.pos, game: this.game}));\r\n    }\r\n}\r\n\r\nmodule.exports = Bullet;\n\n//# sourceURL=webpack:///./src/scripts/sprites/bullet.js?");

/***/ }),

/***/ "./src/scripts/sprites/city.js":
/*!*************************************!*\
  !*** ./src/scripts/sprites/city.js ***!
  \*************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const StationaryObject = __webpack_require__(/*! ./stationary_object.js */ \"./src/scripts/sprites/stationary_object.js\");\r\nconst Util = __webpack_require__(/*! ../util.js */ \"./src/scripts/util.js\");\r\n\r\nconst City = function (options){\r\n    this.pos = options.pos;\r\n    this.type = \"city\";\r\n    this.radius = 5;\r\n    this.colors = [\"#FFFFFF\", \"#aa3333\", \"#aa0011\"];\r\n    this.game = options.game;\r\n}\r\n\r\nUtil.inherits(City, StationaryObject);\r\n\r\nCity.prototype.draw = function (ctx){\r\n    ctx.fillStyle = this.colors[0];\r\n    ctx.fillRect(this.pos[0] - this.radius, this.pos[1] - this.radius, this.radius*4, this.radius*2);\r\n}\r\n\r\n\r\nmodule.exports = City;\n\n//# sourceURL=webpack:///./src/scripts/sprites/city.js?");

/***/ }),

/***/ "./src/scripts/sprites/cursor.js":
/*!***************************************!*\
  !*** ./src/scripts/sprites/cursor.js ***!
  \***************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Bullet = __webpack_require__(/*! ./bullet.js */ \"./src/scripts/sprites/bullet.js\");\r\n\r\n\r\nconst Cursor = function(options){\r\n    this.pos = [100, 100];\r\n    this.game = options.game;\r\n    this.canFire = true;\r\n}\r\n\r\nCursor.prototype.draw = function(ctx){\r\n    ctx.beginPath();\r\n    ctx.arc(this.pos[0], this.pos[1], 1, 0, 2*Math.PI);\r\n    ctx.strokeStyle = \"red\";\r\n    ctx.lineWidth = 1;\r\n    ctx.stroke();\r\n\r\n    ctx.beginPath();\r\n    ctx.arc(this.pos[0], this.pos[1], 7, 0, 2*Math.PI);\r\n    ctx.strokeStyle = \"#09ff00\";\r\n    ctx.lineWidth = 1;\r\n    ctx.stroke();\r\n}\r\n\r\nCursor.prototype.fire = function(){\r\n    if(this.game.started && this.canFire && this.pos[1] < 395){\r\n        this.game.bullets.push(new Bullet({game: this.game}));\r\n        this.canFire = false;\r\n        setTimeout(() => {this.canFire = true}, 750);\r\n    }\r\n    if(!this.game.started && !this.game.over){\r\n        this.game.setupGame();\r\n    }\r\n    if(this.game.over && this.game.started){\r\n        this.game.welcome();\r\n    }\r\n}\r\n\r\nmodule.exports = Cursor;\n\n//# sourceURL=webpack:///./src/scripts/sprites/cursor.js?");

/***/ }),

/***/ "./src/scripts/sprites/enemy.js":
/*!**************************************!*\
  !*** ./src/scripts/sprites/enemy.js ***!
  \**************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const MovingObject = __webpack_require__(/*! ./moving_object.js */ \"./src/scripts/sprites/moving_object.js\");\r\nconst Explosion = __webpack_require__(/*! ./explosion.js */ \"./src/scripts/sprites/explosion.js\");\r\nconst Util = __webpack_require__(/*! ../util.js */ \"./src/scripts/util.js\");\r\n\r\nconst Enemy = function(options){\r\n\r\n    this.pos = options.pos;\r\n    this.type = \"enemy\";\r\n    this.radius = 3;\r\n    this.vel = options.vel;\r\n    this.color = \"#e0e0e0\";\r\n    this.game = options.game;\r\n    this.scoreValue = 10;\r\n    \r\n    \r\n}\r\n\r\nUtil.inherits(Enemy, MovingObject);\r\n\r\n\r\nEnemy.prototype.destroy = function(){\r\n    if (this.pos[1] < 395 && !this.game.over && this.game.started){\r\n        this.game.score += 50;\r\n        document.getElementById('hud-score').innerHTML = `Score: ${this.game.score}`;\r\n    }\r\n    this.game.remove(this);\r\n    this.game.explosions.push(new Explosion({game: this.game, pos: this.pos}));\r\n}\r\n\r\nEnemy.prototype.move = function(delta){\r\n    MovingObject.prototype.move.call(this, delta);\r\n    if(this.pos[1] > 465){\r\n        this.destroy();\r\n    }\r\n}\r\n\r\n\r\n\r\n\r\nmodule.exports = Enemy;\n\n//# sourceURL=webpack:///./src/scripts/sprites/enemy.js?");

/***/ }),

/***/ "./src/scripts/sprites/explosion.js":
/*!******************************************!*\
  !*** ./src/scripts/sprites/explosion.js ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const StationaryObject = __webpack_require__(/*! ./stationary_object.js */ \"./src/scripts/sprites/stationary_object.js\");\r\nconst Util = __webpack_require__(/*! ../util.js */ \"./src/scripts/util.js\");\r\n\r\nconst Explosion = function (options){\r\n    this.pos = options.pos;\r\n    this.type = \"explosion\";\r\n    this.radius = 2;\r\n    this.colors = [\"#aaaa00\", \"#aa3333\", \"#aa0011\"];\r\n    this.game = options.game;\r\n}\r\n\r\nUtil.inherits(Explosion, StationaryObject);\r\n\r\nExplosion.prototype.draw = function (ctx){\r\n    ctx.beginPath();\r\n    ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2*Math.PI);\r\n    ctx.lineWidth = 2;\r\n    ctx.strokeStyle = this.colors[Math.floor(Math.random()*3)];\r\n    ctx.fillStyle = this.colors[Math.floor(Math.random()*3)];\r\n    ctx.fill();\r\n}\r\n\r\n\r\nExplosion.prototype.expand = function (delta){\r\n    if (this.radius >= 30) {this.destroy()}\r\n    this.radius += 0.75*delta;\r\n}\r\n\r\nExplosion.prototype.move = Explosion.prototype.expand; //allows the rest of the game to call 'move' as an alias for 'expand'\r\n\r\n\r\n\r\nmodule.exports = Explosion;\n\n//# sourceURL=webpack:///./src/scripts/sprites/explosion.js?");

/***/ }),

/***/ "./src/scripts/sprites/moving_object.js":
/*!**********************************************!*\
  !*** ./src/scripts/sprites/moving_object.js ***!
  \**********************************************/
/***/ ((module) => {

eval("const MovingObject = function (options){\r\n    this.pos = options.pos;\r\n    this.vel = options.vel;\r\n    this.radius = 2;\r\n    this.color = \"#FFFFFF\"\r\n    this.game = options.game;\r\n}\r\n\r\nMovingObject.prototype.draw = function (ctx){\r\n    ctx.beginPath();\r\n    ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2*Math.PI);\r\n    ctx.strokeStyle = \"white\";\r\n    ctx.lineWidth = 2;\r\n    // ctx.stroke();\r\n    ctx.fillStyle = this.color;\r\n    ctx.fill();\r\n}\r\n\r\nMovingObject.prototype.move = function (timeDelta){\r\n    this.pos = [this.pos[0] + this.vel[0]*timeDelta, this.pos[1] + this.vel[1]*timeDelta];\r\n}\r\n\r\nMovingObject.prototype.distanceFrom = function (pos){\r\n    dx = pos[0] - this.pos[0];\r\n    dy = pos[1] - this.pos[1];\r\n    return Math.sqrt(dx*dx + dy*dy);\r\n}\r\n\r\nMovingObject.prototype.isCollidedWith = function (otherObject){\r\n    minDistance = this.radius + otherObject.radius;\r\n    return (minDistance > this.distanceFrom(otherObject.pos))\r\n}\r\n\r\nMovingObject.prototype.destroy = function (){this.game.remove(this)};\r\n\r\n\r\nmodule.exports = MovingObject;\n\n//# sourceURL=webpack:///./src/scripts/sprites/moving_object.js?");

/***/ }),

/***/ "./src/scripts/sprites/stationary_object.js":
/*!**************************************************!*\
  !*** ./src/scripts/sprites/stationary_object.js ***!
  \**************************************************/
/***/ ((module) => {

eval("const StationaryObject = function (options){\r\n    this.pos = options.pos || [250, 250];\r\n    this.radius = 2;\r\n    this.colors = \"#FFFFFF\";\r\n    this.game = options.game;\r\n}\r\n\r\nStationaryObject.prototype.draw = function (ctx){\r\n    ctx.beginPath();\r\n    ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2*Math.PI);\r\n    ctx.lineWidth = 2;\r\n    ctx.strokeStyle = this.color;\r\n    ctx.fillStyle = this.color;\r\n    ctx.fill();\r\n}\r\n\r\nStationaryObject.prototype.distanceFrom = function (pos){\r\n    dx = pos[0] - this.pos[0];\r\n    dy = pos[1] - this.pos[1];\r\n    return Math.sqrt(dx*dx + dy*dy);\r\n}\r\n\r\nStationaryObject.prototype.move = function(){}\r\n\r\nStationaryObject.prototype.destroy = function(){this.game.remove(this);}\r\n\r\n\r\nStationaryObject.prototype.isCollidedWith = function (otherObject){\r\n    minDistance = this.radius + otherObject.radius;\r\n    return (minDistance > this.distanceFrom(otherObject.pos))\r\n}\r\n\r\n\r\nmodule.exports = StationaryObject;\n\n//# sourceURL=webpack:///./src/scripts/sprites/stationary_object.js?");

/***/ }),

/***/ "./src/scripts/sprites/tower.js":
/*!**************************************!*\
  !*** ./src/scripts/sprites/tower.js ***!
  \**************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const StationaryObject = __webpack_require__(/*! ./stationary_object.js */ \"./src/scripts/sprites/stationary_object.js\");\r\nconst Util = __webpack_require__(/*! ../util.js */ \"./src/scripts/util.js\");\r\n\r\nconst Tower = function (options){\r\n    this.pos = options.pos || [375, 400];\r\n    this.type = \"tower\";\r\n    this.radius = 10;\r\n    this.colors = [\"#888888\", \"#666666\", \"#aa0011\"];\r\n    this.game = options.game;\r\n}\r\n\r\nUtil.inherits(Tower, StationaryObject);\r\n\r\nTower.prototype.draw = function (ctx){\r\n    let cursorPos = this.game.cursor.pos;\r\n    let diffs = [cursorPos[0] - this.pos[0], cursorPos[1] - this.pos[1]- 5];\r\n    this.angle = [Math.atan(diffs[1]/diffs[0])];\r\n    let movefix = diffs[0] < 0 ? -1 : 1;\r\n\r\n    //Barrel\r\n    ctx.beginPath();\r\n    ctx.strokeStyle = this.colors[1];\r\n    ctx.moveTo(this.pos[0], this.pos[1]);\r\n    ctx.lineTo(this.pos[0] + movefix*20*Math.cos(this.angle), this.pos[1] + movefix*20*Math.sin(this.angle));\r\n    // ctx.lineTo(this.pos[0], this.pos[1] - 20);\r\n    ctx.lineWidth = 5;\r\n    ctx.stroke();\r\n\r\n    //Base\r\n    ctx.fillStyle = this.colors[0];\r\n    ctx.fillRect(this.pos[0] - 10, this.pos[1], 20, 35);\r\n\r\n    //Dome\r\n    ctx.beginPath();\r\n    ctx.arc(this.pos[0], this.pos[1], 8, 0, Math.PI, true)\r\n    ctx.fill();\r\n}\r\n\r\n\r\nmodule.exports = Tower;\n\n//# sourceURL=webpack:///./src/scripts/sprites/tower.js?");

/***/ }),

/***/ "./src/scripts/sprites/zigzag.js":
/*!***************************************!*\
  !*** ./src/scripts/sprites/zigzag.js ***!
  \***************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Enemy = __webpack_require__(/*! ./enemy.js */ \"./src/scripts/sprites/enemy.js\");\r\nconst Explosion = __webpack_require__(/*! ./explosion.js */ \"./src/scripts/sprites/explosion.js\");\r\nconst Util = __webpack_require__(/*! ../util.js */ \"./src/scripts/util.js\");\r\n\r\nconst ZigZag = function(options){\r\n\r\n    this.pos = options.pos;\r\n    this.type = \"enemy\";\r\n    this.radius = 2;\r\n    this.vel = options.vel;\r\n    this.colors = [\"#FFa0a0\", \"#FF3030\"];\r\n    this.game = options.game;\r\n    \r\n    \r\n}\r\n\r\nUtil.inherits(ZigZag, Enemy);\r\n\r\n\r\nZigZag.prototype.destroy = function(){\r\n    if (this.pos[1] < 395 && !this.game.over && this.game.started){\r\n        this.game.score += 75;\r\n        document.getElementById('hud-score').innerHTML = `Score: ${this.game.score}`;\r\n    }\r\n    this.game.remove(this);\r\n    this.game.explosions.push(new Explosion({game: this.game, pos: this.pos}));\r\n}\r\n\r\nZigZag.prototype.draw = function (ctx){\r\n    ctx.beginPath();\r\n    ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2*Math.PI);\r\n    ctx.strokeStyle = \"white\";\r\n    ctx.lineWidth = 2;\r\n    // ctx.stroke();\r\n    ctx.fillStyle = this.colors[Math.floor(Math.random()*2)];\r\n    ctx.fill();\r\n}\r\n\r\nZigZag.prototype.move = function(delta){\r\n    let changeDir = Math.random();\r\n\r\n    if (changeDir > 0.99){\r\n        let friendlies = this.game.friendlyObjects();\r\n        let targetPos;\r\n        try{\r\n            targetPos = friendlies[Math.floor(Math.random()*friendlies.length)].pos;\r\n        } catch {\r\n            targetPos = [375, 400];\r\n        }\r\n            \r\n        //Calculate angle from spawn to target # # # # # # # # # # # # # # # #\r\n        let diffs = [targetPos[0] - this.pos[0], targetPos[1] - this.pos[1]];\r\n        let angle = [Math.atan(diffs[1]/diffs[0])];\r\n        let movefix = diffs[0] < 0 ? -1 : 1;\r\n        this.vel = [movefix*Math.cos(angle), movefix*Math.sin(angle)];\r\n    }\r\n\r\n    Enemy.prototype.move.call(this, delta/2);\r\n}\r\n\r\n\r\n\r\n\r\nmodule.exports = ZigZag;\n\n//# sourceURL=webpack:///./src/scripts/sprites/zigzag.js?");

/***/ }),

/***/ "./src/scripts/util.js":
/*!*****************************!*\
  !*** ./src/scripts/util.js ***!
  \*****************************/
/***/ ((module) => {

eval("const Util = {\r\n    inherits: function inherits(childClass, parentClass){\r\n        const Surrogate = function(){};        \r\n        Surrogate.prototype = parentClass.prototype;\r\n        childClass.prototype = new Surrogate();\r\n        childClass.prototype.constructor = childClass;\r\n    },\r\n    \r\n    // Return a randomly oriented vector with the given length.\r\n    randomFallingVec: function randomFallingVec(length) {\r\n        const deg = Math.PI * (1/4)+ Math.PI * 0.5 * Math.random();\r\n        return Util.scale([Math.cos(deg), Math.sin(deg)], length);\r\n    },\r\n\r\n\r\n\r\n    // Scale the length of a vector by the given amount.\r\n    scale: function scale(vec, m) {\r\n        return [vec[0] * m, vec[1] * m];\r\n    },\r\n\r\n    spawn: function spawn(type){\r\n        type = type || \"enemy\";\r\n        \r\n        if (type === \"enemy\"){\r\n            return [Math.floor(Math.random()*771-10), Math.floor(Math.random()*150-100)]\r\n        }\r\n    }\r\n    \r\n  };\r\n\r\n  \r\n  module.exports = Util;\n\n//# sourceURL=webpack:///./src/scripts/util.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;