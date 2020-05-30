module.exports = class KeyValuePair {
  constructor(key, value) {
    Object.assign(this, {
      key,
      value,
    })
  }

  analyzer() {
    this.key.analyze()
    this.value.analyze()
    this.keyType = this.key.type
    this.valueType = this.value.type
  }

  optimize() {
    this.key = this.key.optimize()
    this.value = this.value.optimize()
    return this
  }
}
