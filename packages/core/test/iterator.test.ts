import { createNumber, blowUp } from './setup';
import { describe, it } from 'mocha';
import expect from 'expect';

import { run, sleep, Task, createFuture } from '../src/index';

describe('generator function', () => {
  it('can compose multiple promises via generator', async () => {
    let task = run(function*() {
      let one: number = yield Promise.resolve(12);
      let two: number = yield Promise.resolve(55);
      return one + two;
    });
    await expect(task).resolves.toEqual(67);
    expect(task.state).toEqual('completed');
  });

  it('can compose operations', async () => {
    let task = run(function*() {
      let one: number = yield createNumber(12);
      let two: number = yield createNumber(55);
      return one + two;
    });
    await expect(task).resolves.toEqual(67);
    expect(task.state).toEqual('completed');
  });

  it('rejects generator if subtask promise fails', async () => {
    let error = new Error('boom');
    let task = run(function*() {
      let one: number = yield createNumber(12);
      let two: number = yield blowUp;
      return one + two;
    });
    await expect(task).rejects.toEqual(error);
    expect(task.state).toEqual('errored');
  });

  it('rejects generator if generator creation fails', async () => {
    let task = run(function() {
      throw new Error('boom');
    });
    await expect(task).rejects.toHaveProperty('message', 'boom');
    expect(task.state).toEqual('errored');
  });

  it('rejects generator if subtask operation fails', async () => {
    let task = run(function*() {
      let one: number = yield createNumber(12);
      let two: number = yield blowUp;
      return one + two;
    });
    await expect(task).rejects.toHaveProperty('message', 'boom');
    expect(task.state).toEqual('errored');
  });

  it('can recover from errors in promise', async () => {
    let error = new Error('boom');
    let task = run(function*() {
      let one: number = yield Promise.resolve(12);
      let two: number;
      try {
        yield Promise.reject(error);
        two = 9;
      } catch(e) {
        // swallow error and yield in catch block
        two = yield Promise.resolve(8);
      }
      let three: number = yield Promise.resolve(55);
      return one + two + three;
    });
    await expect(task).resolves.toEqual(75);
    expect(task.state).toEqual('completed');
  });

  it('can recover from errors in operation', async () => {
    let task = run(function*() {
      let one: number = yield Promise.resolve(12);
      let two: number;
      try {
        yield blowUp;
        two = 9;
      } catch(e) {
        // swallow error and yield in catch block
        two = yield Promise.resolve(8);
      }
      let three: number = yield Promise.resolve(55);
      return one + two + three;
    });
    await expect(task).resolves.toEqual(75);
    expect(task.state).toEqual('completed');
  });

  it('can halt generator', async () => {
    let task = run(function*() {
      let one: number = yield Promise.resolve(12);
      let two: number = yield;
      return one + two;
    });

    task.halt();

    await expect(task).rejects.toHaveProperty('message', 'halted')
    expect(task.state).toEqual('halted');
  });

  it('halts task when halted generator', async () => {
    let child: Task | undefined;
    let task = run(function*() {
      yield function*(task: Task) {
        child = task;
        yield sleep(100);
      }
    });

    task.halt();

    await expect(task).rejects.toHaveProperty('message', 'halted')
    await expect(child).rejects.toHaveProperty('message', 'halted')
    expect(task.state).toEqual('halted');
    expect(child && child.state).toEqual('halted');
  });

  it('can suspend in finally block', async () => {
    let { future, resolve } = createFuture();

    let task = run(function*() {
      try {
        yield;
      } finally {
        yield sleep(10);
        resolve({ state: 'completed', value: 123 });
      }
    });

    task.halt();

    await expect(future).resolves.toEqual(123);
    expect(task.state).toEqual('halted');
  });

  it('can suspend in yielded finally block', async () => {
    let things: string[] = [];

    let task = run(function*() {
      try {
        yield function*() {
          try {
            yield
          } finally {
            yield sleep(5);
            things.push("first");
          }
        }
      } finally {
        things.push("second");
      }
    });

    task.halt();

    await expect(task).rejects.toHaveProperty('message', 'halted')
    expect(task.state).toEqual('halted');

    expect(things).toEqual(['first', 'second']);
  });

  it('can await halt', async () => {
    let didRun = false;

    let task = run(function*() {
      try {
        yield;
      } finally {
        yield Promise.resolve(1);
        didRun = true;
      }
    });

    await task.halt();

    expect(didRun).toEqual(true);
    expect(task.state).toEqual('halted');
  });

  it('can be halted while in the generator', async () => {
    let { future, resolve } = createFuture();
    let task = run(function*(inner) {
      inner.run(function*() {
        yield sleep(2);
        resolve({ state: 'errored', error: new Error('boom') });
      });
      yield future;
    });

    await expect(task).rejects.toHaveProperty('message', 'boom');
    expect(task.state).toEqual('errored');
  });

  it('can halt itself', async () => {
    let task = run(function*(inner) {
      inner.halt();
    });

    await expect(task).rejects.toHaveProperty('message', 'halted');
    expect(task.state).toEqual('halted');
  });

  it('can halt itself between yield points', async () => {
    let task = run(function*(inner) {
      yield sleep(1);

      inner.run(function*() {
        inner.halt();
      });

      yield
    });

    await expect(task).rejects.toHaveProperty('message', 'halted');
    expect(task.state).toEqual('halted');
  });

  it('can delay halt if child fails', async () => {
    let didRun = false;
    let task = run(function*(inner) {
      inner.run(function* willBoom() {
        yield sleep(5);
        throw new Error('boom');
      });
      try {
        yield
      } finally {
        yield sleep(20);
        didRun = true;
      }
    });

    await run(sleep(10))

    expect(task.state).toEqual('erroring');

    await expect(task).rejects.toHaveProperty('message', 'boom');
    expect(didRun).toEqual(true);
  });

  it('can throw error when child blows up', async () => {
    let task = run(function*(inner) {
      inner.run(function* willBoom() {
        yield sleep(5);
        throw new Error('boom');
      });
      try {
        yield
      } finally {
        throw new Error('bang');
      }
    });

    await expect(task).rejects.toHaveProperty('message', 'bang');
  });
});
