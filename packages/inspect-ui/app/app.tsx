import React from 'react';
import { WebSocketClient } from '@effection/websocket-client';
import { InspectTree } from '@effection/inspect-utils';
import { useSubscription } from '@effection/react';
import { TaskTree } from './task-tree';

type AppProps = {
  client: WebSocketClient<InspectTree>;
}

export function App({ client }: AppProps) {
  let message = useSubscription(client);
  return (
    <div>
      <h1>Effection Inspector</h1>

      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      {message && <TaskTree tree={(message as any).tree}/>}
    </div>
  );
}
