const check = require('../../semantics/check')

module.exports = class SubscriptedVarExp {
  constructor(id, key) {
    Object.assign(this, {
      id,
      key,
    })
  }

  analyze(context) {
    this.callee = context.lookupValue(this.id.id)
    const listOrDict = this.callee || this.callee.exp
    check.isListOrDict(listOrDict)
    check.containsKey(this.callee, this.key.value)
    this.type = this.callee.type.memberType
  }

  optimize() {
    this.key = this.key.optimize()
    return this
  }

  gen() {
    return `${this.id.gen()}[${this.key.gen()}]`
  }
}
