const Literal = require('./literal')

module.exports = class WhileLoop {
  constructor(condition, body) {
    Object.assign(this, {
      condition,
      body,
    })
  }

  analyze(context) {
    this.condition.analyze(context)
    const bodyContext = context.createChildContextForLoop()
    this.body.analyze(bodyContext)
  }

  optimize() {
    this.condition = this.condition.optimize()
    if (this.condition instanceof Literal && !this.condition.value) {
      return null
    }
    this.body = this.body.optimize()
    return this
  }

  gen() {
    return `while (${this.condition.gen()}) { ${this.body.gen()} }`
  }
}
