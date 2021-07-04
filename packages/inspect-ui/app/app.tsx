import React from 'react';
import { Subscription } from '@effection/subscription';
import { ClientMessage } from '@effection/inspect-utils';
import { useSubscription } from '@effection/react';
import { TaskTree } from './task-tree';

type AppProps = {
  messages: Subscription<ClientMessage>;
}

export function App({ messages }: AppProps) {
  let message = useSubscription(messages);

  return (
    <div>
      <h1>Effection Inspector</h1>

      {message && <TaskTree tree={message.tree}/>}
    </div>
  );
}
