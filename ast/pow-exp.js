const check = require('../semantics/check')
const NumType = require('../semantics/builtins')
const Literal = require('./literal')

module.exports = class PowExp {
  constructor(left, right) {
    Object.assign(this, {
      left,
      right,
    })
  }

  analyze(context) {
    this.left.analyze(context)
    this.right.analyze(context)
    check.isNum(this.left.type)
    check.isNum(this.right.type)
    this.type = NumType
  }

  optimize() {
    this.left = this.left.optimize()
    this.right = this.right.optimize()
    if (this.right === 0) {
      return new Literal(1)
    }
    if (this.left === 1 || this.left === 0 || this.right === 1) {
      return new Literal(this.left)
    }
    return this
  }

  gen() {
    return `${this.left.gen()}**${this.right.gen()}`
  }
}
