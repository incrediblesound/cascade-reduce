Cascade Reduce
==============

Cascade Reduce allows you to pass any number of iterators into a reduce function such that each iterator will be invoked with each item in the collection in a chain. There are two functions in this library: cascadeReduce and cascadeIterator.

cascadeReduce
-------------

```javascript
cascadeReduce = function(iterator){
	return function(collection, accumulator, iterator_chain){...};
}
```
cascadeReduce is a function that takes an iterator and returns a function that takes a collection, an accumulator, and a nested chain of iterators.

cascadeIterator
---------------
```javascript
cascadeIterator = function(iterator){
	return function(item_or_iterator){...}
}
```
cascadeIterator takes an iterator function and returns a function that can take either another cascadeIterator or an element as its sole argument. Each element from reduce will pass through the iterators, starting with the outermost iterator, and will finally be passed into the iterator that was passed into cascadeReduce.

Use
---
```javascript
var reduce = require('./main.js').cascadeReduce;
var iterator = require('./main.js').cascadeIterator;

var totalArray = reduce(function(acc, item){
	return (acc + item);
})

var onlyEven = iterator(function(item){
	var modTwo = item % 2;
	return (modTwo > 0) ? 0 : item;
})

var timesOneHundred = iterator(function(item){
	return (item * 100)
})

var timesTwo = iterator(function(item){
	return (item * 2)
})

totalArray([1,2,3,4]) //=> 11
totalArray([1,2,3,4], 0, onlyEven) //=> 4
totalArray([1,2,3,4], 0, onlyEven(timesOneHundred)) //=> 400
totalArray([1,2,3,4], 0, onlyEven(timesOneHundred(timesTwo))) //=> 1200

```