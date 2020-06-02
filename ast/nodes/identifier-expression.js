const Call = require('./call')
const SubscriptedVarExp = require('./subscripted-var-expression')
const genHelp = require('../../backend/generator-helpers')

module.exports = class IdentifierExpression {
  constructor(id) {
    this.id = id
  }

  analyze(context) {
    if (!this.id.id) { // means an actual IdentifierExp, not this Call wrapping BS
      this.ref = context.lookupValue(this.id)
      this.type = this.ref.type
    } else {
      this.id.analyze(context)
    }
    if (this.id instanceof Call || this.id instanceof SubscriptedVarExp) {
      this.type = this.id.type
    }
  }

  optimize() {
    if (this.id instanceof Call || this.id instanceof SubscriptedVarExp) {
      this.id = this.id.optimize()
    }
    return this
  }

  gen() {
    if (typeof this.id === 'object') {
      return `${this.id.gen()}`
    }
    return `${genHelp.javaScriptId(this.id)}`
  }
}
