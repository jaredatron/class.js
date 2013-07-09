Class = {
  instantiate: function(){
    function Object(){};
    Object.prototype = this;
    var child = new Object;
    child.super = this;
    return child;
  },

  extend: function(){
    var i, p, mixin;
    for (i = arguments.length - 1; i >= 0; i--) {
      mixin = arguments[i];
      if (typeof mixin === 'function')
        mixin.call(this, this.class || this, this);
      else
        for (p in mixin) this[p] = mixin[p];
    };
    return this;
  },

  isA: function(_class){
    function superclass() {};
    superclass.prototype = _class.prototype;
    return this instanceof superclass;
  },

  new: function() {
    var instance = this.prototype.instantiate();
    if ('initialize' in instance){
      instance.initialize.apply(instance, arguments);
    }
    return instance;
  },

  subclass: function(definition) {
    var _class = this.instantiate();
    _class.prototype = this.prototype.instantiate();
    _class.prototype.class = _class;
    _class.prototype.extend(definition);
    return _class;
  }
};

!function(){

  var object = {
    instantiate: Class.instantiate,
    extend: Class.extend,
    isA: Class.isA,
  };

  var class_object = object.instantiate();
  class_object.new = Class.new;
  class_object.subclass = Class.subclass;

  Class = class_object.instantiate();
  Class.prototype = class_object.instantiate();
  Class.prototype.prototype = object.instantiate();

}();

Class.new = function(definition){
  return Class.prototype.subclass(definition);
};

