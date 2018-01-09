module.exports = function (fn, lever, opts) {
  var stress = 1
  var cycle
  var options = Object.assign({
    modifier: 1.20, timeout: 1000, min: 1, max: 0
  }, opts)
  var increase = function () {
    var s = stress * options.modifier
    return (s < options.max || !options.max)? s: options.max
  }
  var decrease = function () {
    var s = stress / options.modifier
    return (s > options.min)? s: options.min
  }
  var balance = function () {
    var s = stress
    stress = (lever())? increase(): decrease()
    return stress !== s
  }
  var end = function () {
    clearInterval(cycle)
  }
  var run = function () {
    var timeout = options.timeout * stress
    var runInterval = function () {
      fn({ stress: stress, timeout: timeout })
      if (balance()) run()
    }
    end()
    cycle = setInterval(runInterval, timeout)
  }
  run()
  return {
    end: end
  }
}
