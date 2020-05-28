const FuncObject = require('./func-object')

module.exports = class FuncDecStmt {
  constructor(id, params, returnType, body) {
    this.id = id
    this.function = new FuncObject(returnType, id, params, body)
  }

  analyze(context) {
    context.add(this.function.id, this)
    const bodyContext = context.createChildContextForFunctionBody(this)
    this.function.analyze(bodyContext)
  }

  optimize() {
    this.function = this.function.optimize()
    return this
  }
}
