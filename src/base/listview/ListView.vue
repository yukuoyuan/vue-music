<template>
  <scroll class="listview" :data="data" ref="listview" :probeType="probeType" @scroll="scroll"
          :listenScroll="listenScroll">
    <ul>
      <li v-for="(group,index) in data" class="list-group" :key="index" ref="listGroup">
        <h2 class="list-group-title">{{group.title}}</h2>
        <uL>
          <li @click="selectItem(item)" v-for="(item,indexs) in group.items" :key="indexs" class="list-group-item">
            <img class="avatar" v-lazy="item.avatar">
            <span class="name">{{item.name}}</span>
          </li>
        </uL>
      </li>
    </ul>
    <!--右侧导航栏-->
    <div class="list-shortcut" @touchstart.stop.prevent="onShortcutTouchStart"
         @touchmove.stop.prevent="onShortcutTouchMove"
         @touchend.stop>
      <ul>
        <li v-for="(item, index) in shortcutList" :key="index" :data-index="index" class="item"
            :class="{'current':currentIndex===index}">{{item}}
        </li>
      </ul>
    </div>
    <!--如果数据为空的时候显示进度条-->
    <div v-show="!data.length" class="loading-container">
      <loading></loading>
    </div>
    <div class="list-fixed" v-show="fixedTitle" ref="fixed">
      <h1 class="fixed-title">{{fixedTitle}}</h1>
    </div>
  </scroll>
</template>

<script>
  import Scroll from '@/base/scroll/Scroll'
  import Loading from '@/base/loading/Loading'
  import {getData} from '../../common/js/dom'

  const ANCHOR_HEIGHT = 18
  const TITLE_HEIGHT = 30

  export default {
    name: 'List',
    props: {
      data: {
        type: Array
      }
    },
    data () {
      return {
        currentIndex: 0,
        scrollY: -1,
        diff: -1,
        fixedTop: 0
      }
    },
    created () {
      this.touch = []
      this.listenScroll = true
      this.listHeight = []
      this.probeType = 3
    },
    computed: {
      shortcutList () {
        return this.data.map((group) => {
          return group.title.substr(0, 1)
        })
      },
      fixedTitle () {
        if (this.scrollY > 0) {
          return ''
        }
        return this.data[this.currentIndex] ? this.data[this.currentIndex].title : ''
      }
    },
    components: {
      Scroll,
      Loading
    },
    methods: {
      /**
       * 触摸开始调用的方法
       */
      onShortcutTouchStart (e) {
        let anchorIndex = getData(e.target, 'index')
        let firstTouch = e.touches[0]
        this.touch.y1 = firstTouch.pageY
        this.touch.anchorIndex = anchorIndex
        this.currentIndex = anchorIndex
        this._scrollTo(anchorIndex)
      },
      /**
       * 当触摸移动的时候调用的方法
       * @param e
       */
      onShortcutTouchMove (e) {
        let firstTouch = e.touches[0]
        this.touch.y2 = firstTouch.pageY
        /**
         * 计算出偏移了几个(向下取整)
         * @type {number}
         */
        let delta = Math.floor((this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT)
        // 因为获取到的是一个字符串,所以需要转换一下
        let anchorIndex = parseInt(this.touch.anchorIndex) + delta
        this.currentIndex = anchorIndex
        this._scrollTo(anchorIndex)
      },
      scroll (pos) {
        this.scrollY = pos.y
      },
      _scrollTo (index) {
        this.$refs.listview.scrollToElement(this.$refs.listGroup[index], 0)
      },
      _caculateHeight () {
        //  获取dom集合
        const list = this.$refs.listGroup
        let height = 0
        this.listHeight.push(height)
        for (let i = 0; i < list.length; i++) {
          let item = list[i]
          height += item.clientHeight
          this.listHeight.push(height)
        }
      },
      /**
       * 跳转到歌手详情界面
       * @param item
       */
      selectItem (item) {
        this.$emit('select', item)
      }
    },
    watch: {
      data () {
        setTimeout(() => {
          this._caculateHeight()
        }, 20)
      },
      scrollY (newY) {
        const listHeight = this.listHeight
        // 滚动到顶部的时候
        if (newY > 0) {
          this.currentIndex = 0
          return
        }
        newY = Math.abs(newY)
        for (let i = 0; i < listHeight.length - 1; i++) {
          let height1 = listHeight[i]
          let height2 = listHeight[i + 1]

          if (-newY >= height1 && newY < height2) {
            this.currentIndex = i
            this.diff = height2 + newY
            break
          }
        }
      },
      diff (newVal) {
        let fixedTop = (newVal > 0 && newVal && newVal < TITLE_HEIGHT) ? newVal - TITLE_HEIGHT : 0
        if (this.fixedTop === fixedTop) {
          return
        }
        this.fixedTop = fixedTop
        this.$refs.fixed.style.transform = `translate3d(0,${fixedTop}px,0)`
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import "~@/common/stylus/variable"

  .listview
    position: relative
    width: 100%
    height: 100%
    overflow: hidden
    background: $color-background
    .list-group
      padding-bottom: 30px
      .list-group-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
      .list-group-item
        display: flex
        align-items: center
        padding: 20px 0 0 30px
        .avatar
          width: 50px
          height: 50px
          border-radius: 50%
        .name
          margin-left: 20px
          color: $color-text-l
          font-size: $font-size-medium
    .list-shortcut
      position: absolute
      z-index: 30
      right: 0
      top: 50%
      transform: translateY(-50%)
      width: 20px
      padding: 20px 0
      border-radius: 10px
      text-align: center
      background: $color-background-d
      font-family: Helvetica
      .item
        padding: 3px
        line-height: 1
        color: $color-text-l
        font-size: $font-size-small
        &.current
          color: $color-theme
    .list-fixed
      position: absolute
      top: 0
      left: 0
      width: 100%
      .fixed-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
    .loading-container
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>
