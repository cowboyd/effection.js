---
id: processes
title: Spawning processes
---

Effection comes with a package that allows one to use effection within node to spawn processes. This chapter explains how we might use this package.

## Invoking a Process

The package `@effection/process` comes with two functions: `exec` and `daemon`. We can generally categorize a spawned child process into a process that executes to completion and shuts down or a process that is long running. The process that is long running may have a way to trigger it to shut down gracefully at the appropriate time. Our two functions, `exec` and `daemon`, map to processes that complete and long running processes, respectively.

### `exec`

The following is an example using `exec` to run a curl and output the content to your terminal. It is expected to run to completion and exit. The effection main is built in with helpers if you `Ctrl+C` to stop it and gracefully shutdown.

```js
import { main } from "effection";
import { exec } from "@effection/process";

main(function*() {
  try {
    let child = yield exec("curl wttr.in");
    yield child.stdout.forEach(line => console.log(line));
  } finally {
    console.log("done!");
  }
});
```

### `daemon`

The following is an example using `daemon` to start a node based http server and output the logged responses to your terminal. It will continue to run until you use `Ctrl+C` to stop it and gracefully shutdown.

```js
import { main } from "effection";
import { daemon } from "@effection/process";

main(function*() {
  try {
    let child = yield daemon("node ./echo-server.mjs");
    yield child.stdout.forEach((line) => console.log(line));
  } finally {
    yield;
  }
});
```
