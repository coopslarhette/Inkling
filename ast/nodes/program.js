const beautify = require('js-beautify')

module.exports = class Program {
  constructor(stmts) {
    this.stmts = stmts
  }

  analyze(context) {
    this.stmts.forEach((stmt) => {
      console.log('stmt BEFORE analyze')
      console.log(stmt)
      stmt.analyze(context)
    })
  }

  optimize() {
    this.stmts = this.stmts.map((stmt) => stmt.optimize())
    return this
  }

  gen() {
    return beautify(this.stmts.map((s) => `${s.gen()};`).join(''), { indentSize: 2 })
  }
}
