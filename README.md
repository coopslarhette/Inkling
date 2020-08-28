[![Build Status](https://travis-ci.com/coopslarhette/Inkling.svg?branch=master)](https://travis-ci.com/coopslarhette/Inkling)
# Inkling: An Intuitive Programming Language

<p align="center"><img src="images/logo-inkling.png" alt="inkling logo" width="350"/></p>

## Introduction

You may not know this, but you already know inkling. Inkling is a programming language that lets you follow your gut- you learn to program by doing what makes sense to you while learning to shift your thinking to grow as a programmer and as a thinker. Speak the language you code. Type what you want to say. Where will your inkling take you today?

Created by Marco B, Cooper LaRhette, Veda Ashok, Sam Gibson, Maya Pegler-Gordon, and Talia Bahar

# Compiling Inkling Code

Inkling can currently be transpiled to runnable JavaScript, to do this follow directions below:

1. Install [Node.js](https://nodejs.org/en/).
2. Clone the project and run `$ npm install` and then `$ npm test` (in the project directory) to ensure everything is working.
3. The command to compile inkling code is: `$ node inkling.js [-a] [-o] [-i] <filename>`, where:
    - `<filename>` contains your Inkling code; we have provided `test.ink` and more example files in `docs/`
    - flags:
        - the `-a` flag will show the abstract syntax tree after parsing your code and then stop
        - the `-i` flag will generate and show the decorated abstract syntax tree and then stop
        - the `-o` flag optimizes the .js code about to be written to the console (useless if used with other flags)

# Features

- Simple and easy
- Statically typed
- Case sensitive
- Arrow functions

## Types

- Num
- Text
- Bool
- List
- Dict

## Operators

- Add: `+`
- Subtract: `-`
- Multiply: `*`
- Divide: `/`
- Modulo: `%`
- Less than or equal: `<=`
- Less than: `<`
- Greater than or equal: `>=`
- Greater than: `>`
- Equal: `==`
- Not equal: `!=`
- Decrement prefix: `--variable`
- Increment prefix: `++variable`
- Negate: `-variable`
- Not: `!variable`
- Decrement postfix: `variable--`
- Increment postfix: `variable++`
- Logical AND: `and`
- Logical OR: `or`

## Semantic Errors

- Type mismatch during declaration or assignment
- Assignment to a variable declared with the 'always' keyword (constants)
- Passing in `x` number of arguments where the function is declared with `y` number of parameters and `x !== y`
- Passing in arguments with wrong type compared to parameter(s) declaration/the function signature
- Indexing out of bounds for lists and dictionaries
- Applying the `+` operator to variables that are not of type `Text` or `Num`
- Having a `return` in a function that has a return type of `Void`
- Not returning anything in a function that is declared to return something
- Returning something that is not of the type declared in the function signature
- Trying to iterate through something that is not a list, dictionary, or string in a `for` loop

## Optimizations

- Constant Folding
- Strength Reduction in Prefix Operator & Binary Operators
- Unreachable Code for While Loop
- Assignment Simplification 

#Code Examples

## Variable Declaration

```w is Bool true
x is Num 5
y is Text “Hello World!”
z is always Num 10
```

## Variable Assignment

```x is 7
y is “Inkling is amazing”
```

## Function Declaration

```
function helloWorld() is Text {
    gimme "Hello world"
}

function countToX(x is Num) is Void {
    for i is Num in range(0, x) {
        display i
    }
}

x is always (x is Text) is Num => {
    gimme x
}
```

## Ternary

`display "negative" if x < 0 else display "positive"`

## Conditional

```
if (x % 3 == 0) {
    display "multiple of 3"
}
```

## Loops

#### For Loop

```
for i is Num in range(0,10) {
    btw: for-loop execution
}
```

#### While Loop

```
while (x < 0) {
    btw: while-loop execution
}
```

## Comments

```
btw: this is how you leave a single-line comment

fyi: if you need to leave a multi-line
     you can leave it like this :xoxo
```

# Code Examples

### Fibonacci Program

#### Inkling Example

```
function fibonacci(x is Num) is Num {
    if (x <= 1) {
        gimme x
    }
    gimme fibonacci(x - 1) + fibonacci(x - 2)
}
```

#### JavaScript Example

```
function fibonacci(x) {
    if (x <= 1) {
        return x;
    }
    return fibonacci(x - 1) + fibonacci(x - 2);
}
```

### Find Factorial Program

#### Inkling Example

```
function findFactorial(x is Num) is Num {
    if (x == 0 or x == 1) {
        gimme x
    }
    gimme x * findFactorial(x - 1)
}
```

#### JavaScript Example

```
function findFactorial(x) {
    if (x === 0 || x === 1) {
        return x;
    }
    return x * firstFactorial(x - 1);
}
```

### Fizzbuzz Program

#### Inkling Example

```
function fizzbuzz(x is Num) is void {
    for i is Num in range(0, x) {
        if (i % 3 == 0 and i % 5 == 0) {
            display "fizzbuzz"
        } else if (i % 3 == 0) {
            display "fizz"
        } else if (i % 5 == 0) {
            display "buzz"
        } else {
            display i
        }
    }
}
```

#### JavaScript Example

```
function  fizzBuzz(x) {
    for (let  i = 1; i <= x; i++) {
        if (i % 3 === 0 && i % 5 === 0) {
            console.log("fizzbuzz");
        } else  if (i % 3 === 0) {
            console.log("fizz");
        } else  if (i % 5 === 0) {
            console.log("buzz");
        } else {
            console.log(i);
        }
    }
}
```

### Find Greatest Program

#### Inkling Example

```
function findGreatest(a is Num, b is Num, c is Num) is Num {
    if (a >= b and a >= c) {
        gimme x
    } else if (b >= a and b >= c) {
        gimme b
    } else {
        gimme c
    }
}
```

#### JavaScript Example

```
function findGreatest(a, b, c) {
    if (a >= b && a >= c) {
        return x;
    } else if (b >= a && b >= c) {
        return b;
    } else {
        return c;
    }
}
```

### Negative Checker

#### Inkling Example

```
function negativeChecker(x is Num) is Bool {
    gimme true if x < 0 else false
}
```

#### Javascript Example

```
function negativeChecker(x) {
    return x < 0 ? true : false
}
```
