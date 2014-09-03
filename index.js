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
  Object.keys(whitelist).forEach(function (key) {
    if (obj[key] !== void 0) {
      if (isObject(whitelist[key]) && isObject(obj[key])) {
        ret[key] = only(whitelist[key], obj[key])
      } else if (Array.isArray(whitelist[key]) && isObject(whitelist[key][0])) {
        if (Array.isArray(obj[key])) {
          ret[key] = obj[key].map(only(whitelist[key][0]))
        }
      } else {
        ret[key] = obj[key]
      }
    }
  })
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
