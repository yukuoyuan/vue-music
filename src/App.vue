<template>
  <div id="app">
    <m-header></m-header>
    <tab></tab>
    <keep-alive>
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>
  import MHeader from '@/components/m-header/MHeader'
  import Tab from '@/components/tab/Tab'

  export default {
    name: 'App',
    components: {
      MHeader,
      Tab
    }
  }
</script>

<style lang="stylus" scoped>
  @import "~common/stylus/variable.styl"
  #app
    color $color-theme
</style>
