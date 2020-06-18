// /*
//  * Semantic Error Tests
//  *
//  * These tests check that the analyzer will reject programs with various
//  * static semantic errors.
//  */

const parse = require('../../ast/parser')
const Context = require('../context')

const errors = [
  ['use of undeclared variable', 'a is 1\n'],
  ['assignment to constant', 'b is always Num 5\nb is 1\n'],
  ['List with inconsistent types', 'c is List<Text> ["this", 2, "b"]\n'],
  [
    'Dict with inconsistent types',
    'ageDictionary is Dict<Text, Text> {"Sam": 21, "Talia": 20}\n',
  ],
  [
    'Void function should not have a return statment',
    'function fun1 (h is Num, i is Num) is Void {\ndisplay "hello"\ngimme 4\n}\n',
  ],
  ['non integer in subtract', '"dog" - 5\n'],
  ['types do not match in equality test', '2 == "dog"\n'],
  ['types do not match in inequality test', '2 < "dog"\n'],
  ['types do not match in declaration', 'e isNum "hello"\n'],
  [
    'undeclared because in other scope',
    'f is Num 5\n function fun2 (h is Num, i is Num) is Void {\ndisplay x\ngimme 4\n}\n',
  ],
  [
    'undeclared because in opposite scope',
    'function fun3 (h is Num, i is Num) is Void {\nx is Num 5\ngimme 4\n}\n display x \n',
  ],
  ['redeclaration of variable', 'g isNum 3\ng isNum 4\n'],
  ['type mismatch in assignment', 'h isNum 3\nx is "hello"\n'],
  ['writing to (readonly) for loop index', 'i is always Num 5\n i is 3\n'],
  ['too many function arguments', 'abs(1, 2, 3)\n'],
  ['too few function arguments', 'pow(5)\n'],
  ['wrong type of function argument', 'abs("hi")\n'],
  ['no such field', 'j is Dict<Text, Num> {"Sam": 21}\n j["hi"]\n'],
  ['subscript of nonarray', 'k is Num 5\n k[0]\n'],
  ['call of nonfunction', 'l is Num 5 \n l(5) \n'],
  ['non integer subscript', 'm is List<Text> [1,2,3]\n m["lol"]\n'],
  [
    'no return statement in function',
    'function fun4 (x is Num) is Num {display x + 2\n}\n',
  ],
  [
    'function returns the wrong type',
    'function fun5 (x is Num) is Text {gimme x + 2\n}\n',
  ],
  ['return statement outside of a function', 'n is Num 5\n gimme n\n'],
  ['can\'t use ! prefix on non-boolean types', 'o is Num 5\n display !o\n'],
  ['can\'t use have a negative boolean', 'q is Bool true\n display -q\n'],
  [
    'variable init in function used outside of block',
    'function fun6 (h is Num) is Void {\ndisplay 4\ninFunctionVar is Num 3\n}\ndisplay inFunctionVar\n',
  ],
  [
    'variable init in function used outside of block',
    '  r is Num 0\nwhile (r < 5) {\ndisplay r\ninWhileVar is Text "hello"\n}\ndisplay inWhileVar\n',
  ],
  ['dividing booleans', 'r is Bool true\nj is Bool false\nr / j\n'],
  ['ternary return types must be of same type', 'c is Num 5 if true else true\n'],
  ['assigning to list with wrong member type', 'ong is List<Text> [1,2,3]\n'],
  ['assigning to list with wrong member type from function call',
    'function f(x is Num) is List<Num> {\n gimme \n }\n wew is List<Text> f(2)\n'],
  ['can\'t iterate nums', 'for i in 5 {\n display 3\n}\n'],
  ['can\'t use math operators with bools', 'true + false\ntrue - false\n'],
  ['can\'t subtract strings', '"hello" - "a"\n '],
  ['can\'t multiply strings', '"hello" * "a"\n '],

  // add necessary types for each node
  // pow check for return type
  // in functions check
]

describe('The semantic analyzer', () => {
  errors.forEach(([scenario, program]) => {
    test(`detects the error ${scenario}`, (done) => {
      const astRoot = parse(program)
      expect(astRoot).toBeTruthy()
      expect(() => astRoot.analyze(Context.INITIAL)).toThrow()
      done()
    })
  })
})
