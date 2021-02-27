import { Operation } from './operation';

export function sleep(duration: number): Operation<void> {
  return function*() {
    let timeoutId;
    try {
      yield new Promise((resolve) => {
        timeoutId = setTimeout(resolve, duration);
      });
    } finally {
      if(timeoutId) {
        clearTimeout(timeoutId);
      }
    }
  }
}
