import { sleep } from '@effection/core';
import { main } from '@effection/main';

import { runDevtoolsHooks } from '../src/index';

runDevtoolsHooks();

main(function *myProgram(task) {
  task.spawn(undefined, { labels: { name: 'someServer', frobs: 123, quantile: 'upper' } });
  task.spawn(undefined, { labels: { name: 'anotherTask' } });
  while(true) {
    yield sleep(1000);
  }
});
