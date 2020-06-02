function makeOp(op) {
  return (
    {
      '==': '===',
      '!=': '!==',
      and: '&&',
      or: '||',
    }[op] || op
  )
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


module.exports = {
  makeOp,
  javaScriptId,
}
