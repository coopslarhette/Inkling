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
    return this
  }
}
