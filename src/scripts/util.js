const Util = {
    inherits: function inherits(childClass, parentClass){
        const Surrogate = function(){};        
        Surrogate.prototype = parentClass.prototype;
        childClass.prototype = new Surrogate();
        childClass.prototype.constructor = childClass;
    },
    
    spawn: function spawn(type){
        type = type || "enemy";
        
        if (type === "enemy"){
            return [Math.floor(Math.random()*771-10), Math.floor(Math.random()*-50-10)]
        }
    },

    roundedRect: function(ctx, x, y, width, height, radius) {
        ctx.beginPath();
        ctx.moveTo(x, y + radius);
        ctx.lineTo(x, y + height - radius);
        ctx.arcTo(x, y + height, x + radius, y + height, radius);
        ctx.lineTo(x + width - radius, y + height);
        ctx.arcTo(x + width, y + height, x + width, y + height-radius, radius);
        ctx.lineTo(x + width, y + radius);
        ctx.arcTo(x + width, y, x + width - radius, y, radius);
        ctx.lineTo(x + radius, y);
        ctx.arcTo(x, y, x, y + radius, radius);
        ctx.fill();
    },

    angleTo: function(startPoint, endPoint, speed){
        speed = speed || 1;
        let targetPos = endPoint.pos || endPoint;
        let startPos = startPoint.pos || startPoint;
        let diffs = [targetPos[0] - startPos[0], targetPos[1] - startPos[1]];
        let angle = [Math.atan(diffs[1]/diffs[0])];
        let dirFix = diffs[0] < 0 ? -(speed) : speed;
        let vel = [dirFix * Math.cos(angle), dirFix * Math.sin(angle)];

        return vel;
    },

    chooseTarget: function(game){
        let friendlies = game.friendlyObjects().filter(object => object.destroyed === false);
        let targetPos;
        try{
            targetPos = friendlies[Math.floor(Math.random()*friendlies.length)].pos;
        } catch {
            targetPos = [375, 400];
        }

        return targetPos;
    }
    
  };

  
  module.exports = Util;