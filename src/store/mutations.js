import * as types from './mutation-types'

const matutaions = {
  [types.SET_SHOPID](state, shopid) {
    state.shopid = shopid
  },
  [types.SET_COLORBOX](state, colorbox) {
    state.colorbox = colorbox
  },
  [types.SET_SHOPCARTNUM](state, shopCartNum) {
    state.shopCartNum = shopCartNum
  }
}

export default matutaions