module.exports = function (fn, relay, options = {}) {
    const {modifier = 1.20, timeout = 1000, min = 1, max = 0} = options
    let stress = 1
    let cycle
    function increase () {
        const nextStress = stress * modifier
        return (nextStress < max || !max) ? nextStress : max
    }
    function decrease () {
        const nextStress = stress / modifier
        return nextStress > min ? nextStress : min
    }
    function balance () {
        const prevStress = stress
        stress = relay() ? increase() : decrease()
        return prevStress !== stress
    }
    function start (nextTimeout) {
        cycle = setInterval(run, nextTimeout)
    }
    function run () {
        const nextTimeout = timeout * stress
        fn({stress, timeout: nextTimeout, cycle})
        if (balance()) {
            clear()
            start(nextTimeout)
        }
    }
    function clear () {
        if (cycle) {
            clearInterval(cycle)
        }
    }
    start()
    return clear
}
