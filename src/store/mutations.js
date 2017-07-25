import * as types from './mutation-types'

const matutaions = {
  [types.SET_COLORBOX](state, colorbox) {
    state.colorbox = colorbox
  },
  [types.SET_SHOPCARTNUM](state, shopCartNum) {
    state.shopCartNum = shopCartNum
  },
  [types.SET_DRTAILSHOP](state, item) {
    state.detailShop = item
  }
}

export default matutaions