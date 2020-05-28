const PrimitiveType = require('./primitive-type')

const NumType = new PrimitiveType('Num')
const TextType = new PrimitiveType('Text')
const BoolType = new PrimitiveType('Bool')

module.exports = {
  NumType,
  TextType,
  BoolType,
}
