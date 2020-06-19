const util = require('util')
const deepEqual = require('deep-equal')
const Literal = require('../ast/nodes/literal')
const ListType = require('../ast/nodes/list-type')
const DictType = require('../ast/nodes/dict-type')

const {
  NumType,
  BoolType,
  TextType,
  NoneType,
} = require('./builtins')

function doCheck(condition, message) {
  if (!condition) {
    throw new Error(message)
  }
}

module.exports = {
  isIterable(type) {
    doCheck(
      type.constructor === ListType
      || type.constructor === DictType
      || type === TextType
      || type === ListType
      || type === DictType,
      'Not a list, set, dict or text',
    )
  },

  isListOrDict(expression) {
    doCheck(
      expression.type.constructor === ListType
      || expression.type.constructor === DictType,
      'Not a list or  dict',
    )
  },

  isNum(type) {
    doCheck(type === NumType, 'Not a num')
  },

  isBool(type) {
    doCheck(type === BoolType, 'Not a bool')
  },

  // isFunction(value) {
  //   doCheck(value.constructor === FuncDecStmt, 'Not a function')
  // },

  isNumOrText(type) {
    doCheck(
      type === NumType || type === TextType,
      'Cannot apply \'+\' to types that are not num or text',
    )
  },

  // Are two types exactly the same?
  expressionsHaveTheSameType(e1, e2) {
    doCheck(deepEqual(e1.id, e2.id), 'Types must match exactly')
  },

  // Can we assign expression to a variable/param/field of type type?
  isAssignableTo(expression, type) {
    doCheck(
      //  && type.constructor === expression.type.constructor
      (deepEqual(expression.type, NoneType) || deepEqual(expression.type, type, true)),
      `Expression of type ${util.format(expression.type)} not compatible with type ${util.format(type)}`,
    )
  },

  isNotReadOnly(lvalue) {
    doCheck( // lvalue.constructor === IdentifierExpression &&
      !(lvalue.ref.constant),
      'Assignment to read-only variable',
    )
  },

  sameType(arg, param) {
    // TODO: fug we never allow/check for lists, sets, or dicts here oopsieee,
    // means we don't allow them in function calls
    if (param.type.id === 'Num') {
      doCheck(
        typeof arg.value === 'number' || arg.type === NumType,
        'Type mismatch NUM',
      )
    } else if (param.type.id === 'Text') {
      doCheck(arg.type === TextType,
        'Type mismatch TEXT')
    } else if (param.type.id === 'Bool') {
      doCheck(arg.type === BoolType,
        'Type mismatch BOOL')
    }
    // else {
    //   // TODO collections
    //   throw new Error('unsupported argument type')
    // }
  },

  // Same number of args and params; all types compatible
  legalArguments(args, params) {
    doCheck(
      args.length === params.length,
      `Expected ${params.length} args in call, got ${args.length}`,
    )
    args.forEach((arg, i) => this.sameType(arg, params[i]))
  },

  containsKey(ref, key) {
    if (ref.type.constructor === ListType) {
      this.isNum(ref.type.memberType)
      doCheck(ref.exp.members.length > key, 'Index out of bounds')
    }
    if (ref.type.constructor === DictType) {
      const keyFound = ref.exp.keyValuePairs.find((keyValue) => keyValue.key.value === key)
      doCheck(keyFound, 'Invalid key')
    }
  },

  isZero(e) {
    return e instanceof Literal && e.value === 0
  },

  isOne(e) {
    return e instanceof Literal && e.value === 1
  },

  bothLiterals(b) {
    return b.left instanceof Literal && b.right instanceof Literal
  },

  isNegative(n) {
    return n instanceof Literal && n.value < 0
  },

  bothStringLiterals(e) {
    return this.bothLiterals(e) && e.left.type === TextType && e.right.type === TextType
  },

  bothBoolLiterals(e) {
    return this.bothLiterals(e) && e.left.type === BoolType && e.right.type === BoolType
  },

  newLiteral(exp) {
    const node = new Literal(exp)
    node.analyze()
    return node
  },
}
