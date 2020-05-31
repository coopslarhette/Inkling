const check = require('../semantics/check')
const FuncDecStmt = require('./func-dec-statement')

module.exports = class Call {
  constructor(id, args) {
    Object.assign(this, {
      id,
      args,
    })
  }

  analyze(context) {
    this.callee = context.lookupValue(this.id.id)
    // check.isFunction(this.callee)
    if (!(this.callee instanceof FuncDecStmt)) {
      throw new Error('Not a function')
    }
    this.args.forEach((arg) => arg.analyze(context))
    check.legalArguments(this.args, this.callee.function.params)
    this.type = this.callee.function.type
  }

  optimize() {
    this.args = this.args.map((arg) => arg.optimize())
    return this
  }
}
