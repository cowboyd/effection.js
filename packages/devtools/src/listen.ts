import { createStream, Stream } from '@effection/subscription';

interface Listenable<TArgs extends unknown[]> {
  addListener(callback: (value: TArgs) => void);
  removeListener(callback: (value: TArgs) => void);
}

export function listen<TArgs extends unknown[]>(source: Listenable<TArgs>): Stream<TArgs> {
  return createStream<TArgs, undefined>(function*(publish) {
    let listener = (...args) => publish(args as TArgs);
    try {
      source.addListener(listener);
      yield
      return undefined;
    } finally {
      source.removeListener(listener);
    }
  });
}
