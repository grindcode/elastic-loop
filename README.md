# Elastic Loop
[![Build Status](https://travis-ci.org/grindcode/elastic-loop.svg?branch=master)](https://travis-ci.org/grindcode/elastic-loop) [![Dependency Status](https://david-dm.org/grindcode/elastic-loop.svg)](https://david-dm.org/grindcode/elastic-loop) [![devDependency Status](https://david-dm.org/grindcode/elastic-loop/dev-status.svg)](https://david-dm.org/grindcode/elastic-loop#info=devDependencies)

Runs an interval with elastic timeout. Useful for loops supporting heavy load situations.

## Get Started
```bash
npm install elastic-loop
```

## API
### loop(function, stress, [options])
Runs `function` in loop, mutating timeout depending on `stress`. Returns instance containing `end` function.
* `function`: Interval function. (**Function**)
* `stress`: Function returning bool. (**Function**)
* `options`: optional, but must be an Object if specified, containing zero or more of the following properties:
  *  `timeout`: Default interval timeout in milliseconds. (**Number**; default: `1000`)
  *  `modifier`: Timeout multiplier on stress. (**Float**; default: `1.20`)
  *  `min`: Min stress multiplier. (**Number**|**Float**; default: `1`)
  *  `max`: Max stress multiplier. (**Number**|**Float**; default: `0:infinite`)

### Usage
```javascript
var loop = require('elastic-loop')
var busy = require('node-busy')

monitor = busy()

// @cycle: current cycle fingerprint
var run = function (cycle) {
  // → @cycle: { timeout: 1000, stress: 1 }
}

var stress = function () {
  // returns true if overloaded, false otherwise
  return monitor.blocked
}

var cycle = loop(run, stress)

// cycle.end()

```

## License
See the [License](LICENSE) file.
