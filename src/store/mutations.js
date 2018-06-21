import * as types from 'src/store/mutation-types'

const mutations = {
  [types.SET_SINGER]{state, singer}{
      state.singer = singer
  }
}
