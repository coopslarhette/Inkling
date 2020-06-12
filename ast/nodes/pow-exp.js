const check = require('../../semantics/check')
const NumType = require('../../semantics/builtins')
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
    if (this.right.value === 0) {
      return new Literal(1)
    }
    if (this.left.value === 1 || this.left.value === 0 || this.right.value === 1) {
      return new Literal(this.left.value)
    }
    return this
  }

  gen() {
    return `${this.left.gen()}**${this.right.gen()}`
  }
}
