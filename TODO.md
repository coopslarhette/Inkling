## TODO's

### Major

- fix example programs 
    - ~~and potentially add them to a new `doc` directory (a la tiger)~~
- ~~add more strength reductions to BinaryExp~~
- ~~another non-trivial optimization not in tiger~~
    - ~~toal suggested 'Can you throw in getting rid of statements after a return maybe? Then you can have the 5 points back. Let me know.'~~

### Minor

- (maybe) add a generator for arrow functions that generates actually js arrow functions
- generator for range
- ~~fix string iteration using a for loop~~
- can't have any kind of add, sub, etc operators in subscripted call :(
- change const var-decs to follow `id "always" "is" Type Exp` pattern?????
- could add optimization to treat `always` var-decs as literals
- I think beautify is adding spaces in between postfix and prefix ops and operands (ie -5 becomes --> `- 5`)
- can't subscript function calls that return collection (dicts at least)


### New Refactor Items for empty collections

- empty lists, sets, and dicts are not assigned a type
    - | "[" ListElems? "]"                                            --pack
                          | "[" KeyValPairs "]"                                           --kennel
          ListElems       = ListElem ("," ListElem)*
          
    - basically need to make inside of lists, sets, dicts optional and then probably assign a `NoneType` as that's 
      semantically allowed
- also, there is no lexical difference between an empty set and an empty dict, thus what should be an empty dict
  will always be a set
