[![npm](https://img.shields.io/npm/v/effection.svg)](https://www.npmjs.com/package/effection)
[![bundle size (minified + gzip)](https://img.shields.io/bundlephobia/minzip/effection)](https://bundlephobia.com/result?p=effection)
[![CircleCI](https://circleci.com/gh/thefrontside/effection.js.svg?style=svg)](https://circleci.com/gh/thefrontside/effection.js)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Created by Frontside](https://img.shields.io/badge/created%20by-frontside.io-blue.svg)](https://frontside.com)
[![Chat on Discord](https://img.shields.io/discord/700803887132704931?Label=Discord)](https://discord.gg/Ug5nWH8)

# effection

Effortlessly composable structured concurrency primitive for
JavaScript

See [examples](examples/)

To run an example with NAME:

``` text
$ node -r ./tests/setup examples/NAME
```

## Structured Concurrency and Effects

> Note: For an general introduction to the concept of structured
> concurrency, and why it is so important, see [this excellent primer
> on the subject][1] by Nathaniel Smith.

There's an entire hive of bugs that occur when asynchronous processes
outlive their welcome. The concept of structured concurrency eliminates
these altogether by providing the following guarantees:

1. A process is considered pending (unfinished) while it is either
   running or when it has _any_ child process that is pending.
2. If an error occurs in a process that is not caught, then that error
   propagates to the parent process.
3. If a process finishes in error or by halting, then all of its child
   process are immediately halted.

For example, if you have the following processes:

``` text
+ - parent
  |
  + --- child A
  |
  + --- child B
```

We can make the following assertions based on these guarantees :

a. If the code associated with `parent` finishes running, but _either_ `A`
_or_ `B` are pending, then `parent` is still considered pending.

b. If `parent` is halted, then _both_ `A` and `B` are halted.

c. If an error is raised in `parent`, then _both_ `A` and `B` are
halted.

d. if an error is raised in `A`, then that error is also raised in
`parent`, _and_ child `B` is halted.

scenario `d` is of particular importance. It means that if a child
throws an error and its parent doesn't catch it, then all of its
siblings are immediately halted.

## Context

Every operation takes place within an execution context. To create the
very first context, use the `spawn` function and pass it a generator. This
example waits for 1 second, then prints out "hello world" to
the console.

``` javascript
import { spawn, timeout } from 'effection';

let context = spawn(function*() {
  yield timeout(1000);
  return 'hello world';
});

context.isRunning //=> true
// 1000ms passes
// process.isRunning //=> false
// process.result //=> 'hello world'
```

Child processes can be composed freely. So instead of yielding for
1000 ms, we could instead, yield 10 times for 100ms.

``` javascript
spawn(function*() {
  yield function*() {
    for (let i = 0; i < 10; i++) {
      yield timeout(100);
    }
  }
  return 'hello world';
})
```

And in fact, processes can be easily and arbitrarly deeply nested:

``` javascript
let process = spawn(function*() {
  return yield function*() {
    return yield function*() {
      return yield function*() {
        return 'hello world';
      }
    };
  };
});

process.isCompleted //=> true
process.result //=> "hello world"
```

You can pass arguments to an operation by invoking it.

``` javascript

import { spawn, timeout } from 'effection';

function* waitForSeconds(durationSeconds) {
  yield timeout(durationSeconds * 1000);
}

spawn(waitforseconds(10));
```

### Asynchronous Execution

Sometimes you want to fork some processes in parallel and not
necessarily block further execution on them. You still want the
guarantees associated with structured concurrency however. For
example, you might want to create a couple of different servers as
part of your main process. To do this, you would use the `fork` method
on the execution:

``` javascript
import { spawn, fork } from 'effection';

spawn(function*() {
  yield fork(createFileServer);
  yield fork(createHttpServer);
});
```

Even though it exits almost immediately, the main process is not
considered completed until _both_ servers shutdown. More importantly
though, if we shutdown the main process, then both servers will be
halted.

## Development

yarn install

``` text
$ yarn
```

run tests:

``` text
$ yarn test
```

[1]: https://vorpus.org/blog/notes-on-structured-concurrency-or-go-statement-considered-harmful/
