---
id: spawn
title: Spawn
---

Suppose we are using the `fetchWeekDay` function from the introduction to fetch the current weekday in multiple timezones:

``` javascript
import { main } from 'effection';
import { fetchWeekDay } from './fetch-week-day';

main(function*() {
  let dayUS = yield fetchWeekDay('est');
  let daySweden = yield fetchWeekDay('cet');
  console.log(`It is ${dayUS}, in the US and ${daySweden} in Sweden!`);
});
```

This works, but it slightly inefficient because we are running the fetches one
after the other. How can we run both `fetch` operations at the same time?

### Using `async/await`

If we were just using `async/await` and not using Effection, we might do
something like this to fetch the dates at the same time:

``` javascript
async function() {
  let dayUS = fetchWeekDay('est');
  let daySweden = fetchWeekDay('cet');
  console.log(`It is ${await dayUS}, in the US and ${await daySweden} in Sweden!`);
}
```

Or we could use a combinator such as `Promise.all`:

``` javascript
async function() {
  let [dayUS, daySweden] = await Promise.all([fetchWeekDay('est'), fetchWeekDay('cet')]);
  console.log(`It is ${dayUS}, in the US and ${daySweden} in Sweden!`);
}
```

### Cancellation

This works fine as long as both fetches complete successfully, but what happens
when one of them fails? Since there is no connection between the two tasks, a
failure in one of them has no effect on the other. We will happily keep trying
to fetch the US date, even when fetching the Swedish date has already failed!

For `fetch`, the consequences of this are not so severe, the worst that happens is
that we have a request which is running longer than necessary, but you can imagine
that the more complex the operations we're trying to combine, the more opportunity
for problems there are.

We are calling these situations "dangling promises", and most significantly complex
JavaScript applications suffer from this problem. `async/await` fundamentally does
not handle cancellation very well when running multiple operations concurrently.

### Effection

How does Effection deal with this situation? If we wrote the example using
Effection in the exact same way as the `async/await` example, then we will find
that it doesn't behave the same:

``` javascript
import { main } from 'effection';
import { fetchWeekDay } from './fetch-week-day';

main(function*() {
  let dayUS = fetchWeekDay('est');
  let daySweden = fetchWeekDay('cet');
  console.log(`It is ${yield dayUS}, in the US and ${yield daySweden} in Sweden!`);
});
```

This is still running one fetch after the other, and is not fetching both at
the same time!

To understand why, remember that calling a generator function does not do
anything by itself, only by passing the generator to `yield` or `run` do we
actually run the generator. So only when we `yield` to we actually start
fetching the dates.

We could use `run` here to run our operations, and then wait for them, but this
is not the correct way:

``` javascript
// THIS IS NOT THE CORRECT WAY!
import { main, run } from 'effection';
import { fetchWeekDay } from './fetch-week-day';

main(function*() {
  let dayUS = run(fetchWeekDay('est'));
  let daySweden = run(fetchWeekDay('cet'));
  console.log(`It is ${yield dayUS}, in the US and ${yield daySweden} in Sweden!`);
});
```

This has the same problem as our `async/await` example: a failure in one fetch
has no effect on the other!

### Introducing `spawn`

The `spawn` operation is Effection's solution to this problem!

``` javascript
import { main, spawn } from 'effection';
import { fetchWeekDay } from './fetch-week-day';

main(function*() {
  let dayUS = spawn(fetchWeekDay('est'));
  let daySweden = spawn(fetchWeekDay('cet'));
  console.log(`It is ${yield dayUS}, in the US and ${yield daySweden} in Sweden!`);
});
```

Like `run` and `main`, `spawn` takes an `Operation` and returns a `Task`. The
difference is that this `Task` becomes a child of the current `Task`. This
means it is impossible for this task to outlive its parent. And it also means
that an error in the task will cause the parent to fail.

You can think of this as creating a hierarchy like this:

```
+-- main
  |
  +-- fetchWeekDay('est')
  |
  +-- fetchWeekDay('cet')
```

When `fetchWeekDay('cet')` fails, since it was spawned by `main`, it will also
cause `main` to fail. When `main` fails it will make sure that none of its
children outlive it, and it will `halt` all of its remaining children. We end
up with a situation like this:

```
+-- main [FAILED]
  |
  +-- fetchWeekDay('est') [HALTED]
  |
  +-- fetchWeekDay('cet') [FAILED]
```

Effection tasks are tied to the lifetime of their parent, and it becomes
impossible to create a task whose lifetime is undefined. Additionally, the
behaviour of errors is very clearly defined. An error in a child will also
cause the parent to error, which in turn halts any siblings.

This idea is called [structured concurrency], and it has profound effects on
the composability of concurrent code.

### Using combinators

We previously showed how we can use the `Promise.all` combinator to implement
the concurrent fetch. Effection also ships with some combinators, for example
we can use the `all` combinator:

``` javascript
import { all, main } from 'effection';

main(function *() {
  let [dayUS, daySweden] = yield all([fetchWeekDay('est'), fetchWeekDay('cet')]);
  console.log(`It is ${dayUS}, in the US and ${daySweden} in Sweden!`);
});
```

### Direct spawning

Another way of spawning tasks is to call the `spawn` method on a task:

``` javascript
let task = run();
task.spawn(fetchWeekDay('est'));
task.spawn(fetchWeekDay('cet'));
```

This is often useful when integrating Effection into existing promise or
callback based frameworks.

When an Operation is a generator function, the first argument to the generator
function is the current task. We can use this to spawn tasks:

``` javascript
run(function*(task) {
  task.spawn(fetchWeekDay('est'));
  task.spawn(fetchWeekDay('cet'));
});
```

This is basically the same as the previous example.

[structured concurrency]: https://vorpus.org/blog/notes-on-structured-concurrency-or-go-statement-considered-harmful/
