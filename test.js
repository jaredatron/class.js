load("class.js")
load("vendor/expect.js")

describe.depth = 0;
function describe(description, definition) {
  spaces = []; spaces.length = describe.depth*4; spaces = spaces.join(' ');
  print(spaces+description);
  describe.depth++;
  definition();
  describe.depth--;
};

it = context = describe;



expect.Assertion.prototype.aSubclassOf = function(superclass){
  function constructor() {};
  constructor.prototype = superclass;
  this.assert(
    this.obj instanceof constructor,
    function(){ return 'expected ' + expect.i(this.obj) + ' to be a subclass of ' + expect.i(superclass) },
    function(){ return 'expected ' + expect.i(this.obj) + ' to not be a subclass of ' + expect.i(superclass) }
  );
  return this;
}



expect.Assertion.prototype.anInstanceOf = function(_class){
  function constructor() {};
  constructor.prototype = _class.prototype;
  this.assert(
    this.obj instanceof constructor,
    function(){ return 'expected ' + expect.i(this.obj) + ' to be an instance of ' + expect.i(_class) },
    function(){ return 'expected ' + expect.i(this.obj) + ' to not be an instance of ' + expect.i(_class) }
  );
  return this;
}






describe("Class", function(){

  it("should be an object", function(){
    expect(this.Class).to.be.an('object');
  });

  describe(".new", function(){
    it("should be a function", function(){
      expect(Class.new).to.be.a('function');
    });

    it("should subclass Class.prototype", function(){
      expect(Class.new()).to.be.a(Class);
    });

  });

  // describe(".extend", function(){

  //   it("should be a function", function(){
  //     expect(Class.extend).to.be.a('function');
  //   });

  // });


});

describe("inheritance", function() {

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

  expect(Animal).to.be.anInstanceOf(Class);
  expect(Animal).not.to.be.aSubclassOf(Class);
  expect(Animal).not.to.be.aSubclassOf(Animal);
  expect(Animal).not.to.be.aSubclassOf(Mammal);
  expect(Animal).not.to.be.aSubclassOf(Dog);
  expect(Animal).not.to.be.aSubclassOf(Cat);

  expect(Mammal).to.be.anInstanceOf(Class);
  expect(Mammal).not.to.be.aSubclassOf(Class);
  expect(Mammal).to.be.aSubclassOf(Animal);
  expect(Mammal).not.to.be.aSubclassOf(Mammal);
  expect(Mammal).not.to.be.aSubclassOf(Dog);
  expect(Mammal).not.to.be.aSubclassOf(Cat);

  expect(Dog).to.be.anInstanceOf(Class);
  expect(Dog).not.to.be.aSubclassOf(Class);
  expect(Dog).to.be.aSubclassOf(Animal);
  expect(Dog).to.be.aSubclassOf(Mammal);
  expect(Dog).not.to.be.aSubclassOf(Dog);
  expect(Dog).not.to.be.aSubclassOf(Cat);

  expect(Cat).to.be.anInstanceOf(Class);
  expect(Cat).not.to.be.aSubclassOf(Class);
  expect(Cat).to.be.aSubclassOf(Animal);
  expect(Cat).to.be.aSubclassOf(Mammal);
  expect(Cat).not.to.be.aSubclassOf(Dog);
  expect(Cat).not.to.be.aSubclassOf(Cat);


  expect(sparky).to.be.anInstanceOf(Animal);
  expect(sparky).to.be.anInstanceOf(Mammal);
  expect(sparky).to.be.anInstanceOf(Dog);
  expect(sparky).not.to.be.anInstanceOf(Cat);

  expect(mitten).to.be.anInstanceOf(Animal);
  expect(mitten).to.be.anInstanceOf(Mammal);
  expect(mitten).not.to.be.anInstanceOf(Dog);
  expect(mitten).to.be.anInstanceOf(Cat);



  expect( Cat.animal_class_attribute    ).to.be(1)
  expect( Cat.animal_instance_attribute ).to.be(undefined)
  expect( Cat.mammal_class_attribute    ).to.be(3)
  expect( Cat.mammal_instance_attribute ).to.be(undefined)
  expect( Cat.dog_class_attribute       ).to.be(undefined)
  expect( Cat.dog_instance_attribute    ).to.be(undefined)
  expect( Cat.cat_class_attribute       ).to.be(7)
  expect( Cat.cat_instance_attribute    ).to.be(undefined)

  expect( Dog.animal_class_attribute    ).to.be(1)
  expect( Dog.animal_instance_attribute ).to.be(undefined)
  expect( Dog.mammal_class_attribute    ).to.be(3)
  expect( Dog.mammal_instance_attribute ).to.be(undefined)
  expect( Dog.dog_class_attribute       ).to.be(5)
  expect( Dog.dog_instance_attribute    ).to.be(undefined)
  expect( Dog.cat_class_attribute       ).to.be(undefined)
  expect( Dog.cat_instance_attribute    ).to.be(undefined)

  expect( sparky.animal_class_attribute    ).to.be(undefined)
  expect( sparky.animal_instance_attribute ).to.be(2)
  expect( sparky.mammal_class_attribute    ).to.be(undefined)
  expect( sparky.mammal_instance_attribute ).to.be(4)
  expect( sparky.dog_class_attribute       ).to.be(undefined)
  expect( sparky.dog_instance_attribute    ).to.be(6)
  expect( sparky.cat_class_attribute       ).to.be(undefined)
  expect( sparky.cat_instance_attribute    ).to.be(undefined)

  expect( mitten.animal_class_attribute    ).to.be(undefined)
  expect( mitten.animal_instance_attribute ).to.be(2)
  expect( mitten.mammal_class_attribute    ).to.be(undefined)
  expect( mitten.mammal_instance_attribute ).to.be(4)
  expect( mitten.dog_class_attribute       ).to.be(undefined)
  expect( mitten.dog_instance_attribute    ).to.be(undefined)
  expect( mitten.cat_class_attribute       ).to.be(undefined)
  expect( mitten.cat_instance_attribute    ).to.be(8)


});