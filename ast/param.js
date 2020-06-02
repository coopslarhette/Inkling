const genHelp = require('../backend/generator-helpers')

module.exports = class Param {
  constructor(id, type) {
    Object.assign(this, {
      id,
      type,
    })
  }

  analyze(context) {
    context.add(this.id, this)
  }

  optimize() {
    return this
  }

  gen() {
    return genHelp.javaScriptId(this.id)
  }
}
