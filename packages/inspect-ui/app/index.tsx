import { main } from '@effection/main';
import { createWebSocketClient, WebSocketClient } from '@effection/websocket-client';
import { EffectionContext } from '@effection/react';
import { InspectTree } from '@effection/inspect-utils';

import React from 'react';
import ReactDOM from 'react-dom';

import { App } from './app';

main(function*(scope) {
  let url = new URL(location.href);
  let port = url.searchParams.get('port') || location.port;

  let client: WebSocketClient<InspectTree> = yield createWebSocketClient(`ws://localhost:${port}`);
  console.log("Client connected");

  ReactDOM.render(
    <EffectionContext.Provider value={scope}>
      <App client={client}/>
    </EffectionContext.Provider>,
    document.querySelector('#app')
  )
  yield;
});
