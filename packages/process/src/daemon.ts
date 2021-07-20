import { spawn, Resource, label, withLabels } from '@effection/core';

import { exec, Process, ExecOptions, ExitStatus, DaemonExitError } from './exec';

/**
 * Start a long-running process, like a web server that run perpetually.
 * Daemon operations are expected to run forever, and if they exit pre-maturely
 * before the operation containing them passes out of scope it raises an error.
 */

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Daemon extends Resource<Process> {}

export function daemon(command: string, options: ExecOptions = {}): Daemon {
  return {
    *init() {
      // future TODO, this isn't an operation so how can we label it?
      let process = yield exec(command, options);

      yield spawn(function*() {
        yield label({ name: `untilFirst('error')` });
        let status: ExitStatus = yield withLabels(process.join(), {
          name: 'listening for stopped daemon',
        });
        // future TODO, are we able to label this error at all?
        throw new DaemonExitError(status, command, options);
      });

      return process;
    }
  }
}
