---
id: lifecycle
title: Task Lifecycle
---

We have talked about how Effection operations are able to clean up after
themselves, but how are they able to do this, and how can you implement your
own operations which clean up after themselves?

### Halt

In order to understand the lifecycle of a Task, we must first understand the
concept of halting a Task.

In Effection, any task can be halted:

``` javascript
import { main } from 'effection';

let task = main(function*() {
  yield
});

task.halt();
```

Or:

``` javascript
main(function*() {
  let task = yield spawn();
  yield task.halt();
});
```

Halting a Task means that the task itself is cancelled, it also causes any Task
that has been spawned from the Task to be halted.

We have previsouly mentioned that when an error occurs in a Task, the task
becomes errored, and also causes its parent to become errored. However, if a
Task is halted, the parent task is unaffected.

### Return

If a Task is driving a generator, we call `return()` on the generator. This
behaves somewhat similarly to if you would replace the `yield` statement with a
`return` statement.

Let's look at an example where a task is suspended using `yield` with no
arguments and what happens when we call `halt` on it:

``` javascript
import { main } from 'effection';

let task = main(function*() {
  yield; // we will "return" from here
  console.log('we will never get here');
});

task.halt();
```

This would behave somewhat similarly to the following:

``` javascript
import { main } from 'effection';

main(function*() {
  return;
  console.log('we will never get here');
});
```

Crucially, when this happens, just like with a regular `return`, we can use `try/finally`:

``` javascript
import { main, sleep } from 'effection';

let task = main(function*() {
  try {
    yield // we will "return" from here
  } finally {
    console.log('yes, this will be printed!');
  }
});

task.halt();
```

### Cleaning up

We can use this mechanism to run code as a Task is shutting down, whether it
happens because the Task completes successfully, it becomes halted, or it is
rejected due to an error.

Imagine that we're doing something with an HTTP server, and we're using node's
`createServer` function. In order to properly clean up after ourselves, we
should call `close()` on the server when we're done.

Using Effection and `try/finally`, we could do something like this:

``` javascript
import { main } from 'effection';
import { createServer } from 'http';

let task = main(function*() {
  let server = createServer();
  try {
    // in real code we would do something more interesting here
    yield;
  } finally {
    server.close();
  }
});

task.halt();
```

### Asynchronous halt

You might be wondering what happens when we `yield` in a finally block. In
fact, Effection handles this case for you:

``` javascript
import { main, sleep } from 'effection';

let task = main(function*() {
  try {
    yield;
  } finally {
    console.log('this task is slow to halt');
    yield sleep(2000);
    console.log('now it has been halted');
  }
});

task.halt();
```

While performing asynchronous operations while halting is sometimes necessary,
it is good practice to keep halting speedy and simple. We recommend avoiding
expensive operations during halt where possible, and avoiding throwing any
errors during halting.

### Ensure

Sometimes you want to avoid the righward drift of using lots of `try/finally` blocks.
The `ensure` operation that ships with Effection can help you clean up this type of code.

The following behaves identically to our `try/finally` implementation above:

``` javascript
import { main, ensure } from 'effection';
import { createServer } from 'http';

let task = main(function*() {
  let server = createServer();
  yield ensure(() => server.close());

  // in real code we would do something more interesting here
  yield;
});

task.halt();
```


### Lifecycle

The current state of a Task can be accesses through the `state` property:

``` javascript
import { main } from 'effection';

let task = main(function*() {
  yield;
});

console.log(`task is ${task.state}`) // prints "task is running"
```

The `state` can be any of:

- **pending:** the Task has not yet been started
- **running:** the Task is currently running
- **completing:** the Task has completed and is in the process of halting its children
- **halting:** `halt` has been called on the Task and it is in the process of halting itself and its children
- **erroring:** an error has occurred in the Task or any of its children. The task is being halted, as well as its children.
- **completed:** the Task is fully complete and all of its children have been halted
- **halted:** the Task is fully halted and all of its children have been halted as well
- **errored:** an error has occurred in the Task or any of its children. The task is fully halted and all of its children have been halted as well.
