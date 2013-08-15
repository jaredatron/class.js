class.js
========

A super small ruby-ish class system with both class and class instance  inheritance.

## Example usage:

```javascript

var Animal = Class.new(function(){

  this.class.find = function(id, callback){
    // $.getJSON('/animals/'+id, this.new.bind(this));
  };

  this.initialize = function(attributes){
    this.birthday = new Date;
    this.extend(attributes);
  };

});

var Mammal = Animal.subclass({
  warmBlooded: true
});

var HasLegs = {
  walk: function(feet, direction){
    console.log(this.name, 'is walking', feet, 'feet toward', direction);
  }
};

var Biped = Mammal.subclass(function(){
  this.numberOfLegs = 2;
  this.extend(HasLegs);
});

var Quadruped = Mammal.subclass({
  numberOfLegs: 4,
});

Quadruped.include(HasLegs);

var Dingo = Biped.subclass();

var Dog = Quadruped.subclass();

var jumpy = Dingo.new({name:'Jumpy'});
jumpy.walk(10,'north');

var sparky = Dog.find(12);

```

## Class.js does not use constructors

```javascript
new Animal //=> TypeError: object is not a function
```

The reason `Animal` is not a `Function` is because functions cannot be created with a prototype other than `Function.prototype`.


## Extend

Both the `Class` and `Class#prototype` objects have an extend function that supports plain objects as well as functions

```javascript
var Kitten = Class.new();

Kitten.extend({
  defaultFurColor: 'orange'
});

Kitten.defaultFurColor; //= 'orange'

Kitten.extend(function(){
  this.brown = true;
});

Kitten.defaultFurColor; //= 'brown'

Kitten.prototype.extend({
  age: 1
});

Kitten.new().age; //= 1

Kitten.prototype.extend(function(){
  this.age = 12;
});

Kitten.new().age; //= 12
```
## subclass

When you call `Animal.subclass()` it returns a new object that points to `Animal`. The new object's prototype property is also a new object that points to `Animal.prototype`.

## Tests

```bash
npm install mocha
npm install expect.js
mocha -R spec
```
