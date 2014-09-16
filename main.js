var each = function(array, cb){
  var _l = array.length;
  for(var i = 0; i < _l; i++){
    cb(array[i], i);
  }
}

exports.cascadeReduce = function(iterator){
  return function(collection, accumulator, next){
    if(accumulator === undefined || accumulator === null){
      accumulator = collection[0];
    }
    if(typeof next === 'function'){
      each(collection, function(item){
        accumulator = iterator(accumulator, next(item));  
      })
    } else {
      each(collection, function(item){
        accumulator = iterator(accumulator, item);  
      })
    }
    return accumulator;
  }
}

exports.cascadeIterator = function(iterator){
  return function(child){
    if(typeof child === 'function'){
      return function(element){
        return child(iterator(element))
      }
    } else {
      return iterator(child)
    }  
  }
}