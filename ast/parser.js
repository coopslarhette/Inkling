/* eslint no-unused-vars: ["error", { "argsIgnorePattern": "^_" }] */

/* NOTE: As of right now, we have yet to implement new lines within expressions.
        We will get this functionality implemented by the next deadline. */

const fs = require('fs')
const ohm = require('ohm-js')

const Assignment = require('./nodes/assignment')
const BinaryExpression = require('./nodes/binary-expression')
const Block = require('./nodes/block')
const Call = require('./nodes/call')
const DictExpression = require('./nodes/dict-expression')
const DictType = require('./nodes/dict-type')
const ForLoop = require('./nodes/for-loop')
const FuncDecStmt = require('./nodes/func-dec-statement')
const IdentifierExpression = require('./nodes/identifier-expression')
const IfStmt = require('./nodes/if-statement')
const KeyValuePair = require('./nodes/key-value-pair')
const ListExpression = require('./nodes/list-expression')
const ListType = require('./nodes/list-type')
const Literal = require('./nodes/literal')
const None = require('./nodes/none')
const Param = require('./nodes/param')
const PostfixExpression = require('./nodes/postfix-expression')
const PowExp = require('./nodes/pow-exp')
const PrefixExpression = require('./nodes/prefix-expression')
const Print = require('./nodes/print')
const Program = require('./nodes/program')
const ReturnStatement = require('./nodes/return-statement')
const SetExpression = require('./nodes/set-expression')
const SetType = require('./nodes/set-type')
const SubscriptedVarExp = require('./nodes/subscripted-var-expression')
const Ternary = require('./nodes/ternary')
const VarDeclaration = require('./nodes/var-declaration')
const WhileLoop = require('./nodes/while-loop')

const {
  NumType,
  BoolType,
  TextType,
} = require('../semantics/builtins')

const grammar = ohm.grammar(fs.readFileSync('./grammar/Inkling.ohm'))

function arrayToNullable(a) {
  return a.length === 0 ? null : a[0]
}

