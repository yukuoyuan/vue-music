<template>
  <transition name="slide">
    <div class="details">这是一个歌手详情界面</div>
  </transition>
</template>

<script>
  export default {
    name: 'singer-detail'
  }
</script>

<style lang="stylus" scoped>
  @import "~common/stylus/variable"
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)

  .details
    position: fixed
    z-index: 100
    top: 0
    left: 0
    bottom: 0
    right: 0
    background: $color-background
</style>
