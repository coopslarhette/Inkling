module.exports = class FieldVarExp {
  constructor(id, field) {
    Object.assign(this, {
      id,
      field,
    })
  }

  // eslint-disable-next-line no-unused-vars,class-methods-use-this
  analyze(context) {
    // TODO lmao never built analyzer for this oopsie
  }

  // eslint-disable-next-line no-unused-vars,class-methods-use-this
  optimize() {
    // TODO?
    this.field = this.field.optimize()
    return this
  }

  // eslint-disable-next-line no-unused-vars,class-methods-use-this
  gen() {
    // TODO
  }
}
