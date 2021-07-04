import { sleep, spawn, createTask, getControls } from '@effection/core';
import { main } from '@effection/main';
import { envelopeServerMessage, isClientMessageEnvelope } from '@effection/inspect-utils';
import { on } from '@effection/events';

main(function* main() {
  console.log('[content script] sending start message');
  window.postMessage(envelopeServerMessage({ type: 'start' }), '*');
  yield on<MessageEvent>(window, 'message').map(m => m.data).filter(isClientMessageEnvelope).forEach((message) => {
    chrome.runtime.sendMessage(message.payload);
  });
});
