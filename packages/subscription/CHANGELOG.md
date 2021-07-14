# @effection/subscription

## 2.0.0-beta.4

### Patch Changes

- Updated dependencies [e297c86]
  - @effection/core@2.0.0-beta.4

## 2.0.0-beta.3

### Patch Changes

- 3e77f29: - label events for visual inspection
  - label stream and queue operations
- 9700b45: stream operations like `forEach` and `expect` no longer create
  intermediate delegation tasks
- Updated dependencies [5d95e6d]
- Updated dependencies [9700b45]
  - @effection/core@2.0.0-beta.3

## 2.0.0-beta.2

### Patch Changes

- Updated dependencies [19414f0]
- Updated dependencies [26a86cb]
- Updated dependencies [9c76cc5]
- Updated dependencies [f7e3344]
- Updated dependencies [ac7c1ce]
  - @effection/core@2.0.0-beta.2

## 2.0.0-beta.1

### Patch Changes

- 0c6e263: release 2.0.0-beta
- Updated dependencies [0c6e263]
  - @effection/core@2.0.0-beta.1

## 2.0.0-preview.14

### Patch Changes

- Updated dependencies [9998088]
- Updated dependencies [2bce454]
- Updated dependencies [1981b35]
- Updated dependencies [88dc59a]
  - @effection/core@2.0.0-preview.12

## 2.0.0-preview.13

### Patch Changes

- Updated dependencies [88eca21]
- Updated dependencies [ae8d090]
- Updated dependencies [8bb4514]
- Updated dependencies [44c354d]
  - @effection/core@2.0.0-preview.11

## 2.0.0-preview.12

### Patch Changes

- Updated dependencies [625b521]
- Updated dependencies [a06c679]
- Updated dependencies [4d04159]
- Updated dependencies [625b521]
  - @effection/core@2.0.0-preview.10

## 2.0.0-preview.11

### Minor Changes

- 92f921e: Turn streams into resources which return a subscription

## 2.0.0-preview.10

### Patch Changes

- Updated dependencies [110a2cd]
- Updated dependencies [e2545b2]
- Updated dependencies [2b92370]
- Updated dependencies [00562fd]
- Updated dependencies [110a2cd]
- Updated dependencies [110a2cd]
- Updated dependencies [02446ad]
- Updated dependencies [da86a9c]
  - @effection/core@2.0.0-preview.9

## 2.0.0-preview.9

### Patch Changes

- a13987f: make operation resolution an interface. Make operation iterators
  an operation.
- Updated dependencies [a13987f]
  - @effection/core@2.0.0-preview.8

## 2.0.0-preview.8

### Patch Changes

- Updated dependencies [2bad074]
  - @effection/core@2.0.0-preview.7

## 2.0.0-preview.7

### Minor Changes

- 3db7270: Make Queue a first class citizen

## 2.0.0-preview.6

### Minor Changes

- 0dca571: Filter with a type predicate can narrow type of stream

### Patch Changes

- 1222756: Use strict dependency requirements for internal dependencies while in prerelease mode
- Updated dependencies [1222756]
  - @effection/core@2.0.0-preview.6

## 2.0.0-preview.5

### Minor Changes

- 0b24415: Add WritableStream interface and implement it for channels
- 22e5230: Add `join` method on stream to return stream result
- 3983202: Add `stringBuffer` method to stream which buffers stream to a string
- 2c2749d: Add a `buffer` method on Stream to buffer stream contents for later replay

### Patch Changes

- Updated dependencies [70c358f]
  - @effection/core@2.0.0-preview.5

## 2.0.0-preview.4

### Minor Changes

- ab41f6a: Rename `Subscribable` to `Stream`

### Patch Changes

- Updated dependencies [72f743c]
  - @effection/core@2.0.0-preview.4

## 2.0.0-preview.3

### Minor Changes

- 3ca4cd4: Add `createSubscribable` and `Subscribable` interface

### Patch Changes

- Updated dependencies [bdedf68]
- Updated dependencies [2bf5ef4]
  - @effection/core@2.0.0-preview.3

## 2.0.0-preview.2

### Patch Changes

- 93ec0d6: Include CHANGELOGS and src with all packages
- Updated dependencies [93ec0d6]
  - @effection/core@2.0.0-preview.2

## 2.0.0-preview.1

### Patch Changes

- 80143d5: Fix packaging
- Updated dependencies [80143d5]
  - @effection/core@2.0.0-preview.1

## 2.0.0-preview.0

### Major Changes

- Version 2

### Patch Changes

- Updated dependencies [undefined]
  - effection@2.0.0-preview.0

## 1.0.0

### Major Changes

- b988025: Release effection 1.0.0

### Patch Changes

- Updated dependencies [b988025]
  - effection@1.0.0

## 0.12.0

### Minor Changes

- d3d3b64: Type of `TReturn` defaults to `undefined`.

### Patch Changes

- Updated dependencies [f851981]
  - effection@0.8.0

## 0.11.1

### Patch Changes

- 649ec8d: Deprecated functions only emit a single warning, and print out the
  line from which they were invoked

## 0.11.0

### Minor Changes

- 25b68eb: Subscriptions created via `createSubscription` are chainable on both sides of the yield

## 0.10.0

### Minor Changes

- 5d118ee: Chain via `subscribe` instead of `Subscribable.from` which is now deprecated.

## 0.9.0

### Minor Changes

- 786b20e: make the type of SymbolSubscribable global, not just the value

## 0.8.1

### Patch Changes

- a7f9396: Retain resources created through `subscribe` properly

## 0.8.0

### Minor Changes

- 8303e92: Add a free `subscribe` function, allow chaining of `map`, `filter` etc on subscriptions and deprecate chaining on subscribables.

## 0.7.3

### Patch Changes

- 7671de1: Fixed bug where subscription was cached when `createSubscription` is returned without using `yield`.

## 0.7.2

### Patch Changes

- db11b3f: convert `effection` dependency into normal, non-peer dependency
- Updated dependencies [0e8951f]
  - effection@0.7.0

## 0.7.1

### Patch Changes

- 68c4dab: include typescript sources with package in order for sourcemaps to work.
- Updated dependencies [68c4dab]
  - effection@0.6.4

## 0.7.0

### Minor Changes

- ad0d7e2: add higher order functions like `map`, `filter`, and `forEach` for working with subscriptions
- 3336949: Add the `match` method to `Subscribable` to filter a subscription by pattern

## 0.6.3

### Patch Changes

- 70ac8e3: create the `@effection/subscription` package with the
  `createSubscription` operation.

  Refactor `on()` operation from `@effection/events` to use
  createSubscription()

- Updated dependencies [60ed704]
  - effection@0.6.3
