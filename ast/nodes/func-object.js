const util = require('util')
const deepEqual = require('deep-equal')
const Param = require('./param')
const ReturnStatement = require('./return-statement')
const NoneType = require('../../semantics/builtins')

const isAssignableTo = (expression, type) => {
  if (!((deepEqual(type, expression.type, true) || deepEqual(expression.type, NoneType))
    && type.constructor === expression.type.constructor)) {
    throw new Error(`Expression of type ${util.format(expression.type)} not compatible with type ${util.format(type)}`)
  }
}

module.exports = class FuncObject {
  constructor(returnType, id, params, body) {
    Object.assign(this, {
      returnType,
      id,
      params,
      body,
    })
    this.id = id
  }

  analyze(context) {
    this.params = this.params.map((p) => new Param(p.id, p.type))
    this.params.forEach((p) => p.analyze(context))
    this.body.analyze(context)

    const returnStatements = this.body.statements.filter(
      (b) => b instanceof ReturnStatement,
    )

    if (returnStatements.length === 0 && this.returnType !== 'Void') {
      throw new Error('No return statement found')
    } else if (returnStatements.length > 0) {
      if (this.returnType === 'Void') {
        throw new Error('Void functions do not have return statements')
      }
      // bug here TODO: uh is it still here
      isAssignableTo(returnStatements[0], this.returnType)
    }
  }

  optimize() {
    if (this.body) {
      this.body = this.body.optimize()
    }
    return this
  }

  gen() {
    const params = `${this.params.map((param) => param.gen())}`
    const body = this.body.gen()
    return `( ${params} ){${body} }`
  }
}
