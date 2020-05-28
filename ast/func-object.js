const check = require('../semantics/check')
const Param = require('./param')
const ReturnStatement = require('./return-statement')


module.exports = class FuncObject {
  constructor(type, id, params, body) {
    Object.assign(this, {
      type,
      id,
      params,
      body,
    })
  }

  analyze(context) {
    this.params = this.params.map((p) => new Param(p.id, p.type))
    this.params.forEach((p) => p.analyze(context))
    this.body.analyze(context)

    const returnStatement = this.body.statements.filter(
      (b) => b.constructor === ReturnStatement,
    )

    if (returnStatement.length === 0 && this.type !== 'Void') {
      throw new Error('No return statement found')
    } else if (returnStatement.length > 0) {
      if (this.type === 'Void') {
        throw new Error('Void functions do not have return statements')
      }
      check.isAssignableTo(returnStatement[0], this.type) // bug here TODO: uh is it still here
    }
  }
}
