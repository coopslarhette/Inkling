const check = require('../../semantics/check')
const Literal = require('./literal')

module.exports = class Ternary {
  constructor(test, consequence, alt) {
    Object.assign(this, {
      test,
      consequence,
      alt,
    })
  }

  analyze(context) {
    this.test.analyze(context)
    check.isBool(this.test.type)
    const blockContext = context.createChildContextForBlock()
    this.consequence.analyze(blockContext)
    const alternateBlock = context.createChildContextForBlock()
    this.alt.analyze(alternateBlock)
    check.expressionsHaveTheSameType(this.consequence.type, this.alt.type)
    this.type = this.consequence.type
  }

  optimize() {
    this.test = this.test.optimize()
    this.consequence = this.consequence.optimize()
    this.alt = this.alt.optimize()
    if (this.test instanceof Literal) {
      return this.test.value ? this.consequence : this.alt
    }
    return this
  }

  gen() {
    return `${this.test.gen()} ? ${this.consequence.gen()} : ${this.alt.gen()}`
  }
}
