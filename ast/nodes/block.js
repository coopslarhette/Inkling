const { ReturnStatement } = require('./return-statement')

module.exports = class Block {
  constructor(statements) {
    this.statements = statements
  }

  analyze(context) {
    const localContext = context.createChildContextForBlock()
    this.statements.forEach((s) => s.analyze(localContext))
  }

  optimize() {
    this.statements = this.statements.map((s) => s.optimize())
    // eslint-disable-next-line max-len
    const indexOfReturnStatement = this.statements.findIndex((r) => r.constructor === ReturnStatement)
    if (indexOfReturnStatement >= 0) {
      this.statements = this.statements.slice(0, indexOfReturnStatement + 1)
    }
    return this
  }

  gen() {
    const generatedStatements = this.statements.map((s) => `${s.gen()};`)
    return generatedStatements.join('')
  }
}
