const Util = {
    inherits: function inherits(childClass, parentClass){
        const Surrogate = function(){};

        // surr = new Surrogate();
        
        Surrogate.prototype = parentClass.prototype;
        childClass.prototype = new Surrogate();
        childClass.prototype.constructor = childClass;
    },
    
    // Return a randomly oriented vector with the given length.
    randomFallingVec: function randomFallingVec(length) {
        const deg = Math.PI * (1/4)+ Math.PI * 0.5 * Math.random();
        return Util.scale([Math.cos(deg), Math.sin(deg)], length);
    },

    // Scale the length of a vector by the given amount.
    scale: function scale(vec, m) {
        return [vec[0] * m, vec[1] * m];
    }
    
  };

  
  module.exports = Util;