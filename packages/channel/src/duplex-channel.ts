import { WritableStream, Stream } from '@effection/subscription';
import { createChannel, ChannelOptions, Close } from './channel';

export interface DuplexChannel<TReceive, TSend, TClose = undefined> extends WritableStream<TReceive, TSend, TClose> {
  close: Close<TClose>;
  stream: Stream<TReceive, TClose>;
}

export type DuplexChannelPair<TLeft, TRight, TClose = undefined> = [DuplexChannel<TLeft, TRight, TClose>, DuplexChannel<TRight, TLeft, TClose>]

export function createDuplexChannel<TLeft, TRight, TClose = undefined>(options: ChannelOptions = {}): DuplexChannelPair<TLeft, TRight, TClose> {
  let leftChannel = createChannel<TLeft, TClose>(options);
  let rightChannel = createChannel<TRight, TClose>(options);

  let close: Close<TClose> = (...args) => {
    leftChannel.close(...args);
    rightChannel.close(...args);
  }

  return [
    Object.assign({ send: rightChannel.send, stream: leftChannel.stream, close }, leftChannel.stream),
    Object.assign({ send: leftChannel.send, stream: rightChannel.stream, close }, rightChannel.stream),
  ]
}
