const check = require('../semantics/check')

module.exports = class Assignment {
  constructor(target, source) {
    Object.assign(this, {
      target,
      source,
    })
  }

  analyze(context) {
    this.target.analyze(context)
    this.source.analyze(context)
    if (!this.target.id.id) {
      check.isAssignableTo(this.source, this.target.type)
      check.isNotReadOnly(this.target)
    } else {
      check.isAssignableTo(this.source, this.target.id.type)
    }
  }

  optimize() {
    this.target = this.target.optimize()
    this.source = this.source.optimize()
    if (this.target.id === this.source.id) {
      return null
    }
    return this
  }

  gen() {
    return `${this.target.gen()} = ${this.source.gen()}`
  }
}
