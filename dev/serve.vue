<script lang="ts">
import { defineComponent } from 'vue'
import Vue3ScrollShadow from '@/vue3-scroll-shadow.vue'

export default defineComponent({
  name: 'ServeDev',
  components: {
    Vue3ScrollShadow,
  },
  data() {
    return {
      posts: 10,
    }
  },
  methods: {
    add() {
      this.posts++
    },
    remove() {
      this.posts--
    },
  },
})
</script>

<template>
  <div id="app">
    <h1>my web</h1>
    <button @click="add">+</button>
    <button @click="remove">-</button>
    <div class="flex-box" style="height: 60vh">
      <div class="left">left</div>
      <div class="right">
        <vue3-scroll-shadow :throttleWait="100">
          <p v-for="num in Array(posts).keys()" :key="num">
            {{ num }} - Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quis officiis
            quasi accusantium minima, accusamus quibusdam quisquam consectetur odit! In ullam sint
            ab eaque autem iusto, consequatur quo aut ex neque odio porro provident eligendi, quod
            quas blanditiis corporis? Aperiam, eveniet?
          </p>
        </vue3-scroll-shadow>
      </div>
    </div>
  </div>
</template>

<style>
body {
  margin: 0;
  padding: 0;
}
ul {
  margin: 0;
  padding: 0;
  list-style: none;
}
li {
  padding: 5px;
}
.flex-box {
  display: flex;
}
.left {
  width: 70%;
}
</style>
