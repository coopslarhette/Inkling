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
}
