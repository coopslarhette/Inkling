/* eslint func-names: ["error", "never"] */

const Context = require('./context')

module.exports = (root) => {
  root.analyze(Context.INITIAL)
}
