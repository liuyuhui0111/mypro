import * as types from './mutation-types'
import {setLocalDetailShop} from 'common/js/cache.js'

export const setShopCartNum = function({commit,state},num){
	num = num < 1 ? 1 : num
	let n = state.shopCartNum + num
	commit(types.SET_SHOPCARTNUM,n)
}

export const setDetailShop = function({commit,state},item){
	commit(types.SET_DRTAILSHOP,setLocalDetailShop(item))
}