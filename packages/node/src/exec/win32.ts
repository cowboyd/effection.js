import { platform } from "os";
import { Operation, Deferred } from "@effection/core";
import { createChannel } from "@effection/channel";
import { on, once } from "@effection/events";
import { spawn as spawnProcess } from "cross-spawn";
import { ctrlc } from "ctrlc-windows";
import { ExitStatus, CreateOSProcess, stringifyExitStatus } from "./api";

type Result =
  | { type: "error"; value: unknown }
  | { type: "status"; value: [number?, string?] };

export const createWin32Process: CreateOSProcess = (scope, command, options) => {
  let stdin = createChannel<string>();
  let stdout = createChannel<string>();
  let stderr = createChannel<string>();
  let tail: string[] = [];

  let getResult = Deferred<Result>();

  function addToTail(chunk: string) {
    if (tail.length < 100) {
      tail.push(chunk);
    }
  }

  let join = (): Operation<ExitStatus> => function*() {
    let result: Result = yield getResult.promise;
    if (result.type === "status") {
      let [code, signal] = result.value;
      return { command, options, code, signal, tail };
    } else {
      throw result.value;
    }
  }

  let expect = (): Operation<ExitStatus> => function*() {
    let status: ExitStatus = yield join();
    if (status.code != 0) {
      let error = new Error(stringifyExitStatus(status));
      error.name = `ExecError`;
      throw error;
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

  scope.spawn(function*(task) {
    let onError = (value: unknown) =>
      getResult.resolve({ type: "error", value });

    try {
      childProcess.on("error", onError);

      task.spawn(
        on<[string]>(childProcess.stdout, "data").forEach(([data]) => {
          addToTail(data);
          stdout.send(data);
        })
      );

      task.spawn(
        on<[string]>(childProcess.stderr, "data").forEach(([data]) => {
          addToTail(data);
          stderr.send(data);
        })
      );

      task.spawn(
        stdin.forEach((data) => {
          childProcess.stdin.write(data);
        })
      );

      let value = yield once(childProcess, "exit");
      getResult.resolve({ type: "status", value });
    } finally {
      stdout.close();
      stderr.close();
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

  return { pid, stdin, stdout, stderr, join, expect };
};

export const isWin32 = () => platform() === "win32";
