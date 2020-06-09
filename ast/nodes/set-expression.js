const check = require('../../semantics/check')
const SetType = require('./set-type')

module.exports = class SetExpression {
  constructor(members) {
    this.members = members
  }

  analyze(context) {
    // perhaps we need to ensure none of the members are the same here?
    this.members.forEach((m) => m.analyze(context))
    if (this.members.length) {
      const expectedType = this.members[0].type
      this.members.forEach((m) => check.expressionsHaveTheSameType(m.type, expectedType))
      this.type = new SetType(expectedType)
    } else {
      // TODO
    }
  }

  optimize() {
    this.members = this.members.map((m) => m.optimize())
    return this
  }

  gen() {
    return `new Set([${this.members.map((member) => member.gen())}])`
  }
}
