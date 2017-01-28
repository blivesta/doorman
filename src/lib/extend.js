export function extend () {
  var extended = {}
  var deep = false

  if (Object.prototype.toString.call(arguments[0]) === '[object Boolean]') {
    deep = arguments[0]
    i++
  }

  function merge (obj) {
    for (var prop in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, prop)) {
        if (deep && Object.prototype.toString.call(obj[prop]) === '[object Object]') {
          extended[prop] = extend(true, extended[prop], obj[prop])
        } else {
          extended[prop] = obj[prop]
        }
      }
    }
  }

  for (var i = 0; i < arguments.length; i++) {
    var obj = arguments[i]
    merge(obj)
  }

  return extended
}
