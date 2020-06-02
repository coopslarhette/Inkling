## TODO's

### Major

- fix example programs 
    - ~~and potentially add them to a new `doc` directory (a la tiger)~~
- ~~add more strength reductions to BinaryExp~~
- ~~another non-trivial optimization not in tiger~~
    - ~~toal suggested 'Can you throw in getting rid of statements after a return maybe? Then you can have the 5 points back. Let me know.'~~
- subscripted shit still not working (see `doc/dictsListsAndSets.ink`)
- some uncompleted analyzers and optimizers; see TODO's

### Minor

- 100% branch coverage
- (maybe) add a generator for arrow functions that generates actually js arrow functions
- empty lists, sets, and dicts are not assigned a type
- fix string iteration using a for loop


### Refactor TODO's

- ~~finish adding all ast node files~~
- there is some issue with primitive types
    - need to figure out where to put them now since they can't go in `index.js` I think
    - need to test I did this correctly
- figure out how to integrate new node structure from casper
- run tests to see latest issues
    - now some issue with range builtin,
