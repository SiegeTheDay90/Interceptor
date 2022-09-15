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

/***/ "./src/bullet.js":
/*!***********************!*\
  !*** ./src/bullet.js ***!
  \***********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const MovingObject = __webpack_require__(/*! ./moving_object.js */ \"./src/moving_object.js\");\r\nconst Explosion = __webpack_require__(/*! ./explosion.js */ \"./src/explosion.js\");\r\nconst Util = __webpack_require__(/*! ./util.js */ \"./src/util.js\");\r\n\r\nconst Bullet = function(options){\r\n\r\n    //Position matches parent tower, must be dynamic to support multiple towers\r\n    this.pos = [350, 400];\r\n    this.radius = 1.5;\r\n    \r\n\r\n    //Provides access to other elements of the game\r\n    this.game = options.game;\r\n    \r\n    //Calculate angle from tower to cursor # # # # # # # # # # # # # # # #\r\n    let cursorPos = this.game.cursor.pos;\r\n    let diffs = [cursorPos[0] - this.pos[0], cursorPos[1] - this.pos[1]];\r\n    this.angle = [Math.atan(diffs[1]/diffs[0])];\r\n    this.terminus = cursorPos;\r\n\r\n    //Used for moving and drawing\r\n    let movefix = diffs[0] < 0 ? -4 : 4;\r\n    this.vel = [movefix * Math.cos(this.angle), movefix * Math.sin(this.angle)];\r\n    this.colors = [\"#ff8800\", \"#ff0000\",\"#ff0000\", \"#ff0000\"];\r\n    this.type = \"bullet\";\r\n\r\n}\r\n\r\nUtil.inherits(Bullet, MovingObject);\r\n\r\nBullet.prototype.draw = function (ctx){\r\n    ctx.beginPath();\r\n    ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2*Math.PI);\r\n    \r\n    //Random color each frame to give clicker effect\r\n    ctx.strokeStyle = this.colors[Math.floor(Math.random()*3)];\r\n    ctx.fillStyle = this.colors[Math.floor(Math.random()*3)];\r\n    ctx.fill();\r\n}\r\n\r\nBullet.prototype.move = function (){\r\n    this.pos = [this.pos[0] + this.vel[0], this.pos[1] + this.vel[1]];\r\n\r\n    if (Math.abs(this.pos[0] - this.terminus[0]) < 5 && Math.abs(this.pos[1] - this.terminus[1] < 5)){\r\n        this.destroy();\r\n        this.game.explosions.push(new Explosion({pos: this.pos, game: this.game}));\r\n    }\r\n}\r\n\r\nmodule.exports = Bullet;\n\n//# sourceURL=webpack:///./src/bullet.js?");

/***/ }),

/***/ "./src/cursor.js":
/*!***********************!*\
  !*** ./src/cursor.js ***!
  \***********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Bullet = __webpack_require__(/*! ./bullet.js */ \"./src/bullet.js\");\r\n\r\n\r\nconst Cursor = function(options){\r\n    this.pos = [100, 100];\r\n    this.game = options.game;\r\n}\r\n\r\nCursor.prototype.draw = function(ctx){\r\n    ctx.beginPath();\r\n    ctx.arc(this.pos[0], this.pos[1], 1, 0, 2*Math.PI);\r\n    ctx.strokeStyle = \"red\";\r\n    ctx.lineWidth = 1;\r\n    ctx.stroke();\r\n\r\n    ctx.beginPath();\r\n    ctx.arc(this.pos[0], this.pos[1], 7, 0, 2*Math.PI);\r\n    ctx.strokeStyle = \"#09ff00\";\r\n    ctx.lineWidth = 1;\r\n    ctx.stroke();\r\n}\r\n\r\nCursor.prototype.fire = function(){\r\n    this.game.bullets.push(new Bullet({game: this.game}));\r\n}\r\n\r\n//How do I bind this event?\r\n\r\n// Cursor.prototype.updateCursorPosition= function(event) {\r\n//     this.pos = [event.clientX, event.clientY];\r\n// }\r\n\r\nmodule.exports = Cursor;\n\n//# sourceURL=webpack:///./src/cursor.js?");

/***/ }),

/***/ "./src/explosion.js":
/*!**************************!*\
  !*** ./src/explosion.js ***!
  \**************************/
