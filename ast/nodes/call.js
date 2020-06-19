const check = require('../../semantics/check')
const FuncDecStmt = require('./func-dec-statement')
const genHelp = require('../../backend/generator-helpers')

module.exports = class Call {
  constructor(id, args) {
    Object.assign(this, {
      id,
      args,
    })
  }

  analyze(context) {
    this.callee = context.lookupValue(this.id.id)
    // check.isFunction(this.callee) TODO
    if (!(this.callee instanceof FuncDecStmt)) {
      throw new Error('Not a function')
    }
    this.args.forEach((arg) => arg.analyze(context))
    check.legalArguments(this.args, this.callee.function.params)
    this.type = this.callee.function.returnType
  }

  optimize() {
    this.args = this.args.map((arg) => arg.optimize())
    return this
  }

  gen() {
    const args = this.args.map((a) => a.gen())
    if (this.callee.builtin) {
      return genHelp.builtinGenerators[this.callee.id](args)
    }
    return `${this.id.gen()}(${args.join()})`
  }
}
