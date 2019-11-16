export default class Set {
  constructor(initValue = []) {
    this.hold = initValue
  }

  has(elem) {
    return ~this.hold.findIndex(holdElem => JSON.stringify(elem) === JSON.stringify(holdElem))
  }

  add(elem) {
    !this.has(elem) && this.hold.push(elem)
  }
}
