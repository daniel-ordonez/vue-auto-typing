<template>
  <div id="app">
    <auto-typing ref="autoTyping" :split="true" :delay=500 >I love ...</auto-typing>
  </div>
</template>

<script>
import AutoTyping from './components/VueAutoTyping.vue'

export default {
  name: 'app',
  components: {
    AutoTyping
  },
  mounted(){
    this.$refs.autoTyping.push("Never mind.");
  }
}
</script>

<style>
body{
  font-family: 'San Francisco', 'Helvetica Neue', 'Lucida Grande', 'Segoe UI', 'Roboto', 'Tahoma', 'Ubuntu';
  font-size: 24px;
  font-weight: bolder;
  padding: 0.5em;
}
</style>


