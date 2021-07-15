---
id: collections
title: Streams and Subscriptions
---

Effection ships with a powerful library for working with streams of values.
This allows you to create complex systems where evented code, stateful code and
concurrent asynchronous code all are working together seamlessly.

If you're familiar with reactive programming libraries such as [Rx.js][rx],
then this functionality should feel familiar. It is also somewhat similar to
[asynchronous iterators][].

## Queue

Before we look at Subscriptions and Streams, let's look at another powerful
concept: the Queue. Effection ships with a `createQueue` functions which returns
a `Queue`. It can be used like this:

``` javascript
import { main, createQueue } from 'effection';

main(function*() {
  let queue = createQueue();

  queue.send('hello');
  queue.send('world');

  console.log(yield queue.expect()); // logs 'hello'
  console.log(yield queue.expect()); // logs 'world'
});
```

As you can see, we can push values into the queue using `send`, and then we can
fetch values from the queue using `expect`.

## Subscription

You have already met a Subscription, because `Queue` is in fact a
`Subscription`! Or rather you can think of the *receiving* end of the queue as
a subscription.

A subscription is a basically an iterator over a stream of values. Taking the
next value from the subscription returns the next value and crucially also
removes it, so we don't iterate the same value twice. Subscriptions are
stateful objects, and calling methods such as `next` or `expect` on them
changes the state of the subscription.

Another way of consuming values from the subscription is using `forEach`:

``` javascript
import { main, createQueue } from 'effection';

main(function*() {
  let queue = createQueue();

  queue.send('hello');
  queue.send('world');

  yield queue.forEach(function*(value) {
    console.log(value); // logs 'hello', then 'world'
  });
});
```

`forEach` will block and wait for values until the subscription closes.

## Stream

A Stream in contrast is a completely stateless object. It is something that can
be subscribed to! A Stream can have many subscriptions, each of which receives
the *same* set of values. Effection ships with `Channel`, which is similar to
`Queue`, but returns a Stream instead of a Subscription. Let's use this to show
the difference between streams and subscriptions:

``` javascript
import { main, createChannel } from 'effection';

main(function*() {
  let channel = createChannel();

  channel.send('too early'); // the channel has no subscribers yet!

  let firstSubscription = yield channel.subscribe();
  let secondSubscription = yield channel.subscribe();

  channel.send('hello');
  channel.send('world');

  console.log(yield firstSubscription.expect()); // logs 'hello'
  console.log(yield firstSubscription.expect()); // logs 'world'
  console.log(yield secondSubscription.expect()); // logs 'hello'
  console.log(yield secondSubscription.expect()); // logs 'world'
});
```

As you can see, the channel can have multiple subscribers and sending a message
to the channel adds it to each active subscription. If the channel does not
have any active subscriptions, then sending a message to it does nothing.

## Transforming Streams

Streams can be transformed into other streams through the `map`, `filter` and
`match` methods. This is similar to the `map` and `filter` methods on arrays.

Let's look at an example of this:

``` javascript
import { main, createChannel } from 'effection';

main(function*() {
  let channel = createChannel();
  let textStream = channel.map((value) => value.text);
  let uppercaseStream = textStream.map((value) => value.toUpperCase());

  let subscription = yield uppercaseStream.subscribe();

  channel.send({ text: 'hello' });
  channel.send({ text: 'world' });

  console.log(yield subscription.expect()); // logs 'HELLO'
  console.log(yield subscription.expect()); // logs 'WORLD'
});
```

If we unpack this a bit, we can see that we're creating a new `Stream` called
`channel` using the method `map` on the stream. This stream gets the `text`
property from each value in the stream.

We then use `map` again on `textStream` to create `uppercaseStream`, which
converts each value into uppercase.

When we subscribe to `uppercaseStream` and send a value to the channel, we can
see that all of our transformations are applied.

`filter` can be used to restrict the values emitted by the stream:

``` javascript
import { main, createChannel } from 'effection';

main(function*() {
  let channel = createChannel();
  let elloStream = channel.filter((value) => value.match(/ello/));

  let subscription = yield elloStream.subscribe();

  channel.send('hello');
  channel.send('world'); // our filtered stream skips over this value
  channel.send('jello');

  console.log(yield subscription.expect()); // logs 'hello'
  console.log(yield subscription.expect()); // logs 'jello'
});
```

The `match` method is similar to `filter` but allows you to do structural
matching against the values of the stream:

