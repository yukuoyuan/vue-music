<template>
  <div class="m-header">
    <div class="icon"></div>
    <h1 class="text">Children Music</h1>
  </div>
</template>

<script>
  export default {
    name: 'MHeader'
  }
</script>

<style lang="stylus" scoped>
  @import "~common/stylus/mixin"
  @import "~common/stylus/variable"
  .m-header
    position relative
    height 44px
    text-align center
    color $color-theme
    font-size 0
    .icon
      display inline-block
      vertical-align top
      margin-top 6px
      width 32px
      height 30px
      margin-right 9px
      background-size 30px 32px
      bg-image('logo')
    .text
      display inline-block
      vertical-align top
      line-height 44px
      font-size $font-size-large
</style>
