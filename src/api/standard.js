import axios from 'axios'
import {PATH_URL} from 'api/config'
export function getSwiperData(){
	const url = PATH_URL+'data.json'
	return axios.get(url)
	.then((res)=>{
		return Promise.resolve(res.data)
	})
	.catch((err)=>{
		return Promise.reject(err)
	})
}

export function getShopList(){
	const url = PATH_URL+'standShopList.json'
	return axios.get(url)
	.then((res)=>{
		return Promise.resolve(res.data)
	})
	.catch((err)=>{
		return Promise.reject(err)
	})
}

export function addShop(param){
	const url = PATH_URL+'addShop.json'
	const data = Object.assign({},param,{
		openid:"00102973"
	})
	return axios.get(url,{
		params:data
	}).then((res)=>{
		return Promise.resolve(res.data)
	})
	
}