const check = require('../semantics/check')
const NoneType = require('../semantics/builtins')
const DictType = require('./dict-type')

module.exports = class DictExpression {
  constructor(keyValuePairs) {
    Object.assign(this, { keyValuePairs })
  }

  analyze(context) {
    this.keyValuePairs.forEach((pair) => {
      pair.analyze(context)
    })
    if (this.keyValuePairs.length > 0) {
      const { keyType, valueType } = this.keyValuePairs[0]
      this.keyValuePairs.forEach((pair) => {
        check.expressionsHaveTheSameType(pair.keyType, keyType)
        check.expressionsHaveTheSameType(pair.valueType, valueType)
      })
      this.type = new DictType(keyType, valueType)
    } else {
      this.type = NoneType
    }
  }

  optimize() {
    this.keyValuePairs.forEach((pair) => {
      pair.optimize()
    })
    return this
  }
}
