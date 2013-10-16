var er = function (m) {throw new Error(m)},
    ok = function (x) {if (!x) throw new Error(x + ' is not ok'); return 1;},
    eq = function (x, y) {if (x !== y) er(x + ' not equal ' + y); return 1;},
    mc = function(ox, oy) {for (var i in ox) {if (!eq(ox[i], oy[i])) er(ox[i] + ' not match ' + oy[i])}}
    s = function (x) {eq(Object.prototype.toString.call(x), '[object String]')},
    f = function (x) {eq(Object.prototype.toString.call(x), '[object Function]')},
    a = function (x) {eq(Object.prototype.toString.call(x), '[object Array]')},
    b = function (x) {eq(Object.prototype.toString.call(x), '[object Boolean]')},
    o = function (x) {eq(Object.prototype.toString.call(x), '[object Object]')};

var Paramer = require('../lib/paramer')

var test = new Paramer;
f(test.set)
f(test.del)
f(test.build)
f(test.clean)
f(test.toPairs)
f(Paramer.parse)
f(Paramer.stringify)

ok(test.set('limit', 10))
ok(test.set('sort', 'id'))

mc(test.toPairs(), ['limit=10', 'sort=id'])
eq(test.build(), 'limit=10&sort=id')
ok(test.clean())
eq(test.build(), '')

eq(Paramer.stringify({limit: 6, sort: 'uid'}), 'limit=6&sort=uid')
mc(Paramer.parse('limit=3&sort=id'), {limit: '3', sort: 'id'})

eq(Paramer.stringify({
  sex: 'male',
  name: {
    first: 'Shallker',
    last: 'Wang'
  }
}), 'sex=male&name[first]=Shallker&name[last]=Wang')

eq(Paramer.stringify({
  son: {
    Jack: {
      name: {
        first: 'Jack',
        last: 'Wang'
      }
    }
  }
}), 'son[Jack][name][first]=Jack&son[Jack][name][last]=Wang')

eq(Paramer.stringify({
  id: ['1', '2', '3']
}), 'id=1&id=2&id=3')

console.log('test done')
