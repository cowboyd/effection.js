# Changelog

## 2.0.0-beta.4

### Patch Changes

- e297c86: rename Task.spawn() -> Task.run()
- Updated dependencies [e297c86]
  - @effection/core@2.0.0-beta.4
  - @effection/channel@2.0.0-beta.4
  - @effection/events@2.0.0-beta.4
  - @effection/main@2.0.0-beta.4
  - @effection/subscription@2.0.0-beta.4

## 2.0.0-beta.3

### Patch Changes

- 3e77f29: - label events for visual inspection
  - label stream and queue operations
- 5d95e6d: label the "suspend" operation that is created with a bare `yield` statement;
- Updated dependencies [248b0a6]
- Updated dependencies [3e77f29]
- Updated dependencies [5d95e6d]
- Updated dependencies [9700b45]
- Updated dependencies [9700b45]
  - @effection/main@2.0.0-beta.3
  - @effection/subscription@2.0.0-beta.3
  - @effection/events@2.0.0-beta.3
  - @effection/core@2.0.0-beta.3
  - @effection/channel@2.0.0-beta.3

## 2.0.0-beta.2

### Minor Changes

- 19414f0: Add label to root task
- 26a86cb: Increase max listeners on task
- 9c76cc5: Add `yieldingTo` property to task
- ac7c1ce: Add toJSON method to Task

### Patch Changes

- f7e3344: Name in interface should be yieldingTo and not subTask
- Updated dependencies [19414f0]
- Updated dependencies [26a86cb]
- Updated dependencies [9c76cc5]
- Updated dependencies [f7e3344]
- Updated dependencies [ac7c1ce]
  - @effection/core@2.0.0-beta.2
  - @effection/channel@2.0.0-beta.2
  - @effection/events@2.0.0-beta.2
  - @effection/main@2.0.0-beta.2
  - @effection/subscription@2.0.0-beta.2

## 2.0.0-beta.1

### Patch Changes

- 0c6e263: release 2.0.0-beta
- Updated dependencies [0c6e263]
  - @effection/channel@2.0.0-beta.1
  - @effection/core@2.0.0-beta.1
  - @effection/events@2.0.0-beta.1
  - @effection/main@2.0.0-beta.1
  - @effection/subscription@2.0.0-beta.1

## 2.0.0-preview.16

### Minor Changes

- 9998088: Spawn operation can accept task options
- d7c0eb1: Do not require implementation of full EventEmitter interface
- 2bce454: Simplify EventEmitter types on Controls.
- 1981b35: Collect trace of effection operations and propagate them along with the raised error
- 88dc59a: Remove `verbose` option from MainError
- 88dc59a: Improve error output by including an Effection trace

### Patch Changes

- Updated dependencies [9998088]
- Updated dependencies [d7c0eb1]
- Updated dependencies [2bce454]
- Updated dependencies [1981b35]
- Updated dependencies [88dc59a]
- Updated dependencies [88dc59a]
  - @effection/core@2.0.0-preview.12
  - @effection/events@2.0.0-preview.13
  - @effection/main@2.0.0-preview.3
  - @effection/channel@2.0.0-preview.15
  - @effection/subscription@2.0.0-preview.14

## 2.0.0-preview.15

### Minor Changes

- 88eca21: Add type to task
- 8bb4514: Add support for labels
- 44c354d: Make task options public
- ef1f164: Reexport main package

### Patch Changes

- ae8d090: Sleeping for zero milliseconds should not suspend indefinitely
- Updated dependencies [88eca21]
- Updated dependencies [ae8d090]
- Updated dependencies [8bb4514]
- Updated dependencies [44c354d]
  - @effection/core@2.0.0-preview.11
  - @effection/channel@2.0.0-preview.14
  - @effection/events@2.0.0-preview.12
  - @effection/main@2.0.0-preview.2
  - @effection/subscription@2.0.0-preview.13

## 2.0.0-preview.14

### Minor Changes

