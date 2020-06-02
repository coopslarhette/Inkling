const { NoneType } = require('../semantics/builtins')

module.exports = class None {
  analyze() {
    this.type = NoneType
  }

  optimize() {
    return this
  }
}
