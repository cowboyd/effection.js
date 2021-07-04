import { Operation, Effection, spawn } from '@effection/core';
import { on } from '@effection/events';
import { inspect, isServerMessageEnvelope, envelopeClientMessage, InspectTree } from '@effection/inspect-utils';
import { Slice } from '@effection/atom';

export function *createDevtoolsHooks(): Operation<void> {
  console.log("[devtools hooks] active");

  let messages = yield on<MessageEvent>(window, 'message').map(m => m.data).filter(isServerMessageEnvelope).map(m => m.payload);

  while(true) {
    let message = yield messages.expect();

    console.log("[devtools hooks] got message", message);
    if(message.type === 'start') {
      console.log("[devtools hooks] connected");
      yield spawn(function*() {
        let slice: Slice<InspectTree> = yield inspect(Effection.root);

        yield slice.forEach(function*(tree) {
          window.postMessage(envelopeClientMessage({ type: 'tree', tree }), '*');
        });
      });
    }
  }
}
