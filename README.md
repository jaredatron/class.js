class.js
========

A super simple ruby like class system with class and instance inheritance.


## Examples


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
