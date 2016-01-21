var test = require('tape')
var loop = require('../index.js')

test('cycle defaults', function (t) {
  t.plan(10)
  var runs = 0
  var busy = true
  var cycle
  var validate = function (f) {
    switch (runs) {
      case 0: t.equal(f.timeout, 1000); break
      case 1: t.equal(f.timeout, 1200); break
      case 2: t.equal(f.timeout, 1440); break
      case 3: t.equal(f.timeout, 1728); break
      case 4: t.equal(f.timeout, 2073.6); break
      case 5: t.equal(f.timeout, 1728); break
      case 6: t.equal(f.timeout, 1440); break
      case 7: t.equal(f.timeout, 1200); break
      case 8: t.equal(f.timeout, 1000); break
      case 9: t.equal(f.timeout, 1000); break
    }
  }
  var execute = function (f) {
    if (runs === 10) {
      cycle.end()
      t.end()
    }
    else {
      validate(f)
      runs++
    }
  }
  cycle = loop(execute, function () {
    return runs < 5
  })
})

test('cycle with max', function (t) {
  t.plan(10)
  var runs = 0
  var busy = true
  var cycle
  var validate = function (f) {
    switch (runs) {
      case 0: t.equal(f.timeout, 10); break
      case 1: t.equal(f.timeout, 20); break
      case 2: t.equal(f.timeout, 40); break
      case 3: t.equal(f.timeout, 40); break
      case 4: t.equal(f.timeout, 40); break
      case 5: t.equal(f.timeout, 20); break
      case 6: t.equal(f.timeout, 10); break
      case 7: t.equal(f.timeout, 10); break
      case 8: t.equal(f.timeout, 10); break
      case 9: t.equal(f.timeout, 10); break
    }
  }
  var execute = function (f) {
    if (runs === 10) {
      cycle.end()
      t.end()
    }
    else {
      validate(f)
      runs++
    }
  }
  cycle = loop(execute, function () {
    return runs < 5
  }, { timeout: 10, max: 4, modifier: 2 })
})
