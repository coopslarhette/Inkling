module.exports = class Print {
  constructor(exp) {
    Object.assign(this, { exp })
  }

  analyze(context) {
    this.exp.analyze(context)
  }

  optimize() {
    return this
  }
}
