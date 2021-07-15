import { createWebSocketClient } from '@effection/websocket-client';
import { main, spawn } from 'effection';

main(function* (scope) {
  let client = yield createWebSocketClient('wss://echo.websocket.org'); 
  console.log('Created websocket...');

  yield spawn(client.forEach(( value ) => {
    console.log('server sent:', value);
  }));

  let send = (data) => {
    scope.spawn(client.send(data.toString()));
  };
  
  try {
    process.stdin.on('data', send);
    yield;
  } finally {
    process.stdin.off('data', send);
  }
});