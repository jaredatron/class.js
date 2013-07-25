class.js
========

A super simple ruby like class system with class property and instance property inheritance.

## Class.js does not use constructors

```javascript
var Animal = Class.new()
new Animal //=> TypeError: object is not a function
```

The reason `Animal` is not a Function is because functions cannot delegate their properties to another Function.


## Examples

```javascript
var Animal = Class.new({
  initialize: function(){
    this.birthdate = new Date;
  }
});

var Mammal = Animal.subclass(function(){

  this.initialize = function(name){
    this.name = name
    this.super('initialize').apply(this);
  };

});

var Dog    = Mammal.subclass();

var Cat    = Mammal.subclass();

var sparky = Dog.new('sparky');

var mitten = Cat.new('mitten');
```

## Tests

```bash
npm install mocha
npm install expect.js
mocha -R list
```
