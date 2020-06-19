/*
 * JavaScript Code Generator Tests
 *
 * These tests check that the JavaScript generator produces the target
 * JavaScript that we expect. note: no optimization is done.
 */

const parse = require('../../ast/parser')
const Context = require('../../semantics/context')

const fixture = {
  Print: ['display "Hello, world"\n', /console.log\("Hello, world"\);/],
  Arithmetic: ['3 * -2 + 2\n', /\(\(3 \* \(-\(2\)\)\) \+ 2\);/],
  VarDeclarationNum: ['a is Num 5\n', /let a_\d+ = 5;/],
  VarDeclarationConstant: ['b is always Text "Hello"\n', /const b_\d+ = "Hello";/],
  DictDeclaration: [
    'c is Dict<Text, Text> {"name":"Marco", "school":"LMU"}\n',
    /let c_\d+ = {\s*"name": "Marco",\s*"school": "LMU"\s*};/,
  ],
  AssignNum: ['e is Num 5\n e is 6\n', /let e_(\d+) = 5;\s*e_\1 = 6;/],
  If: ['if(true) {\n3 + 4\n}\n', /if \(true\) {\s*\(3 \+ 4\);\s*};/],
  IfElse: [
    'if (true) {\n3 + 4\n} else {\n4+3\n}\n',
    /if \(true\) {\s*\(3 \+ 4\);\s*} else {\s*\(4 \+ 3\);\s*};/,
  ],
  IfElseIfElse: [
    'if (true) {\n3 + 4\n} else if (3 < 4) {\n 3 - 4\n} else {\n4 + 3\n}\n',
    /if \(true\) {\s*\(3 \+ 4\);\s*} else if \(\(3 < 4\)\) {\s*\(3 - 4\);\s*} else {\s*\(4 \+ 3\);\s*};/,
  ],
  Ternary: ['f is Num 5 if 3 < 4 else 6\n', /let f_\d+ = \(3 < 4\) \? 5 : 6;/],
  WhileLoop: ['while (3 < 4) {\n 3 + 4\n}\n', /while \(\(3 < 4\)\) {\s*\(3 \+ 4\);\s*};/],
  ForLoop: [
    'for g in [1,2,3] {\n g + 3\n}\n',
    /for \(const g_(\d+) of \[1, 2, 3\]\) {\s*\(g_\1 \+ 3\);\s*};/,
  ],
  Functions: [
    'function foo(x is Num) is Num {\ngimme x * 3\n}\n',
    /function foo_\d+\(x_(\d+)\) {\s*return \(x_\1 \* 3\);\s*};/,
  ],
  SubscriptedVarExp: [
    'h is List<Num> [1,2,3]\n h[1] is 5\n',
    /let h_(\d+) = \[1, 2, 3\];\s*h_\1\[1\] = 5;/,
  ],
  pow: ['pow(2, 2)\n', /2 \*\* 2;/],
  length: ['length("hello")\n', /"hello".length;/],
  slice: ['slice("hello",1,2)\n', /"hello".slice\(1, 2\);/],
  charAt: ['charAt("hello",1)\n', /"hello".charAt\(1\);/],
  abs: ['abs(-1)\n', /Math.abs\(-1\);/],
  sqrt: ['sqrt(2)\n', /Math.sqrt\(2\);/],
  xProcess: ['xProcess(3)\n', /process.exit\(3\);/],
  random: ['random(1, 10)\n', /Math.floor\(Math.random\(\) \* 10 \+ 1\);/],
  range: ['range(0, 10)\n', /Array\(10 - 0 \+ 1\).fill\(\).map\(\(_, idx\) => 0 \+ idx\);/],
  builtins: ['pow(2, 2)\n length("hello")\n', /2 \*\* 2;\s*"hello"\.length;/],
  ListDeclaration: [
    'r is List<Text> ["name", "Marco", "school", "LMU"]\n',
    /let r_\d+ = \["name", "Marco", "school", "LMU"\];/,
  ],
  ListAdd: [
    'k is List<Text> ["name", "Marco", "school", "LMU"]\nadd(k, "guy")\n',
    /let k_(\d+) = \["name", "Marco", "school", "LMU"\];\s*k_\1\.push\("guy"\);/,
  ],
  ListPrependAndInsert: [
    'm is List<Num> [1]\nprepend("m", 2)\ninsert(m, 0, 4)\n',
    /let m_(\d+) = \[1\];\s*m_\1\.prepend\(2\);\s*m_\1\.splice\(0, 0, 4\);/,
  ],
  ListRemove: ['j is List<Num> [1]\n remove(j)\n', /let j_14 = \[1\]; j_14.pop\(\);/],
  FunctionCall: [
    'function Greeting (n is Text) is Void {display n\n}\n Greeting("hello")\n',
    /function Greeting_15\(n_16\){console.log\(n_16\);};\n Greeting_15\("hello"\);/,
  ],
  PostFix: [
    'ja is Num 5\n ja++\nja--\n',
    /let ja_17 = 5; \(\(\(ja_17\)\+\+\)\);\(\(\(ja_17\)--\)\);/,
  ],
  Null: [
    'ooh is Num none\n',
    /let ooh_18 = null;/,
  ],
}

describe('The JavaScript generator', () => {
  Object.entries(fixture).forEach(([name, [source, expected]]) => {
    test(`produces the correct output for ${name}`, (done) => {
      const ast = parse(source)
      ast.analyze(Context.INITIAL)
      expect((ast.gen())).toMatch(expected)
      done()
    })
  })
})
