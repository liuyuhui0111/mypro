import * as types from './mutation-types'

export const setShopCartNum = function({commit,state},num){
	num = num < 1 ? 1 : num
	let n = state.shopCartNum + num
	commit(types.SET_SHOPCARTNUM,n)
}