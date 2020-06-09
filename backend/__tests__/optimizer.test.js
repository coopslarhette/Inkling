const parse = require('../../ast/parser')
const Context = require('../../semantics/context')

const fixture = {
  mathBinaryOps: [
    'x is Num 2 + 3 - 4 * 5 / 2\n',
    /let x_(\d+) = -5;/,
  ],

  ifBoolOperationss: [
    'if (4 > 3) {\n display 5 < 3\n }\n',
    /if \(true\) {\s*console\.log\(false\);\s*};/,
  ],

  andOr: [
    'twoThreeFour is Bool (2 < 3 and 3 < 4)\n trueOrFalse is Bool true or false\n',
    /let twoThreeFour_\d+ = true;\s*let trueOrFalse_\d+ = true;/,
  ],

  noOptimization: [
    'nothing is always Bool true\n',
    /const nothing_\d+ = true;/,
  ],

  stringConcatenation: [
    'truth is Text "forney " + "is " + "a " + "hustler!"\n',
    /let truth_\d+ = "forney is a hustler!";/,
  ],

  allBinaryExpressions: [
    'if ("toal" == "cool") {\n'
    + '0 != 0\n'
    + '1 == 1\n'
    + '0 + 0\n'
    + '1 + 0\n'
    + '0 + 2\n'
    + '0 * 3\n '
    + '3 * 0\n'
    + '3 * 1\n'
    + '1 * 3\n'
    + '2 + 2\n'
    + '8 - 3\n'
    + '3 * 2\n '
    + '14 / 2\n'
    + '19 % 10\n'
    + '2 <= 3\n'
    + '2 < 3\n '
    + '2 >= 3\n'
    + '2 > 3\n'
    + 'true and true\n}\n',
    /if \(false\) \{\s*false;\s*true;\s*0;\s*1;\s*2;\s*0;\s*0;\s*3;\s*3;\s*4;\s*5;\s*6;\s*7;\s*9;\s*true;\s*true;\s*false;\s*false;\s*true;\s*\};/,
  ],

  unaryExpressions: [
    'while (!false) {\n !true\n 3 + -2 - -9\n  -3 * 3\n}\n',
    /while \(true\) {\s*false;\s*10;\s*- 9;\s*\};/,
  ],

  variableDeclarationAndAssignment: [
    'a is Num 12 * 10\n b is Text "apple" + "sauce"\n c is Bool true and false\n'
    + 'a is 8 / 4\n'
    + 'b is "sauce" + "apple"\n'
    + 'c is true or false\n',
    /let a_(\d+) = 120;\s*let b_(\d+) = "applesauce";\s*let c_(\d+) = false;\s*a_\1 = 2;\s*b_\2 = "sauceapple";\s*c_\3 = true;/,
  ],

  callArguments: [
    'function sum(x is Num, y is Num, z is Num) is Num {\n'
    + 'gimme x + y + z\n}\n'
    + 'sum(2 * 4, 6 - 9, 12 % 5)\n',
    /function sum_(\d+)\(x_(\d+), y_(\d+), z_(\d+)\) \{\s*return \(\(x_\2 \+ y_\3\) \+ z_\4\);\s*\};\s*sum_\1\(8, -3, 2\);/,
  ],

  forLoop: [
    'for i in [3-2, 3-1, 3-0] {\n'
  + 'display 2 - 3\n'
  + 'display "toal is" + " cool"\n}\n',
    /for \(const i_\d+ of \[1, 2, 3\]\) {\s*console\.log\(-1\);\s*console\.log\("toal is cool"\);\s*};/,
  ],

  listDeclarationAndSubscriptedExpression: [
    String.raw`list<num> l = [1 - 1, -2 + 3, 5 // 2]
l[12 - 10] = 12 % 7`,
    /let l_(\d+) = \[\s*0,\s*1\s*,\s*2\s*\];\s*l_\1\[2\] = 5;/,
  ],

  breakStatement: [
    String.raw`for i from 0 to 1:
  break`,
    /for \(let i_(\d+) = 0; i_\1 <= 1; i_\1 \+= 1\) \{\s*break;\s*\};/,
  ],

  dictExpression: [
    String.raw`dict<num, num> numbersAreCool = {1:2, 3:4}`,
    /let numbersAreCool_\d+ = \{\s*1: 2,\s*3: 4\s*\};/,
  ],

  setExpression: [
    String.raw`set<num> superSet = set(1 + 4, 3 + 3, 12 * 4)`,
    /let superSet_\d+ = new Set\(\[\s*5,\s*6,\s*48\s*\]\);/,
  ],

  functionAndReturn: [
    String.raw`num arithmetic():
  return 1 + 4 - (3 * 3) / (4 // 3)`,
    /function arithmetic_\d+\(\) \{\s*return -4;\s*\};/,
  ],

  ternary: [
    String.raw`12 / 4 if (true and false) else 82 // 5`,
    String.raw`false ? 3 : 16;`,
  ],
}

describe('The JavaScript generator', () => {
  Object.entries(fixture).forEach(([name, [source, expected]]) => {
    test(`produces the optimized output for ${name}`, (done) => {
      let ast = parse(source)
      ast.analyze(Context.INITIAL)
      ast = ast.optimize()
      // eslint-disable-next-line no-undef
      expect(ast.gen()).toMatch(expected)
      done()
    })
  })
})
