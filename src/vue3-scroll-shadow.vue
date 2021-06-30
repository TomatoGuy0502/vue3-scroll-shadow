<template>
  <div class="vue3-scroll-shadow" :style="scrollShadowStyle">
    <div
      class="vue3-scroll-shadow__top-shadow"
      :style="topShadowStyle"
      :class="{ show: scrollState.isOffTop }"
    />
    <div class="vue3-scroll-shadow__content" ref="scrollContent" @scroll="throttledCheckShadow">
      <slot :scrollState="scrollState" />
    </div>
    <div
      class="vue3-scroll-shadow__bottom-shadow"
      :style="bottomShadowStyle"
      :class="{ show: scrollState.isOffBottom }"
    />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, onUpdated, reactive, ref } from 'vue'
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
      default: 100,
    },
    shadowColorFrom: {
      type: String,
      default: '#00000014',
      validator: (color: String) => {
        return (
          !!color.match(/^#(([0-9a-fA-F]{3}){1,2}|([0-9a-fA-F]{4}){1,2})$/) ||
          color === 'transparent'
        )
      },
    },
    shadowColorTo: {
      type: String,
      default: 'transparent',
      validator: (color: String) => {
        return (
          !!color.match(/^#(([0-9a-fA-F]{3}){1,2}|([0-9a-fA-F]{4}){1,2})$/) ||
          color === 'transparent'
        )
      },
    },
    shadowSize: {
      type: String,
      default: '15px',
    },
  },
  setup(props) {
    const scrollContent = ref<HTMLDivElement | null>(null)
    const scrollState = reactive({
      isOffTop: false,
      isOffBottom: false,
    })

    const checkShadow = function(): void {
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

    // === style setting ===
    const scrollShadowStyle = computed(() => {
      return {
        height: props.height,
      }
    })

    const topShadowStyle = computed(() => {
      return {
        height: props.shadowSize,
        background: `linear-gradient(${props.shadowColorFrom}, ${props.shadowColorTo})`,
      }
    })

    const bottomShadowStyle = computed(() => {
      return {
        height: props.shadowSize,
        background: `linear-gradient(to top, ${props.shadowColorFrom}, ${props.shadowColorTo})`,
      }
    })

    return {
      scrollContent,
      scrollState,
      throttledCheckShadow,
      scrollShadowStyle,
      topShadowStyle,
      bottomShadowStyle,
    }
  },
})
</script>

<style scoped>
.vue3-scroll-shadow {
  position: relative;
  overflow-y: hidden;
}

.vue3-scroll-shadow__content {
  height: 100%;
  overflow-y: auto;
}

.vue3-scroll-shadow__top-shadow,
.vue3-scroll-shadow__bottom-shadow {
  content: '';
  position: absolute;
  transition: 0.3s;
  width: 100%;
  opacity: 0;
  pointer-events: none;
}

.vue3-scroll-shadow__top-shadow {
  top: 0;
}

.vue3-scroll-shadow__bottom-shadow {
  bottom: 0;
}

.show {
  opacity: 1;
}
</style>
