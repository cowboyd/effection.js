import { Stream, createStream } from './index';
import { Callback } from './create-operation-iterator';

export interface ValueStream<T, TReturn = undefined> extends Stream<T, TReturn> {
  map<R>(mapper: (value: T) => R): ValueStream<R, TReturn>;
  value: T;
}

type ValueFn<T> = () => T;

export function createValueStream<T, TReturn = undefined>(callback: Callback<T, TReturn>, valueFn: ValueFn<T>): ValueStream<T, TReturn> {
  let stream = createStream(callback);

  return {
    ...stream,
    map(mapper) {
      return createValueStream(
        (publish) => {
          return stream.forEach((value: T) => function*() {
            publish(mapper(value));
          });
        },
        () => {
          return mapper(valueFn());
        }
      );
    },
    get value() {
      return valueFn();
    }
  };
}
