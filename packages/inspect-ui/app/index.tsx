import { main } from '@effection/main';
import { Subscription } from '@effection/subscription';
import { once, on } from '@effection/events';
import { createWebSocketClient } from '@effection/websocket-client';
import { EffectionContext } from '@effection/react';
import { InspectTree } from '@effection/inspect-utils';
import { ClientMessage, isClientMessageEnvelope } from '@effection/inspect-utils';
import { listen } from './listen';

import React from 'react';
import ReactDOM from 'react-dom';

import { App } from './app';

main(function*(scope) {
  yield once(window, 'DOMContentLoaded');

  let url = new URL(location);
  let messages: Subscription<ClientMessage>;

  if(url.searchParams.get('mode') === 'devtools') {
    console.log("[ui] devtools mode connected");
    let connection = chrome.runtime.connect({ name: "panel" });

    connection.postMessage({
      name: 'init',
      tabId: chrome.devtools.inspectedWindow.tabId
    });

    messages = yield listen(connection.onMessage).map(([m]) => m);
  } else {
    let port = url.searchParams.get('port') || location.port;
    let address = `ws://localhost:${port}`;
    console.log("[ui] connecting via websockets to", address);
    messages = yield createWebSocketClient(address);
    console.log("[ui] client connected");
  }

  ReactDOM.render(
    <EffectionContext.Provider value={scope}>
      <App messages={messages}/>
    </EffectionContext.Provider>,
    document.querySelector('#app')
  )
  yield;
});
