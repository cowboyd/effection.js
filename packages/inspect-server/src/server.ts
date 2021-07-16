import { inspect, ClientMessage, ServerMessage, InspectTree } from '@effection/inspect-utils';
import { appDir } from '@effection/inspect-ui';
import { Effection, Resource, Task, ensure, spawn } from '@effection/core';
import { once } from '@effection/events';
import { Slice } from '@effection/atom';

import { createServer } from 'http';
import { Server as StaticServer } from 'node-static';
import { AddressInfo } from 'net';

import { createWebSocketSubscription, WebSocketServer, WebSocketConnection } from '@effection/websocket-server';

export type Options = {
  port?: number;
  task?: Task;
}

export interface InspectServer {
  port: number;
}

export function createInspectServer(options: Options = {}): Resource<InspectServer> {
  return {
    *init() {
      let file = new StaticServer(appDir());

      let http = createServer((request, response) => {
        request.addListener('end', () => { file.serve(request, response); }).resume();
      });

      let connections: WebSocketServer<ServerMessage, ClientMessage> = yield createWebSocketSubscription({ http });

      // something wrong here i think
      yield spawn(function*() {
        while(true) {
          let connection: WebSocketConnection<ServerMessage, ClientMessage> = yield connections.expect();

          yield spawn(function*() {
            let slice: Slice<InspectTree> = yield inspect(options.task || Effection.root);

            yield slice.forEach(function*(tree) {
              yield connection.send({ type: 'tree', tree });
            });
          });
        }
      });
      // ---------------------

      http.listen(options.port);
      yield ensure(() => { http.close(); });
      yield once(http, 'listening');

      let port = (http.address() as AddressInfo).port;

      return { port };
    }
  }
}
