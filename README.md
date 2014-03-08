edipat
======
Experimental structural source code editor and implementation of a Lisp dialect with pattern matching support.

Editor
---
Structural editor written in edipat which works directly on a tree representation of edipat source code. Supports autocompletion and detects undefined identifiers.  
Try it out online: http://kiejo.github.io/edipat

Language
---
* dialect of Lisp with pattern matching support
* compiles to JavaScript
* compiler written in JavaScript
* no macros yet

Why a new language?
* for fun and learning
* to be able to test what language constructs work well with structural editing
* haven't seen any Lisp dialect with native pattern matching

Example Code
```lisp
// variable declaration
(def message "hello")

// function definition
(defn add a b (+ a b))

// lambda
(map (fn a (* a a)) [1 2 3 4])

// partial function application
(def times_2 (* _ 2))

// data types
(def user { name: "John" age: 25 friends: ["Peter" "Julia" "Fred"] })

// access field on object
(#name user)

// invoke method on object
(.toString 5)


// pattern matching:
// match against objects, lists, strings, numbers, booleans, predicates (similar to guards)
// supports arbitrary depth

(match user
    ({ name: "Fred" age: 30 } "Your name is Fred and you are 30 years old.")
    ({ name: n age: (>= _ 20) } (str ["Your name is " n " and you are at least 20 years old."]))
    ({ friends: ["Peter" _ third] } (str ["You have 3 friends: First comes Peter, don't know second one, third one called " third]))
    ({ friends: (fn names (any (== _ "Julia") names)) } "You have a friend called Julia.")
    ({ friends: [a & rest] } (str ["First friend called " a ". Plus " (#length rest) " other friends."])))
```

License
----

MIT


    