- 625b521: Sleep operation can suspend indefinitely when called without duration
- a06c679: Add spawn as an operation via resources
- 625b521: Add ensure, timeout and withTimeout combinators

### Patch Changes

- Updated dependencies [625b521]
- Updated dependencies [a06c679]
- Updated dependencies [4d04159]
- Updated dependencies [625b521]
  - @effection/core@2.0.0-preview.10
  - @effection/channel@2.0.0-preview.13
  - @effection/events@2.0.0-preview.11
  - @effection/subscription@2.0.0-preview.12

## 2.0.0-preview.13

### Minor Changes

- 92f921e: Turn streams into resources which return a subscription

### Patch Changes

- Updated dependencies [92f921e]
  - @effection/subscription@2.0.0-preview.11
  - @effection/channel@2.0.0-preview.12
  - @effection/events@2.0.0-preview.10

## 2.0.0-preview.12

### Minor Changes

- 110a2cd: Add ignoreError option to prevent a task from propagating its errors to the parent
- 7216a21: Turn throwOnErrorEvent into an operation
- e2545b2: Remove delay on starting iterator/generator
- 2b92370: Prevent race condition in promise controller if promise resolves in the same tick as halt signal
- 00562fd: Fix race condition when halting a task while in between yield points
- 110a2cd: When yielded to an asynchronously halting task, wait for the task to be fully halted before proceeding
- 110a2cd: The sub task created by iterators is now linked to the parent task
- 02446ad: Add Resource to create an option for spawning tasks in the background in an operation

### Patch Changes

- Updated dependencies [110a2cd]
- Updated dependencies [7216a21]
- Updated dependencies [e2545b2]
- Updated dependencies [2b92370]
- Updated dependencies [00562fd]
- Updated dependencies [110a2cd]
- Updated dependencies [110a2cd]
- Updated dependencies [02446ad]
- Updated dependencies [da86a9c]
  - @effection/core@2.0.0-preview.9
  - @effection/events@2.0.0-preview.9
  - @effection/channel@2.0.0-preview.11
  - @effection/subscription@2.0.0-preview.10

## 2.0.0-preview.11

### Patch Changes

- Updated dependencies [a13987f]
  - @effection/core@2.0.0-preview.8
  - @effection/subscription@2.0.0-preview.9
  - @effection/events@2.0.0-preview.8
  - @effection/channel@2.0.0-preview.10

## 2.0.0-preview.10

### Patch Changes

- Updated dependencies [91ade6c]
  - @effection/channel@2.0.0-preview.9

## 2.0.0-preview.9

### Minor Changes

- 2bad074: Run destructors in reverse order and in series

### Patch Changes

- Updated dependencies [2bad074]
  - @effection/core@2.0.0-preview.7
  - @effection/channel@2.0.0-preview.8
  - @effection/events@2.0.0-preview.7
  - @effection/subscription@2.0.0-preview.8

## 2.0.0-preview.8

### Minor Changes

- 3db7270: Make Queue a first class citizen

### Patch Changes

- 9a6a6e3: Make atom more reentrant
- Updated dependencies [3db7270]
  - @effection/subscription@2.0.0-preview.7
  - @effection/channel@2.0.0-preview.7
  - @effection/events@2.0.0-preview.6

## 2.0.0-preview.7

### Minor Changes

- 0dca571: Filter with a type predicate can narrow type of stream

### Patch Changes

- 1222756: Use strict dependency requirements for internal dependencies while in prerelease mode
- Updated dependencies [0dca571]
- Updated dependencies [1222756]
  - @effection/subscription@2.0.0-preview.6
  - @effection/channel@2.0.0-preview.6
  - @effection/events@2.0.0-preview.5
  - @effection/core@2.0.0-preview.6

## 2.0.0-preview.6

### Minor Changes

- 9cf6053: Increase default value of max subscribers on channel
- 0b24415: Add WritableStream interface and implement it for channels
- 442f220: New API for exec and daemon which does not take scope directly
- 22e5230: Add `join` method on stream to return stream result
- 70c358f: Store root in a global variable
- 3983202: Add `stringBuffer` method to stream which buffers stream to a string
- 2c2749d: Add a `buffer` method on Stream to buffer stream contents for later replay

