const PrimitiveType = require('./primitive-type')

// TODO this may be redundant, I think we can just put it in builtins
const NumType = new PrimitiveType('Num')
const TextType = new PrimitiveType('Text')
const BoolType = new PrimitiveType('Bool')

module.exports = {
  NumType,
  TextType,
  BoolType,
}
