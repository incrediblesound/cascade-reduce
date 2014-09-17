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

exports.cascadeNoNest = function(iterator){

  var chain = function(array, item){
    var tunnel = function(array, item, index){
      index = index || 0;
      item = array[index](item);
      index += 1;
      if(array.length === index){
        return item;
      } else {
        return tunnel(array, item, index);
      }
    }
    if(Array.isArray(array)){
      return tunnel(array, item);
    } else {
      return array(item);
    }
  }

  var identity = function(el){
    return el;
  }

  return function(collection, accumulator){
    var iterators = Array.prototype.slice.call(arguments, 2);
    if(iterators.length === 0){
      iterators = identity;
    }
    if(accumulator === null || accumulator === undefined){
      accumulator = collection[0]
    } 
    var _l = collection.length;
    for(var i = 0; i < _l; i++){
      accumulator = iterator(accumulator, chain(iterators, collection[i]))
    }
    return accumulator;
  }

}