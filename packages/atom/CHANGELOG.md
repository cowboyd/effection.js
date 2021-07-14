# @effection/atom

## 2.0.0-beta.4

### Patch Changes

- Updated dependencies [e297c86]
  - @effection/core@2.0.0-beta.4
  - @effection/channel@2.0.0-beta.4
  - @effection/subscription@2.0.0-beta.4

## 2.0.0-beta.3

### Patch Changes

- Updated dependencies [3e77f29]
- Updated dependencies [5d95e6d]
- Updated dependencies [9700b45]
- Updated dependencies [9700b45]
  - @effection/subscription@2.0.0-beta.3
  - @effection/core@2.0.0-beta.3
  - @effection/channel@2.0.0-beta.3

## 2.0.0-beta.2

### Patch Changes

- Updated dependencies [19414f0]
- Updated dependencies [26a86cb]
- Updated dependencies [9c76cc5]
- Updated dependencies [f7e3344]
- Updated dependencies [ac7c1ce]
  - @effection/core@2.0.0-beta.2
  - @effection/channel@2.0.0-beta.2
  - @effection/subscription@2.0.0-beta.2

## 2.0.0-beta.1

### Patch Changes

- 0c6e263: release 2.0.0-beta
- Updated dependencies [0c6e263]
  - @effection/channel@2.0.0-beta.1
  - @effection/core@2.0.0-beta.1
  - @effection/subscription@2.0.0-beta.1

## 2.0.0-preview.15

### Patch Changes

- Updated dependencies [9998088]
- Updated dependencies [2bce454]
- Updated dependencies [1981b35]
- Updated dependencies [88dc59a]
  - @effection/core@2.0.0-preview.12
  - @effection/channel@2.0.0-preview.15
  - @effection/subscription@2.0.0-preview.14

## 2.0.0-preview.14

### Patch Changes

- b46434a: Use the generic monocle-ts import and not the commonjs import
- Updated dependencies [88eca21]
- Updated dependencies [ae8d090]
- Updated dependencies [8bb4514]
- Updated dependencies [44c354d]
  - @effection/core@2.0.0-preview.11
  - @effection/channel@2.0.0-preview.14
  - @effection/subscription@2.0.0-preview.13

## 2.0.0-preview.13

### Patch Changes

- a7d24eb: Lock dependency versions

## 2.0.0-preview.12

### Patch Changes

- Updated dependencies [625b521]
- Updated dependencies [a06c679]
- Updated dependencies [4d04159]
- Updated dependencies [625b521]
  - @effection/core@2.0.0-preview.10
  - @effection/channel@2.0.0-preview.13
  - @effection/subscription@2.0.0-preview.12

## 2.0.0-preview.11

### Patch Changes

- Updated dependencies [92f921e]
  - @effection/subscription@2.0.0-preview.11
  - @effection/channel@2.0.0-preview.12

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
  - @effection/channel@2.0.0-preview.11
  - @effection/subscription@2.0.0-preview.10

## 2.0.0-preview.9

### Patch Changes

- Updated dependencies [a13987f]
  - @effection/core@2.0.0-preview.8
  - @effection/subscription@2.0.0-preview.9
  - @effection/channel@2.0.0-preview.10

## 2.0.0-preview.8

### Patch Changes

- 91ade6c: Add missing dependency on @effection/channel which could cause incorrect module resolution
- Updated dependencies [91ade6c]
  - @effection/channel@2.0.0-preview.9

## 2.0.0-preview.7

### Patch Changes

- Updated dependencies [2bad074]
  - @effection/core@2.0.0-preview.7
  - @effection/subscription@2.0.0-preview.8

## 2.0.0-preview.6

### Patch Changes

- 9a6a6e3: Make atom more reentrant
- Updated dependencies [3db7270]
  - @effection/subscription@2.0.0-preview.7

## 2.0.0-preview.5

### Patch Changes

- 6a0f093: subscribing to an atom now always includes its current state as the
  first item in the stream. Depreacet the `once()` method as it is now
  redundant with `filter().expect()`

## 2.0.0-preview.4

### Patch Changes

- 1222756: Use strict dependency requirements for internal dependencies while in prerelease mode
- Updated dependencies [0dca571]
- Updated dependencies [1222756]
  - @effection/subscription@2.0.0-preview.6
  - @effection/core@2.0.0-preview.6

## 2.0.0-preview.3

### Major Changes

- Import from bigtest
