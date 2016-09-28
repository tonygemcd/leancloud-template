<template>
  <div class="app-wrap">
    <router-view
    transition
    transition-mode="out-in"></router-view>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  computed: {},
  ready () {},
  attached () {},
  methods: {},
  components: {}
}
</script>

<style lang="scss">
@import "../node_modules/normalize.css/normalize.css";

body {
  font-family: 'Helvetica','Arial',sans-serif;
  background-color: #fff;
}
* {
  margin: 0;
  padding: 0;
}
a {
  text-decoration: none;
}
</style>
