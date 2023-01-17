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

  describe('mapped types', () => {
    it('should filter values with mapped types', () => {
      const mappedObject = {
        [Symbol.for('key')]: { one: null, two: null, },
        knownKey: { something: null, otherThing: null, }
      }

      const val = {
        a: { one: 1, two: 2 },
        b: { one: 3, two: 4, three: 5 },
        c: { four: 4, five: 5 },
        knownKey: {
          something: true,
          otherThing: false,
          invalidThing: 1000
        },
        unknownKey: 'some value'
      }

      const result = only(mappedObject, val);

      result.should.have.property('a');
      result.a.should.have.property('one', 1)
      result.a.should.have.property('two', 2)

      result.should.have.property('b');
      result.b.should.have.property('one', 3)
      result.b.should.have.property('two', 4)
      result.b.should.not.have.property('three')

      result.should.not.have.property('c');

      result.should.have.property('knownKey')
      result.knownKey.should.have.property('something', true)
      result.knownKey.should.have.property('otherThing', false)
      result.knownKey.should.not.have.property('invalidThing')

      result.should.not.have.property('unkownKey')
    })

    it('should filter values for mapped arrays', () => {
      const mappedArray = {
        [Symbol.for('key')]: [{ one: null, two: null, }],
        knownKey: { something: null, otherThing: null, }
      }

      const val = {
        a: [
          { one: 1, two: 2 },
          { one: 3, two: 4, three: 5 }
        ],
        c: { four: 4, five: 5 },
        knownKey: {
          something: true,
          otherThing: false,
          invalidThing: 1000
        },
        unknownKey: 'some value'
      }

      const result = only(mappedArray, val)

      result.should.have.property('a')
      result.a.should.have.lengthOf(2)
      result.a[0].should.have.property('one', 1)
      result.a[0].should.have.property('two', 2)
      result.a[1].should.have.property('one', 3)
      result.a[1].should.have.property('two', 4)
      result.a[1].should.not.have.property('three')

      result.should.not.have.property('c')

      result.should.have.property('knownKey')
      result.knownKey.should.have.property('something', true)
      result.knownKey.should.have.property('otherThing', false)
      result.knownKey.should.not.have.property('invalidThing')

      result.should.not.have.property('unkownKey')
    })

    it('should accept arbitrary values for mapped type with unspecified value', () => {
      const mappedAny = {
        [Symbol.for('key')]: null,
        knownKey: { something: null, otherThing: null, }
      }

      const val = {
        a: { one: 1, two: 2 },
        b: [{ one: 3, two: 4, three: 5 }],
        c: { four: 4, five: 5 },
        knownKey: {
          something: true,
          otherThing: false,
          invalidThing: 1000
        },
        unknownKey: 'some value'
      }

      const result = only(mappedAny, val)

      result.should.have.property('a');
      result.a.should.have.property('one', 1)
      result.a.should.have.property('two', 2)

      result.should.have.property('b');
      result.b.should.have.lengthOf(1);
      result.b[0].should.have.property('one', 3)
      result.b[0].should.have.property('two', 4)
      result.b[0].should.have.property('three', 5)

      result.should.have.property('c');
      result.c.should.have.property('four', 4)
      result.c.should.have.property('five', 5)

      result.should.have.property('knownKey')
      result.knownKey.should.have.property('something', true)
      result.knownKey.should.have.property('otherThing', false)
      result.knownKey.should.not.have.property('invalidThing')

      result.should.have.property('unknownKey', 'some value')
    })
  })

  it('should include null values in arrays', function() {
    var whitelist = {a: [{x: null}]}
    var obj = {a: [{x: 'something'}, null]}
    var result = only(whitelist, obj)
    result.a[0].should.have.property('x', 'something')
    should(result.a[1]).equal(null)
  });
})
