var NO_DEFAULT = {}

module.exports = only
module.exports.NO_DEFAULT = NO_DEFAULT
module.exports._ = NO_DEFAULT

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
      } else if (Array.isArray(whitelist[key]) && isObject(whitelist[key][0])) {
        var items = Array.isArray(obj[key]) ? obj[key] : []
        ret[key] = items.map(only(whitelist[key][0]))
      } else {
        ret[key] = obj[key]
      }
    }else if (whitelist[key] !== NO_DEFAULT) {
      ret[key] = Array.isArray(whitelist[key]) ? [] : whitelist[key]
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
