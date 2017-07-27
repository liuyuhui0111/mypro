import axios from 'axios'
import {PATH_URL} from 'api/config'

export function getShopCartNum() {
	let url = PATH_URL+'shopCartNum.json'
	return axios.get(url).then((res)=>{
		return Promise.resolve(res.data)
	})
}

export function getShopCartList() {
	let url = PATH_URL+'shoppingList.json'
	return axios.get(url).then((res)=>{
		return Promise.resolve(res.data)
	})
}