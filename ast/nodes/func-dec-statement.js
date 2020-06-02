const FuncObject = require('./func-object')
const genHelp = require('../../backend/generator-helpers')

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

  gen() {
    const name = genHelp.javaScriptId(this.id)
    const funcObj = this.function.gen()
    return `function ${name} ${funcObj}`
  }
}
