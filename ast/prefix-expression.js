const check = require('../semantics/check')
const {
  NumType,
  BoolType,
} = require('../semantics/builtins')
const Literal = require('./literal')

module.exports = class PrefixExpression {
  constructor(op, operand) {
    Object.assign(this, {
      op,
      operand,
    })
  }

  analyze(context) {
    this.operand.analyze(context)
    if (this.op === '!') {
      check.isBool(this.operand.type)
      this.type = BoolType
    } else {
      check.isNum(this.operand.type)
      this.type = NumType
    }
  }

  optimize() {
    this.operand = this.operand.optimize()
    if (this.op === '-' && this.operand instanceof Literal) {
      return new Literal(-this.operand.value)
    }
    return this
  }

  gen() {
    return `(${this.op}(${this.operand.gen()}))`
  }
}
