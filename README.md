# vue-use-hover-intent

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]

> Vue 3 composable hover detection that waits until the user's mouse slows down enough.

This is a Vue 3 port of [react-use-hoverintent](https://github.com/natelindev/react-use-hoverintent)

## Demo
[plnt.cz/hoverintent](https://plnt.cz/hoverintent/)

## Install

```sh
# npm
npm install vue-use-hover-intent

# yarn
yarn add vue-use-hover-intent

# pnpm
pnpm install vue-use-hover-intent
```

## Use

Import the composable and pass in a ref of the element you want to detect hover on.
It returns a boolean ref that is true when the user is hovering over the element.

```vue
<script setup lang="ts">
  import { useHoverIntent } from 'vue-use-hover-intent'

  const elementRef = ref<HTMLElement>()

  // with default options
  const isHovering = useHoverIntent(elementRef)

  // with custom options
  const isHoveringWithOptions = useHoverIntent(elementRef, {
    sensitivity: 4,
    interval: 50,
    timeout: 0,
  })
</script>

<template>
  <div>
    <div ref="elementRef">
      <p v-if="isHovering">Hovering</p>
      <p v-else>Not hovering</p>
    </div>
  </div>
</template>
```

## Options
You can pass following options to the composable as a second parameter:


*timeout*: Delay in milliseconds before the onMouseOut callback is fired. If the user mouses back over the
element before the timeout has expired the onMouseOut callback will not be called (nor will the onMouseOver callback be
called). This is primarily to protect against sloppy/human mousing trajectories that temporarily (and unintentionally)
take the user off of the target element... giving them time to return (defaults to ```100```).


*sensitivity*: If the mouse travels fewer than this number of pixels between polling intervals, then the onMouseOver
callback will be called. With the minimum sensitivity threshold of 1, the mouse must not move between polling intervals.
With higher sensitivity thresholds you are more likely to receive a false positive (defaults to ```6```).


*interval* : The number of milliseconds hoverIntent waits between reading/comparing mouse coordinates. When the user's
mouse first enters the element its coordinates are recorded. The soonest the onMouseOut callback can be called is after
a single polling interval. Setting the polling interval higher will increase the delay before the first possible
onMouseOver call, but also increases the time to the next point of comparison (defaults to ```100```).


## 💻 Development

- Clone this repository
- Enable [Corepack](https://github.com/nodejs/corepack) using `corepack enable` (use `npm i -g corepack` for Node.js < 16.10)
- Install dependencies using `pnpm install`
- Run interactive tests using `pnpm dev`

## License

Made with 💛

Published under [MIT License](./LICENSE).

<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/vue-use-hover-intent?style=flat-square
[npm-version-href]: https://npmjs.com/package/vue-use-hover-intent

[npm-downloads-src]: https://img.shields.io/npm/dm/vue-use-hover-intent?style=flat-square
[npm-downloads-href]: https://npmjs.com/package/vue-use-hover-intent
