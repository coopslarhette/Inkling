const check = require('../semantics/check')

module.exports = class IfStmt {
  constructor(tests, consequence, alt) {
    Object.assign(this, {
      tests,
      consequence,
      alt,
    })
  }

  analyze(context) {
    this.tests.forEach((test) => {
      test.analyze(context)
      check.isBool(test.type)
    })
    this.consequence.forEach((block) => {
      const blockContext = context.createChildContextForBlock()
      block.analyze(blockContext)
    })
    if (this.alt) {
      const alternateBlock = context.createChildContextForBlock()
      this.alt.analyze(alternateBlock)
    }
  }

  optimize() {
    this.tests = this.tests.map((test) => test.optimize())
    this.consequence = this.consequence.map((consequence) => consequence.optimize())
    if (this.alternate) {
      this.alternate = this.alternate.optimize()
    }
    if (this.tests.length === 0) {
      return this.alternate
    }
    return this
  }
}
