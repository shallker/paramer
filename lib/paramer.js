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

  this.toArray = function() {
    var array = [];

    for (var i in params) {
      array.push(i + '=' + params[i]);
    }

    return array;
  }

  /*
    Build params as a search string
  */
  this.build = function () {
    var string = this.toArray().join('&');
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
