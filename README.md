# only-nested

[![npm](http://img.shields.io/npm/v/only-nested.svg?style=flat)](https://www.npmjs.org/package/only-nested)
[![Travis](http://img.shields.io/travis/brentburgoyne/only-nested.svg?style=flat)](https://travis-ci.org/brentburgoyne/only-nested)
[![Code Climate](http://img.shields.io/codeclimate/github/brentburgoyne/only-nested.svg?style=flat)](https://codeclimate.com/github/brentburgoyne/only-nested)
[![Code Climate Coverage](http://img.shields.io/codeclimate/coverage/github/brentburgoyne/only-nested.svg?style=flat)](https://codeclimate.com/github/brentburgoyne/only-nested)

Return on the whitelisted properties of an object, similar to 
[only](https://github.com/visionmedia/node-only), but with support for nested
properties.

## Installation

```bash
$ npm isntall only-nested --save
```

## Usage

```js
var only = require('only-nested')

var whitelist = {
  a: null,
  b: {
    x: null,
    y: null
  }
}

var obj = {
  a: 1,
  b: {
    x: 2,
    y: 3,
    z: 4
  },
  c: 5
}

only(whitelist, obj)
/*
-> {
  a: 1,
  b: {
    x: 2,
    y: 3
  }
}
*/
```

## Arrays of Objects

The `only()` function also supports whitelisting keys of objects in an array.
This is expressed in the whitelist by having an array with a whitelist object as
the first element.

```js
var whitelistWithArray = {
  a: [{
    x: null
  }]
}

var objWithArray = {
  a: [
    {
      x: 1,
      y: 2
    },
    {
      x: 3,
      y: 4,
      z: 5
    }
  ]
}

only(whitelistWithArray, objWithArray)
/*
-> {
  a: [
    {
      x: 1
    },
    {
      x: 3
    }
  ]
}
*/
```

## Partial Application

If you call `only()` with a whitelist as the only argument, it returns a
partially applied function which takes a source object as its only argument.

```js
var onlyWhitelist = only(whitelist)
onlyWhitelist(obj)
```

It works great with `map()`.

```js
someArrayOfObjects.map(only({a: null}))
```
