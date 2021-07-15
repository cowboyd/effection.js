import { createWebSocketClient } from '@effection/websocket-client';
import { main, spawn, on } from 'effection';

main(function* () {
  let client = yield createWebSocketClient('wss://echo.websocket.org'); 
  console.log('Created websocket...');

  yield spawn(client.forEach(( value ) => {
    console.log('server sent:', value);
  }));

  yield on(process.stdin, 'data').forEach(data => {
    return client.send(data.toString());
  });
});