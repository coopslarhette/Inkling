const check = require('../../semantics/check')

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

  gen() {
    let result = `if (${this.tests[0].gen()}) {${this.consequence[0].gen()}}` // issue is here
    for (let i = 1; i < this.tests.length; i += 1) {
      result = result.concat(
        `else if (${this.tests[i].gen()}) {${this.consequence[i].gen()}}`,
      )
    }
    if (this.alt) {
      result = result.concat(`else {${this.alt.gen()}}`)
    }
    return result
  }
}
