class Unit {
    constructor(magnitude) {
        this.magnitude = magnitude
    }

    convert(n) {
        const mag = this.magnitude
        return [Math.floor(n / mag), n % mag]
    }

    to(...units) {
        return n => units.reduce(
            (arr, unit) => [
                ...arr.slice(0, -1),
                ...unit.convert(arr[arr.length - 1])
        ], [n]).slice(0, -1)
    }
}

const ms  = new Unit(1);
const s  = new Unit(1000);
const m  = new Unit(1000 * 60);
const h = new Unit(1000 * 60 * 60);
const d = new Unit(1000 * 60 * 60 * 24);

module.exports = { d, h, m, s, ms }
