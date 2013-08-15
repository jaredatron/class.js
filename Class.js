var Class = {
  new: function(definition){
    return Class.prototype.subclass(definition);
  }
};

Class.Object = {

  instantiate: function(extension){
    return Object.create(this).extend(extension);
  },

  extend: function(){
    var i, p, mixin;
    for (var i = 0; i < arguments.length; i++) {
      mixin = arguments[i];
      if (typeof mixin === 'function')
        mixin.call(this, this.class || this, this);
      else
        for (p in mixin) this[p] = mixin[p];
    };
    return this;
  }

};

Class.prototype = Class.Object.instantiate({

  new: function() {
    var instance = this.prototype.instantiate();
    if (typeof instance.initialize === 'function'){
      instance.initialize.apply(instance, arguments);
    }
    return instance;
  },

  subclass: function(definition) {
    var _class = this.instantiate();
    _class.superclass = this;
    _class.prototype = this.prototype.instantiate(definition);
    _class.prototype.class = _class;
    return _class;
  },

  prototype: Class.Object.instantiate()

});

if (typeof module !== 'undefined') module.exports = Class;
