const check = require('../semantics/check')

module.exports = class VarDeclaration {
  constructor(id, constant, type, exp) {
    // constant accounts for 'always' functionality
    Object.assign(this, {
      id,
      constant,
      type,
      exp,
    })
  }

  analyze(context) {
    this.exp.analyze(context)
    this.type.analyze(context)
    check.isAssignableTo(this.exp, this.type)
    context.add(this.id, this)
  }

  optimize() {
    this.exp = this.exp.optimize()
    return this
  }
}
