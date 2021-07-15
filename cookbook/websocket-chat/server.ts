import { createWebSocketServer, WebSocketConnection, WebSocketServer } from '@effection/websocket-server';
import { main, spawn } from 'effection';

main(function*(scope) {
  let server: WebSocketServer<string> = yield createWebSocketServer(47000);

  console.log('Websocket server running on port: 47000');

  let messages = [];
  let clients = new Set<WebSocketConnection<string, string>>();

  yield server.forEach(function* (connection) {
    console.log('client connected');
    clients.add(connection);
    yield spawn(function* () {
      try {
        yield connection.forEach(function* (value) {
          messages.push(value);
          for(let client of clients) {
            if(client !== connection) {
              yield spawn(client.send(value)).within(scope);
            }
          }
        });
      } finally {
        console.log('client disconnected')
        clients.delete(connection);
      }
    }).within(scope);
  });
});
