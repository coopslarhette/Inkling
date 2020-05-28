const check = require('../semantics/check')
const VarDeclaration = require('./var-declaration')
const ListType = require('./list-type')
const DictType = require('./dict-type')
const SetType = require('./set-type')

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
    if (this.collection.type.constructor === ListType
      || this.collection.type.constructor === SetType) {
      type = this.collection.type.memberType
    } else if (this.collection.type.constructor === DictType) {
      type = this.collection.type.keyType
      // } else if (this.collection.type.constructor === TextType) {
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
}
