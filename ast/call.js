const check = require('../semantics/check')

module.exports = class Call {
  constructor(id, args) {
    Object.assign(this, {
      id,
      args,
    })
  }

  analyze(context) {
    this.callee = context.lookupValue(this.id.id)
    check.isFunction(this.callee)
    this.args.forEach((arg) => arg.analyze(context))
    check.legalArguments(this.args, this.callee.function.params)
    this.type = this.callee.function.type
  }

  optimize() {
    this.args = this.args.map((arg) => arg.optimize())
    return this
  }
}
