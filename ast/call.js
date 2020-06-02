const check = require('../semantics/check')
const FuncDecStmt = require('./func-dec-statement')

const builtin = {
  xProcess(code) {
    return `process.exit(${code})`
  },
  slice([s, begin, end]) {
    return `${s}.slice(${begin}, ${end})`
  },
  length([s]) {
    return `${s}.length`
  },
  charAt([s, i]) {
    return `${s}.charAt(${i})`
  },
  abs([x]) {
    const num = `${x}`.replace(/[()]/g, '')
    return `Math.abs(${num})`
  },
  sqrt([x]) {
    return `Math.sqrt(${x})`
  },
  random([start, end]) {
    return `Math.floor(Math.random() * ${end} + ${start})`
  },
  pow([base, power]) {
    return `${base}**${power}`
  },
  add([listId, value]) {
    return `${listId.replace(/[''""]/g, '')}.push(${value})`
  },
  insert([listId, index, value]) {
    return `${listId.replace(/[''""]/g, '')}.splice(${index}, 0, ${value})`
  },
  prepend([listId, value]) {
    return `${listId.replace(/[''""]/g, '')}.prepend(${value})`
  },
  remove([listId]) {
    return `${listId.replace(/[''""]/g, '')}.pop()`
  },
  range([start, end]) {
    return `Array(${end} - ${start} + 1).fill().map((_, idx) => ${start} + idx)`
  },
}

module.exports = class Call {
  constructor(id, args) {
    Object.assign(this, {
      id,
      args,
    })
  }

  analyze(context) {
    this.callee = context.lookupValue(this.id.id)
    // check.isFunction(this.callee) TODO
    if (!(this.callee instanceof FuncDecStmt)) {
      throw new Error('Not a function')
    }
    this.args.forEach((arg) => arg.analyze(context))
    check.legalArguments(this.args, this.callee.function.params)
    this.type = this.callee.function.returnType
  }

  optimize() {
    this.args = this.args.map((arg) => arg.optimize())
    return this
  }

  gen() {
    const args = this.args.map((a) => a.gen())
    if (this.callee.builtin) {
      return builtin[this.callee.id](args)
    }
    return `${this.id.gen()}(${args.join()})`
  }
}
