
# paramer

  A params helper


## Installation

  Install with [component(1)](http://component.io):

    $ component install shallker/paramer


## API
#### Paramer.parse(String params)
#### Paramer.stringify(Object params)

#### paramer.set(String key, String value)
#### paramer.del(String key)
#### paramer.toArray()
#### paramer.build()
#### paramer.clean()


## Test
```javascript
var test = new Paramer;
f(test.set)
f(test.del)
f(test.build)
f(test.clean)
f(test.toArray)
f(Paramer.parse)
f(Paramer.stringify)

ok(test.set('limit', 10))
ok(test.set('sort', 'id'))
mc(test.toArray(), ['limit=10', 'sort=id'])
eq(test.build(), 'limit=10&sort=id')
ok(test.clean())
eq(test.build(), '')

eq(Paramer.stringify({limit: 6, sort: 'uid'}), 'limit=6&sort=uid')
mc(Paramer.parse('limit=3&sort=id'), {limit: '3', sort: 'id'})
```


## License

  MIT
