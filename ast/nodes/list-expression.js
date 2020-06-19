const check = require('../../semantics/check')
const ListType = require('./list-type')
const { NoneType } = require('../../semantics/builtins')

module.exports = class ListExpression {
  constructor(members) {
    this.members = members
  }

  analyze(context) {
    this.members.forEach((m) => m.analyze(context))
    if (this.members.length) {
      const firstMemberType = this.members[0].type
      this.type = new ListType(firstMemberType)
      this.members.forEach((m) => check.expressionsHaveTheSameType(
        m.type,
        firstMemberType,
      ))
    } else {
      this.type = NoneType
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
