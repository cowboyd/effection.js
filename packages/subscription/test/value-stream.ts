import * as expect from 'expect';
import { describe, it } from '@effection/mocha';

import { createValueStream, ValueStream } from '../src/index';

interface Thing {
  name: string;
  type: string;
}

const someStream: ValueStream<Thing, number> = createValueStream((publish) => function*() {
  publish({name: 'bob', type: 'person' });
  publish({name: 'alice', type: 'person' });
  publish({name: 'world', type: 'planet' });
  return 3;
}, () => {
  return { name: 'jupiter', type: 'planet' };
});

describe('value stream', () => {
  describe('value', () => {
    it('returns the current value of the stream', function*() {
      expect(someStream.value).toEqual({ name: "jupiter", type: 'planet' });
    });
  });

  describe('map', () => {
    it('maps over the items', function*() {
      let mapped = yield someStream.map(item => `hello ${item.name}`).collect();
      expect(mapped.next()).toEqual({ done: false, value: 'hello bob' });
      expect(mapped.next()).toEqual({ done: false, value: 'hello alice' });
      expect(mapped.next()).toEqual({ done: false, value: 'hello world' });
      expect(mapped.next()).toEqual({ done: true, value: 3 });
    });

    it('maps over the value', function*() {
      let mapped = someStream.map(item => `hello ${item.name}`);
      expect(mapped.value).toEqual('hello jupiter');
    });
  });
});
