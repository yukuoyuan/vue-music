import Vue from 'vue'
import Router from 'vue-router'
import Rank from '@/components/rank/Rank'
import Singer from '@/components/singer/Singer'
import Recommend from '@/components/recommend/Recommend'
import Search from '@/components/search/Search'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/recommend'
    },
    {
      path: '/recommend',
      name: 'Recommend',
      component: Recommend
    },
    {
      path: '/singer',
      name: 'Singer',
      component: Singer
    },
    {
      path: '/rank',
      name: 'Rank',
      component: Rank
    },
    {
      path: '/search',
      name: 'Search',
      component: Search
    }
  ]
})
