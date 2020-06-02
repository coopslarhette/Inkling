/*
 * Inkling Compiler.
 * File structure and design from https://github.com/dmoini/casper/blob/master/casper.js.
 */

const fs = require('fs')
const util = require('util')
const yargs = require('yargs')
const parse = require('./ast/parser')
const Context = require('./semantics/context')

// If compiling from a string, return the AST, IR, or compiled code as a string.
function compile(sourceCode, { astOnly, frontEndOnly, shouldOptimize }) {
  const program = parse(sourceCode)
  if (astOnly) {
    return util.inspect(program, { depth: null })
  }
  program.analyze(Context.INITIAL)
  if (shouldOptimize) {
    program.optimize()
  }
  if (frontEndOnly) {
    return util.inspect(program, { depth: null })
  }
  return program.gen()
}

// If compiling from a file, write to standard output.
function compileFile(filename, options) {
  fs.readFile(filename, 'utf-8', (error, sourceCode) => {
    if (error) {
      throw new Error(`${error}`)
    }

    // eslint-disable-next-line no-console
    console.log(compile(sourceCode, options))
  })
}

// If running as a script, we have a lot of command line processing to do. The source
// program will come from the file name that is given as the command line argument.
if (require.main === module) {
  const { argv } = yargs.usage('$0 [-a] [-o] [-i] filename')
    .boolean(['a', 'o', 'i'])
    .describe('a', 'show abstract syntax tree after parsing then stop')
    .describe('o', 'do optimizations')
    .describe(
      'i',
      'generate and show the decorated abstract syntax tree then stop',
    )
    .demand(1)
  compileFile(argv._[0], {
    astOnly: argv.a,
    frontEndOnly: argv.i,
    shouldOptimize: argv.o,
  })
}