``` javascript
import { main, createChannel } from 'effection';

main(function*() {
  let channel = createChannel();
  let planetStream = channel.match({ type: 'planet' }).map((value) => value.name);

  let subscription = yield elloStream.subscribe();

  channel.send({ type: 'planet', name: 'Earth');
  channel.send({ type: 'planet', name: 'Jeff' }); 'world'); // our filtered stream skips over this value
  channel.send({ type: 'planet', name: 'Jupiter');

  console.log(yield subscription.expect()); // logs 'Earth'
  console.log(yield subscription.expect()); // logs 'Jupiter'
});
```

## Consuming Streams

Once we have a stream, we would normally like to consume values from it, we
have already seen how we can use `subscribe` to subscribe to a Stream and turn
a Stream into a Subscription. But there is an easier way! We can use the
`forEach` method to subscribe to a stream and iterate its values all in one go:

``` javascript
import { main, createChannel, spawn, sleep } from 'effection';

main(function*() {
  let channel = createChannel();

  yield spawn(function*() {
    yield sleep(1000);
    channel.send('hello')
    yield sleep(1000);
    channel.send('world')
  });

  yield channel.forEach(function*(value) {
    console.log('got value:', value);
  });
});
```

Why do we need to use `spawn` here? We know that sending values to a Stream
does nothing unless someone is subscribed to the Stream, so we cannot send any
values before we call `forEach`, but we also cannot send any values *after* we
call `forEach` because `forEach` blocks until the stream closes (more about
that later). So we need to run both the `forEach` and the sending of values
concurrently, and as we've already learned, when we need to do multiple things
concurrently, that's when we use `spawn`.

We could also flip this example around like this:

``` javascript
import { main, createChannel, spawn, sleep } from 'effection';

main(function*() {
  let channel = createChannel();

  yield spawn(channel.forEach(function*(value) {
    console.log('got value:', value);
  }));

  yield sleep(1000);
  channel.send('hello')
  yield sleep(1000);
  channel.send('world')
});
```

Another way of consuming values from a stream is to use the `first` and
`expect` methods. Their behaviour only differs in what happens when the stream
is prematurely closed.

``` javascript
import { main, createChannel, spawn, sleep } from 'effection';

main(function*() {
  let channel = createChannel();

  yield spawn(function*() {
    yield sleep(1000);
    channel.send('hello')
    yield sleep(1000);
    channel.send('world')
  });

  let value = yield channel.expect();
  console.log(value); // logs 'hello'
});
```

As you can see here, once we send any value to the Stream, `expect` returns that
value. Now you might be tempted to call `expect` multiple times, like this:

``` javascript
// THIS IS NOT IDEAL
import { main, createChannel, spawn, sleep } from 'effection';

main(function*() {
  let channel = createChannel();

  yield spawn(function*() {
    yield sleep(1000);
    channel.send('hello')
    yield sleep(1000);
    channel.send('world')
  });

  let firstValue = yield channel.expect();
  console.log(firstValue); // logs 'hello'

  let secondValue = yield channel.expect();
  console.log(secondValue); // logs 'world'
});
```

And while this works, it has a problem that becomes apparent if we slightly
change the order we do things in:

``` javascript
// THIS IS NOT IDEAL
import { main, createChannel, spawn, sleep } from 'effection';

main(function*() {
  let channel = createChannel();

  yield spawn(function*() {
    yield sleep(1000);
    channel.send('hello')
    channel.send('world')
  });

  let firstValue = yield channel.expect();
  console.log(firstValue); // logs 'hello'

  yield sleep(1000);

  let secondValue = yield channel.expect(); // will block forever! We missed the message!
  console.log(secondValue); // we never get here!
});
```

This makes it very clear why Subscriptions are necessary! A subscription
guarantees that we can never miss any messages! Here we can see how
Subscriptions are more resilient:

``` javascript
import { main, createChannel, spawn, sleep } from 'effection';

main(function*() {
  let channel = createChannel();

  let subscription = yield channel.subscribe();

  yield spawn(function*() {
    yield sleep(1000);
    channel.send('hello')
    channel.send('world')
  });

  let firstValue = yield subscription.expect();
  console.log(firstValue); // logs 'hello'

  yield sleep(1000);

  let secondValue = yield subscription.expect();
  console.log(secondValue); // logs 'world'
});
```

## Closing subscriptions

*Coming soon*

[rx]: https://rxjs.dev
[asynchronous iterators]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for-await...of
