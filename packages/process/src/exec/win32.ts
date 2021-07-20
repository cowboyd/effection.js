import { platform } from "os";
import { spawn, Task, Operation, createFuture, label, withLabels } from '@effection/core';
import { createChannel } from '@effection/channel';
import { on, once, onceEmit } from "@effection/events";
import { spawn as spawnProcess } from "cross-spawn";
import { ctrlc } from "ctrlc-windows";
import { ExitStatus, CreateOSProcess } from "./api";
import { ExecError } from "./error";

type Result =
  | { type: "error"; value: unknown }
  | { type: "status"; value: [number?, string?] };

export const createWin32Process: CreateOSProcess = (command, options) => {
  return {
    *init(scope: Task) {
      let { future, resolve } = createFuture<Result>();

      let join = (): Operation<ExitStatus> => function*() {
        let result: Result = yield future;
        if (result.type === "status") {
          let [code, signal] = result.value;
          return { command, options, code, signal };
        } else {
          throw result.value;
        }
      }

      let expect = (): Operation<ExitStatus> => function*() {
        let status: ExitStatus = yield join();
        if (status.code != 0) {
          throw new ExecError(status, command, options);
        } else {
          return status;
        }
      }

      let childProcess = spawnProcess(command, options.arguments || [], {
        // We lose exit information and events if this is detached in windows
        // and it opens a window in windows+powershell.
        detached: false,
        // When windows shell is true, it runs with cmd.exe by default, but
        // node has trouble with PATHEXT and exe. It can't run exe directly for example.
        // `cross-spawn` handles running it with the shell in windows if needed.
        // Neither mac nor linux need shell and we run it detached.
        shell: false,
        // With stdio as pipe, windows gets stuck where neither the child nor the
        // parent wants to close the stream, so we call it ourselves in the exit event.
        stdio: "pipe",
        // Hide the child window so that killing it will not block the parent
        // with a Terminate Batch Process (Y/n)
        windowsHide: true,

        env: options.env,
        cwd: options.cwd,
      });

      let { pid } = childProcess;

      let stdoutChannel = createChannel<string>();
      let stderrChannel = createChannel<string>();
      let stdin = {
        send(data: string) {
          childProcess.stdin.write(data);
        }
      };

      yield spawn(function*(task) {
        yield label({ name: 'exec', state: 'running' });
        yield spawn(function*() {
          yield label({ name: 'listen for error' });
          let value: Error = yield withLabels(once(childProcess, 'error'), {
            name: 'untilFirst(error)',
            source: 'ChildProcess',
          });
          resolve({ state: 'completed', value: { type: 'error', value } });
        }).within(task);

        // future TODO: label streams for stdout and stderr
        yield spawn(on<Buffer>(childProcess.stdout, 'data').map((c) => c.toString()).forEach(stdoutChannel.send)).within(task);
        yield spawn(on<Buffer>(childProcess.stderr, 'data').map((c) => c.toString()).forEach(stderrChannel.send)).within(task);

        try {
          let value = yield withLabels(onceEmit(childProcess, 'exit'), {
            name: 'on(exit)',
            source: 'ChildProcess',
          });
          resolve({ state: 'completed', value: { type: 'status', value } });
        } finally {
          stdoutChannel.close();
          stderrChannel.close();
          if (pid) {
            ctrlc(pid);
            let stdin = childProcess.stdin;
            if (stdin.writable) {
              try {
                //Terminate batch process (Y/N)
                stdin.write("Y\n");
              } catch (_err) { /* not much we can do here */}
            }
            stdin.end();
          }
        }
      });

      let { stream: stdout } = stdoutChannel;
      let { stream: stderr } = stderrChannel;

      if(options.buffered) {
        stdout = stdout.stringBuffer(scope);
        stderr = stderr.stringBuffer(scope);
      }

      return { pid, stdin, stdout, stderr, join, expect };
    }
  }
};

export const isWin32 = () => platform() === "win32";
