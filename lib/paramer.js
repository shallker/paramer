var toString = Object.prototype.toString;

function Paramer(params) {
  var params = params || {};

  /*
    Add a key-value pair to params
    @arguments String name, String value
  */
  this.set = function (name, value) {
    params[name] = value;
    return this;
  }

  /*
    Delete a param from params
    @arguments String name
  */
  this.del = function (name) {
    delete params[name];
    return this;
  }

  function objectToPairs(top, object) {
    var pairs = [];

    for (var key in object) {
      var value = object[key];

      if (toString.call(value) === '[object String]') {
        pairs.push(top + '[' + key + ']' + '=' + value);
        continue;
      }

      if (toString.call(value) === '[object Number]') {
        pairs.push(top + '[' + key + ']' + '=' + value);
        continue;
      }

      if (toString.call(value) === '[object Object]') {
        pairs = pairs.concat(objectToPairs(top + '[' + key + ']', value));
      }
    }

    return pairs;
  }

  function arrayToPairs(name, array) {
    var pairs = [];

    for (var i in array) {
      if (typeof array[i] !== 'object') pairs.push(name + '=' + array[i]);
    }

    return pairs;
  }

  /*
    {sex: 'male', name: {first: 'Shallker', last: 'Wang'}}
    to
    ['sex=male', 'name[first]=Shallker', 'name[last]=Wang']

    {hobbies: ['book', 'music', 'movie']}
    to
    ['hobbies=book', 'hobbies=music', 'hobbies=movie']
  */
  this.toPairs = function() {
    var pairs = [];

    for (var key in params) {
      var value = params[key];
      if (toString.call(value) === '[object Object]') pairs = pairs.concat(objectToPairs(key, value));
      if (toString.call(value) === '[object String]') pairs.push(key + '=' + value);
      if (toString.call(value) === '[object Number]') pairs.push(key + '=' + value);
    }

    return pairs;
  }

  /*
    Build params as a search string
  */
  this.build = function () {
    var string = this.toPairs().join('&');
    return string;
  }

  this.clean = function () {
    params = {};
    return this;
  }
}

/*
  Parse a params string into a params object
  @arguments String params
*/
Paramer.parse = function (params) {
  var params = params.split('&');
  var result = {};

  for (var i in params) {
    var array = params[i].split('=');
    result[array.shift()] = array.shift();
  }

  return result;
}

/*
  Stringify a params object to a params string
  @arguments Object params
*/
Paramer.stringify = function (params) {
  var paramer = new Paramer(params);
  return paramer.build();
}

module.exports = Paramer;
