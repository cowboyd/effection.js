import { run, spawn, ensure } from '@effection/core';
import { listen } from './listen';

run(function*() {
  // background.js
  let connections = new Map();

  yield spawn(listen(chrome.runtime.onConnect).forEach(([port]) => function*(scope) {
    console.log("Panel connected");
    yield spawn(listen(port.onMessage).forEach(([message]) => {
      if (message.name == "init") {
        console.log("Panel sent init message", message.tabId);
        connections.set(message.tabId, port);
        scope.spawn(ensure(() => connections.delete(message.tabId)));
        return;
      }
    }));

    yield listen(port.onDisconnect).expect();
  }));

  // Receive message from content script and relay to the devTools page for the
  // current tab
  yield spawn(listen(chrome.runtime.onMessage).forEach(function*([request, sender]) {
    // Messages from content scripts should have sender.tab set
    if (sender.tab) {
      let tabId = sender.tab.id;
      if(connections.has(tabId)) {
        console.log("Proxying message to panel", tabId, request);
        connections.get(tabId).postMessage(request);
      } else {
        console.log("Tab not found in connection list.");
      }
    } else {
      console.log("sender.tab not defined.");
    }
    return true;
  }));

  yield;
}).catch((err) => console.error(err));
