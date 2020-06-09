const beautify = require('js-beautify')

module.exports = class Program {
  constructor(stmts) {
    this.stmts = stmts
  }

  analyze(context) {
    this.stmts.forEach((stmt) => {
      stmt.analyze(context)
    })
  }

  optimize() {
    this.stmts = this.stmts.map((stmt) => stmt.optimize())
    return this
  }

  gen() {
    // I think beautify is adding spaces in between postfix and prefix ops and operands
    return beautify(this.stmts.map((s) => (s ? `${s.gen()};` : '')).join(''), { indentSize: 2 })
  }
}
