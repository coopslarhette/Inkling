const { NoneType } = require('../semantics/builtins')

module.exports = class None {
  analyze() {
    console.log('NONE ANALYZER WORKING')
    this.type = NoneType
  }

  optimize() {
    return this
  }
}
