<template>
  <div class="singer" ref="singer">
    <list-view :data="singers"></list-view>
    <!--<list-view @select="selectSinger" :data="singers" ref="list"></list-view>-->
    <router-view></router-view>
  </div>
</template>

<script>
  import {getSingerList} from '../../api/singer'
  import {ERR_OK} from '../../api/config'
  import Singer from '@/common/js/singer'
  import ListView from '@/base/listview/ListView'

  const HOT_NAME = '热门'
  const HOT_SINGER_LEN = 10

  export default {
    name: 'Singer',
    components: {
      ListView
    },
    data () {
      return {
        singers: []
      }
    },
    created () {
      this._getSingerList()
    },
    methods: {
      _getSingerList () {
        getSingerList().then((res) => {
          if (res.code === ERR_OK) {
            this.singers = this._normalizeSingerList(res.data.list)
            console.log(this.singers)
          }
        })
      },
      _normalizeSingerList (list) {
        let map = {
          hot: {
            title: HOT_NAME,
            items: []
          }
        }
        list.forEach((item, index) => {
          if (index < HOT_SINGER_LEN) {
            map.hot.items.push(new Singer({
                name: item.Fsinger_name,
                id: item.Fsinger_mid
              }
            ))
          }
          const key = item.Findex
          /**
           * 如果不存在的话,就创建一个
           */
          if (!map[key]) {
            map[key] = {
              title: key,
              items: []
            }
          }
          /**
           * 设置值
           */
          map[key].items.push(new Singer({
            name: item.Fsinger_name,
            id: item.Fsinger_mid
          }))
        })
        /**
         * 排序,并过滤没用的数据
         */
        let hot = []
        let ret = []
        for (let keys in map) {
          let val = map[keys]
          /**
           * 如果是a-z或者是A-Z的数据的话
           */
          if (val.title.match(/[a-zA-Z]/)) {
            ret.push(val)
          } else if (val.title === HOT_NAME) {
            hot.push(val)
          }
        }
        // 排序
        ret.sort((a, b) => {
          return a.title.charCodeAt(0) - b.title.charCodeAt(0)
        })
        /**
         * 合并两个集合
         */
        return hot.concat(ret)
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .singer
    position: fixed
    top: 88px
    bottom: 0
    width: 100%
</style>
