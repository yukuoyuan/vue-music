<template>
  <div id="app">
    hello world
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'App'
  }
</script>

<style lang="stylus" scoped>
  @import "~common/stylus/variable.styl"
  #app
    color $color-theme
</style>
