module.exports = class SetType {
  constructor(memberType) {
    Object.assign(this, { memberType })
  }

  analyze(context) {
    this.memberType.analyze(context)
  }

  optimize() {
    return this
  }
}