// eslint-disable-next-line no-unused-vars
const astGenerator = grammar.createSemantics().addOperation('ast', {
  Program(stmt) {
    return new Program(stmt.ast())
  },
  SimpleStmt_return(_, e) {
    return new ReturnStatement(arrayToNullable(e.ast()))
  },
  Block(_1, stmts, _2) {
    return new Block(stmts.ast())
  },
  Stmt_simpleStmt(_, stmt, _1) {
    return stmt.ast()
  },
  Stmt_funcDec(_1, f, _2) {
    return f.ast()
  },
  Stmt_whileLoop(_1, loop, _2) {
    return loop.ast()
  },
  Stmt_forLoop(_1, loop, _2) {
    return loop.ast()
  },
  Stmt_ifBlock(_1, block, _2) {
    return block.ast()
  },
  IfStmt_if(
    _1,
    _2,
    firstTest,
    _3,
    firstBlock,
    _4,
    _5,
    elifTests,
    _7,
    moreBlock,
    _8,
    lastBlock,
  ) {
    return new IfStmt(
      [firstTest.ast(), ...elifTests.ast()],
      [firstBlock.ast(), ...moreBlock.ast()],
      arrayToNullable(lastBlock.ast()),
    )
  },
  ForLoop(_1, id, _2, exp, body) {
    return new ForLoop(id.ast(), exp.ast(), body.ast())
  },
  WhileLoop(_1, _2, exp, _3, body) {
    return new WhileLoop(exp.ast(), body.ast())
  },
  FuncDec_function(_funcKeyword, id, _open, params, _close, returnType, body) {
    return new FuncDecStmt(
      id.ast(),
      params.ast(),
      returnType.ast(),
      body.ast(),
    )
  },
  FuncDec_arrowfunction(id, _1, _2, _3, params, _4, returnType, _5, body) {
    return new FuncDecStmt(
      id.ast(),
      params.ast(),
      returnType.ast(),
      body.ast(),
    )
  },
  Params(params) {
    return params.ast()
  },
  NonemptyListOf(first, _separator, rest) {
    return [first.ast(), ...rest.ast()]
  },
  EmptyListOf() {
    return []
  },
  SimpleStmt_letdec(id, _, type, exp) {
    return new VarDeclaration(id.ast(), false, type.ast(), exp.ast())
  },
  SimpleStmt_constdec(id, _isKeyword, _alwaysKeyword, type, exp) {
    return new VarDeclaration(id.ast(), true, type.ast(), exp.ast())
  },
  SimpleStmt_assign(id, _, exp) {
    return new Assignment(id.ast(), exp.ast())
  },
  SimpleStmt_print(_displayKeyword, exp) {
    return new Print(exp.ast())
  },
  Param(id, _isKeyword, type) {
    return new Param(id.ast(), type.ast())
  },
  VarExp_call(callName, _1, args, _2) {
    return new Call(callName.ast(), args.ast())
  },
  id(_1, _2) {
    return this.sourceString
  },
  KeyValue(id, _, exp) {
    return new KeyValuePair(id.ast(), exp.ast())
  },

  // Expressions
  Exp_ternary(returnOnTrue, _1, testExp, _2, returnOnFalse) {
    return new Ternary(testExp.ast(), returnOnTrue.ast(), returnOnFalse.ast())
  },
  Exp0_or(left, op, right) {
    return new BinaryExpression(op.ast(), left.ast(), right.ast())
  },
  Exp0_and(left, op, right) {
    return new BinaryExpression(op.ast(), left.ast(), right.ast())
  },
  Exp1_relop(left, op, right) {
    return new BinaryExpression(op.ast(), left.ast(), right.ast())
  },
  Exp2_addop(left, op, right) {
    return new BinaryExpression(op.ast(), left.ast(), right.ast())
  },
  Exp3_mulop(left, op, right) {
    return new BinaryExpression(op.ast(), left.ast(), right.ast())
  },
  Exp4_pow(left, _, right) {
    return new PowExp(left.ast(), right.ast())
  },
  Exp5_postfix(operand, op) {
    return new PostfixExpression(operand.ast(), op.ast())
  },
  Exp5_prefix(op, operand) {
    return new PrefixExpression(op.ast(), operand.ast())
  },
  Exp6_parens(_1, expression, _2) {
    return expression.ast()
  },
  Exp6_list(_1, expressions, _2) {
    return new ListExpression(expressions.ast())
  },
  Exp6_set(_1, expressions, _2) {
    return new SetExpression(expressions.ast())
  },
  Exp6_dict(_1, keyValue, _2) {
    return new DictExpression(keyValue.ast())
  },
  VarExp_subscripted(id, _open, key, _close) {
    return new SubscriptedVarExp(id.ast(), key.ast())
  },
  // VarExps wrapped in IdentifierExpressions still hmmm
  VarExp(id) {
    return new IdentifierExpression(id.ast())
  },

  // Types
  Num(_) {
    return NumType
  },
  Bool(_) {
    return BoolType
  },
  Text(_) {
    return TextType
  },
  List(_1, type, _2) {
    return new ListType(type.ast())
  },
  Set(_1, type, _2) {
    return new SetType(type.ast())
  },
  Dict(_1, keyType, _2, valueType, _3) {
    return new DictType(keyType.ast(), valueType.ast())
  },
  ReturnType(_, type) {
    return type.ast()
  },

  // Literals
  numlit(_1, _2, _3, _4, _5, _6) {
    return new Literal(+this.sourceString)
  },
  txtlit(_1, chars, _2) {
    return new Literal(chars.sourceString)
  },
  boollit(v) {
    return new Literal(v.sourceString === 'true')
  },
  nonelit(_) {
    return new None()
  },
  // eslint-disable-next-line no-underscore-dangle
  _terminal() {
    return this.sourceString
  },
})

module.exports = (text) => {
  const match = grammar.match(text)
  if (!match.succeeded()) {
    throw match.message
  }
  return astGenerator(match).ast()
}
