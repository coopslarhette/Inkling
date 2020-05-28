const check = require('../semantics/check')
const {
  NumType,
  BoolType,
  TextType,
} = require('../semantics/builtins')

module.exports = class BinaryExpression {
  constructor(op, left, right) {
    Object.assign(this, {
      op,
      left,
      right,
    })
  }

  analyze(context) {
    this.left.analyze(context)
    this.right.analyze(context)
    if (['<=', '>=', '<', '>'].includes(this.op)) {
      check.isNum(this.left.type)
      check.isNum(this.right.type)
      this.type = BoolType
    } else if (['!=', '=='].includes(this.op)) {
      check.expressionsHaveTheSameType(this.left.type, this.right.type)
      this.type = BoolType
    } else if (['and', 'or'].includes(this.op)) {
      check.isBool(this.left.type)
      check.isBool(this.right.type)
      this.type = BoolType
    } else if (this.op === '+') {
      check.expressionsHaveTheSameType(this.left.type, this.right.type)
      check.isNumOrText(this.left.type)
      check.isNumOrText(this.right.type)
      this.type = this.left.type === NumType ? NumType : TextType
    } else {
      check.isNum(this.left.type)
      check.isNum(this.right.type)
      this.type = NumType
    }
  }
}
