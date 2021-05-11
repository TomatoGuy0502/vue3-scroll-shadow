<template>
  <div
    class="vue3-scroll-shadow"
    :style="{ height }"
    :class="{ 'off-top': scrollState.isOffTop, 'off-bottom': scrollState.isOffBottom }"
  >
    <div class="vue3-scroll-shadow__content" ref="scrollContent" @scroll="throttledCheckShadow">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUpdated, reactive, ref } from 'vue'
import { throttle } from 'lodash'

export default /*#__PURE__*/ defineComponent({
  name: 'Vue3ScrollShadow', // vue component name
  props: {
    height: {
      type: String,
      default: '100%',
    },
    throttleWait: {
      type: Number,
      default: '100',
    },
  },
  setup(props) {
    const scrollContent = ref<HTMLDivElement | null>(null)
    const scrollState = reactive({
      isOffTop: false,
      isOffBottom: false,
    })

    const checkShadow = function(): void {
      console.count('scroll')
      const { scrollTop, scrollHeight, offsetHeight } = scrollContent.value!
      scrollState.isOffTop = scrollTop > 0
      scrollState.isOffBottom = offsetHeight + scrollTop < scrollHeight
    }

    const throttledCheckShadow = throttle(checkShadow, props.throttleWait)

    onMounted(() => {
      checkShadow()
    })

    onUpdated(() => {
      checkShadow()
    })

    return { scrollContent, scrollState, throttledCheckShadow }
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
  transition: 0.3s;
  height: 15px;
  width: 100%;
  opacity: 0;
}

.vue3-scroll-shadow::before {
  top: 0;
  background: linear-gradient(#0000004b, transparent);
}

.vue3-scroll-shadow::after {
  bottom: 0;
  background: linear-gradient(to top, #0000004b, transparent);
}

.vue3-scroll-shadow.off-top::before,
.vue3-scroll-shadow.off-bottom::after {
  opacity: 1;
}
</style>
