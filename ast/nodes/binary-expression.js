const check = require('../../semantics/check')
const {
  NumType,
  BoolType,
  TextType,
} = require('../../semantics/builtins')
const genHelp = require('../../backend/generator-helpers')

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

  optimize() {
    this.left = this.left.optimize()
    this.right = this.right.optimize()
    if (check.bothStringLiterals(this) && this.op === '+') {
      const [x, y] = [this.left.value, this.right.value]
      const xy = (x + y).replace(/"+/g, '')
      return check.newLiteral(`${xy}`) // xy use to be wrapped in quotes: "${xy}", may need the quotes idk works as of 6/8
    }
    if (this.op === '!=') return check.newLiteral(this.left.value !== this.right.value)
    if (this.op === '==') return check.newLiteral(this.left.value === this.right.value)
    if ((this.op === '+' || this.op === '-') && check.isZero(this.right)) return this.left
    if (this.op === '+' && check.isZero(this.left)) return this.right
    if (this.op === '+' && check.isNegative(this.right)) {
      return check.newLiteral(this.left.value + this.right.value)
    }
    if (this.op === '-' && check.isZero(this.left)) return check.newLiteral((-this.right.value))
    if (this.op === '*' && (check.isZero(this.left) || check.isZero(this.right))) return check.newLiteral(0)
    if (this.op === '*' && check.isOne(this.right)) return this.left
    if (this.op === '*' && check.isOne(this.left)) return this.right
    if (check.bothBoolLiterals(this)) {
      const [x, y] = [this.left.value, this.right.value]
      const ops = {
        and: check.newLiteral(x && y),
        or: check.newLiteral(x || y),
      }
      return ops[this.op]
    }
    if (check.bothLiterals(this)) {
      const [x, y] = [this.left.value, this.right.value]
      // ouuu this is NICE
      const ops = {
        '+': check.newLiteral(x + y),
        '-': check.newLiteral(x - y),
        '*': check.newLiteral(x * y),
        '/': check.newLiteral(x / y),
        '%': check.newLiteral(x % y),
        '>=': check.newLiteral(x >= y),
        '<=': check.newLiteral(x <= y),
        '<': check.newLiteral(x < y),
        '>': check.newLiteral(x > y),
      }
      return ops[this.op]
    }

    return this
  }

  gen() {
    return `(${this.left.gen()} ${genHelp.makeOp(this.op)} ${this.right.gen()})`
  }
}
