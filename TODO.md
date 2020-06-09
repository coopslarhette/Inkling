## TODO's

### Major

- fix example programs 
    - ~~and potentially add them to a new `doc` directory (a la tiger)~~
- ~~add more strength reductions to BinaryExp~~
- ~~another non-trivial optimization not in tiger~~
    - ~~toal suggested 'Can you throw in getting rid of statements after a return maybe? Then you can have the 5 points back. Let me know.'~~
- subscripted shit still not working (see `doc/dictsListsAndSets.ink`) still not working as of 6/1/20
- some uncompleted analyzers and optimizers; see TODO's

### Minor

- 100% branch coverage
- (maybe) add a generator for arrow functions that generates actually js arrow functions
- empty lists, sets, and dicts are not assigned a type
- fix string iteration using a for loop
- can't have any kind of add, sub, etc operators in subscripted call :(
- change const var-decs to follow `id "always" "is" Type Exp` pattern
- could add optimization to treat `always` var-decs as literals
- I think beautify is adding spaces in between postfix and prefix ops and operands


### Refactor TODO's

- get 100% test coverage
- get a better generator working for range()
