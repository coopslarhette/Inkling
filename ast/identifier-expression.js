const Call = require('./call')
const SubscriptedVarExp = require('./subscripted-var-expression')

module.exports = class IdentifierExpression {
  constructor(id) {
    this.id = id
  }

  analyze(context) {
    if (!this.id.id) {
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
}
