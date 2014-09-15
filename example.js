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

console.log( totalArray([1,2,3,4]) );
console.log( totalArray([1,2,3,4], 0, timesOneHundred) )
console.log( totalArray([1,2,3,4], 0, timesOneHundred(onlyEven)) )
console.log( totalArray([1,2,3,4], 0, onlyEven(timesOneHundred(timesTwo))) )