const check = require('../../semantics/check')
const {
  NumType,
} = require('../../semantics/builtins')

module.exports = class PostfixExpression {
  constructor(operand, op) {
    Object.assign(this, {
      op,
      operand,
    })
  }

  analyze(context) {
    this.operand.analyze(context)
    check.isNum(this.operand.type)
    this.type = NumType
  }

  optimize() {
    this.operand.optimize()
    return this
  }

  gen() {
    return `(((${this.operand.gen()})${this.op}))`
  }
}
