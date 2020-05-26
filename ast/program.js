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
}
