Class = require('../class.js').Class

MATCHERS = {
  toBeType: function(expected){
    return typeof this.actual === expected
  },

  toBeA: function(expected) {
    function constructor(){}
    constructor.prototype = typeof expected === 'function' ?
      expected.prototype : expected;
    // constructor.prototype = expected.prototype ?
    //   expected.prototype : expected;
    return this.actual instanceof constructor;
  },

  toBeAnInstanceOf: function(expected) {
    return this.actual.isA(expected);
  },

  toBeASubclassOf: function(expected) {
    return this.toBeA(expected);
  }
};

beforeEach(function() {
  this.addMatchers(MATCHERS);
});

describe("Class", function(){

  it("should be an object", function(){
    expect(Class).toBeType('object');
  });

  describe(".new", function(){
    it("should be a function", function(){
      expect(Class.new).toBeType('function');
    });

    it("should subclass Class.prototype", function(){
      expect(Class.new()).toBeA(Class.prototype);
    });

  });

  // describe(".extend", function(){

  //   it("should be a function", function(){
  //     expect(Class.extend).toBeA('function');
  //   });

  // });


});

describe("inheritance", function() {

  it("should work", function(){

    var Animal = Class.new();
    var Mammal = Animal.subclass();
    var Dog    = Mammal.subclass();
    var Cat    = Mammal.subclass();
    var sparky = Dog.new();
    var mitten = Cat.new();

    Animal.animal_class_attribute = 1;
    Animal.prototype.animal_instance_attribute = 2;
    Mammal.mammal_class_attribute = 3;
    Mammal.prototype.mammal_instance_attribute = 4;
    Dog.dog_class_attribute = 5;
    Dog.prototype.dog_instance_attribute = 6;
    Cat.cat_class_attribute = 7;
    Cat.prototype.cat_instance_attribute = 8;

    expect(Animal).toBeAnInstanceOf(Class);
    expect(Animal).not.toBeASubclassOf(Class);
    expect(Animal).not.toBeASubclassOf(Animal);
    expect(Animal).not.toBeASubclassOf(Mammal);
    expect(Animal).not.toBeASubclassOf(Dog);
    expect(Animal).not.toBeASubclassOf(Cat);

    expect(Mammal).toBeAnInstanceOf(Class);
    expect(Mammal).not.toBeASubclassOf(Class);
    expect(Mammal).toBeASubclassOf(Animal);
    expect(Mammal).not.toBeASubclassOf(Mammal);
    expect(Mammal).not.toBeASubclassOf(Dog);
    expect(Mammal).not.toBeASubclassOf(Cat);

    expect(Dog).toBeAnInstanceOf(Class);
    expect(Dog).not.toBeASubclassOf(Class);
    expect(Dog).toBeASubclassOf(Animal);
    expect(Dog).toBeASubclassOf(Mammal);
    expect(Dog).not.toBeASubclassOf(Dog);
    expect(Dog).not.toBeASubclassOf(Cat);

    expect(Cat).toBeAnInstanceOf(Class);
    expect(Cat).not.toBeASubclassOf(Class);
    expect(Cat).toBeASubclassOf(Animal);
    expect(Cat).toBeASubclassOf(Mammal);
    expect(Cat).not.toBeASubclassOf(Dog);
    expect(Cat).not.toBeASubclassOf(Cat);


    expect(sparky).toBeAnInstanceOf(Animal);
    expect(sparky).toBeAnInstanceOf(Mammal);
    expect(sparky).toBeAnInstanceOf(Dog);
    expect(sparky).not.toBeAnInstanceOf(Cat);

    expect(mitten).toBeAnInstanceOf(Animal);
    expect(mitten).toBeAnInstanceOf(Mammal);
    expect(mitten).not.toBeAnInstanceOf(Dog);
    expect(mitten).toBeAnInstanceOf(Cat);



    expect( Cat.animal_class_attribute    ).toBe(1)
    expect( Cat.animal_instance_attribute ).toBe(undefined)
    expect( Cat.mammal_class_attribute    ).toBe(3)
    expect( Cat.mammal_instance_attribute ).toBe(undefined)
    expect( Cat.dog_class_attribute       ).toBe(undefined)
    expect( Cat.dog_instance_attribute    ).toBe(undefined)
    expect( Cat.cat_class_attribute       ).toBe(7)
    expect( Cat.cat_instance_attribute    ).toBe(undefined)

    expect( Dog.animal_class_attribute    ).toBe(1)
    expect( Dog.animal_instance_attribute ).toBe(undefined)
    expect( Dog.mammal_class_attribute    ).toBe(3)
    expect( Dog.mammal_instance_attribute ).toBe(undefined)
    expect( Dog.dog_class_attribute       ).toBe(5)
    expect( Dog.dog_instance_attribute    ).toBe(undefined)
    expect( Dog.cat_class_attribute       ).toBe(undefined)
    expect( Dog.cat_instance_attribute    ).toBe(undefined)

    expect( sparky.animal_class_attribute    ).toBe(undefined)
    expect( sparky.animal_instance_attribute ).toBe(2)
    expect( sparky.mammal_class_attribute    ).toBe(undefined)
    expect( sparky.mammal_instance_attribute ).toBe(4)
    expect( sparky.dog_class_attribute       ).toBe(undefined)
    expect( sparky.dog_instance_attribute    ).toBe(6)
    expect( sparky.cat_class_attribute       ).toBe(undefined)
    expect( sparky.cat_instance_attribute    ).toBe(undefined)

    expect( mitten.animal_class_attribute    ).toBe(undefined)
    expect( mitten.animal_instance_attribute ).toBe(2)
    expect( mitten.mammal_class_attribute    ).toBe(undefined)
    expect( mitten.mammal_instance_attribute ).toBe(4)
    expect( mitten.dog_class_attribute       ).toBe(undefined)
    expect( mitten.dog_instance_attribute    ).toBe(undefined)
    expect( mitten.cat_class_attribute       ).toBe(undefined)
    expect( mitten.cat_instance_attribute    ).toBe(8)

  })
});


describe("super", function(){

  it("shoudl work", function() {

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


    expect( H.new().open() ).toBe('open2 open3 open2 open1 open2 open1 open2 open1 ');

  });

});
