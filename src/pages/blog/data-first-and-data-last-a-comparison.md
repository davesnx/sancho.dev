---
title: "Data-first and data-last: a comparison"
subtitle: "WAT"
date: "2019-05-10"
imghero: "https://www.javierchavarri.com/media/data-first-and-data-last-a-comparison-01.jpg"
tags:
  - "OCaml"
  - "ReasonML"
  - "BuckleScript"
---

[BuckleScript](https://bucklescript.github.io/) is a quite uncommon project. It takes the compiler from one language, OCaml, and modifies it in a way that it becomes more ergonomic for users of another language: JavaScript.

One of the most relevant decisions —probably one of most controversial ones as well— was [to choose a data-first design for Belt API](https://github.com/BuckleScript/bucklescript/issues/2463) (BuckleScript's standard library), as well as introducing a ["pipe first" operator](https://reasonml.github.io/docs/en/pipe-first) (`|.` in OCaml syntax, `->` in Reason syntax) to make it easier to work with Belt functions.

The context and constraints for this decision are quite nuanced and in some cases involve knowledge about concepts that are foreign for most of us, like how compiler inference works, or advanced composition techniques in functional programming. However, despite being a quite technical subject, most of the information has been spread in quite short comments in forum threads, pull requests, Discord conversations, etc.

This article is an attempt to gather as much information as possible in one place, help me and hopefully others understand the alternatives in detail, and back the explanations with as many examples as possible.

So, in this article, we will:

1. Present what _data-last_ is, and why functional languages have been using it for many years.
2. Understand _data-first_, evaluating the advantages and disadvantages against _data-last_.
3. Evaluate the trade-offs of both alternatives.

All this with plenty of examples, references, and links to interactive editors, to play with actual code. Let's go!

![data-first-and-data-last-a-comparison-01.jpg](/media/data-first-and-data-last-a-comparison-01.jpg)

*Photo by [JJ Ying](https://unsplash.com/photos/4XvAZN8_WHo?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/search/photos/pipeline?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)*

## Data-last: a traditional convention in functional languages

There is a convention in functional languages that consists on passing the "data" or "object" that will be processed by the function as the last parameter to a function. This is commonly known as "data-last".[^tlast]

If we are using the OCaml standard library for example, and we want to map over the values of a list, we will do something like this (in Reason syntax):

```reason
let numbers = [1, 2, 3];
let listTwo = List.map(a => a + 1, numbers); /* [2, 3, 4] */
```

In this case, the "data" —`numbers`— is passed as the last argument to the function `List.map`.

To understand the rationale behind this convention, it is fundamental to understand currying.

### Currying and partial application

[Currying](https://en.wikipedia.org/wiki/Currying) means that functions take just one parameter, and if we want to have something like multiple parameters, we can just have functions return other functions.

In Reason, there is [syntactic sugar](https://en.wikipedia.org/wiki/Syntactic_sugar) to define functions as if they took multiple parameters, but in reality they are one-parameter functions that return other functions.

As an example, the functions `f` and `g` below are equivalent:

```reason
let f = (a, b, c) => a + b + c;
let h = f(1, 2, 3); /* 6 */

let g = a => b => c => a + b + c;
let i = g(1, 2, 3); /* 6 */
```

Currying enables to partially apply functions, so one can write:

```reason
let add = (a, b) => a + b;
let addTwo = add(2);
let t = addTwo(2); /* 4 */
let s = addTwo(5); /* 7 */
```

Continuing the list mapping example above, we could abstract the function that adds 1 to all elements by taking advantage of currying:

```reason
let addOneToList = List.map(a => a + 1);
let listA = [1, 2, 3];
let listB = addOneToList(listA); /* [2, 3, 4] */
```

We can also abstract `a => a + 1` in a new `plusOne` function, if we need to reuse it:

```reason
let plusOne = a => a + 1;
let addOneToList = List.map(plusOne);
let listA = [1, 2, 3];
let listB = addOneToList(listA); /* [2, 3, 4] */
```

This is a very powerful (de)composition mechanism. Functions can be left partially applied so they can be combined together, passed around, or fully applied later on. This style of programming, where functions like `addOneToList` are implemented without enumerating their parameters explicitly, is known as [point-free programming](https://en.wikipedia.org/wiki/Tacit_programming). And point-free programming is only possible because of currying and partial application.

### The pipe operator `|>`

Functional languages, which already had currying support by default, naturally gravitated towards data-last. The final push for the adoption of this convention was the pipe operator, which was [originally introduced](https://blogs.msdn.microsoft.com/dsyme/2011/05/17/archeological-semiotics-the-birth-of-the-pipeline-symbol-1994/) in [Isabelle](https://en.wikipedia.org/wiki/Isabelle_%28proof_assistant%29), a theorem prover written in StandardML. It would later be adopted in many other languages like OCaml, Haskell, F#, or Elm.

The main problem the pipe operator was trying to solve is when applying many functions one after each other, chaining the result of one function to the parameters of the next becomes was quite verbose and tedious.

The pipe operator solves this by passing the value on its left side as the last parameter of the expression that is placed at the right side.

So:

```reason
let filtered = list |> List.filter(a => a > 1);
```

is equivalent to:

```reason
let filtered = List.filter(a => a > 1, list);
```

_Side note: in practice, it is not exactly translated with such a straight forward conversion, as there is an extra function call involved, as we will see below._

To see the impact the pipe operator can have in readability and conciseness, here is a more complex example.

Instead of writing:

```reason
let getFolderSize = folderName => {
  let filesInFolder = filesUnderFolder(folderName);
  let fileInfos = List.map(fileInfo, filesInFolder);
  let fileSizes = List.map(fileSize, fileInfos);
  let totalSize = List.fold((+), 0, fileSizes);
  let fileSizeInMB = bytesToMB(totalSize);
  fileSizeInMB;
};
```

one can write:

```reason
let getFolderSize = folderName =>
  folderName
  |> filesUnderFolder
  |> List.map(fileInfo)
  |> List.map(fileSize)
  |> List.fold((+), 0)
  |> bytesToMB;
```

A significant simplification!

The pipe operator allows us to pass the result of each expression as an input to the next one, without having to name the result of each step and explicitly pass it to the next function call.

### A convention in many functional languages

We have seen how currying enables partial application, and how this feature allows to compose functions easily, which was at the origin of the data-last convention.

Also, we saw how the pipe operator contributes to adopt this convention by passing the result of an expression as the last argument of the next.

The data-last convention is not exclusive of OCaml and Reason, many other languages like [Elm](https://package.elm-lang.org/help/design-guidelines#the-data-structure-is-always-the-last-argument), [F#](https://fsharpforfunandprofit.com/posts/partial-application/#designing-functions-for-partial-application), [Haskell](https://wiki.haskell.org/Parameter_order) or even JavaScript libraries like [Ramda](https://ramdajs.com/) adopted it.

## Data-first: a different approach

So why then did BuckleScript decide to move away from this convention, towards the "data-first" approach?

To understand it, we have to go first through a short trip through type inference and how the type checker evaluates code.

### Type inference: creating truth, one step at a time

In OCaml, type inference works from left to right, and from top to bottom. Here is a simple example that shows it:

```reason
let aList = [2, "a"];
                ^^^
```

```
Error: This expression has type string but an expression was expected of type int
```

We can see how the compiler gets to analyze the integer `2` first, so it takes that as the "truth": `aList` has type `list(int)`.

So when it encounters the second element of the list, the string `"a"`, it checks it against that truth. At that point, the compilation process fails because `string` and `int` are different types.

This might sound pretty obvious, probably because some of us might be more used to left-to-right written languages. But one could imagine a compiler that would analyze programs in a different way. Maybe. 😂

What does this have to do with "data-first" or "data-last"? A lot, as it turns out.

Let's see a small example:

```reason
let words = ["hi"]
let res = List.map(n => n + 1, words)
                               ^^^^^
```

```
Error: This expression has type list(string)
but an expression was expected of type list(int)
Type string is not compatible with type int
```

In this example, the compiler assumes the callback `n => n + 1` is the truth, so it infers we are dealing with a value of type `list(int)`. Then it finds `words`, of type `list(string)`, and fails.

However, if we are working with a data-first API, like [Belt](https://bucklescript.github.io/bucklescript/api/Belt.html):

```reason
let words = ["hi"]
let res = Belt.List.map(words, n => n + 1)
                                    ^
```

```
Error: This expression has type string but an expression was expected of type int
```

Note the difference: in this case, the compiler assumes the type of `words`, `list(string)`, is the truth, and then it fails when the callback returns an `int` type. Note also how the error message is simpler: **the compiler is not matching `list(int)` against `list(string)`** like in the first case, **but `int` against `string`**. Because it is operating already "inside" the callback, it can match the type of `n` (`string`) against the type of `1` (`int`).

This might not seem a big deal in this small example, but for real applications where the functions and data become more complex, the errors can become quite more cryptic with the data-last approach, because the compiler is assuming the source of truth is that of the "lifted" types of the callback: list, maps, options and any other "wrapping" types that are used in those callbacks.

### Contextually typed arguments

As we are seeing, data-first can be more ergonomic towards inference, considering the type checker processes code from left to right. In a few situations, the compiler might not have enough contextual information to infer the types of data-last functions properly.

Let's say we have a module `User` with the following implementation:

```reason
module User = {
  type t = {
    name: string,
    age: int,
  };
  let admins = [
    {name: "Jane", age: 30},
    {name: "Manuel", age: 72},
    {name: "Lin", age: 54},
  ];
}
```

Now, outside this module, we want to get a list with the ages of the `admins` users. We use OCaml standard library function `List.map`:

```reason
module User = { ... }
let ages = List.map(u => u.age, User.admins);
                           ^^^
```

```
The record field age can't be found.
If it's defined in another module or file, bring it into scope by:
  - Annotating it with said module name: let baby = {MyModule.age: 3}
  - Or specifying its type: let baby: MyModule.person = {age: 3}
```

> [Try it yourself](https://reasonml.github.io/en/try?rrjsx=true&ocaml=LYewJgrgNgpgBAVQM4wE5wLwCg5yQF1QgGN8dc58BPAB3n0zgG9yK4A7AQ2BgC49CAS3YBzANysKnEXzjD8YgL6TYDTmGDCkmSbgDaTDt3gY4ACjMAiAFKd2MSwEo9AAVQxOSEOwB0qTgDuAPpQgvhonFBwNnYOALqOYnDSJnAAzAAMcIoSbLiGXDyMFpYAsnYQMFBOru6e3n6BIWERUWUVVZYJSSmMAOwATNm5eQXGxVYAMsI1bh5evv7BoeH+bdPsXYnJMowArAAs2XHkMOxgWKo7MNqm0wQ+wJw05gBmEOxwELgAtAB8Xx8KUciBQqCBGi0QA).

Whoa whoa there compiler... "_annotating it_"? "_specifying its type_"?! I was promised OCaml had such a powerful inference engine that I would never need to write any more type annotations! 😄

Jokes aside, it seems the compiler can't figure out that we want to get the value from the field `age` of a record of type `User.t`, even if it has `User.admins` right next to the callback, and it knows it has type `list(User.t)`.

We can solve the problem by annotating it with the module name, as suggested by the compiler error message:

```reason
let ages = List.map(u => u.User.age, User.admins);
```

This is a consequence of the way type inference works: as we saw, type checking is done left to right, so when the compiler evaluates the `map` callback `u => u.age`, in the case without type annotations, it has no information about what `u` is. The type checker errors out before being able to reach the expression that actually has enough information to infer the type.

Maybe if we used the pipe operator, it would work? The order of the parameters would be inverted, and `User.admins` would appear first in that case. 🤔

Let's see:

```reason
let ages = User.admins |> List.map(u => u.age);
                                          ^^^
```

```
Error: The record field age can't be found.
```

Still the same issue.

This doesn't work because the pipe operator is an [infix](https://en.wikipedia.org/wiki/Infix_notation) operator, which is a fancy way of saying it's like a function that takes two parameters, with the "infix" meaning each parameter is placed at each side of the operator.

If we wrote it as a plain function `pipeOp`, the code above would be equivalent to something like:

```reason
let pipeOp = (|>);
let ages = pipeOp(User.admins, List.map(u => u.age));
```

`User.admins` appears first, but the type checker still analyzes the callback body _before_ evaluating the `map` function as a whole, so it still doesn't have enough information to know where the field `age` is coming from.

In other words, in data-last designed APIs, all the arguments that come before the last and also depend on it will be "type inference islands" 🏝, with the compiler not being able to thread any existing contextual "truth" through them.

### Go with the flow

With a data-first approach to API design, the need for a manual type annotation goes away:

```reason
let ages = Belt.List.map(User.admins, u => u.age);
```

This compiles just fine, without any annotations needed! ✨

> You can [try it here](https://reasonml.github.io/en/try?rrjsx=true&reason=LYewJgrgNgpgBAVQM4wE5wLxwN4Cg5wAuAngA7yGY74FwB2AhsDAFxxKGoCWdA5gDQ0CDXqzg9CgggF8A3DViUGYYDyRUA2kJyNmbAEQApBnRj7+cEWIDMABmlTa2XWP0BZExBhRzl0WwB2ACYHbWcmVwAZHl8rNgBWABZQggBdeTlcRT8YdSwAIW9CADpojmLgBlIACmQ0YuVVOiQLCEwAPjgIBtEASnkgA).

The compiler now can infer that the `u` expression in the callback parameter has type `User.t`, and so when it sees the `u.age` expression on the right side, it can be 100% sure where it comes from, and make sure the body of the callback is valid.

The problem has two sides though: with data-first, the values inside the callback are being inferred because `admins` is namespaced with the module `User`. If that wasn't the case, we would run into the same issue if we wanted to, for example, pick an element from `admins` list and read its `age`. [Jordan Walke](https://twitter.com/jordwalke) gave an example on how this limitation goes both ways in [one of the first discussions](https://github.com/facebook/reason/issues/1452#issuecomment-350424873) about introducing the pipe-first operator to Reason.

However, real-world scenarios tend to follow these patterns:
- The type of the data that is fed into a sequence of functions is generally known upfront.
- The need for "reaching inside the data" —like, accessing the field of a record— happens generally inside the callback functions.

Due to those two situations, there is an advantage on having the types being propagated by the compiler through the callbacks, which is what a data-first API offers.

### The pipe first operator `->`

In the same vein as the pipe operator `|>`, BuckleScript introduced a [pipe first operator](https://bucklescript.github.io/docs/en/pipe-first) that instead passes the resulting value of the expression in the left side as the _first_ parameter of the one on the right.

So, for example:

```reason
let filtered = list->Belt.List.filter(a => a > 1);
```

is equivalent to:

```reason
let filtered = Belt.List.filter(list, a => a > 1);
```

Another important difference from the `|>` operator is that `->` is not an infix operator, just [syntactic sugar](https://en.wikipedia.org/wiki/Syntactic_sugar), so it is really as if you were writing the second form instead of the first from the compiler perspective. With the traditional pipe `|>` it is interpreted like applying a function.

## Advantages and disadvantages of data-first

As we have seen, data-first remains more closely to how type inference works. We also saw how this:

- Helps the compiler infer types in functions that take callbacks as parameters, without having to manually add type annotations.
- Makes error messages simpler.

This might not seem like a very big deal on its own, but it has a lot of impact down the line that affects the resulting developer experience.

### Better IDE integration

A direct consequence of the data-first approach that benefits from the compiler having more information is that we get more help from editor extensions when writing our functions.

In the example above, as we are writing it:

```reason
let ages = Belt.List.map(User.admins, u => u.
                                             ◻️ age
                                             ◻️ name
```

The editor extensions, as they rely on the information provided by compiler, can know that `u` is a value of the record type `User.t`, and can provide autocompletion for the fields in it. Very helpful!

The advantages of the data-first approach when it comes to editor integration is something that language designers with a vast experience like Anders Hejlsberg —creator and lead architect of TypeScript— [have pointed out in the past](https://github.com/Microsoft/TypeScript/issues/15680#issuecomment-307571917).

### Intuitive order for functions with more than one parameter of the same type

One of the downsides of the data-last approach is that sometimes it makes harder to understand what a function with two parameters of the same type is doing.

For example, the `Js.Array.concat` function exposed by BuckleScript:

```reason
let foo = Js.Array.concat([|1|], [|2, 3|])
```

Because we are used to left-to-right reading —like the inference engine— we could guess the resulting value of `foo` is the array `[|1, 2, 3|]`, but it's actually `[|2, 3, 1|]` because the API is data-last.

Another example is the `Js.String.split`:

```reason
let bar = Js.String.split("a|b|c", "|")
```

The resulting value is an array with one element, `["|"]` instead of `["a", "b", "c"]`. The [`Js.String` module](https://bucklescript.github.io/bucklescript/api/Js.String.html) in BuckleScript was originally designed to follow the data-last approach as well.

So, if we are not using currying and the pipe operator, we have to read the parameters "backwards" when dealing with data-last functions, which is not very intuitive.

### Performance

Pipe first operator `->` is implemented as purely syntactic sugar, as mentioned above. This means that, from BuckleScript compiler perspective, the usage of `->` means that no extra functions calls are involved.

This is not what happens with the pipe last operator `|>`, that gets compiled into a function call. While the OCaml compiler does a lot of optimizations behind the scenes, the added complexity of pipe last from the compiler perspective makes the resulting output more complex in some specific cases.

For example, let's say we have two versions of the same function, data-last and data-first, to fetch some users. It's a simple example, but common enough:

```reason
let fetchLast = (~prefix="", ~fetch, url) => fetch(prefix ++ url);
```

```reason
let fetchFirst = (url, ~prefix="", ~fetch, ()) => fetch(prefix ++ url);
```

The output of these two functions is essentially the same, so we will not spend much time on that.

However, let's see how the usage of these functions would look like, supposing we want to fetch some users with `fetchLast`:

```reason
let result1 =
  "/users"
  |> fetchLast(~fetch=url => {
       validate(url);
       getUser(url);
     });
```

The JavaScript output produced by BuckleScript would be (prettified):

```javascript
function arg(url) {
  validate(url);
  return getUser(url);
}

var result1 = (function(param) {
  return function(param$1) {
    return fetchLast(param, arg, param$1);
  };
})(undefined)("/users");
```

The complexity of the data-last version's output is coming from the optional parameter. In the first case, BuckleScript is not able to uncurry the function call. It is forced to leave the resulting code curried and unoptimized: there are two unnecessary function calls.

With data-first:

```reason
let result2 =
  "/users"
  ->fetchFirst(
      ~fetch=
        url => {
          validate(url);
          getUser(url);
        },
      (),
    );
```

And the output:

```javascript
var result2 = fetchFirst(
  "/users",
  undefined,
  function(url) {
    validate(url);
    return getUser(url);
  },
  0
);
```

> You can try this whole example [here](https://reasonml.github.io/en/try?rrjsx=true&reason=NoAQRgzgdAbghgGwLoAICmAPALmgTgO0RQHM0sBVCPFALhQHI4UBeAPgaeZQCJuBuAFChIsRKkw4CReAgCWAEzg5aHFu0Yse-AQjIoAZmQDGACwAycCFk0AKAH4AHXGn2yMzXgBoUdw1lPeAK64CACUagbGJjZOLm4oANQJKMFhgrrWfqYAYrK4Vrap3o7Oru5ePlkm3jah4WyR-tGxZYnJqaHpes4QgQhYAIwsAig8APSBVPncIygAPuxVFlb2VcypEQDes6O7MgpKaDYdgrtnpBRTxyGdO6MAvrcZKD19WABMw6PcE1MQM6MALSsKq5fJYGx3Ua+KLMKG7DYNbZnFEofaKHDXNLw85kSh4LG3VEPTzw2qks63IA).

Quite simpler! The resulting code went from two unnecessary function definitions and a curried application for both of them, to code with no uneeded function calls.

You might notice that if we take the callback passed as the `fetch` param and move it to its own function, the optimizations from the compiler will kick in and the output code will be mostly the same ([try it here](https://reasonml.github.io/en/try?rrjsx=true&ocaml=KYDwLsBOB2CGA2ACA5sMBVAzlRAuRA5LIgLQB8hxAvIgES0DaAAkwEaYB0AbgogLoAoUBBi8e8AJYATWBDyVSFIohr1mbTuP4D4aRADM0AYwAWAGViYwiAPwAKAA6Rg+iSFW0AlIkQA-Q2CmPgCukEg0AUGOzq4giAB6iKHwnjp6kSYAYhKQVklhttEubh7efhk+dt4RxiaIRbEJ+Slp1tbJKoji0rLAzQDcKGhYOMmtiM6YwfBgAIwqApV2tAD0wdi5XszOlgD20ByQsADuAPqSIryr61CYtHzeAD4UdhkWef61uGCputaT0zAACYFktlmsNndPNtgHsDkczhcoFcIbd7k8OAZatlcj9yl9rFUgA)).

That is true, but in many cases, and especially coming from a JavaScript background, callbacks are left inline. And that trend won't cease to grow: now [React hooks](https://reactjs.org/blog/2019/02/06/react-v16.8.0.html) are here, and together with hooks will come a _lot_ of inlined functions [for effects](https://overreacted.io/a-complete-guide-to-useeffect) and other callbacks, that can benefit from the optimizations that the compiler can do with a data-first approach and the pipe-first operator.

### Worse integration with optional parameters

The example above shows one of the main disadvantages of the data-first approach: with data-last and optional labelled arguments, one doesn't need to add an extra `unit` parameter at the end of the function: whenever the data is passed (`jane` in the example above) the compiler knows the function is being applied, and thus sets all optional values to `None`:

```reason
let update = (~isAdmin=false, u: user) => { ... };
```

With data-first this is not possible. Because the data comes first and then all the optional values, we are forced to always include a `unit` type as last param to make sure the compiler knows when the function has been fully applied:

```reason
let update = (u: user, ~isAdmin=false, unit) => { ... };
```

### Less straight-forward composition

As mentioned at the beginning, data-last allows to compose functions very ergonomically, as one can partially apply a function by passing some parameters to it, and leave the last one to be filled later on.

With data-first, it is not that straight forward though. Adapting the original example with `plusOne` and `addOneToList`, we can see how partially applying the `map` call is not possible anymore, unless we use another function that flips the two parameters:

```reason
let plusOne = a => a + 1;
let addOneToList = list => Belt.List.map(list, plusOne);
                                           ↑      ↑
                   /* Can't pass `plusOne` without passing `list` first */
```

To get around this problem, Reason introduced something called [pipe placeholders](https://reasonml.github.io/docs/en/pipe-first#pipe-placeholders) to indicate a positional argument that will be filled later:

```reason
let plusOne = a => a + 1;
let addOneToList = Belt.List.map(_, plusOne);
let listA = [1, 2, 3];
let listB = addOneToList(listA); /* [2, 3, 4] */
```

### Usages in OCaml and other languages

Data-first convention and pipe first operator are not maybe as traditional as data-last, but there are some other usages in functional and object-oriented languages.

- [Elixir](https://hexdocs.pm/elixir/Kernel.html#%7C%3E/2) includes in the core language a pipe operator that passes the value as the first param called pipe-forward, and [its standard library](https://hexdocs.pm/elixir/List.html#summary) has been designed with data-first in mind.
- There are some [commonly used libraries](https://ocaml.janestreet.com/ocaml-core/latest/doc/core_kernel/Core_kernel/Map/) in OCaml that have adopted a data-first approach in their design. Even some OCaml imperative APIs use it, like the ones found in [`Hashtbl`](http://caml.inria.fr/pub/docs/manual-ocaml/libref/Hashtbl.html).
- In other cases, like C#, there are [proposals](https://github.com/dotnet/csharplang/issues/96) to include pipe-first operator in the future.

## Conclusion

So, if you have read until here, first, you're awesome 😄 and second, what could we conclude?

From all the data seen above, there is no clear "better way", both data-first and data-last have their own set of trade-offs.

Data-last has:

- A long tradition in functional languages
- Great integration with partially applied functions
- More straight-forward composition
- A simpler solution for application of functions with optional labelled arguments
- Works with `|>`, which is supported by default on every OCaml backend.

If you'd like to keep more portability (say you want to keep open the possibility of doing fullstack ReasonML), there is a stronger case for data-last and `|>`.

Data-first provides:

- Simpler compiler errors
- More accurate type inference
- Smaller compiled output (better performance)
- Better IDE integration
- More intuitive APIs for left-to-right readers

As you can see, both approaches have multiple upsides, and that is probably why this is a controversial topic: there is no apparent "right" choice. In the end, I would say that going one way or another largely depends on what are the values, intention and audience of the specific language or libraries.

In BuckleScript's case, I think it made sense to go with the data-first approach, as it is targeting developers that come from JavaScript and are exploring a new language. Because JavaScript is not a curried language, the value these developers might get back from straight forward inference, simpler error messages and better editor integration of data-first might be more helpful than the advantages of data-last.

The fact that the creator of TypeScript seems to agree on the ergonomics of data-first APIs, and also that the [TC39](https://www.ecma-international.org/memento/tc39-rf-tg.htm) is considering pipe-first as part of the [pipeline operator proposal](https://github.com/tc39/proposal-pipeline-operator/issues/143) are other relevant data points in such a large and nuanced landscape.

---

Thanks for reading! I hope the goal of the article was accomplished and it helped make clearer what the rationale was behind this decision. If you want to share any feedback, please reach out [on Twitter](https://twitter.com/javierwchavarri/).

Keep shipping! 🚀

*Many thanks to [Yawar Amin](https://twitter.com/yawaramin/) and [Cheng Lou](https://twitter.com/_chenglou) for reviewing an early version of this article.*

[^tlast]: In OCaml, it's idiomatic to use `t` as the main type of a module, so data-first and data-last are commonly referred to as _t-first_ and _t-last_. The former, more generic naming is used in this article.
