const { NoneType } = require('../semantics/builtins')

module.exports = class None {
  analyze() {
    this.type = NoneType
  }

  optimize() {
    return this
  }

  // eslint-disable-next-line class-methods-use-this
  gen() {
    return 'null'
  }
}
