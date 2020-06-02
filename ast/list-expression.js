const check = require('../semantics/check')
const ListType = require('./list-type')

module.exports = class ListExpression {
  constructor(members) {
    this.members = members
  }

  analyze(context) {
    this.members.forEach((m) => m.analyze(context))
    if (this.members.length) {
      this.type = new ListType(this.members[0].type)
      this.members.forEach((m) => check.expressionsHaveTheSameType(
        m.type,
        this.type.memberType,
      ))
    }
  }

  optimize() {
    this.members = this.members.map((m) => m.optimize())
    return this
  }

  gen() {
    return `[${this.members.map((m) => m.gen())}]`
  }
}
