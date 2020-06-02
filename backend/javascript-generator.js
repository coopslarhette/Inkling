/* eslint func-names: ["error", "never"] */
/*
 * Translation to JavaScript
 *
 *   Each gen() method returns a fragment of JavaScript.
 *
 *   const generate = require('./backend/javascript-generator')
 *   generate(inklingExpression)
 */

const beautify = require('js-beautify')
const {
  Program,
  Block,
  Assignment,
  VarDeclaration,
  Print,
  Literal,
  BinaryExpression,
  IfStmt,
  WhileLoop,
  FuncDecStmt,
  FuncObject,
  Call,
  Param,
  DictExpression,
  SetExpression,
  ListExpression,
  ReturnStatement,
  IdentifierExpression,
  PostfixExpression,
  PrefixExpression,
  ForLoop,
  Ternary,
  None,
  SubscriptedVarExp,
} = require('../ast/index')

const {
  TextType,
} = require('../semantics/builtins')


module.exports = function (exp) {
  return beautify(exp.gen(), { indentSize: 2 })
}

Program.prototype.gen = function () {
  return this.stmts.map((s) => `${s.gen()};`).join('')
}

Literal.prototype.gen = function () {
  return this.type === TextType ? `"${this.value}"` : this.value
}

IdentifierExpression.prototype.gen = function () {
  if (typeof this.id === 'object') {
    return `${this.id.gen()}`
  }
  return `${javaScriptId(this.id)}`
}

VarDeclaration.prototype.gen = function () {
  if (!this.constant) {
    return `let ${javaScriptId(this.id)} = ${this.exp.gen()}`
  }
  return `const ${javaScriptId(this.id)} = ${this.exp.gen()}`
}

Print.prototype.gen = function () {
  return `console.log(${this.exp.gen()})`
}

PrefixExpression.prototype.gen = function () {
  return `(${this.op}(${this.operand.gen()}))`
}


SetExpression.prototype.gen = function () {
  return `new Set(${this.members.map((member) => member.gen())})`
}

ListExpression.prototype.gen = function () {
  return `[${this.members.map((m) => m.gen())}]`
}


Param.prototype.gen = function () {
  return javaScriptId(this.id)
}

ForLoop.prototype.gen = function () {
  const i = javaScriptId(this.id)
  const loopControl = `for (let ${i} of ${this.collection.gen()})`
  const body = this.body.gen()
  return `${loopControl} {${body}}`
}

FuncDecStmt.prototype.gen = function () {
  const name = javaScriptId(this.id)
  const funcObj = this.function.gen()
  return `function ${name} ${funcObj}`
}

FuncObject.prototype.gen = function () {
  const params = `${this.params.map((param) => param.gen())}`
  const body = this.body.gen()
  return `( ${params} ){${body} }`
}

ReturnStatement.prototype.gen = function () {
  return `return ${this.returnValue.gen()}`
}

IfStmt.prototype.gen = function () {
  let result = `if (${this.tests[0].gen()}) {${this.consequence[0].gen()}}`
  for (let i = 1; i < this.tests.length; i += 1) {
    result = result.concat(
      `else if (${this.tests[i].gen()}) {${this.consequence[i].gen()}}`,
    )
  }
  if (this.alt) {
    result = result.concat(`else {${this.alt.gen()}}`)
  }
  return result
}

SubscriptedVarExp.prototype.gen = function () {
  return `${this.id.gen()}[${this.key.gen()}]`
}

PostfixExpression.prototype.gen = function () {
  return `(((${this.operand.gen()})${this.op}))`
}

Ternary.prototype.gen = function () {
  return `${this.test.gen()} ? ${this.consequence.gen()} : ${this.alt.gen()}`
}

None.prototype.gen = function () {
  return 'null'
}

WhileLoop.prototype.gen = function () {
  return `while (${this.condition.gen()}) { ${this.body.gen()} }`
}
