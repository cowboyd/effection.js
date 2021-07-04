import { InspectTree } from './inspect';

type TaskTreeMessage = {
  type: "tree";
  tree: InspectTree;
}

type StartMessage = {
  type: "start";
}

export type ClientMessage = TaskTreeMessage;
export type ServerMessage = StartMessage;

export type ClientMessageEnvelope = {
  type: 'effection-inspect-client-message';
  payload: ClientMessage;
}

export type ServerMessageEnvelope = {
  type: 'effection-inspect-server-message';
  payload: ServerMessage;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isClientMessageEnvelope(message: any): message is ClientMessageEnvelope {
  return message && message.type === 'effection-inspect-client-message';
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isServerMessageEnvelope(message: any): message is ServerMessageEnvelope {
  return message && message.type === 'effection-inspect-server-message';
}

export function envelopeClientMessage(message: ClientMessage): ClientMessageEnvelope {
  return {
    type: 'effection-inspect-client-message',
    payload: message
  }
}

export function envelopeServerMessage(message: ServerMessage): ServerMessageEnvelope {
  return {
    type: 'effection-inspect-server-message',
    payload: message
  }
}
