module.exports = class ReturnStatement {
  constructor(returnValue) {
    this.returnValue = returnValue
  }

  analyze(context) {
    this.returnValue.analyze(context)
    this.type = this.returnValue.type
    context.assertInFunction('Return statement not in function')
  }

  optimize() {
    this.returnValue = this.returnValue.optimize()
    return this
  }
}
