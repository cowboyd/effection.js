import { createDevtoolsHooks } from './hooks';
import { createTask } from '@effection/core';

export function runDevtoolsHooks() {
  // create a task for the inspector, which lives outside of the Effection root
  // so the inspector does not end up inspecting itself
  let task = createTask(createDevtoolsHooks(), { labels: { name: 'inspector' } });
  task.start();

  task.catch((err: Error) => {
    console.error("*** EFFECTION INSPECTOR ENCOUNTERED UNEXPECTED ERROR");
    console.error(err);
  });
};