### Patch Changes

- Updated dependencies [9cf6053]
- Updated dependencies [0b24415]
- Updated dependencies [22e5230]
- Updated dependencies [70c358f]
- Updated dependencies [3983202]
- Updated dependencies [2c2749d]
  - @effection/channel@2.0.0-preview.5
  - @effection/subscription@2.0.0-preview.5
  - @effection/core@2.0.0-preview.5

## 2.0.0-preview.5

### Minor Changes

- ab41f6a: Rename `Subscribable` to `Stream`
- ce76f15: Make channel splittable into send and stream ends
- 72f743c: Add `halt` method on `Effection` to halt root task
- 53661b7: Reexport blessed packages from `effection` package

### Patch Changes

- 7b6ba05: `once()` only yields the first argument passed to `emit()` which
  accounts for 99.9% of the use cases. For the cases where all the
  arguments are required, use `onceEmit()`

  `on()` produces a stream of the first arguments passed to `emit()`
  which accounts for 99.9% of the use cases. For the cases where all the
  arguments are required, use `onEmit()`.

- Updated dependencies [7b6ba05]
- Updated dependencies [ab41f6a]
- Updated dependencies [ce76f15]
- Updated dependencies [72f743c]
  - @effection/events@2.0.0-preview.4
  - @effection/subscription@2.0.0-preview.4
  - @effection/channel@2.0.0-preview.4
  - @effection/core@2.0.0-preview.4

## 2.0.0-preview.4

### Minor Changes

- 3ca4cd4: Change `on` to return subscribable, rather than taking scope
- 3ca4cd4: Add `createSubscribable` and `Subscribable` interface
- 3ca4cd4: Make Channel subscribable and add all subscribable methods
- 3ca4cd4: Change channel interface from `new Channel()` to `createChannel()`

### Patch Changes

- 2bf5ef4: Make iterator controllers reentrant so they can e.g. halt themselves
- Updated dependencies [bdedf68]
- Updated dependencies [2bf5ef4]
  - @effection/core@2.0.0-preview.3

## 2.0.0-preview.3

### Patch Changes

- 93ec0d6: Include CHANGELOGS and src with all packages
- Updated dependencies [93ec0d6]
  - @effection/core@2.0.0-preview.2

## 2.0.0-preview.2

### Patch Changes

- 80143d5: Fix packaging
- Updated dependencies [80143d5]
  - @effection/core@2.0.0-preview.1

## 2.0.0-preview.1

### Minor Changes

- f6f223c: Fix packaging

## 2.0.0-preview.0

### Major Changes

- Version 2

## 1.0.0

### Major Changes

- b988025: Release effection 1.0.0

## 0.8.0

### Minor Changes

- f851981: Rename `main` to `run` and deprecate `main`

## 0.7.0

### Minor Changes

- 0e8951f: Use unique symbol for effection resources

## 0.6.4

### Patch Changes

- 68c4dab: include typescript sources with package in order for sourcemaps to work.

## 0.6.3

### Patch Changes

- 60ed704: ## Fix sourcemaps and types entrypoint
  We saw strange errors while installing Effection from BigTest. One of the problems was that sourcemaps were not working. This was happening because sourcemaps referenced ts file which were not being included in the package.
  https://github.com/thefrontside/effection/pull/119
  ## Distribute node packages without transpiling generators
  We made a decision to ship generators in our distribution bundles because IE11 compatibility is not important to us. It's surprisingly difficult to get this to work. We tried using microbundle but that turned out to be even more complicated because their [modern and cjs formats have mutually conflicting configuration](https://github.com/developit/microbundle/issues/618).
  https://github.com/thefrontside/effection/pull/120
  All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.6.2] - 2020-04-24

## Changed

- fix bug where typescript type declarations were not being referenced
  properly as part of the migration to
  `microbundle`. https://github.com/thefrontside/effection.js/pull/107

