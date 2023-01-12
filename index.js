module.exports = only

/**
 * Return a nested object with only the keys present in a whitelist.
 * @param {Object} whitelist
 * @param {Object} obj
 * @return {Object}
 * @api public
 */
function only(whitelist, obj) {
  if (arguments.length === 1) {
    return only.bind(null, whitelist)
  }
  var ret = {}

  // Separate mapped type from the rest
  const { [Symbol.for('key')]: mappedType, ...rest } = whitelist
  const src = Object.assign({}, obj)

  // Process each concrete key in the object
  Object.keys(rest).forEach(function (key) {
    if (src[key] !== void 0) {
      if (isObject(rest[key]) && isObject(src[key])) {
        ret[key] = only(rest[key], src[key])
        delete src[key]
      } else if (Array.isArray(rest[key]) && isObject(rest[key][0])) {
        if (Array.isArray(src[key])) {
          ret[key] = src[key].map(only(rest[key][0]))
          delete src[key]
        }
      } else {
        ret[key] = src[key]
        delete src[key]
      }
    }
  })

  // Process mapped types, if necessary
  if (mappedType !== undefined) {
    Object.keys(src).forEach(function (key) {
      if (isObject(mappedType)) {
        if (isObject(src[key])) {
          const val = only(mappedType, src[key])
          if (Object.keys(val).length > 0) {
            ret[key] = val
          }
        }
      } else if (Array.isArray(mappedType) && isObject(mappedType[0])) {
        if (Array.isArray(src[key])) {
          const val = src[key].map(only(mappedType[0]))
          if (val.length > 0) {
            ret[key] = val
          }
        }
      } else {
        ret[key] = src[key]
      }
    })
  }

  return ret
}

/**
 * Return true if the value is a non-array object.
 * @param {mixed} obj
 * @return {Boolean}
 * @api private
 */
function isObject(obj) {
  return Object.prototype.toString.call(obj) === '[object Object]'
}
