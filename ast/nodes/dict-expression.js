const check = require('../../semantics/check')
const DictType = require('./dict-type')
const { NoneType } = require('../../semantics/builtins')

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

  gen() {
    const result = {}
    const keys = this.keyValuePairs.map((key) => key.key.gen())
    const values = this.keyValuePairs.map((val) => val.value.gen())
    for (let i = 0; i < keys.length; i += 1) {
      result[keys[i]] = values[i]
    }
    return `{ ${keys.map((k, i) => `${k}: ${values[i]}`).join(', ')} }`
  }
}