## [0.6.1] - 2020-04-24

### Changed

- fix bug where operations that returned `null` was causing effection
  to crash: https://github.com/thefrontside/effection.js/pull/98
- `effection` is now compiled with microbundle instead of
  pika. https://github.com/thefrontside/effection.js/pull/100
- removed custom publish scripts in order to fix releases 🙏

## [0.6.0] - 2020-04-15

### Changed

- Returning a context from a context passes links it to the parent context
  rather than halting it.
  https://github.com/thefrontside/effection.js/pull/89

### Added

- Resources are a new feature in Effection which allow you to tie a context
  to any JavaScript object.
  https://github.com/thefrontside/effection.js/pull/89

## [0.5.2] - 2020-03-09

### Added

- Make Typescript Operation type generic over the returned value. Enables
  better type checking in Typescript.
  https://github.com/thefrontside/effection.js/pull/81

### Changed

- Catch errors raised in ensure blocks and print nasty warning
  https://github.com/thefrontside/effection.js/pull/80

## [0.5.1] - 2020-02-24

### Changed

- For runtimes that do not use native generators, the code to
  recognize generator functions was broken which prevented effection
  from working in those environments. This was addressed with
  https://github.com/thefrontside/effection.js/pull/77

## [0.5.0] - 2020-02-10

### Added

- `join` to synchronize on a currently executing context.
- `monitor` operation to propagate failures
- `spawn` control function to create a "detached" process.

### Changed

- Refactored the `fork` method to be an operation instead of a static
  function

- Introduced a `main` function to enter a brand new context

## [0.4.0] - 2019-11-20

### Added

- add a monotonic `id` field to every fork to help with debugging
  https://github.com/thefrontside/effection.js/pull/32

### Changed

- (fix) do not swallow some errors that are thrown inside of a yield
  point destructor: https://github.com/thefrontside/effection.js/pull/37

- Make every fork conform to the Promises A+
  API. E.g. `fork(operation).then()`
  https://github.com/thefrontside/effection.js/pull/38

## [0.3.3] - 2019-11-04

### Added

- type signature for Exceution.halt() which is necessary in the
  construction of non-trivial async processes like servers.
  https://github.com/thefrontside/effection.js/pull/24

## [0.3.2] - 2019-10-30

### Changed

- (fix) in certain cases, execution forks were being marked as
  completed when they actually were not.
  https://github.com/thefrontside/effection.js/pull/21
- (fix) sometimes halted children were being kept around unecessarily,
  and while not running will cause memory leaks long-term
  https://github.com/thefrontside/effection.js/pull/22

## [0.3.1] - 2019-10-23

### Changed

- unroll continuation and state classes in execution. This makes stack
  traces much smaller and easier to debug:
  https://github.com/thefrontside/effection.js/pull/19
- remove some dead files that were not contributing to the API
  https://github.com/thefrontside/effection.js/pull/18

## [0.3.0] - 2019-10-18

### Changed

- unify the fork() and execute() methods. There is now a single API
  for initiating asynchronous execution, fork() which makes the mental
  model much simpler and the learning curve smaller.
  https://github.com/thefrontside/effection.js/pull/14

- make the fork() function static. Prior to this, `fork()` was a
  method on the `Execution` class which made the API awkward and
  non-functional.
  https://github.com/thefrontside/effection.js/pull/12

- make generators (not just generator functions) valid
  operations. Before this change, you needed to use a utility function
  `call()` in order to pass arguments to generator based
  operations. This lets you invoke generator functions directly and
  pass the resulting generator to `yield` and `fork` directly thus
  simplifying code greatly.
  https://github.com/thefrontside/effection.js/pull/13

## [0.2.0] - 2019-10-17

### Added

- Typescript typings: Effection now officially supports TypeScript!
  From here on out, the project is committed to shipping precise and
  up-to-date typing information for its entire public API
  https://github.com/thefrontside/effection.js/pull/8

## [0.1.0] - 2019-10-05

### Added

- Test Suite, and functioning structured concurrency model
