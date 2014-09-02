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
    if (obj[key]) {
      if (isObject(whitelist[key]) && isObject(obj[key])) {
        ret[key] = only(whitelist[key], obj[key])
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
