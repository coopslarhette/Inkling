const check = require('../../semantics/check')
const VarDeclaration = require('./var-declaration')
const ListType = require('./list-type')
const DictType = require('./dict-type')
const genHelp = require('../../backend/generator-helpers')

module.exports = class ForLoop {
  constructor(id, collection, body) {
    Object.assign(this, {
      id,
      collection,
      body,
    })
  }

  analyze(context) {
    let type
    this.collection.analyze(context)
    check.isIterable(this.collection.type)
    const typeToCheck = this.collection.type.constructor
    if (typeToCheck === ListType) {
      type = this.collection.type.memberType
    } else if (typeToCheck === DictType) {
      type = this.collection.type.keyType
      // } else if (typeToCheck === TextType) {
      //   // TODO
      //   type = this.collection.type
    } else {
      // probably need to throw error here since can't iterate on anything else than above
      type = this.collection.type
    }
    const bodyContext = context.createChildContextForLoop()
    const id = new VarDeclaration(this.id, false, type)
    bodyContext.add(this.id, id)
    this.body.analyze(bodyContext)
  }

  optimize() {
    this.body = this.body.optimize()
    this.collection = this.collection.optimize()
    return this
  }

  gen() {
    const i = genHelp.javaScriptId(this.id)
    const loopControl = `for (const ${i} of ${this.collection.gen()})`
    const body = this.body.gen()
    return `${loopControl} {${body}}`
  }
}
