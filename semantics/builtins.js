const PrimitiveType = require('../ast/primitive-type')
const ListType = require('../ast/list-type')
const SetType = require('../ast/set-type')
const DictType = require('../ast/dict-type')
const FuncDecStmt = require('../ast/func-dec-statement')
const Param = require('../ast/param')

const {
  NumType,
  TextType,
  BoolType,
} = require('../ast/primitive-types')

const NoneType = new PrimitiveType('none')

const standardFunctions = [new FuncDecStmt('xProcess', [new Param('code', NumType)], NumType),
  new FuncDecStmt('range', [new Param('lower', NumType), new Param('upper', NumType)], new ListType(NumType))]

const textFunctions = [
  new FuncDecStmt(
    'slice',
    [new Param('s', TextType), new Param('begin', NumType), new Param('end', NumType)],
    TextType,
  ),
  new FuncDecStmt('length', [new Param('s', TextType)], NumType),
  new FuncDecStmt('charAt', [new Param('s', TextType), new Param('i', NumType)], TextType),
]

const mathFunctions = [
  new FuncDecStmt('abs', [new Param('n', NumType)], NumType),
  new FuncDecStmt('sqrt', [new Param('n', NumType)], NumType),
  new FuncDecStmt('random', [new Param('start', NumType), new Param('end', NumType)], NumType),
  new FuncDecStmt('pow', [new Param('base', NumType), new Param('power', NumType)], NumType),
]

const listFunctions = [
  // need to inherit type of list from list that is calling, don't think I did it right here but...
  new FuncDecStmt('add', [new Param('id', ListType), new Param('value', TextType)], ListType),
  new FuncDecStmt('prepend', [new Param('id', ListType), new Param('value', NumType)], ListType),
  new FuncDecStmt(
    'insert',
    [new Param('id', ListType), new Param('index', NumType), new Param('value', NumType)],
    ListType,
  ),
  new FuncDecStmt('remove', [new Param('list', ListType)], ListType),
  // new FuncDecStmt("length", [new Param("s", ListType)], NumType),
]

const setFunctions = [
  new FuncDecStmt('add', [new Param('value', this.type)], SetType),
  new FuncDecStmt('remove', [new Param('index', NumType)], SetType),
  new FuncDecStmt('length', [new Param('s', SetType)], NumType),
]

// keyType and valueType are made up, may be something we need to add for these functions
const dictFunctions = [
  new FuncDecStmt(
    'add',
    [new Param('key', this.keyType), new Param('value', this.valueType)],
    DictType,
  ),
  new FuncDecStmt('remove', [new Param('key', this.keyType)], DictType),
  new FuncDecStmt(
    'update',
    [new Param('key', this.keyType), new Param('value', this.valueType)],
    DictType,
  ),
  new FuncDecStmt('getValue', [new Param('key', this.keyType)], this.valueType),
  new FuncDecStmt('keys', [], new ListType(this.keyType)),
  new FuncDecStmt('values', [], new ListType(this.valueType)),
]

const functions = [
  ...standardFunctions,
  ...textFunctions,
  ...mathFunctions,
  ...listFunctions,
  ...setFunctions,
  ...dictFunctions,
]

// eslint-disable-next-line no-param-reassign,no-return-assign
functions.forEach((func) => { func.builtin = true })

module.exports = {
  NumType,
  TextType,
  BoolType,
  NoneType,
  standardFunctions,
  textFunctions,
  mathFunctions,
  listFunctions,
  setFunctions,
  dictFunctions,
}
