var should = require('should')
var only = require('./index')

describe('The only() function', function () {
  
  var whitelist = {
    a: null,
    b: null,
    c: {
      x: null,
      y: null,
      z: null
    }
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

  it('should return an object with only the whitelisted keys', function () {
    var result = only(whitelist, obj)
    result.should.have.property('a')
    result.should.have.property('b')
    result.should.have.property('c')
    result.should.not.have.property('d')
  })

  it('should support whitelisting nested objects', function () {
    var result = only(whitelist, obj)
    result.c.should.have.property('x')
    result.c.should.have.property('y')
    result.c.should.have.property('z')
    result.c.should.not.have.property('w')
  })

  it('should return the right value for the whitelisted key', function () {
    var result = only(whitelist, obj)
    result.a.should.equal(obj.a)  
    result.b.should.equal(obj.b)  
    result.c.x.should.equal(obj.c.x)  
    result.c.y.should.equal(obj.c.y)  
    result.c.z.should.equal(obj.c.z)  
  })

})
