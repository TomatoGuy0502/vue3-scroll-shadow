<script lang="ts">
import { defineComponent } from 'vue'
import Vue3ScrollShadow from '@/vue3-scroll-shadow.vue'

export default defineComponent({
  name: 'ServeDev',
  components: {
    Vue3ScrollShadow,
  },
})
</script>

<template>
  <div id="app">
    <div class="box" style="height: 100px">
      <vue3-scroll-shadow>
        <ul>
          <li>1</li>
          <li>2</li>
          <li>3</li>
          <li>1</li>
          <li>2</li>
          <li>3</li>
          <li>1</li>
          <li>2</li>
          <li>3</li>
        </ul>
      </vue3-scroll-shadow>
    </div>
  </div>
</template>
