import { spawn, Task, Operation, createFuture } from '@effection/core';
import { createChannel } from '@effection/channel';
import { on, once, onceEmit } from '@effection/events';
import { spawn as spawnProcess } from 'child_process';
import { Writable, ExitStatus, CreateOSProcess } from './api';
import { ExecError } from './error';

type Result = { type: 'error'; value: unknown } | { type: 'status'; value: [number?, string?] };

export const createPosixProcess: CreateOSProcess = (command, options) => {
  return {
    *init(scope: Task) {
      let { future, resolve } = createFuture<Result>();

      let join = (): Operation<ExitStatus> => function*() {
        let result: Result = yield future;
        if (result.type === 'status') {
          let [code, signal] = result.value;
          return { command, options, code, signal };
        } else {
          throw result.value;
        }
      }

      let expect = (): Operation<ExitStatus> => function*() {
        let status: ExitStatus = yield join();
        if (status.code != 0) {
          throw new ExecError(status, command, options)
        } else {
          return status;
        }
      }
      // Killing all child processes started by this command is surprisingly
      // tricky. If a process spawns another processes and we kill the parent,
      // then the child process is NOT automatically killed. Instead we're using
      // the `detached` option to force the child into its own process group,
      // which all of its children in turn will inherit. By sending the signal to
      // `-pid` rather than `pid`, we are sending it to the entire process group
      // instead. This will send the signal to all processes started by the child
      // process.
      //
      // More information here: https://unix.stackexchange.com/questions/14815/process-descendants
      let childProcess = spawnProcess(command, options.arguments || [], {
        detached: true,
        shell: options.shell,
        env: options.env,
        cwd: options.cwd
      });

      let { pid } = childProcess;

      let stdoutChannel = createChannel<string>();
      let stderrChannel = createChannel<string>();

      let stdin: Writable<string> = {
        send(data: string) {
          childProcess.stdin.write(data);
        }
      };

      yield spawn(function*(task) {
        yield spawn(function*() {
          let value: Error = yield once(childProcess, 'error');
          resolve({ state: 'completed', value: { type: 'error', value } });
        }).within(task);

        yield spawn(on<Buffer>(childProcess.stdout, 'data').map((c) => c.toString()).forEach(stdoutChannel.send)).within(task);
        yield spawn(on<Buffer>(childProcess.stderr, 'data').map((c) => c.toString()).forEach(stderrChannel.send)).within(task);

        try {
          let value = yield onceEmit(childProcess, 'exit');
          resolve({ state: 'completed', value: { type: 'status', value } });
        } finally {
          stdoutChannel.close();
          stderrChannel.close();
          try {
            if(typeof childProcess.pid === 'undefined') {
              throw new Error('no pid for childProcess')
            }
            process.kill(-childProcess.pid, "SIGTERM")
          } catch(e) {
            // do nothing, process is probably already dead
          }
        }
      });

      let { stream: stdout } = stdoutChannel;
      let { stream: stderr } = stderrChannel;

      if(options.buffered) {
        stdout = stdout.stringBuffer(scope);
        stderr = stderr.stringBuffer(scope);
      }

      return { pid: pid as number, stdin, stdout, stderr, join, expect }
    }
  }
}
