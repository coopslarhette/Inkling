module.exports = class Print {
  constructor(exp) {
    Object.assign(this, { exp })
  }

  analyze(context) {
    this.exp.analyze(context)
  }

  optimize() {
    this.exp = this.exp.optimize()
    return this
  }

  gen() {
    return `console.log(${this.exp.gen()})`
  }
}
