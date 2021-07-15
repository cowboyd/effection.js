import { main, on, spawn } from 'effection';
import { createWebSocketClient } from '@effection/websocket-client';

main(function* () {
  let client = yield createWebSocketClient('ws://localhost:47000');
  let textfield: HTMLInputElement = document.getElementById('textfield') as HTMLInputElement;
  let messages = document.getElementById('messages');

  function appendMessage(message) {
    let messageDiv = document.createElement('div');
    messageDiv.innerText = message;
    messages.appendChild(messageDiv);
  };

  yield spawn(client.forEach(value => {
    appendMessage(value);
  }))

  yield on<KeyboardEvent>(textfield, 'keydown').forEach(function*(event) {
    if(event.key === 'Enter') {
      yield client.send(textfield.value);
      appendMessage(textfield.value);
      textfield.value = '';
    }
  });
});
