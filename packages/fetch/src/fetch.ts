import { spawn, Operation, Resource } from '@effection/core';
import { fetch as nativeFetch } from 'cross-fetch';
import { AbortController } from 'abort-controller';

export interface Fetch extends Resource<Response> {
  arrayBuffer(): Operation<ArrayBuffer>;
  blob(): Operation<Blob>;
  formData(): Operation<FormData>;
  json(): Operation<unknown>;
  text(): Operation<string>;
}

export function fetch(info: RequestInfo, requestInit: RequestInit = {}): Fetch {
  function* init() {
    let controller = new AbortController();

    yield spawn(function*() {
      try {
        yield;
      } finally {
        controller.abort();
      }
    });

    requestInit.signal = controller.signal;

    let response: Response = yield nativeFetch(info, requestInit);
    return response;
  };

  return {
    init,
    *arrayBuffer() {
      let response = yield { init };
      return yield response.arrayBuffer();
    },
    *blob() {
      let response = yield { init };
      return yield response.blob();
    },
    *formData() {
      let response = yield { init };
      return yield response.formData();
    },
    *json() {
      let response = yield { init };
      return yield response.json();
    },
    *text() {
      let response = yield { init };
      return yield response.text();
    },
  };
}
