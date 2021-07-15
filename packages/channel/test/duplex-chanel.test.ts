import { describe, beforeEach, it } from '@effection/mocha';
import * as expect from 'expect'

import { OperationIterator } from '@effection/subscription';

import { run, Effection } from '@effection/core';

import { createDuplexChannel, DuplexChannel } from '../src/index';

describe("createDuplexChannel", () => {
  let left: DuplexChannel<number, string>;
  let right: DuplexChannel<string, number>;

  beforeEach(function*() {
    [left, right] = createDuplexChannel<number, string>();
  });

  it('can destructure channels as a record', function*() {
    let [{ send }, { stream }] = createDuplexChannel<number, string>();
    let subscription = stream.subscribe(Effection.root);
    send("hello");
    expect(yield subscription.next()).toEqual({ done: false, value: "hello" })
  });

  describe('sending a message to left', () => {
    let subscription: OperationIterator<string, undefined>;

    beforeEach(function*() {
      subscription = right.subscribe(Effection.root);
      left.send("hello");
    });

    it('is received on right', function*() {
      expect(yield subscription.next()).toEqual({ done: false, value: "hello" })
    });
  });

  describe('sending a message to right', () => {
    let subscription: OperationIterator<number, undefined>;

    beforeEach(function*() {
      subscription = left.subscribe(Effection.root);
      right.send(123);
    });

    it('is received on right', function*() {
      expect(yield subscription.next()).toEqual({ done: false, value: 123 })
    });
  });

  describe('closing the channel', () => {
    let txSubscription: OperationIterator<number, undefined>;
    let rxSubscription: OperationIterator<string, undefined>;

    beforeEach(function*() {
      txSubscription = left.subscribe(Effection.root);
      rxSubscription = right.subscribe(Effection.root);
    });

    describe('on right', () => {
      it('closes both ends', function*() {
        right.close();
        expect(yield rxSubscription.next()).toEqual({ done: true, value: undefined })
        expect(yield txSubscription.next()).toEqual({ done: true, value: undefined })
      });
    });

    describe('on left', () => {
      it('closes both ends', function*() {
        left.close();
        expect(yield rxSubscription.next()).toEqual({ done: true, value: undefined })
        expect(yield txSubscription.next()).toEqual({ done: true, value: undefined })
      });
    });
  });
});
