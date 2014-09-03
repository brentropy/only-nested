var should = require('should')
var only = require('./index')

describe('The only() function', function () {
  
  var testDefault = {}

  var whitelist = {
    a: only._,
    b: null,
    c: {
      x: null,
      y: null,
      z: null
    },
    u: only._,
    v: testDefault
  }

  var obj = {
    a: 1, 
    b: 2,
    c: {
      w: 1, 
      x: 2,
      y: 3,
      z: 4
    },
    d: 4
  }

  var result = only(whitelist, obj)

  it('should return an object with only the whitelisted keys', function () {
    result.should.have.property('a')
    result.should.have.property('b')
    result.should.have.property('c')
    result.should.not.have.property('d')
  })

  it('should support whitelisting nested objects', function () {
    result.c.should.have.property('x')
    result.c.should.have.property('y')
    result.c.should.have.property('z')
    result.c.should.not.have.property('w')
  })

  it('should return the right value for the whitelisted key', function () {
    result.a.should.equal(obj.a)  
    result.b.should.equal(obj.b)  
    result.c.x.should.equal(obj.c.x)  
    result.c.y.should.equal(obj.c.y)  
    result.c.z.should.equal(obj.c.z)  
  })

  it('should exclude whitelist keys with no default', function () {
    result.should.not.have.property('u')
  })

  it('should allow for nested arrays of objects', function () {
    var whitelist = {a: [{x: null}]}
    var obj = {a: [{x: 1, y: 2}, {x: 1, y: 3}]}
    var result = only(whitelist, obj)
    result.a.should.have.lengthOf(obj.a.length)
    result.a.forEach(function (item) {
      item.should.have.property('x', 1)
      item.should.not.have.property('y')
      item.should.not.have.property('z')
    })
  })

  it('should include null values from source object', function() {
    var whitelist = {a: null}
    var obj = {a: null}
    var result = only(whitelist, obj)
    result.should.have.property('a', null)
  })

})