/***/ ((module) => {

eval("const Explosion = function (options){\r\n    this.pos = options.pos;\r\n    this.type = \"explosion\";\r\n    this.radius = 2;\r\n    this.colors = [\"#aaaa00\", \"#aa3333\", \"#aa0011\"];\r\n    this.game = options.game;\r\n}\r\n\r\nExplosion.prototype.draw = function (ctx){\r\n    ctx.beginPath();\r\n    ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2*Math.PI);\r\n    ctx.lineWidth = 2;\r\n    ctx.stokeStyle = this.colors[Math.floor(Math.random()*3)];\r\n    ctx.fillStyle = this.colors[Math.floor(Math.random()*3)];\r\n    ctx.fill();\r\n}\r\n\r\n\r\nExplosion.prototype.expand = function (){\r\n    if (this.radius === 26){\r\n        this.destroy();\r\n    }\r\n    \r\n    this.radius += .75;\r\n}\r\n\r\nExplosion.prototype.move = Explosion.prototype.expand; //allows the rest of the game to call 'move' as an alias for 'expand'\r\n\r\nExplosion.prototype.destroy = function(){this.game.remove(this);}\r\n\r\nExplosion.prototype.draw = function (ctx){\r\n    ctx.beginPath();\r\n    ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2*Math.PI);\r\n    \r\n    //Random color each frame to give clicker effect\r\n    ctx.stokeStyle = this.colors[Math.floor(Math.random()*3)];\r\n    ctx.fillStyle = this.colors[Math.floor(Math.random()*3)];\r\n    ctx.fill();\r\n}\r\n\r\nExplosion.prototype.distanceFrom = function (pos){\r\n    dx = pos[0] - this.pos[0];\r\n    dy = pos[1] - this.pos[1];\r\n\r\n    return Math.sqrt(dx*dx + dy*dy);\r\n}\r\n\r\nExplosion.prototype.isCollidedWith = function (otherObject){\r\n    minDistance = this.radius + otherObject.radius;\r\n\r\n    return (minDistance > this.distanceFrom(otherObject.pos))\r\n}\r\n\r\nExplosion.prototype.collideWith = function (){};\r\n\r\nmodule.exports = Explosion;\n\n//# sourceURL=webpack:///./src/explosion.js?");

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Missile = __webpack_require__(/*! ./missile.js */ \"./src/missile.js\");\r\nconst Util = __webpack_require__(/*! ./util.js */ \"./src/util.js\");\r\nconst Cursor = __webpack_require__(/*! ./cursor.js */ \"./src/cursor.js\");\r\n\r\nconst DIM_X = 700;\r\nconst DIM_Y = 500;\r\n\r\nconst Game = function(ctx){\r\n    this.bullets = [];\r\n    this.explosions = [];\r\n    this.enemies = [];\r\n    this.setupGame(ctx);\r\n    this.addEnemy({game: this, pos: [250, 10]});\r\n    this.addEnemy({game: this, pos: [350, 20]});\r\n    this.addEnemy({game: this, pos: [150, 10]});\r\n    this.addEnemy({game: this, pos: [250, 30]});\r\n    this.addEnemy({game: this, pos: [150, 20]});\r\n    this.addEnemy({game: this, pos: [350, 0]});\r\n    this.ctx = ctx;\r\n\r\n    this.cursor = new Cursor({game: this});\r\n}\r\n\r\nGame.prototype.setupGame = function(ctx){\r\n    ctx.fillStyle = 'black';\r\n    ctx.fillRect(0, 0, 750, 400);\r\n    ctx.fillStyle = 'green';\r\n    ctx.fillRect(0, 400, 750, 100);\r\n}\r\n\r\nGame.prototype.addEnemy = function(options){\r\n    this.enemies.push(new Missile(options));\r\n}\r\n\r\nGame.prototype.draw = function(ctx){\r\n    ctx.clearRect(0,0, 750, 500);\r\n    ctx.fillStyle = 'black';\r\n    ctx.fillRect(0, 0, 750, 400);\r\n    ctx.fillStyle = 'green';\r\n    ctx.fillRect(0, 400, 750, 100);\r\n    this.cursor.draw(ctx);\r\n    this.allObjects().forEach((obj) => {\r\n        obj.draw(ctx);\r\n    })\r\n }\r\n\r\n\r\nGame.prototype.moveObjects = function(ctx){\r\n    this.allObjects().forEach((obj) => {\r\n        obj.move();\r\n    });\r\n\r\n    this.draw(ctx);\r\n}\r\n\r\nGame.prototype.allObjects = function(){\r\nreturn this.enemies.concat(this.bullets.concat(this.explosions));\r\n}\r\n\r\nGame.prototype.remove = function(object){\r\n    if (object.type === \"enemy\"){\r\n        this.enemies = this.enemies.filter(item => item !== object);\r\n    } else if (object.type === \"bullet\") {\r\n        this.bullets = this.bullets.filter(item => item !== object);\r\n    } else if (object.type === \"explosion\"){\r\n        this.explosions = this.explosions.filter(item => item !== object);\r\n    }\r\n}\r\n\r\n\r\nGame.prototype.checkCollisions = function(){\r\n    this.enemies.forEach((enemy) => {\r\n        this.explosions.forEach((explosion) => {\r\n            // debugger;\r\n            if (enemy.isCollidedWith(explosion)){\r\n                enemy.destroy();\r\n            }\r\n        })\r\n        //Uncomment this code when cities are implemented\r\n        // this.cities().forEach((city) => {\r\n        //     if (enemy.isCollidedWith(city)){\r\n        //         enemy.destroy();\r\n        //         city.destroy();\r\n        //     }\r\n        // })\r\n    })\r\n}\r\n\r\nGame.prototype.step = function(){\r\n    this.moveObjects(this.ctx);\r\n    this.checkCollisions();\r\n}\r\n\r\nmodule.exports = Game;\n\n//# sourceURL=webpack:///./src/game.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("addEventListener(\"DOMContentLoaded\", () => {\r\n    const Game = __webpack_require__(/*! ./game.js */ \"./src/game.js\");\r\n    // const GameView = require(\"./game_view.js\");\r\n\r\n\r\n    \r\n    const canvasEl = document.getElementById('game-canvas');\r\n    canvasEl.width = 750;\r\n    canvasEl.height = 500;\r\n    let ctx = canvasEl.getContext('2d');\r\n\r\n    window.game = new Game(ctx);\r\n\r\n    setInterval(window.game.step.bind(game), 25);\r\n\r\n    // gameView = new GameView(game, ctx);\r\n    // gameView.start();\r\n\r\n})\r\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/missile.js":
/*!************************!*\
  !*** ./src/missile.js ***!
  \************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const MovingObject = __webpack_require__(/*! ./moving_object.js */ \"./src/moving_object.js\");\r\nconst Explosion = __webpack_require__(/*! ./explosion.js */ \"./src/explosion.js\");\r\n\r\nconst Util = __webpack_require__(/*! ./util.js */ \"./src/util.js\");\r\n\r\nconst Missile = function(options){\r\n\r\n    this.pos = options.pos;\r\n    this.type = \"enemy\";\r\n    this.radius = 5;\r\n    this.vel = Util.randomFallingVec(Math.random()*1.2+0.5);\r\n    this.color = \"#e0e0e0\";\r\n    this.game = options.game;\r\n    \r\n    \r\n}\r\nUtil.inherits(Missile, MovingObject);\r\n\r\nMissile.prototype.move = function (){\r\n    this.pos = [this.pos[0] + this.vel[0], this.pos[1] + this.vel[1]];\r\n}\r\n\r\nMissile.prototype.collideWith = function (object){\r\n    if(object.type === \"explosion\"){\r\n        this.destroy();\r\n    }\r\n};\r\n\r\nMissile.prototype.destroy = function(){\r\n    this.game.remove(this);\r\n    this.game.explosions.push(new Explosion({game: this.game, pos: this.pos}));\r\n}\r\n\r\n\r\n\r\n\r\nmodule.exports = Missile;\n\n//# sourceURL=webpack:///./src/missile.js?");

/***/ }),

/***/ "./src/moving_object.js":
/*!******************************!*\
  !*** ./src/moving_object.js ***!
  \******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Explosion = __webpack_require__(/*! ./explosion.js */ \"./src/explosion.js\");\r\n\r\nconst MovingObject = function (options){\r\n    this.pos = options.pos;\r\n    this.vel = options.vel;\r\n    this.radius = options.radius;\r\n    this.color = options.color;\r\n    this.game = options.game;\r\n}\r\n\r\nMovingObject.prototype.draw = function (ctx){\r\n    ctx.beginPath();\r\n    ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2*Math.PI);\r\n    ctx.stokeStyle = \"white\";\r\n    ctx.lineWidth = 2;\r\n    ctx.stroke();\r\n    ctx.fillStyle = this.color;\r\n    ctx.fill();\r\n}\r\n\r\nMovingObject.prototype.move = function (){\r\n    this.pos = [this.pos[0] + this.vel[0], this.pos[1] + this.vel[1]];\r\n}\r\n\r\nMovingObject.prototype.distanceFrom = function (pos){\r\n    dx = pos[0] - this.pos[0];\r\n    dy = pos[1] - this.pos[1];\r\n\r\n    return Math.sqrt(dx*dx + dy*dy);\r\n}\r\n\r\nMovingObject.prototype.isCollidedWith = function (otherObject){\r\n    minDistance = this.radius + otherObject.radius;\r\n\r\n    return (minDistance > this.distanceFrom(otherObject.pos))\r\n}\r\n\r\nMovingObject.prototype.collideWith = function (){};\r\n\r\nMovingObject.prototype.destroy = function (){this.game.remove(this)};\r\n\r\n\r\nmodule.exports = MovingObject;\n\n//# sourceURL=webpack:///./src/moving_object.js?");

/***/ }),

/***/ "./src/util.js":
/*!*********************!*\
  !*** ./src/util.js ***!
  \*********************/
/***/ ((module) => {

eval("const Util = {\r\n    inherits: function inherits(childClass, parentClass){\r\n        const Surrogate = function(){};\r\n\r\n        // surr = new Surrogate();\r\n        \r\n        Surrogate.prototype = parentClass.prototype;\r\n        childClass.prototype = new Surrogate();\r\n        childClass.prototype.constructor = childClass;\r\n    },\r\n    \r\n    // Return a randomly oriented vector with the given length.\r\n    randomFallingVec: function randomFallingVec(length) {\r\n        const deg = Math.PI * (1/4)+ Math.PI * 0.5 * Math.random();\r\n        return Util.scale([Math.cos(deg), Math.sin(deg)], length);\r\n    },\r\n\r\n    // Scale the length of a vector by the given amount.\r\n    scale: function scale(vec, m) {\r\n        return [vec[0] * m, vec[1] * m];\r\n    }\r\n    \r\n  };\r\n\r\n  \r\n  module.exports = Util;\n\n//# sourceURL=webpack:///./src/util.js?");

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
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;