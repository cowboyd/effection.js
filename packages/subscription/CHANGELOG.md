# @effection/subscription

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
