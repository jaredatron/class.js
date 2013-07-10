Class = {
  instantiate: function(){
    function Object(){};
    Object.prototype = this;
    var child = new Object;
    child.__proto = this;
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
  },

  super: function(property, args) {
    var stack, proto, nil = new Object, value = nil, return_value;

    // store the stack of objects we've supered through
    if (!this.hasOwnProperty('__super')){ this.__super = {}; }
    this.__super[property] || (this.__super[property] = []);
    stack = this.__super[property];

    proto = stack[0] || this;

    // find the first owner of the given property
    while (proto){
      if (proto.hasOwnProperty(property)) break;
      proto = proto.__proto;
    }

    if (!proto) throw new Error('super not found for '+property);

    proto = proto.__proto;

    // find the next owner and return that value
    while (proto){
      if (proto.hasOwnProperty(property)){
        stack.unshift(proto);
        value = proto[property];
        break;
      }
      proto = proto.__proto;
    }

    if (value === nil) throw new Error('super not found for '+property);

    return_value = value.apply(this, args);

    stack.shift();

    return return_value;
  }
};

!function(){

  var object = {
    instantiate: Class.instantiate,
    extend: Class.extend,
    isA: Class.isA,
    super: Class.super,
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





  var A = Class.new( {classname:'A'});
  var B = A.subclass({classname:'B'});
  var C = B.subclass({classname:'C'});
  var D = C.subclass({classname:'D'});
  var E = D.subclass({classname:'E'});
  var F = E.subclass({classname:'F'});
  var G = F.subclass({classname:'G'});
  var H = G.subclass({classname:'H'});

  function open1() {
    return 'open1 ';
  }
  function open2() {
    return 'open2 ' + this.super('open', arguments);
  }
  function open3() {
    return 'open3 ' + this.super('open', arguments) + this.super('open', arguments) + this.super('open', arguments);
  }

  A.prototype.open = open1;
  C.prototype.open = open2;
  E.prototype.open = open3;
  G.prototype.open = open2;
