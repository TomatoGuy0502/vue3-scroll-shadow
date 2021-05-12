# Vue 3 Scroll Shadow

Add UX-friendly shadow to your scrollable list

## Installation

```bash
npm i vue3-scroll-shadow
```

## Usage

```javascript
import VueScrollShadow from 'vue3-scroll-shadow'
```

```html
<template>
  <vue-scroll-shadow>
    <!-- Your content goes here -->
  </vue-scroll-shadow>
</template>
```

## Props

| Name            | Type   | Default       | Description                                                                                                            |
| --------------- | ------ | ------------- | ---------------------------------------------------------------------------------------------------------------------- |
| height          | String | '100%'        | Height of container                                                                                                    |
| throttleWait    | Number | 100           | Handle `scroll` event at most once per `throttleWait` milliseconds                                                     |
| shadowColorFrom | String | '#00000014'   | Start color of scroll shadow. Can be RGB or RGBA:<br /> - `#000`<br /> - `#000000`<br /> - `#0004`<br /> - `#00000044` |
| shadowColorTo   | String | 'transparent' | End color of scroll shadow. Same as above                                                                              |
