# Only Nested

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
/*
```

## Default Value

The value of a key in the `whitelist` object will be used as a default value in
the returned object if the key is not present in the source object. If you want
to exclude the key in the result set the value to `only.NO_DEFAULT` or simply
`only._` and not default value will be set.

## Partial Application

```js
onlyWhitelist = only(whitelist)
onlyWhitelist(obj)
```
