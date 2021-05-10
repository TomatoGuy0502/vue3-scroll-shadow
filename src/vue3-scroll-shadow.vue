<template>
  <div
    class="vue3-scroll-shadow"
    :style="{ height }"
    :class="{ 'off-top': isOffTop, 'off-bottom': isOffBottom }"
    @scroll.capture="handleScroll"
  >
    <div class="vue3-scroll-shadow__content">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default /*#__PURE__*/ defineComponent({
  name: 'Vue3ScrollShadow', // vue component name
  data() {
    return {
      counter: 5,
      initCounter: 5,
      message: {
        action: null,
        amount: null,
      },
      isOffTop: false,
      isOffBottom: false,
    }
  },
  props: {
    height: {
      type: String,
      default: '100%',
    },
  },
  methods: {
    handleScroll({ target }: Event): void {
      if ((<HTMLDivElement>target).scrollTop > 0) {
        this.isOffTop = true
      } else {
        this.isOffTop = false
      }
      if (
        (<HTMLDivElement>target).offsetHeight + (<HTMLDivElement>target).scrollTop <
        (<HTMLDivElement>target).scrollHeight - 5
      ) {
        this.isOffBottom = true
      } else {
        this.isOffBottom = false
      }
    },
  },
})
</script>

<style scoped>
.vue3-scroll-shadow {
  height: 100%;
  position: relative;
  overflow-y: hidden;
}

.vue3-scroll-shadow__content {
  height: 100%;
  overflow-y: auto;
}

.vue3-scroll-shadow::before,
.vue3-scroll-shadow::after {
  content: '';
  position: absolute;
  height: 15px;
  width: 100%;
  opacity: 0;
}

.vue3-scroll-shadow::before {
  top: 0;
  background: linear-gradient(#00000014, transparent);
}

.vue3-scroll-shadow::after {
  bottom: 0;
  background: linear-gradient(to top, #00000014, transparent);
}

.vue3-scroll-shadow.off-top::before,
.vue3-scroll-shadow.off-bottom::after {
  opacity: 1;
}
</style>
