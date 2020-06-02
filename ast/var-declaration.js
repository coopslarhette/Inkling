const check = require('../semantics/check')
const genHelp = require('../backend/generator-helpers')

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

  gen() {
    if (this.constant) {
      return `const ${genHelp.javaScriptId(this.id)} = ${this.exp.gen()}`
    }
    return `let ${genHelp.javaScriptId(this.id)} = ${this.exp.gen()}`
  }
}
