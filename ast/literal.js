const {
  NumType,
  BoolType,
  TextType,
} = require('../semantics/builtins')

module.exports = class Literal {
  constructor(value) {
    this.value = value
  }

  analyze() {
    if (typeof this.value === 'number') {
      this.type = NumType
    } else if (typeof this.value === 'boolean') {
      this.type = BoolType
    } else { // safe to just have an else here I believe because of grammar constraints
      this.type = TextType
    }
  }

  optimize() {
    return this
  }
}
