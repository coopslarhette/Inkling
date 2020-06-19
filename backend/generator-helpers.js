function makeOp(op) {
  const ops = {
    '==': '===', '!=': '!==', and: '&&', or: '||',
  }
  return ops[op] || op
}

const javaScriptId = (() => {
  let lastId = 0
  const map = new Map()
  return (v) => {
    if (!map.has(v)) {
      map.set(v, ++lastId) // eslint-disable-line no-plusplus
    }
    return `${v}_${map.get(v)}`
  }
})()

const builtinGenerators = {
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
    const cleanedListId = listId.replace(/[''""]/g, '')
    return `${javaScriptId(cleanedListId)}.prepend(${value})`
  },
  remove([listId]) {
    return `${listId.replace(/[''""]/g, '')}.pop()`
  },
  range([start, end]) {
    return `Array(${end} - ${start} + 1).fill().map((_, idx) => ${start} + idx)`
  },
}


module.exports = {
  makeOp,
  javaScriptId,
  builtinGenerators,
}
