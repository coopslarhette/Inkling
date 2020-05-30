const check = require('../semantics/check')
const DictType = require('./dict-type')

module.exports = class DictExpression {
  constructor(exp) {
    Object.assign(this, { exp })
  }

  analyze(context) {
    this.exp.forEach((kvPair) => {
      kvPair.analyze(context)
    })
    if (this.exp.length > 0) {
      const keyType = this.exp[0].key.type
      const valueType = this.exp[0].value.type
      this.type = new DictType(keyType, valueType)
      for (let i = 1; i < this.exp.length; i += 1) {
        check.expressionsHaveTheSameType(this.exp[i].key.type, this.type.keyType)
        check.expressionsHaveTheSameType(
          this.exp[i].value.type,
          this.type.valueType,
        )
      }
    }
  }

  optimize() {
    this.exp.forEach((kvPair) => {
      kvPair.optimize()
    })
    return this
  }
}
